import { pageNavBar } from "../components/navBarMenuItems.js";

export const aboutConfluence = (activeTab, showDescription) => {
  let navBarItems = showDescription
    ? pageNavBar(
        "about",

        activeTab,

        "Overview",

        "Study Team Members",

        "Study Questionaire",

        "MOOP"
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
        <h1 class="page-header">Learn About EABCS</h1>
      </div>
    </div>
    
    <div class="home-page-stats font-size-18">
      <!-- Study Overview Section - Full Width -->
      <div class="main-summary-row mb-4">
        <div class="col">
          <div class="card shadow-sm">
            <div class="card-body p-4">
              <h5 class="card-title font-bold mb-3">Study Overview</h5>
              <p class="card-text">
                The Etiology of Aggressive Breast Cancer Study (EABCS) is a multidisciplinary 
                population-based case-control study conducted to determine etiologic factors 
                associated with different molecular subtypes of breast cancer among Ghanaian women.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Study Participants Section - 2 Cards -->
      <div class="main-summary-row mb-4">
        <div class="col">
          <div class="row">
            <div class="col-lg-6 mb-3">
              <div class="card shadow-sm h-100">
                <div class="card-body text-center">
                  <h3 class="text-primary mb-2">2,106</h3>
                  <p class="mb-1 font-bold">Controls</p>
                  <small class="text-muted">736 Accra | 1,370 Kumasi</small>
                </div>
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="card shadow-sm h-100">
                <div class="card-body text-center">
                  <h3 class="text-primary mb-2">2,136</h3>
                  <p class="mb-1 font-bold">Cases</p>
                  <small class="text-muted">573 Accra | 1,640 Kumasi</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Study Locations & Case Distribution Section - 2 Cards -->
      <div class="main-summary-row mb-4">
        <div class="col">
          <div class="row">
            <div class="col-lg-6 mb-3">
              <div class="card shadow-sm h-100">
                <div class="card-body text-center">
                  <h5 class="card-title font-bold mb-3">Study Locations</h5>
                  <img class="img-fluid" src="static/images/ghanaMap.png" alt="Ghana Study Locations" style="max-height: 350px;">
                </div>
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="card shadow-sm h-100">
                <div class="card-body">
                  <h5 class="card-title font-bold mb-3">Case Distribution by Diagnosis</h5>
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead class="thead-light">
                        <tr>
                          <th>Diagnosis Type</th>
                          <th class="text-right">Count</th>
                          <th class="text-right">Percent</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Invasive</td>
                          <td class="text-right">1,082</td>
                          <td class="text-right">50.66%</td>
                        </tr>
                        <tr>
                          <td>In-situ</td>
                          <td class="text-right">17</td>
                          <td class="text-right">0.80%</td>
                        </tr>
                        <tr>
                          <td>Benign</td>
                          <td class="text-right">780</td>
                          <td class="text-right">36.52%</td>
                        </tr>
                        <tr>
                          <td>Other Case Type</td>
                          <td class="text-right">23</td>
                          <td class="text-right">1.08%</td>
                        </tr>
                        <tr>
                          <td>Unconfirmed Case</td>
                          <td class="text-right">234</td>
                          <td class="text-right">10.96%</td>
                        </tr>
                        <tr class="font-bold">
                          <td>Total</td>
                          <td class="text-right">2,136</td>
                          <td class="text-right">100.00%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Information Section -->
      <div class="main-summary-row mb-4">
        <div class="col">
          <div class="card shadow-sm" style="background-color: #f8f9fa;">
            <div class="card-body">
              <h5 class="card-title font-bold mb-3">For More Information</h5>
              <div class="row">
                <div class="col-md-6 mb-2">
                  <i class="fas fa-globe me-2"></i>
                  <strong>Website:</strong> 
                  <a href="https://dceg.cancer.gov/research/cancer-types/breast-cancer/ghana-breast-study" target="_blank" rel="noopener">
                    DCEG Ghana Breast Study
                  </a>
                </div>
              </div>
            </div>
          </div>
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

// export const renderOverView = async () => {
//   let template = `
//     <div class="main-summary-row">
//       <div class="align-left">
//         <h1 class="page-header">Learn About EABCS</h1>
//       </div>
//     </div>
    
//     <div class="home-page-stats font-size-18">
//       <!-- Study Overview Section -->
//       <div class="main-summary-row mb-4">
//         <div class="col">
//           <div class="card shadow-sm">
//             <div class="card-body p-4">
//               <h5 class="card-title font-bold mb-3">Study Overview</h5>
//               <p class="card-text">
//                 The Etiology of Aggressive Breast Cancer Study (EABCS) is a multidisciplinary 
//                 population-based case-control study conducted to determine etiologic factors 
//                 associated with different molecular subtypes of breast cancer among Ghanaian women.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <!-- Study Statistics Section -->
//       <div class="main-summary-row mb-4">
//         <div class="col">
//           <h5 class="font-bold mb-3">Study Participants</h5>
//           <div class="row">
//             <div class="col-md-6 mb-3">
//               <div class="card shadow-sm h-100">
//                 <div class="card-body text-center">
//                   <h3 class="text-primary mb-2">2,106</h3>
//                   <p class="mb-1 font-bold">Controls</p>
//                   <small class="text-muted">736 Accra | 1,370 Kumasi</small>
//                 </div>
//               </div>
//             </div>
//             <div class="col-md-6 mb-3">
//               <div class="card shadow-sm h-100">
//                 <div class="card-body text-center">
//                   <h3 class="text-primary mb-2">2,136</h3>
//                   <p class="mb-1 font-bold">Cases</p>
//                   <small class="text-muted">573 Accra | 1,640 Kumasi</small>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <!-- Study Locations & Case Distribution -->
//       <div class="main-summary-row mb-4">
//         <div class="row">
//           <div class="col-lg-5 mb-3">
//             <div class="card shadow-sm h-100">
//               <div class="card-body text-center">
//                 <h5 class="card-title font-bold mb-3">Study Locations</h5>
//                 <img class="img-fluid" src="static/images/ghanaMap.png" alt="Ghana Study Locations" style="max-height: 350px;">
//               </div>
//             </div>
//           </div>
//           <div class="col-lg-7 mb-3">
//             <div class="card shadow-sm h-100">
//               <div class="card-body">
//                 <h5 class="card-title font-bold mb-3">Case Distribution by Diagnosis</h5>
//                 <div class="table-responsive">
//                   <table class="table table-hover">
//                     <thead class="thead-light">
//                       <tr>
//                         <th>Diagnosis Type</th>
//                         <th class="text-right">Count</th>
//                         <th class="text-right">Percent</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td><strong>Invasive</strong></td>
//                         <td class="text-right">1,082</td>
//                         <td class="text-right">50.66%</td>
//                       </tr>
//                       <tr>
//                         <td>In-situ</td>
//                         <td class="text-right">17</td>
//                         <td class="text-right">0.80%</td>
//                       </tr>
//                       <tr>
//                         <td>Benign</td>
//                         <td class="text-right">780</td>
//                         <td class="text-right">36.52%</td>
//                       </tr>
//                       <tr>
//                         <td>Other Case Type</td>
//                         <td class="text-right">23</td>
//                         <td class="text-right">1.08%</td>
//                       </tr>
//                       <tr>
//                         <td>Unconfirmed Case</td>
//                         <td class="text-right">234</td>
//                         <td class="text-right">10.96%</td>
//                       </tr>
//                       <tr class="font-bold">
//                         <td>Total</td>
//                         <td class="text-right">2,136</td>
//                         <td class="text-right">100.00%</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <!-- Contact Information Section -->
//       <div class="main-summary-row mb-4">
//         <div class="col">
//           <div class="card shadow-sm" style="background-color: #f8f9fa;">
//             <div class="card-body">
//               <h5 class="card-title font-bold mb-3">For More Information</h5>
//               <div class="row">
//                 <div class="col-md-6 mb-2">
//                   <i class="fas fa-globe me-2"></i>
//                   <strong>Website:</strong> 
//                   <a href="https://dceg.cancer.gov/research/cancer-types/breast-cancer/ghana-breast-study" target="_blank" rel="noopener">
//                     DCEG Ghana Breast Study
//                   </a>
//                 </div>
//                 <div class="col-md-6 mb-2">
//                   <i class="fas fa-envelope me-2"></i>
//                   <strong>Email:</strong> 
//                   <a href="mailto:xxx@nih.gov">xxx@nih.gov</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     `;

        // <div class="ternary-bg">
        //   <div class="container align-left confluence-info font-family-montserrat">
        //     For more information
        //     <br>
        //     Visit: <a href="https://dceg.cancer.gov/research/cancer-types/breast-cancer/ghana-breast-study">https://dceg.cancer.gov/research/cancer-types/breast-cancer/ghana-breast-study</a>
        //     <br>
        //     Email: xxx@nih.gov
        //   </div>
        // </div>
