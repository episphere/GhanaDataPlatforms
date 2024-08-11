import { config } from "./config.js";
import { applicationURLs, refreshToken } from "./shared.js";

export const checkAccessTokenValidity = async () => {
  const access_token = JSON.parse(localStorage.parms).access_token;
  try {
    const response = await fetch("https://api.box.com/2.0/users/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    if (response.status === 401) {
      if ((await refreshToken()) === true)
        return await checkAccessTokenValidity();
    }
    if (response.status === 200) {
      return response.json();
    } else {
      return null;
    }
  } catch (error) {
    if ((await refreshToken()) === true)
      return await checkAccessTokenValidity();
  }
};

export const logOut = async () => {
  if (!localStorage.parms) return;
  const access_token = JSON.parse(localStorage.parms).access_token;
  let clt = {};
  //let urltest = location.origin + location.pathname;
  if (location.origin.indexOf("localhost") !== -1){ 
      clt = config.iniAppLocal;
    } else if (location.origin.indexOf("episphere") !== -1){ 
      clt = config.iniAppDev;
    } else if (location.origin.indexOf("epidataplatforms-stage") !== -1){
      clt = config.iniAppStage;
    } else if (location.origin.indexOf("epidataplatforms") !== -1){
      clt = config.iniAppDev;
      console.log(clt);
    }
  const response = await fetch(`https://api.box.com/oauth2/revoke`, {
    method: "POST",
    mode: "no-cors",
    body: `token=${access_token}&client_id=${clt.client_id}&client_secret=${clt.server_id}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  delete localStorage.parms;
  location.reload();
};