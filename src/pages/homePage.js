// Major updates required
import { getFileInfo } from "./../shared.js";

export const infoDeck = () => {
  let template = "";
  template += `
        <div class="secondary-bg padding-bottom-1rem">
            <div class="confluence-banner">
                <div class="banner-logo">
                    <div class="banner-overlay-text row justify-content-center text-center">
                        <div class="col-xl-12">
                            <h1 class="banner-overlay-h1"> Etiology of Aggressive Breast Cancer Study (EABCS) </h1>
                            <div class="banner-overlay-line"></div>
                            <h2 class="banner-overlay-h3" style="font-size:1.7vw;"> A multidisciplinary population-based case-control study</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container align-middle text-center" style="margin-top: 70px;">
                <div class="card-deck" id="infoDeck" style="min-height: 200px;">`;
  template += cardContents({
    header: "Learn about the study",
    button: "Learn about the study",
    href: "#about/overview",
    icon: "fa-download",
    explanation: "View main goals and collaborating institutions.",
  });
  template += cardContents({
    header: "Data Access",
    button: "Data Access",
    href: "#data_access/overview",
    icon: "fa-handshake",
    explanation: "View procedures for accessing data.",
  });
  template += cardContents({
    header: "Data Dictionary",
    button: "Data Dictionary",
    href: "#data_exploration/dictionary",
    icon: "fa-database",
    explanation: "View data types collected from participating cohort studies.",
  });
  template += `</div>
            </div>
        </div>
        <div class="secondary-bg inverse-triangle"></div>
        <div class="container align-center">
            <div class="font-size-28 font-bold font-family-montserrat our-goals mt-3 mb-2">Aims and Goals</div>
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-10 font-size-18 align-left mb-3">
                    <ul>
                        <li>Characterize patterns and trends of breast cancer incidence among Ghanaian women and </li>
                        <li>Identify genetic and non-genetic factors that are associated with breast cancer risk among Ghanaian women and assess similarities and differences with other African ancestry populations (including US)</li>
                        <li>Uncover predictive biomarkers for breast cancer risk, overall and by subtype</li>
                        <li>Improve understanding of breast cancer histogenesis and etiologic heterogeneity,  with attention to aggressive subtypes</li>
                        <li>Strengthen local workforce capacity for sustainable cancer epidemiology and prevention research </li>
                    </ul>
                </div>
                <div class="col-lg-1"></div>
            </div>
        </div>
        <!---<div class="ternary-bg">
            <div class="container align-left confluence-info font-family-montserrat">
            <div>The EABCS is funded by the US National Cancer Institute (NCI) grant number <a href="https://maps.cancer.gov/overview/DCCPSGrants/abstract.jsp?applId=10263893&term=CA249866">UPDATE FOR EABCS</a> and the NCI Intramural Research Funds. BCRPP is coordinated by the Harvard T.H. Chan School of Public Health and the Division of Cancer Epidemiology and Genetics (DCEG) of NCI, in collaboration with the NCI Cohort Consortium.</div>
            </div>
        </div>--->
    `;
  document.getElementById("confluenceDiv").innerHTML = template;
};

export const infoDeckAfterLoggedIn = async () => {
  let template = "";
  template += `
        <div class="secondary-bg padding-bottom-1rem">
            <div class="confluence-banner">
                <div class="banner-logo">
                    <div class="banner-overlay-text row justify-content-center text-center">
                        <div class="col-xl-12">
                            <h1 class="banner-overlay-h1">Etiology of Aggressive Breast Cancer Study (EABCS)</h1>
                            <div class="banner-overlay-line"></div>
                            <h2 class="banner-overlay-h3" style="font-size:1.7vw;"> A multidisciplinary population-based case-control study</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container align-middle text-center" style="margin-top: 70px;">
                <div class="card-deck" id="infoDeck" style="min-height: 200px;">`;

                template += cardContents({
                    header: "Learn about the study",
                    button: "Learn about the study",
                    href: "#about/overview",
                    icon: "fa-download",
                    explanation: "View main goals and collaborating institutions.",
                  });
                  template += cardContents({
                    header: "Data Access",
                    button: "Data Access",
                    href: "#data_access/overview",
                    icon: "fa-handshake",
                    explanation: "View procedures for accessing data.",
                  });
                  template += cardContents({
                    header: "Data Dictionary",
                    button: "Data Dictionary",
                    href: "#data_exploration/dictionary",
                    icon: "fa-database",
                    explanation: "View data types collected from participating cohort studies.",
                  });

  template += `</div>
            </div>
        </div>
        <div class="secondary-bg inverse-triangle"></div>
        <div class="container align-center">
            <div class="font-size-28 font-bold font-family-montserrat our-goals mt-3 mb-2">Aims and Goals</div>
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-10 font-size-18 align-left mb-3">
                    <ul>
                        <li>Characterize patterns and trends of breast cancer incidence among Ghanaian women and </li>
                        <li>Identify genetic and non-genetic factors that are associated with breast cancer risk among Ghanaian women and assess similarities and differences with other African ancestry populations (including US)</li>
                        <li>Uncover predictive biomarkers for breast cancer risk, overall and by subtype</li>
                        <li>Improve understanding of breast cancer histogenesis and etiologic heterogeneity,  with attention to aggressive subtypes</li>
                        <li>Strengthen local workforce capacity for sustainable cancer epidemiology and prevention research </li>
                    </ul>
                </div>
                <div class="col-lg-1"></div>
            </div>
        </div>
        <!---<div class="ternary-bg">
            <div class="container align-left confluence-info font-family-montserrat">
            <div>The EABCS is funded by the US National Cancer Institute (NCI) grant number <a href="https://maps.cancer.gov/overview/DCCPSGrants/abstract.jsp?applId=10263893&term=CA249866">UPDATE FOR EABCS</a> and the NCI Intramural Research Funds. BCRPP is coordinated by the Harvard T.H. Chan School of Public Health and the Division of Cancer Epidemiology and Genetics (DCEG) of NCI, in collaboration with the NCI Cohort Consortium.</div>
            </div>
        </div>--->
    `;
  document.getElementById("confluenceDiv").innerHTML = template;
};

const cardContents = (obj) => {
  return `
        <div class="col-xl card confluence-cards" style="min-width:225px">
            <div class="primary-bg rounded-circle" style="margin-top: -40px; padding: 10px;">
                <i class="fas ${obj.icon} fa-2x icon-padding font-white"></i>
            </div>
            <div class="card-body">
                <div class="card-title" style="color: #333B4D">
                    <div class="font-size-28"><b>${obj.header}</b></div>
                </div>
                <p class="text-secondary card-text font-size-14">
                    ${obj.explanation}
                </p>
            </div>

            <div class="white-bg border-top-0 card-footer" style="width: 100%;">
                <a class="stretched-link font-white my-2 border border-0 font-bold btn primary-bg" style="width: 90%;" href="${obj.href}" style="text-decoration: none;">${obj.button}</a>
            </div>
        </div>
        `;
};
