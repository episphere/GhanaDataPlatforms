import { addEventConsortiaFilter } from "../event.js";
import {
  getPublicFile,
  numberWithCommas,
  publicDataFileId,
} from "./../shared.js";
import { pageNavBar } from "../components/navBarMenuItems.js";

export const aboutConfluence = (activeTab, showDescription) => {
  let navBarItems = showDescription
    ? pageNavBar(
        "about",

        activeTab,

        "Overview",

        "Description of Studies",

        "DACC Members"
      )
    : `<div id='overview'></div>`;
  let template = `
        <div class="general-bg body-min-height padding-bottom-1rem">
            <div class="container">
                ${navBarItems}
            </div>
        </div>
    `;
  document.getElementById("confluenceDiv").innerHTML = template;
};

// Changes needed here for definitions
export const renderOverView = async () => {
  let template = `
    <div class="main-summary-row">
      <div class="align-left">
            <h1 class="page-header">Learn About GBHS</h1>
      </div>
    </div>
    <div class="home-page-stats font-size-18">
        <div class="main-summary-row">
            <div class="col align-left">
                </br>
                <span>
                  The Ghana Breast Health Study (GBHS) was conducted to determine etiologic
                  factors associated to different molecular subtypes of breast cancer.
                </span>
                </br></br>
                <div class="row">
                  <div class="column-ghana">
                    <img class="image-center" src="static/images/ghanaMap.png">
                  </div>
                  <div class="column-ghana">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="row"v colspan="4"> Controls: 2106, Cases: 2136</th>
                        </tr>
                      </thead>
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">Consensus_Diag</th>
                          <th scope="col">Freq</th>
                          <th scope="col">Percent</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Invasive</td>
                          <td>1,082</td>
                          <td>50.66</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>In-site</td>
                          <td>17</td>
                          <td>0.80</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Benign</td>
                          <td>780</td>
                          <td>36.52</td>
                        </tr>
                        <tr>
                          <th scope="row">4</th>
                          <td>Other Case Type</td>
                          <td>23</td>
                          <td>1.08</td>
                        </tr>
                        <tr>
                          <th scope="row">5</th>
                          <td>Unconfirmed Case</td>
                          <td>234</td>
                          <td>10.96</td>
                        </tr>
                        <tr>
                          <td></td>
                          <th>Total</th>
                          <th>2,136</th>
                          <th>100.00</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="row">
                  <div class="column-ghana">
                    <ul>
                      <li>Controls (2106, 736 Accra, 1370 Kumasi)</li>
                      <li>Cases (2213, 573 Accra, 1640 Kumasi)</li>
                        <ul>
                          <li>Invasive (1152, 390 Accra, 762 Kumasi)</li>
                          <li>In-situ (18, 5 Accra, 13 Kumasi)</li>
                          <li>Benign (786, 137 Accra, 649 Kumasi)</li>
                          <li>Other case type (23, 7 Accra, 16 Kumasi)</li>
                          <li>Unconfirmed cases (234, 34 Accra, 200 Kumasi)
                        </ul>
                    </ul>
                  </div>
                </div>
            </div>
        </div>
        <div class="ternary-bg">
          <div class="container align-left confluence-info font-family-montserrat">
            For more information
            <br>
            Visit: <a href="https://dceg.cancer.gov/research/cancer-types/breast-cancer/ghana-breast-study">https://dceg.cancer.gov/research/cancer-types/breast-cancer/ghana-breast-study</a>
            <br>
            Email: xxx@nih.gov
          </div>
        </div>
    </div>
    `;
    
  document.getElementById("overview").innerHTML = template;
  // const response = await fetch("./publicDataSet.json");
  // countPublicStatistics(await response.json(), true);
};

// const countPublicStatistics = (d, caseControl) => {
//   const data = JSON.parse(JSON.stringify(d));
//   const element = document.getElementById("confluenceDataSummary");
//   let totalConsortia = 0;
//   let totalPatients = 0;
//   let totalWomen = 0;
//   let summary = `
//     </br>
//         <div class="align-center">
//             <div class="main-summary-row" style="margin: 0px 15px;margin-bottom:10px">
//                 <div class="col-md-3" style="padding: 0px">
//                     <div class="custom-border allow-overflow align-left" style="height:100%; padding-left: 5px !important; margin-right: 15px;">
//                     <span class="font-size-17 font-bold"> <span class="required">*</span>Cohort:</span></br>
//                     <!---<span class="font-size-15">Cohort:</span></br>--->
//                     <ul class="about-consortia" id='about-consortia-check'>
//     `;
//   for (let key in data) {
//     if (!caseControl && key !== "CIMBA") continue;
//     if (key === "dataModifiedAt") continue;
//     ++totalConsortia;
//     totalPatients += data[key].numPatients;
//     totalWomen += data[key].numWomen;
//     summary += `<div class="row font-size-16" style="margin:2px 2px;">
//             ${
//               key !== "CIMBA"
//                 ? `
//                 <input type="checkbox" data-consortia="${
//                   data[key].name
//                 }" id="label${data[key].name}" class="checkbox-consortia"/>
//                     <label for="label${
//                       data[key].name
//                     }" class="study-name" title="${data[key].name}">${
//                     data[key].name.length > 10
//                       ? `${data[key].name.substr(0, 10)}...`
//                       : data[key].name
//                   }</label>
//             `
//                 : ``
//             }
//             </div>`;
//   }
//   summary += `</ul></div></div>
//                 <div class="col-md-9 align-center" style="padding: 0px">
                
//                     <div class="custom-border" style="margin-right: 15px; height: 100%;" id="renderDataSummaryCounts"></div>
                    
                    
//                 </div></div>
//                 <div class="col data-last-modified align-left">Data current as of - ${new Date(
//                   data["dataModifiedAt"]
//                 ).toLocaleString()} 
//                 <br>
//                 Table is updated when data from cohorts is shared with the BCRPP.</div>
//                 </div>
//                 `;
//   element.innerHTML = summary;
//   addEventOverviewConsortiumSelection(d);
//   addEventConsortiaFilter(d);
//   renderDataSummary({ totalConsortia, totalWomen, totalPatients }, caseControl);
// };

// const addEventOverviewConsortiumSelection = (data) => {
//   const select = document.getElementById("overviewConsortiumSelection");
//   if (!select) return;
//   select.addEventListener("change", () => {
//     const selectedValue = select.value;
//     countPublicStatistics(data, true);
//   });
// };
// export const renderDataSummary = (obj, caseControl) => {
//   document.getElementById("renderDataSummaryCounts").innerHTML = `
//         <div class="row">
//             <div class="col">
//                 <span class="font-size-22">Cohorts</span></br>
//                 <span class="font-size-32">${numberWithCommas(
//                   obj.totalConsortia
//                 )}</span>
//                 <br><br>     
//             </div>
//             <div class="col">
//                 <span class="font-size-22">Study Participants</span></br>
//                 <span class="font-size-32">${numberWithCommas(
//                   obj.totalWomen
//                 )}</span>
//             </div>
//             <div class="col">
//                 <span class="font-size-22">Breast Cancer Cases</span></br>
//                 <span class="font-size-32">${numberWithCommas(
//                   obj.totalPatients
//                 )}</span><br>               
//             </div>
//         </div>
//     `;
// };
