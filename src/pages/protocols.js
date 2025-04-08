import { addEventFilterBarToggle } from "../event.js";
import {
  getFile,
  hideAnimation,
  shortenText,
  tsv2JsonDic, tsv2Json,
  json2other, getFileXLSX, array2Json, getUniqueKeyNames
} from "./../shared.js";
import {
  addEventToggleCollapsePanelBtn,
  pageSizeTemplate,
  dataPagination,
  paginationTemplate,
} from "./description.js";
import { pageNavBar } from "../components/navBarMenuItems.js";
let previousValue = "";

export const protocolSummary = (
  activeTab, pageHeader
) => {
  return `
        <div class="general-bg">
            <div class="container2 body-min-height">
                ${
                   pageNavBar("protocols", activeTab, "Protocols", "Anthropometry", "Saliva", "Stool", "Blood", "Breast Tissue Biopsy Collection")//, "Anthropometry", "Saliva", "Stool", "Blood", "Breast tissue biopsy collection")
                } 
                <div class="main-summary-row">
                    <div class="row align-left w-100 m-0">
                        <h1 class="col page-header pl-0 pt-2">${pageHeader}</h1>  
                    </div>
                </div>
                
                <div class="main-summary-row" id="protocolPage"></div>
                <div class="main-summary-row">
                    <div class="col p-0">
                        <div class="offset-xl-2 pl-4 align-left" id="dataLastModified"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

export const protocolsTemplate = async () => {
    //document.getElementById("downloadContainer").style.display = 'none';
    let template = `
    <div class="home-page-stats font-size-18">
        <div class="main-summary-row">
            <div class="col align-left">
                </br>
                <span>
                  Downloadable forms in regards to protocols:
                </span>
                </br></br>
                <a href="./static/files/GBHS_Anthropometry_Annotated_d20170821.docx" download>Anthropometry</a>
                </br>
                <a href="./static/files/GBHS_Saliva_Collection_Annotated_d20170821.docx" download>Saliva</a>
                </br>
                <a href="./static/files/GBHS_Stool_Collection_Annotated_d20170821.docx" download>Stool</a>
                </br>
                <a href="./static/files/GBHS_Blood_Collection_Annotated_d20170821.docx" download>Blood</a>
                </br>
                <a href="./static/files/GBHS_Breast_Biopsy_Annotated_WithV2_d20170821.docx" download>Breast tissue biopsy collection</a>
            </div>
        </div>
    </div>`
    document.getElementById("protocolPage").innerHTML = template;
    hideAnimation();
}