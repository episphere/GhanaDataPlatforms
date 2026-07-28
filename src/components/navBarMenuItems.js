import {
  applicationURLs,
  emailforChair,
  emailforDACC,
  isDataAdmin
} from "./../shared.js";
const showProjectConceptForm = true;
const viewSubmissionsShow = false;
export const navBarMenutemplate = () => {
  return `
        <div class="grid-elements">
            <a class="nav-link nav-menu-links white-font" href="#home" title="BCRPP Home" id="homePage">
                Home
            </a>
        </div>
        <div class="grid-elements dropdown">
            <button class="nav-link nav-menu-links dropdown-toggle dropdown-btn white-font" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                About EABCS
            </button>
            <div class="dropdown-menu navbar-dropdown" aria-labelledby="navbarDropdown">
                <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#about/overview" id="aboutGBHS">Overview</a>
                <!---<a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#about/description" id="studydescBCRPP">Description of Studies</a>--->
                <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#about/contact" id="contactGBHS">Study Team Members</a>
                <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#about/questionGBHS" id="questionGBHS">Study Questionaire</a>
                <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#moop" title="Manual of Operations and Procedures (MOOP)" id="dataMOOP">
                  MOOP
                </a>
            </div>
        </div>
        <!--<div class="grid-elements dropdown">
            <button class="nav-link nav-menu-links dropdown-toggle dropdown-btn white-font" title="Confluence" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Events
            </button>
            <div class="dropdown-menu navbar-dropdown" aria-labelledby="navbarDropdown">
                <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links" href="#events/meetings" id="events">Meetings</a>
            </div>
        </div>-->
        <div class="grid-elements dropdown">
            <button class="nav-link nav-menu-links dropdown-toggle dropdown-btn white-font" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Explore Data
            </button>
            <div class="dropdown-menu navbar-dropdown" aria-labelledby="navbarDropdown">
                <!--h6 class="dropdown-header dropdown-header-bg font-bold">Explore Data</h6-->
                <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#data_exploration/dictionary" title="Data Dictionary" id="dataDictionary">
                  Dictionary
                </a>
                <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#forms/form" title="Forms" id="dataForms">
                  Forms
                </a>
                <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#data_exploration/summary" title="Summary Statistics" id="dataSummary">
                    Summary Statistics
                </a>
                <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#publicationpage" id="publicationID"> 
                    Publications
                </a>
                <!--<a class="dropdown-item nav-link nav-menu-links dropdown-menu-links" href="#data_submission" title="Data Submitted" id="dataSubmission"> 
                </a>-->
                <div id="governanceNav" class="grid-elements"></div>
                <div id="myProjectsNav" class="grid-elements"></div>
                </div>
            </div>
                <div class='grid-elements dropdown'>
                    <button class="nav-link nav-menu-links dropdown-toggle dropdown-btn white-font" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Data Access
                    </button>
                    <div class="dropdown-menu navbar-dropdown" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#data_access/overview" title="Data Access" id="dataRequest"> Overview </a>
                    <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#data_access/dbgap" id="dbgapStudy">dbGaP Study</a>
                    ${
                      showProjectConceptForm
                        ? `<a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#data_access/form" title="Data Form" id="dataForm"> Analysis Proposal Form </a>
                    `
                        : ""
                    }
                    ${
                      viewSubmissionsShow
                        ? `<a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#userSubmissions" title='View Your Submissions' id="userSubmissions">View Submissions</a>`
                        : ""
                    }
                    ${
                      isDataAdmin()
                        ? `<a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#data_access/admin" title="Admin Table" id="adminTable"> Admin Table </a>`
                        : ""
                    }
                    <!--a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#data_access/accepted" title="Accepted Studies" id="dataAccepted"> Accepted </a-->
                    ${
                      emailforChair.indexOf(
                        JSON.parse(localStorage.parms).login
                      ) !== -1
                        ? `<a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#data_access/chairView" title="Chair File View" id="chairView"> Chair Menu </a>`
                        : ``
                    }
                    ${
                      emailforDACC.indexOf(
                        JSON.parse(localStorage.parms).login
                      ) !== -1
                        ? `<a class="dropdown-item nav-link nav-menu-links dropdown-menu-links ps-4" href="#data_access/daccView" title="Steering Committee Menu" id="daccView"> Steering Committee Menu </a>`
                        : ``
                    }
                    </div>
                    </div>

                    <div class="navbar-nav ms-auto">            ${
              localStorage.parms && JSON.parse(localStorage.parms).name
                ? `
                <div class="grid-elements dropdown">
                    <button class="nav-link nav-menu-links dropdown-toggle dropdown-btn white-font"  title="Welcome, ${
                      JSON.parse(localStorage.parms).name
                    }!" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ${JSON.parse(localStorage.parms).name}
                    </button>
                    <div class="dropdown-menu navbar-dropdown" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item nav-link nav-menu-links dropdown-menu-links" href="#logout" id="logOutBtn">Log Out</a>
                    </div>
                </div>
            `
                : `
                <div class="grid-elements">
                    <a class="nav-link nav-menu-links" title="Log Out" href="#logout" id="logOutBtn">Log Out</a>
                </div>
            `
            }
            
        </div>
    `;
};
export function pageNavBar(page, activeTab, ...pageHeaders) {
  const containerEl = document.createElement("div");
  containerEl.classList.add("container");

  const outerDivEl = document.createElement("div");
  outerDivEl.classList.add("main-summary-row", "white-bg", "div-border");

  const navEl = document.createElement("ul");
  navEl.classList.add("nav", "nav-pills");

  outerDivEl.appendChild(navEl);
  containerEl.appendChild(outerDivEl);

  if (
    page === "data_access" &&
    isDataAdmin() &&
    !pageHeaders.includes("Admin Table")
  ) {
    pageHeaders.push("Admin Table");
  }

  for (const header of pageHeaders) {
    let li = document.createElement("li");
    li.classList.add("nav-item");
    
    let link = document.createElement("a");
    link.classList.add("nav-link");

    //Active Tab Function
    if (header === "Overview") {
      link.href = `#${page}/overview`;
      if (activeTab === "overview") link.classList.add("active");
    }
    
    // keeping this part for future use to get "Project Concept Form" and "View Submissions" back.
    if (header === "Submit Concept Form") {
      link.href = `#${page}/form`;
      if (activeTab === "form") link.classList.add("active");
    }
    if (header === "View Submissions") {
      link.href = `#userSubmissions`;
      if (activeTab === "User Submissions") link.classList.add("active");
    }
    if (header === "Chair Menu") {
      link.href = `#${page}/chairView`;
      if (activeTab === "chairView") link.classList.add("active");
    }
    if (header === "Accepted") {
      link.href = `#${page}/acceptedStudies`;
      if (activeTab === "acceptedStudies") link.classList.add("active");
    }

    if (header === "Steering Committee Menu") {
      link.href = `#${page}/daccView`;
      if (activeTab === "daccView") link.classList.add("active");
    }
    if (header === "Admin Table") {
      link.href = "#data_access/admin";
      if (activeTab === "admin") link.classList.add("active");
    }

    if (header === "Description of Studies") {
      link.href = `#${page}/description`;
      if (activeTab === "description") link.classList.add("active");
    }
    if (header === "Study Team Members") {
      link.href = `#${page}/contact`;
      if (activeTab === "contact") link.classList.add("active");
    }
    if (header === "Study Questionaire") {
      link.href = `#${page}/questionGBHS`;
      if (activeTab === "questionGBHS") link.classList.add("active");
    }
    if (header === "MOOP") {
      link.href = "#moop";
      if (activeTab === "moop") link.classList.add("active");
    }
    if (header === "dbGaP Study") {
      link.href = `#${page}/dbgap`;
      if (activeTab === "dbgap") link.classList.add("active");
    }
    if (header === "Summary Statistics") {
      link.href = `#${page}/summary`;
      if (activeTab === "summary") link.classList.add("active");
    }
    if (header === "Dictionary") {
      link.href = `#${page}/dictionary`;
      if (activeTab === "dictionary") link.classList.add("active");
    }
    if (header === "Forms") {
      link.href = `#${page}/form`;
      if (activeTab === "form") link.classList.add("active");
    }
    if (header === "Subset Statistics") {
      link.href = `#${page}/subset`;
      if (activeTab === "subset") link.classList.add("active");
    }
    if (header === "Publications") {
      link.href = `#publicationpage`;
      if (activeTab === "summary") link.classList.add("active");
    }
    if (header === "Anthropometry") {
      link.href = `#${page}/anthropometry`;
      if (activeTab === "anthropometry") link.classList.add("active");
    }
    if (header === "Saliva") {
      link.href = `#${page}/saliva`;
      if (activeTab === "saliva") link.classList.add("active");
    }
    if (header === "Stool") {
      link.href = `#${page}/stool`;
      if (activeTab === "stool") link.classList.add("active");
    }
    if (header === "Blood") {
      link.href = `#${page}/blood`;
      if (activeTab === "blood") link.classList.add("active");
    }
    if (header === "Breast Tissue Biopsy Collection") {
      link.href = `#${page}/breasttissuebiopsycollection`;
      if (activeTab === "breasttissuebiopsycollection") link.classList.add("active");
    }

    link.innerText = header;
    li.appendChild(link);
    navEl.appendChild(li);
  }
  if (page !== "data_exploration") {
    const overviewDiv = document.createElement("div");

    overviewDiv.id = "overview";
    containerEl.appendChild(overviewDiv);
  }

  return containerEl.innerHTML;
}
