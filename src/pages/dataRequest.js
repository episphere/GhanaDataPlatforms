import {
  createComment,
  createCompleteTask,
  showComments,
  updateMetadata,
  getMetadata,
  searchMetadata,
  createMetadata,
  getTaskList,
  updateTaskAssignment,
  uploadWordFile,
  getFolderItems,
  emailforChair,
  emailforDACC,
  uploadFormFolder,
  daccReviewFolder,
  daccReviewChairFolder,
  chairReviewFolder,
  //finalFolder,
  assignTask,
  createFileTask,
  getFileInfo,
  numberWithCommas,
  hideAnimation,
  getTask,
  consortiumSelection,
  moveFile,
  acceptedFolder,
  deniedFolder,
  createFolder,
  copyFile,
  submitterFolder,
  listComments,
  addNewCollaborator,
  getCollaboration,
  checkDataSubmissionPermissionLevel,
  deleteTask,
  showCommentsDropDown,
  getChairApprovalDate,
  uploadFile,
  filePreviewer,
  csv2Json3,
  getFile,
  summaryStatsFolderId
} from "../shared.js";
import { addEventToggleCollapsePanelBtn } from "./description.js";
import { showPreview } from "../components/boxPreview.js";
import { pageNavBar } from "../components/navBarMenuItems.js";
import { renderFilePreviewDropdown } from "../components/elements.js";
import {
  switchTabs,
  switchFiles,
  sortTableByColumn,
  filterCheckBox,
} from "../event.js";
import { template } from "./dataGovernance.js";

export const dataAccessNotSignedIn = () => {
  let template = `
      <div class="general-bg padding-bottom-1rem">
          <div class="container body-min-height">
              <div class="main-summary-row">
                  <div class="align-left">
                      <h1 class="page-header">Data Access</h1>
                  </div>
              </div>
              <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
                  <div class="row m-0">
                    <b>Guidelines for Scientific Review of Proposals</b>
                      All studies that are proposing to utilize data collected from the Etiology of Aggressive Breast Cancer Study must be reviewed and approved by the Etiology of Aggressive Breast Cancer Study Steering Committee (GBHSSC).  The proposal should not exceed five pages (including references and tables) and should contain the following information:
                  </div></br>
                  <div class="row m-0">
                      <ol>
                          <li style=" margin-bottom: 10px;">Study title</li>
                          <li style=" margin-bottom: 10px;">Names of key investigators for the study and their affiliations, and a description of the study team’s experience in the subject area for the proposed work</li>
                          <li style=" margin-bottom: 10px;">Background for the hypotheses to be evaluated in the proposed study, and how the data from this study will contribute to the literature</li>
                          <li style=" margin-bottom: 10px;">Overall goal and specific study aims</li>
                          <li style=" margin-bottom: 10px;">Data and biological specimens requested.  If biologic material is involved with the proposal, the type of biologic material (e.g., saliva, serum, tissue, etc.) and the amount (e.g., volume, weight, number) of each sample that is being requested</li>
                          <li style=" margin-botton: 10px;">Laboratory assays, collaborating laboratory(ies), and quality control measures</li>
                          <li style=" margin-botton: 10px;">Data analysis and study power considerations</li>
                          <li style=" margin-botton: 10px;">Budgetary considerations</li>
                          <li style=" margin-botton: 10px;">Timeline for completion of different components of this project (Gantt Chart)</li>
                      </ol>
                  </div>
                    Study proposals will be distributed to members of the GBHSSC with cc to other key personnel of the EABCS Team. The GBHSSC will review proposals 
                    as they are submitted and get back to the lead investigators within two weeks. No response after two weeks will be interpreted as having no objections 
                    to the proposal. Updates of proposals will be requested on a yearly basis.  There will need to be evidence of substantial progress over time.  Should 
                    there not be such evidence, the project (and/or associated data) will be considered appropriate for re-assignment to other investigators.
                </div>
            </div>
        </div>
      `;

  return template;
};
//All the "Project Concept Form" and //"View Submissions" that are commented out in this code can be used if we want to add them to the top bar in the data access page
export const dataAccess = (activeTab, showDescripton) => {
  let authChair =
    emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let authDacc =
    emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let navBarItems = "";

  if (authDacc && authChair) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Chair Menu",
      "Steering Committee Menu"
    );
  } else if (authChair) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Chair Menu"
    );
  } else if (authDacc) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Steering Committee Menu"
    );
  } else {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions"
    );
  }
  let template = `

        <div class="general-bg body-min-height padding-bottom-1rem">
            <div class="container">
              ${navBarItems}
            
        </div>
        `;

  template += `
      <div class="general-bg padding-bottom-1rem">
          <div class="container body-min-height">
              <div class="main-summary-row">
                  <div class="align-left">
                      <h1 class="page-header">Data Access</h1>
                  </div>
              </div>
              <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
                  <div class="row m-0">
                    <b>Guidelines for Scientific Review of Proposals</b>
                      All studies that are proposing to utilize data collected from the Etiology of Aggressive Breast Cancer Study must be reviewed and approved by the Etiology of Aggressive Breast Cancer Study Steering Committee (GBHSSC).  The proposal should not exceed five pages (including references and tables) and should contain the following information:
                  </div></br>
                  <div class="row m-0">
                      <ol>
                          <li style=" margin-bottom: 10px;">Study title</li>
                          <li style=" margin-bottom: 10px;">Names of key investigators for the study and their affiliations, and a description of the study team’s experience in the subject area for the proposed work</li>
                          <li style=" margin-bottom: 10px;">Background for the hypotheses to be evaluated in the proposed study, and how the data from this study will contribute to the literature</li>
                          <li style=" margin-bottom: 10px;">Overall goal and specific study aims</li>
                          <li style=" margin-bottom: 10px;">Data and biological specimens requested.  If biologic material is involved with the proposal, the type of biologic material (e.g., saliva, serum, tissue, etc.) and the amount (e.g., volume, weight, number) of each sample that is being requested</li>
                          <li style=" margin-botton: 10px;">Laboratory assays, collaborating laboratory(ies), and quality control measures</li>
                          <li style=" margin-botton: 10px;">Data analysis and study power considerations</li>
                          <li style=" margin-botton: 10px;">Budgetary considerations</li>
                          <li style=" margin-botton: 10px;">Timeline for completion of different components of this project (Gantt Chart)</li>
                      </ol>
                  </div>
                    Study proposals will be distributed to members of the GBHSSC with cc to other key personnel of the EABCS Team. The GBHSSC will review proposals as they are submitted and get back to the lead investigators within two weeks. No response after two weeks will be interpreted as having no objections to the proposal. Updates of proposals will be requested on a yearly basis.  There will need to be evidence of substantial progress over time.  Should there not be such evidence, the project (and/or associated data) will be considered appropriate for re-assignment to other investigators.
                </div>
            </div>
        </div> `;
  template += `</div>
              </div>
            </div>
            `;

  return template;
};

export const dbGaPStudy = (activeTab) => {
  let authChair =
    emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let authDacc =
    emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let navBarItems = "";

  if (authDacc && authChair) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Chair Menu",
      "Steering Committee Menu"
    );
  } else if (authChair) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Chair Menu"
    );
  } else if (authDacc) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Steering Committee Menu"
    );
  } else {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions"
    );
  }

  let template = `
      <div class="general-bg body-min-height padding-bottom-1rem">
          <div class="container">
            ${navBarItems}
      </div>
      <div class="general-bg padding-bottom-1rem">
          <div class="container body-min-height">
              <div class="main-summary-row">
                  <div class="align-left">
                      <h1 class="page-header">dbGaP Study</h1>
                  </div>
              </div>
              <div class="home-page-stats font-size-18">
                <div class="main-summary-row mb-4">
                  <div class="col">
                    <div class="card shadow-sm">
                      <div class="card-body p-4 text-center">
                        <h5 class="card-title font-bold mb-3">EABCS dbGaP Study Information</h5>
                        <p class="mb-4">Access the complete study information on the dbGaP (database of Genotypes and Phenotypes) website.</p>
                        <p class="mb-4"><strong>Study Accession:</strong> phs002387.v2.p1</p>
                        <a href="https://dbgap.ncbi.nlm.nih.gov/beta/study/phs002387.v2.p1/#study" target="_blank" rel="noopener" class="btn btn-primary btn-lg">
                          <i class="fas fa-external-link-alt me-2"></i>Visit dbGaP Study Page
                        </a>
                        <p class="mt-4 text-muted small">This link will open in a new tab</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
  `;
  return template;
};

export const formSectionOther = async (activeTab, showDescripton) => {
  let authChair =
    emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let authDacc =
    emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;

  let navBarItems = "";
  if (authDacc && authChair) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Chair Menu",
      "Steering Committee Menu"
    );
  } else if (authChair) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Chair Menu"
    );
  } else if (authDacc) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Steering Committee Menu"
    );
  } else {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions"
    );
  }

  let template = `
      <div class="general-bg body-min-height padding-bottom-1rem">
          <div class="container">
            ${navBarItems}
          
      </div>
      `;

  template += ` 
                  <div class="general-bg padding-bottom-1rem">
                          <div class="container body-min-height">

                              <div class="main-summary-row">
                                  <div class="align-left">
                                      <h1 class="page-header">Analysis Proposal Form</h1>
                                  </div>
                              </div>

                              <div class="main-summary-row confluence-resources white-bg div-border font-size-18">
                                <div class="col">
                                  <span>You currently do not have access to submit a data request form.</span></br>
                                  <span>For access, please contact <a href="mailto:NCIGBHS@mail.nih.gov ">EABCS</a></span>
                          </div>
                  </div>
                `;
  return template;
};

export const formSection = async (activeTab, showDescripton) => {
  let authChair =
    emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let authDacc =
    emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;

  let navBarItems = "";
  if (authDacc && authChair) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Chair Menu",
      "Steering Committee Menu"
    );
  } else if (authChair) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Chair Menu"
    );
  } else if (authDacc) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Steering Committee Menu"
    );
  } else {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions"
    );
  }
  let template = `
      <div class="general-bg body-min-height padding-bottom-1rem">
          <div class="container">
            ${navBarItems}
          
      </div>
      `;
  const date = new Date();
  const today =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);

  const dictionaryVars = localStorage.getItem("dictionaryVars");

  template += ` 
    <div class="general-bg padding-bottom-1rem">
      <div class="container body-min-height">
        <div class="main-summary-row">
            <div class="align-left">

                <h1 class="page-header">Analysis Proposal Form</h1>
                <button id='autofillJson' class='d-none'>AutoFill JSON</button>

            </div>
        </div>
        <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">             
          <section class="contact-form">
            <p>All studies that are proposing to utilize data collected from the Ghana Breast Health Study must be reviewed and approved by the Ghana Breast Health Study Steering Committee (GBHSSC).
            Please fill out and submit the below form for review.</p>
            <p>Study proposals will be distributed to members of the GBHSSC with cc to other key personnel of the GBHS Team. The GBHSSC will review proposals as they are submitted and get back to the lead investigators within two weeks. No response after two weeks will be interpreted as having no objections to the proposal. Updates of proposals will be requested on a yearly basis.  There will need to be evidence of substantial progress over time.  Should there not be such evidence, the project (and/or associated data) will be considered appropriate for re-assignment to other investigators.</p>
            <form>
            <!---<div class='col-3 mb-3 input-group'>
              <input type='file' class='' id='uploadJSON' />
            </div>--->
              <div class="input-group">
                <label for="date"><b>Date</b><span class='required-label'>*</span></label>
                <input id="date" name="date" type="date" value='${today}' class="form-text-input" required/>
              </div>

              <div class="input-group">
                <label for="projname"><b>Study Title</b><span class='required-label'>*</span></label>
                <input id="projname" name="projname" type="text" class="form-text-input" required/>
              </div>

              <div class="input-group">
                <label for="investigators"><b>Key Investigator(s) Names and Institutions</b> <span class='required-label'>*</span></label>
                <textarea id="investigators" name="investigators" rows="2" cols="65" class="form-text-input" required/></textarea>
              </div>

              <div class="input-group">
                <label for="expdesc"><b>Description of study team's experience in subject area of proposed work</b> <span class='required-label'>*</span></label>
                <textarea id="expdesc" name="expdesc" rows="2" cols="65" class="form-text-input" required/></textarea>
              </div>

              <div class="input-group">
                <label for="background"><b>Background for the hypotheses to be evaluated in the proposed study</b><span class='required-label'>*</span></label>
                <textarea id="background" name="background" rows="4" cols="65" class="form-text-input" required></textarea>
              </div>

               <div class="input-group">
                <label for="background2"><b>How will the data from this study contribute to the literature?</b><span class='required-label'>*</span></label>
                <textarea id="background2" name="background2" rows="4" cols="65" class="form-text-input" required></textarea>
              </div>

              <div class="input-group">
                <label for="aims"><b>Overall goal and specific aims</b><i> Please provide a concise description of Aims</i><span class='required-label'>*</span></label>
                <textarea id="aims" name="aims" rows="4" cols="65" class="form-text-input" required> </textarea>
              </div>

              <div class="input-group">
                <label for="questionData"><b>Questionaire data and variables requested</b><span class='required-label'>*</span></label>
                <textarea id="questionData" name="questionData" rows="4" cols="65" class="form-text-input" required> </textarea>
              </div>

              <div class="input-group">
                <label for="moleassayData"><b>Existing molecular assay data</b> <i>(e.g. GWAS, IHC from tumor tissue, etc. and manuscript reference)</i><span class='required-label'>*</span></label>
                <textarea id="moleassayData" name="moleassayData" rows="4" cols="65" class="form-text-input" required> </textarea>
              </div>
    
              <div class="input-group">
                <div style="display: flex; align-items: center;">
                  <label for="basevar" style="margin-right: 20px;"><b>Is Biological material involved with the proposal?</b><span class='required-label'>*</span></label>
                  <div style="display: flex; align-items: center;">
                    <input id="basevarYes" name="basevar" type="radio" value="Yes" required/>
                    <label for="basevarYes" style="margin-right: 15px;">Yes</label>
                    <input id="basevarNo" name="basevar" type="radio" value="No" required/>
                    <label for="basevarNo">No</label>
                  </div>
                </div>
              </div>
              
              <div class="input-group" id="basevarlistContainer" style="display: none; margin-left: 30px;">
                <div>
                  <div class="inline-field" style="margin-bottom: 10px; display: flex; align-items: baseline;">
                    <input id="saliva" name="basevarOptions" type="checkbox" value="Saliva" style="margin-right: 5px;"/>
                    <label class="container-ul" for="saliva">Saliva</label>
                    <input id="salivaAmount" name="salivaAmount" type="text" placeholder="Amount (e.g., volume, weight, number)" class="form-text-input" style="margin-left: 10px; display: none; width: 100%; max-width: 400px;"/>
                  </div>
                  <div class="inline-field" style="margin-bottom: 10px; display: flex; align-items: baseline;">
                    <input id="serum" name="basevarOptions" type="checkbox" value="Serum" style="margin-right: 5px;"/>
                    <label class="container-ul" for="serum">Serum</label>
                    <input id="serumAmount" name="serumAmount" type="text" placeholder="Amount (e.g., volume, weight, number)" class="form-text-input" style="margin-left: 10px; display: none; width: 100%; max-width: 400px;"/>
                  </div>
                  <div class="inline-field" style="margin-bottom: 10px; display: flex; align-items: baseline;">
                    <input id="tissue" name="basevarOptions" type="checkbox" value="Tissue" style="margin-right: 5px;"/>
                    <label class="container-ul" for="tissue">Tumor Tissue</label>
                    <input id="tissueAmount" name="tissueAmount" type="text" placeholder="Amount (e.g., volume, weight, number)" class="form-text-input" style="margin-left: 10px; display: none; width: 100%; max-width: 400px;"/>
                  </div>
                  <div class="inline-field" style="margin-bottom: 10px; display: flex; align-items: baseline;">
                    <input id="plasma" name="basevarOptions" type="checkbox" value="Plasma" style="margin-right: 5px;"/>
                    <label class="container-ul" for="plasma">Plasma</label>
                    <input id="plasmaAmount" name="plasmaAmount" type="text" placeholder="Amount (e.g., volume, weight, number)" class="form-text-input" style="margin-left: 10px; display: none; width: 100%; max-width: 400px;"/>
                  </div>
                  <div class="inline-field" style="margin-bottom: 10px; display: flex; align-items: baseline;">
                    <input id="bloodclot" name="basevarOptions" type="checkbox" value="Blood Clot" style="margin-right: 5px;"/>
                    <label class="container-ul" for="bloodclot">Blood Clot</label>
                    <input id="bloodclotAmount" name="bloodclotAmount" type="text" placeholder="Amount (e.g., volume, weight, number)" class="form-text-input" style="margin-left: 10px; display: none; width: 100%; max-width: 400px;"/>
                  </div>
                  <div class="inline-field" style="margin-bottom: 10px; display: flex; align-items: baseline;">
                    <input id="redbloodcell" name="basevarOptions" type="checkbox" value="Red Blood Cell" style="margin-right: 5px;"/>
                    <label class="container-ul" for="redbloodcell">Red Blood Cell</label>
                    <input id="redbloodcellAmount" name="redbloodcellAmount" type="text" placeholder="Amount (e.g., volume, weight, number)" class="form-text-input" style="margin-left: 10px; display: none; width: 100%; max-width: 400px;"/>
                  </div>
                  <div class="inline-field" style="margin-bottom: 10px; display: flex; align-items: baseline;">
                    <input id="buffycoat" name="basevarOptions" type="checkbox" value="Buffy Coat" style="margin-right: 5px;"/>
                    <label class="container-ul" for="buffycoat">Buffy Coat</label>
                    <input id="buffycoatAmount" name="buffycoatAmount" type="text" placeholder="Amount (e.g., volume, weight, number)" class="form-text-input" style="margin-left: 10px; display: none; width: 100%; max-width: 400px;"/>
                  </div>
                  <div class="inline-field" style="margin-bottom: 10px; display: flex; align-items: baseline;">
                    <input id="fecalmicrobiome" name="basevarOptions" type="checkbox" value="Fecal Microbiome" style="margin-right: 5px;"/>
                    <label class="container-ul" for="fecalmicrobiome">Fecal Microbiome</label>
                    <input id="fecalmicrobiomeAmount" name="fecalmicrobiomeAmount" type="text" placeholder="Amount (e.g., volume, weight, number)" class="form-text-input" style="margin-left: 10px; display: none; width: 100%; max-width: 400px;"/>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <label for="labassays"><b>Lab assays, collaborating laboratory(ies), and quality control measures</b> <span class='required-label'>*</span></label>
                <textarea id="labassays" name="labassays" rows="2" cols="65" class="form-text-input" required/></textarea>
              </div>

              <div class="input-group">
                <label for="analyplan"><b>Data analysis and study power considerations</b> <span class='required-label'>*</span></label>
                <textarea id="analyplan" name="analyplan" rows="2" cols="65" class="form-text-input" required/></textarea>
              </div>

              <div class="input-group">
                <label for="budget"><b>Budgetary considerations</b> <span class='required-label'>*</span></label>
                <textarea id="budget" name="budget" rows="2" cols="65" class="form-text-input" required/></textarea>
              </div>

                <div class="input-group">
                  <label for="timeline"><b>Timeline for completion of different components of this project</b></label>
                  <textarea id="timeline" name="timeline" rows="4" cols="65" class="form-text-input" required></textarea>
                </div>

                <br>
                <div style="display: flex; gap: 10px;">
                  <button type="button" id="downloadForm" class="buttonsubmit" title="Download the form with your current responses to a word document."> 
                    <span class="buttonsubmit__text">Download Form with Inputs</span>
                  </button>
                  <button type="submit" id="submitFormButton" class="buttonsubmit"title="Download and submit the form for review.> 
                    <span class="buttonsubmit__text"> Send Form </span>
                  </button>
               </div>
              </form>

            </section>
            <div id='popUpModal' class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body" id='modalBody'>
                  
                </div>
                <div class="modal-footer">
              
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
            <!--<div class="results">
            <h2>Form Data</h2>
            <pre></pre>
            </div>-->
          </div>
        </div>
      </div>`;

  return template;
};

export const approveRejectSection = () => {
  let template = `
                            <div class="general-bg padding-bottom-1rem">
                              <div class="container body-min-height">
                                  <div class="main-summary-row">
                                      <div class="align-left">
                                          <h1 class="page-header">Data Approval</h1>
                                      </div>
                                  </div>
                                  <div class="div-border font-size-18" style="padding-left: 1rem;">
                                      <div class="row m-0 align-center data-approval">
                                          <iframe
                                              class="row m-0 align-center"
                                              src="https://nih.app.box.com/embed/s/myksohhrdv6klrzk3b0237yz3m502siw?sortColumn=date&view=list"
                                              width="700"
                                              height="800"
                                              frameborder="0"
                                              allowfullscreen
                                              webkitallowfullscreen
                                              msallowfullscreen
                                          ></iframe>
                                          <form>
                                              <label for="message">Enter a Message</label>
                                              <div class="input-group">
                                                  <textarea id="message" name="message" rows="6" cols="65"></textarea>
                                              </div>
                                              <button type="submit" value="approved" class="btn-primary">Approve</button>
                                              <button type="submit" value="rejected" class="btn-primary">Reject</button>
                                          </form>
                                      </div>
                                  </div>
                              </div>
                          </div>`;

  return template;
};

export const importDictVars = () => {
  const mmdArr = Array.from(document.getElementsByName("mmdvarv"));
  const baseArr = Array.from(document.getElementsByName("basevar"));
  const ibcArr = Array.from(document.getElementsByName("ibcvar"));

  const vars = [...mmdArr, ...baseArr, ...ibcArr];

  const dictionaryVars = localStorage
    .getItem("dictionaryVars")
    .split(",")
    .map((v) => v.toLowerCase());

  vars.forEach((v) => {
    if (dictionaryVars.includes(v.value.toLowerCase())) v.checked = true;
  });
};

export const amendFormSelect = async () => {
  const yesEl = document.getElementById("amendmentyes");
  const amendmentEl = document.getElementById("amendmentSelect");

  amendmentEl.parentElement.classList.toggle("d-none", !yesEl.checked);
};

export const populateAmendSelect = async () => {
  const items = await getFolderItems("162222418449");
  const folders = items.entries;
  let options = [];
  for (const folder of folders) {
    if (folder.name === JSON.parse(localStorage.parms).login) {
      const userFolder = await getFolderItems(folder.id);
      const userFiles = userFolder.entries;
      options = [...userFiles];
    }
  }
  const amendmentEl = document.getElementById("amendmentSelect");
  options.forEach((option) => {
    const optionEl = document.createElement("option");
    optionEl.text = option.name;
    amendmentEl.appendChild(optionEl);
  });
};

export const acceptedStudiesSection = (activeTab) => {
  let authChair =
    emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let authDacc =
    emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let navBarItems = "";
  if (authDacc && authChair) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      //"Submit Concept Form",
      //"View Submissions",
      "Chair Menu",
      "Steering Committee Menu"
    );
  } else if (authChair) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      //"Submit Concept Form",
      //"View Submissions",
      "Chair Menu"
    );
  } else if (authDacc) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      //"Submit Concept Form",
      //"View Submissions",
      "Steering Committee Menu"
    );
  } else {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      //"Submit Concept Form",
      //"View Submissions"
    );
  }
  let template = `
      <div class="general-bg body-min-height padding-bottom-1rem">
          <div class="container">
            ${navBarItems}
          
      </div>
      `;
  template += `
    <div id="acceptedStudiesView" class="align-left"></div>
  </div>
  `;
  return template;
};
export const acceptedStudiesView = async () => {
  let template = `
    <div class="main-summary-row">
            <div class="row align-left w-100 m-0">
                <h1 class="col page-header pl-0 pt-2">Learn about EABCS</h1>
                <div class="ms-auto allow-overflow me-2" style="margin:1rem 0" id="pagesContainer"></div>
                <div class="ms-auto mt-3 mb-3 me-2" id="pageSizeContainer"></div>
                <div class="ms-auto mt-3 mb-3" id="downloadContainer">
                    <div class="col-md-12 p-0 dropdown">
                        <div class="grid-elements ">
                            <button title="Download" class="transparent-btn form-control dropdown-toggle dropdown-btn" data-toggle="dropdown" id="downloadDictionary" style="color:#000000 !important">
                                Download <i class="fas fa-download" style="color:#000000 !important"></i>
                            </button>
                            <div class="dropdown-menu navbar-dropdown" aria-labelledby="downloadDictionary">
                                <button class="transparent-btn dropdown-item dropdown-menu-links" title="Download dictionary as csv" id="downloadDictionaryCSV">CSV</button>
                                <button class="transparent-btn dropdown-item dropdown-menu-links" title="Download dictionary as tsv" id="downloadDictionaryTSV">TSV</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-summary-row">
            <div class="col-xl-2 filter-column div-border white-bg align-left p-2" id="summaryFilterSiderBar">
                <div class="main-summary-row">
                    <div class="col-xl-12 pl-1 pr-0">
                        <span class="font-size-17 font-bold">Filter</span>
                        <div id="filterDataCatalogue" class="align-left"></div>
                    </div>
                </div>
            </div>
            <div class="col-xl-10 padding-right-zero font-size-16" id="summaryStatsCharts">
                <button id="filterBarToggle"><i class="fas fa-lg fa-caret-left"></i></button>
                <div class="main-summary-row pl-2" style="min-height: 10px;margin-bottom: 1rem;">
                    <div class="col white-bg div-border align-left font-size-17" style="padding: 0.5rem;" id="listFilters">
                        <span class="font-bold">Region:</span> All
                    </div>
                </div>
                <div class="main-summary-row pl-2">
                    <div class="col-xl-12 pb-2 pl-0 pr-0 white-bg div-border">
                        <div class="pt-0 pl-2 pb-2 pr-2 allow-overflow" style="height: calc(100vh - 190px) !important;min-height: 500px;" id="descriptionBody"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-summary-row">
            <div class="offset-xl-2 col data-last-modified align-left mt-3 mb-0 pl-4" id="dataLastModified">
              Data current as of - LAST MODIFIED DATE
            </div>
        </div>`;

  document.getElementById("acceptedStudiesView").innerHTML = template;
};

export const chairSection = (activeTab) => {
  let authChair =
    emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let authDacc =
    emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let navBarItems = "";
  if (authDacc && authChair) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Chair Menu",
      "Steering Committee Menu"
    );
  } else if (authChair) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Chair Menu"
    );
  } else if (authDacc) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Steering Committee Menu"
    );
  } else {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      //"Submit Concept Form",
      //"View Submissions"
    );
  }
  let template = `
      <div class="general-bg body-min-height padding-bottom-1rem">
          <div class="container">
            ${navBarItems}
          
      </div>
      `;
  template += `
    <div id="chairFileView" class="align-left"></div>
  </div>
  `;

  return template;
};

export const chairFileView = async () => {
  const responseUpload = await getFolderItems(uploadFormFolder);
  let filearrayUpload = responseUpload.entries;

  const responseDACC = await getFolderItems(daccReviewFolder);
  let filearrayDACC = responseDACC.entries;

  const responseDACCChairReview = await getFolderItems(daccReviewChairFolder);
  let filearrayDACCChairReview = responseDACCChairReview.entries;

  const responseChair = await getFolderItems(chairReviewFolder);
  let filearrayChair = responseChair.entries;

  const responseAccepted = await getFolderItems(acceptedFolder);
  let filearrayAccepted = responseAccepted.entries;

  const responseDenied = await getFolderItems(deniedFolder);
  let filearrayDenied = responseDenied.entries;

  var template = `
    <div class="general-bg padding-bottom-1rem">
      <div class="container body-min-height">
        <div class="main-summary-row">
            <div class="col">
                <h1 class="page-header">Chair Access Only</h1>
            </div>
             <div class="col-auto d-flex align-items-center">
                <button type="submit" id="submitID" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
                  <span class="buttonsubmit__text"> Update Users </span>
                </button>
            </div>
        </div>

  
    <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
    <ul class='nav nav-tabs mb-3' role='tablist'>
      <li class='nav-item' role='presentation'>
        <a class='nav-link active' id='toBeCompletedTab' href='#toBeCompleted' data-mdb-toggle="tab" role='tab' aria-controls='toBeCompleted' aria-selected='true'> New Concepts </a>
      </li>
      <li class='nav-item' role='presentation'>
         <a class='nav-link' id='inProgressTab' href='#inProgress' data-mdb-toggle="tab" role='tab' aria-controls='inProgress' aria-selected='true'> Under Review </a>
      </li>
      <li class='nav-item' role='presentation'>
         <a class='nav-link' id='daccCompletedTab' href='#daccCompleted' data-mdb-toggle="tab" role='tab' aria-controls='daccCompleted' aria-selected='true'> Review Completed </a>
      </li>
      <li class='nav-item' role='presentation'>
         <a class='nav-link' id='decidedTab' href='#decided' data-mdb-toggle="tab" role='tab' aria-controls='decided' aria-selected='true'> Steering Committee Decision </a>
      </li>
      <!--li class='nav-item' role='presentation'>
         <a class='nav-link' id='deniedTab' href='#denied' data-mdb-toggle="tab" role='tab' aria-controls='denied' aria-selected='true'> Denied </a>
      </li-->
    </ul>`;

  const filesincomplete = [];
  const filesinprogress = [];
  const filescompleted = [];
  const filesdecided = [];

  for (let obj of filearrayUpload) {
    filesincomplete.push(obj);
  }

  for (let obj of filearrayDACC) {
    filesinprogress.push(obj);
  }

  for (let obj of filearrayDACCChairReview) {
    filesinprogress.push(obj);
  }

  for (let obj of filearrayChair) {
    filescompleted.push(obj);
  }

  for (let obj of filearrayAccepted) {
    filesdecided.push(obj);
  }

  for (let obj of filearrayDenied) {
    filesdecided.push(obj);
  }

  template += "<div class='tab-content' id='selectedTab'>";

  template += `<div class='tab-pane fade show active' 
                  id='toBeCompleted' role='tabpanel' 
                  aria-labeledby='toBeCompletedTab'> `;
  template += renderFilePreviewDropdown(filesincomplete, "toBeCompleted");

  template += `<div class='tab-pane fade'
                 id='inProgress' role='tabpanel'
                 aria-labeledby='inProgressTab' style="vertical-align:top">
                 <a href="mailto:${emailforDACC.join(
                   "; "
                 )}" id='email' class='btn btn-dark'>Send Email to Steering Committee</a>`;
  template += renderFilePreviewDropdown(filesinprogress, "inProgress");

  template += `<div class='tab-pane fade'
                id='daccCompleted' role='tabpanel'
                aria-labelledby='daccCompletedTab'>
               <a href="mailto:${emailforDACC.join(
                 "; "
               )}" id='email' class='btn btn-dark'>Send Email to DACC</a>`;
  template += renderFilePreviewDropdown(filescompleted, "daccCompleted");

  template += `<div class='tab-pane fade' 
                id='decided' role='tabpanel'
                aria-labelledby='decidedTab'>
                
                </div>`;

  template += `<div id='filePreview'>`;
  if (
    filescompleted.length !== 0 ||
    filesinprogress.length !== 0 ||
    filesincomplete.length !== 0 ||
    filesdecided.length !== 0
  ) {
    template += `
        <div class='row'>
          <div id='boxFilePreview' class="col-8 preview-container"></div>
          <div id='fileComments' class='col-4 mt-2'></div>
        </div>

        <div class='row card-body dacc-submit' id='sendtodaccButton' class="col-8" style="background-color:#f6f6f6; display:block">
            <form>
              <label for"message">Send to DACC</label>
              <div class="input-group">
                <textarea id="message" name="message" rows="6" cols="50"></textarea>
              </div>
              <button type="submit" value="test" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
                <span class="buttonsubmit__text"> Send </span> </button>
            </form>
        </div>

        <div class='row card-body dacc-override' id='daccOverride' class="col-6" style='display:none'>
          <form>
              <button type="submit" value="test" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
                <span class="buttonsubmit__text"> Move To Review Complete </span> 
              </button>
          </form>
        </div>

        <div id='finalChairDecision' class="card-body approvedeny" style="background-color:#f6f6f6; display:none">
          <form>
            <label for="message">Enter Message for submitter or the Steering Committee</label>
            <div class='text-muted small'>Submitter will only see the below comment after approve or deny. </div>
            <label for="grade">Select recommendation: </label>
          <select name="grade" id="grade2"></option>
            <option value = "1"> 1 - Approved as submitted</option>
            <option value = "2"> 2 - Approved, pending conditions/clarification of some issues </option>
            <option value = "3"> 3 - Approved, but data release will be delayed </option>
            <option value = "4"> 4 - Not approved </option>
            <option value = "5"> 5 - Decision pending clarification of several issues</option>
           <!--- <option value = "777"> 777 - Duplicate Proposal</option>-->
            </select>
          <br>
            <div class="input-group">
                <textarea id="message" name="message" rows="6" cols="65"></textarea>
            </div>
            <button type="submit" class="buttonsubmit" value="approved" onclick="this.classList.toggle('buttonsubmit--loading')">
              <span class="buttonsubmit__text"> Approve </span></button>
            <button type="submit" class="buttonsubmit" value="rejected" onclick="this.classList.toggle('buttonsubmit--loading')">
              <span class="buttonsubmit__text"> Deny </span></button>
            <button type="submit" class="buttonsubmit" value="daccReview" onclick="this.classList.toggle('buttonsubmit--loading')">
              <span class="buttonsubmit__text"> Return to Steering Committee </span></button>  
          </form>
        </div>
        `;
  }
  template += `
      </div>
    </div>
    `;
  //};

  document.getElementById("chairFileView").innerHTML = template;
  viewFinalDecisionFilesTemplate(filesdecided);
  submitToDacc();
  daccOverride();
  commentApproveReject();
  if (filesincomplete.length != 0) {
    switchFiles("toBeCompleted");
    showPreview(filesincomplete[0].id);
    document.getElementById(
      "toBeCompletedselectedDoc"
    ).children[0].selected = true;
    document.getElementById("boxFilePreview").classList.remove("col-8");
    document.getElementById("fileComments").style.display = "none";
  } else {
    document.getElementById("filePreview").classList.remove("d-block");
    document.getElementById("filePreview").classList.add("d-none");
  }

  //Switch Tabs
  switchTabs(
    "toBeCompleted",
    ["inProgress", "daccCompleted", "decided"],
    filesincomplete
  );
  switchTabs(
    "inProgress",
    ["toBeCompleted", "daccCompleted", "decided"],
    filesinprogress
  );
  switchTabs(
    "daccCompleted",
    ["inProgress", "toBeCompleted", "decided"],
    filescompleted
  );
  switchTabs(
    "decided",
    ["inProgress", "daccCompleted", "toBeCompleted"],
    filesdecided
  );

  if (localStorage.getItem("currentTab")) {
    const currTab = localStorage.getItem("currentTab");
    if (document.getElementById(currTab) != null) {
      document.getElementById(currTab).click();
    }
  }

  hideAnimation();
};

export const submitToDacc = () => {
  let submitDacc = async (e) => {
    const btn = document.activeElement;
    btn.disabled = true;
    e.preventDefault();
    let message = e.target[0].value;
    //Send multiple files
    const filesToSend = [];
    const elements = document.querySelectorAll(
      ".tab-content .active #toBeCompletedselectedDoc option"
    );
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].selected) {
        filesToSend.push(elements[i].value);
      }
    }
    for (const fileId of filesToSend) {
      await createCompleteTask(fileId, message);
      let tasklist = await getTaskList(fileId);
      let tasktodacc = tasklist.entries[0].id;
      for (
        let i = 0, daccemaillength = emailforDACC.length;
        i < daccemaillength;
        i++
      ) {
        await assignTask(tasktodacc, emailforDACC[i]);
      }
      await createComment(fileId, message);
      await moveFile(fileId, daccReviewFolder);
    }

    document.location.reload(true);
  };
  const sdform = document.querySelector(".dacc-submit");
  if (sdform) {
    sdform.addEventListener("submit", submitDacc);
  }
};
export const daccOverride = () => {
  let override = async (e) => {
    e.preventDefault();
    const btn = document.activeElement;
    btn.disabled = true;

    const filesToSend = [];
    const elements = document.querySelectorAll(
      ".tab-content .active #inProgressselectedDoc option"
    );
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].selected) {
        filesToSend.push(elements[i].value);
      }
    }
    for (const fileId of filesToSend) {
      let tasklist = await getTaskList(fileId);
      let entries = tasklist.entries;

      if (entries.length !== 0) {
        for (let item of entries) {
          if (item.is_completed == false && item.action == "complete") {
            deleteTask(item.id);
          }
        }
        await moveFile(fileId, chairReviewFolder);
        await createFileTask(fileId);
        tasklist = await getTaskList(fileId);
        entries = tasklist.entries;
        for (let item of entries) {
          if (item.is_completed == false) {
            await assignTask(item.id, emailforChair[0]);
          }
        }
      }
    }
    document.location.reload(true);
  };
  const overrideform = document.querySelector(".dacc-override");
  if (overrideform) {
    overrideform.addEventListener("submit", override);
  }
};

export const commentApproveReject = () => {
  let approveComment = async (e) => {
    e.preventDefault();
    const btn = document.activeElement;
    btn.disabled = true;
    // let taskId = btn.name;
    let fileId = document.querySelector(
      ".tab-content .active #daccCompletedselectedDoc"
    ).value; //document.getElementById('selectedDoc').value;
    // Send multiple files
    const filesToSend = [];
    const elements = document.querySelectorAll(
      ".tab-content .active #daccCompletedselectedDoc option"
    );
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].selected) {
        filesToSend.push(elements[i].value);
      }
    }
    for (const fileId of filesToSend) {
      let tasklist = await getTaskList(fileId);
      let entries = tasklist.entries;
      if (entries.length !== 0) {
        for (let item of entries) {
          if (item.is_completed == false && item.action == "review") {
            for (let taskassignment of item.task_assignment_collection
              .entries) {
              if (
                taskassignment.assigned_to.login ==
                JSON.parse(localStorage.parms).login
              ) {
                var taskId = taskassignment.id;
              }
            }
          }
        }
      }
      let decision = e.submitter.value;
      let grade = e.target[0].value;
      let comment = e.target[1].value;

      let message = "Rating: " + grade + "\nComment: " + comment;
      if (decision !== "daccReview") {
        await updateTaskAssignment(taskId, decision, message);
      }
      await createComment(fileId, message);
      let fileInfo = await getFileInfo(fileId);
      let uploaderName = fileInfo.created_by.login;
      if (decision == "approved") {
        await moveFile(fileId, acceptedFolder);
      } else if (decision == "rejected") {
        await moveFile(fileId, deniedFolder);
      } else if (decision == "daccReview") {
        // Delete review task assigned to chair
        let tasklist = await getTaskList(fileId);
        const taskEntries = tasklist.entries;
        if (taskEntries.length !== 0) {
          for (let entry of entries) {
            if (entry.action === "review") {
              if (entry.is_completed == false) {
                await deleteTask(entry.id);
              }
            }
          }
        }

        //Create complete tasks for DACC
        await createCompleteTask(fileId, message);
        tasklist = await getTaskList(fileId);
        let tasktodacc;
        for (const entry of tasklist.entries) {
          if (entry.is_completed == false) {
            if (entry.action === "complete") {
              tasktodacc = entry.id;
            }
          }
        }
        for (
          let i = 0, daccemaillength = emailforDACC.length;
          i < daccemaillength;
          i++
        ) {
          await assignTask(tasktodacc, emailforDACC[i]);
        }

        //Move file to DACC Review (Resubmit) folder
        await moveFile(fileId, daccReviewChairFolder);
      }

      if (decision != "daccReview") {
        let folderItems = await getFolderItems(submitterFolder);
        let folderEntries = folderItems.entries;
        let folderID = "none";
        for (let obj of folderEntries) {
          if (obj.name == uploaderName) {
            folderID = obj.id;
          }
        }
        let cpFileId = "";
        if (folderID == "none") {
          const newFolder = await createFolder(submitterFolder, uploaderName);
          await addNewCollaborator(
            newFolder.id,
            "folder",
            uploaderName,
            "viewer"
          );
          const cpFile = await copyFile(fileId, newFolder.id);
          cpFileId = cpFile.id;
        } else {
          const cpFile = await copyFile(fileId, folderID);
          cpFileId = cpFile.id;
        }
        await createComment(cpFileId, "This file was " + decision);
        await createComment(cpFileId, message);
      }
    }
    document.location.reload(true);
  };

  const form = document.querySelector(".approvedeny");
  if (form) {
    form.addEventListener("submit", approveComment);
  }
};

const viewFile = () => {
  var preview = new Box.Preview();
  preview.show(id, JSON.parse(localStorage.parms).access_token, {
    container: ".preview-container",
    showDownload: true,
  });
};

const addEventPreviewFile = () => {
  const btns = Array.from(document.querySelectorAll(".preview-file"));
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const header = document.getElementById("confluencePreviewerModalHeader");
      const body = document.getElementById("confluencePreviewerModalBody");
      header.innerHTML = `<h5 class="modal-title">File preview</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>`;
      const fileId = btn.dataset.fileId;
      filePreviewer(fileId, "#confluencePreviewerModalBody");
    });
  });
};

export const daccSection = (activeTab) => {
  let authChair =
    emailforChair.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let authDacc =
    emailforDACC.indexOf(JSON.parse(localStorage.parms).login) !== -1;
  let navBarItems = "";
  if (authDacc && authChair) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Chair Menu",
      "Steering Committee Menu"
    );
  } else if (authChair) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Chair Menu"
    );
  } else if (authDacc) {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      "Submit Concept Form",
      //"View Submissions",
      "Steering Committee Menu"
    );
  } else {
    navBarItems = pageNavBar(
      "data_access",
      activeTab,
      "Overview",
      "dbGaP Study",
      //"Submit Concept Form",
      //"View Submissions"
    );
  }
  let template = `
              <div class="general-bg body-min-height padding-bottom-1rem">
                  <div class="container">
                    ${navBarItems}
                  
              </div>
              `;
  template += `
              <div id="daccFileView" class="align-left"></div>
              </div>
              `;

  return template;
};

export const daccFileView = async () => {
  const responseDACC = await getFolderItems(daccReviewFolder);
  let filearrayDACC = responseDACC.entries;
  const responseDACCChairReview = await getFolderItems(daccReviewChairFolder);
  let filearrayDACCChairReview = responseDACCChairReview.entries;

  const responseChair = await getFolderItems(chairReviewFolder);
  let filearrayChair = responseChair.entries;
  const responseAccepted = await getFolderItems(acceptedFolder);
  let filearrayAccepted = responseAccepted.entries;
  const responseDenied = await getFolderItems(deniedFolder);
  let filearrayDenied = responseDenied.entries;
  let template = `
            <div class="general-bg padding-bottom-1rem">
            <div class="container body-min-height">
            <div class="main-summary-row">
                <div class="align-left">
                    <h1 class="page-header">Steering Committee Access Only</h1>
                </div>
            </div>
            <div class="data-submission div-border font-size-18" style="padding-left: 1rem; padding-right: 1rem;">
            <ul class='nav nav-tabs mb-3' role='tablist'>
            <li class='nav-item' role='presentation'>
              <a class='nav-link active' id='dacctoBeCompletedTab' href='#dacctoBeCompleted' data-mdb-toggle="tab" role='tab' aria-controls='dacctoBeCompleted' aria-selected='true'> Review </a>
            </li>
            <li class='nav-item' role='presentation'>
              <a class='nav-link' id='daccReviewTab' href='#daccReview' data-mdb-toggle="tab" role='tab' aria-controls='daccReview' aria-selected='true'> Re-Review </a>
            </li>
            <li class='nav-item' role='presentation'>
              <a class='nav-link' id='decidedTab' href='#decided' data-mdb-toggle="tab" role='tab' aria-controls='decided' aria-selected='true'> Steering Committee Decision </a>
            </li>
            <!--li class='nav-item' role='presentation'>
                <a class='nav-link' id='completedTab' href='#completed' data-mdb-toggle="tab" role='tab' aria-controls='completed' aria-selected='true'>Completed</a>
            </li-->


            </ul>`;
  const filesincomplete = [];
  const filesreviewed = [];
  let filescompleted = [];
  for (let obj of filearrayDACC) {
    let id = obj.id;
    let tasks = await getTaskList(id);

    if (tasks.entries.length != 0) {
      for (let items of tasks.entries) {
        if (items.is_completed == false && items.action == "complete") {
          for (let itemtasks of items.task_assignment_collection.entries) {
            if (
              itemtasks.status == "incomplete" &&
              itemtasks.assigned_to.login ==
                JSON.parse(localStorage.parms).login
            ) {
              filesincomplete.push(obj);
            } else if (
              itemtasks.status == "complete" &&
              itemtasks.assigned_to.login ==
                JSON.parse(localStorage.parms).login
            ) {
              filescompleted.push(obj);
            }
          }
        } else if (items.is_completed == true && items.action == "complete") {
          for (let itemtasks of items.task_assignment_collection.entries) {
            if (
              itemtasks.assigned_to.login ==
              JSON.parse(localStorage.parms).login
            ) {
              if (!filescompleted.includes(obj)) {
                filescompleted.push(obj);
              }
            }
          }
        }
      }
    }
  }

  for (let obj of filearrayChair) {
    let id = obj.id;
    let tasks = await getTaskList(id);

    if (tasks.entries.length != 0) {
      for (let items of tasks.entries) {
        for (let itemtasks of items.task_assignment_collection.entries) {
          if (
            itemtasks.assigned_to.login == JSON.parse(localStorage.parms).login
          ) {
            if (!filescompleted.includes(obj)) {
              filescompleted.push(obj);
            }
          }
        }
      }
    }
  }

  for (let obj of filearrayAccepted) {
    let id = obj.id;
    let tasks = await getTaskList(id);

    if (tasks.entries.length != 0) {
      for (let items of tasks.entries) {
        for (let itemtasks of items.task_assignment_collection.entries) {
          if (
            itemtasks.assigned_to.login == JSON.parse(localStorage.parms).login
          ) {
            if (!filescompleted.includes(obj)) {
              filescompleted.push(obj);
            }
          }
        }
      }
    }
  }

  for (let obj of filearrayDenied) {
    let id = obj.id;
    let tasks = await getTaskList(id);

    if (tasks.entries.length != 0) {
      for (let items of tasks.entries) {
        for (let itemtasks of items.task_assignment_collection.entries) {
          if (
            itemtasks.assigned_to.login == JSON.parse(localStorage.parms).login
          ) {
            if (!filescompleted.includes(obj)) {
              filescompleted.push(obj);
            }
          }
        }
      }
    }
  }

  for (const obj of filearrayDACCChairReview) {
    let id = obj.id;
    let tasks = await getTaskList(id);

    if (tasks.entries.length != 0) {
      for (let items of tasks.entries) {
        if (items.is_completed == false && items.action == "complete") {
          for (let itemtasks of items.task_assignment_collection.entries) {
            if (
              itemtasks.status == "incomplete" &&
              itemtasks.assigned_to.login ==
                JSON.parse(localStorage.parms).login
            ) {
              filesreviewed.push(obj);
            } else if (
              itemtasks.status == "complete" &&
              itemtasks.assigned_to.login ==
                JSON.parse(localStorage.parms).login
            ) {
              filescompleted.push(obj);
            }
          }
        } else if (items.is_completed == true && items.action == "complete") {
          for (let itemtasks of items.task_assignment_collection.entries) {
            if (
              itemtasks.assigned_to.login ==
              JSON.parse(localStorage.parms).login
            ) {
              if (!filescompleted.includes(obj)) {
                filescompleted.push(obj);
              }
            }
          }
        }
      }
    }
  }
  template += "<div class='tab-content' id='selectedTab'>";

  template += `<div class='tab-pane fade show active'
                id='dacctoBeCompleted' role='tabpanel'
              aria-labeledby='dacctoBeCompletedTab'>
              <a href="mailto:${emailforChair[0]}" id='email' class='btn btn-dark'>Send Email to Chair</a>`;
  template += renderFilePreviewDropdown(filesincomplete, "dacctoBeCompleted");

  template += `<div class='tab-pane fade'
                id='daccReview' role='tabpanel'
                aria-labeledby='daccReviewTab'>
                <a href="mailto:${emailforChair[0]}" id='email' class='btn btn-dark'>Send Email to Chair</a> `;
  template += renderFilePreviewDropdown(filesreviewed, "daccReview");

  template += `<div class='tab-pane fade' 
                id='decided' role='tabpanel'
                aria-labelledby='decidedTab'>
                
                </div>`;
  template += `<div id='filePreview'>`;

  if (
    filescompleted.length != 0 ||
    filesincomplete.length != 0 ||
    filesreviewed.length != 0
  ) {
    template += ` 
      <div class='row'>
        <div id='boxFilePreview' class="col-8 preview-container"></div>
        <div id='fileComments' class='col-4 mt-2'></div>
      </div>

      <div id="daccComment" class="card-body dacc-comment" style="padding-left: 10px;background-color:#f6f6f6;">
      <form>  
        <label for="grade">Select recommendation: </label>
          <select name="grade" id="grade"></option>
            <option value = "1"> 1 - Approved as submitted</option>
            <option value = "2"> 2 - Approved, pending conditions/clarification of some issues </option>
            <option value = "3"> 3 - Approved, but data release will be delayed </option>
            <option value = "4"> 4 - Not approved </option>
            <option value = "6"> 6 - Decision pending clarification of several issues</option>
            <option value = "777"> 777 - Duplicate Proposal</option>
            </select>
          <br>
            <label for"message">Submit Comment:</label>
            <div class="input-group">
              <textarea id="message" name="message" rows="6" cols="65"></textarea>
            </div>
            <button type="submit" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
              <span class="buttonsubmit__text"> Submit & Complete </span> </button>
          </form>
      </div>`;
  }
  template += `
      </div>
    </div>`;
  //}
  document.getElementById("daccFileView").innerHTML = template;

  filescompleted = [...filearrayAccepted, ...filearrayDenied];
  viewFinalDecisionFilesTemplate(filescompleted);
  if (filesincomplete.length != 0) {
    switchFiles("dacctoBeCompleted");
    showPreview(filesincomplete[0].id);
    showComments(filesincomplete[0].id);
  } else {
    document.getElementById("filePreview").classList.remove("d-block");
    document.getElementById("filePreview").classList.add("d-none");
    //}
  }

  submitToComment();

  //Switch Tabs
  switchTabs("dacctoBeCompleted", ["decided", "daccReview"], filesincomplete);
  switchTabs("decided", ["dacctoBeCompleted", "daccReview"], filescompleted);
  switchTabs("daccReview", ["dacctoBeCompleted", "decided"], filesreviewed);

  if (localStorage.getItem("currentTab")) {
    const currTab = localStorage.getItem("currentTab");
    if (document.getElementById(currTab) != null) {
      document.getElementById(currTab).click();
    }
  }
  hideAnimation();
};

export const submitToComment = () => {
  let submitComment = async (e) => {
    e.preventDefault();
    const btn = document.activeElement;
    btn.disabled = true;
    //let taskId = btn.name;
    let fileId =
      document.querySelector(
        ".tab-content .active #dacctoBeCompletedselectedDoc"
      ) !== null
        ? document.getElementById("dacctoBeCompletedselectedDoc").value
        : document.getElementById("daccReviewselectedDoc").value; //document.getElementById('selectedDoc').value;
    let grade = e.target[0].value;
    let comment = e.target[1].value;
    let message = "Rating: " + grade + "\nComment: " + comment;
    await createComment(fileId, message);
    let tasklist = await getTaskList(fileId);
    let entries = tasklist.entries;
    if (entries.length !== 0) {
      for (let item of entries) {
        if (item.is_completed == false) {
          for (let taskassignment of item.task_assignment_collection.entries) {
            if (
              taskassignment.assigned_to.login ==
              JSON.parse(localStorage.parms).login
            ) {
              var taskId = taskassignment.id;
              await updateTaskAssignment(taskId, "completed");
            }
          }
        }
      }
    }
    tasklist = await getTaskList(fileId);
    entries = tasklist.entries;
    var numCompletedTasks = 0;
    if (entries.length !== 0) {
      for (let item of entries) {
        if (item.is_completed == true) {
          numCompletedTasks += 1;
        }
      }
      if (numCompletedTasks == entries.length) {
        await moveFile(fileId, chairReviewFolder);
        await createFileTask(fileId);
        tasklist = await getTaskList(fileId);
        entries = tasklist.entries;
        for (let item of entries) {
          if (item.is_completed == false) {
            await assignTask(item.id, emailforChair[0]);
          }
        }
      }
    }

    document.location.reload(true);
  };
  const dcform = document.querySelector(".dacc-comment");
  if (dcform) {
    dcform.addEventListener("submit", submitComment);
  }
};

export const dataApproval = () => {
  let approveDoc = async (e) => {
    e.preventDefault();

    let fileId = 931127106406;
    let decision = e.submitter.value;
    let message = e.target[0].value;

    let taskList = await getTaskList(fileId);
    let taskAssignment =
      taskList.entries[0].task_assignment_collection.entries[0];
  };

  const form = document.querySelector(".data-approval");
  form.addEventListener("submit", approveDoc);
};

export const dataForm = async () => {
  async function handleFormSubmit2(eventtest) {
    const btn = document.activeElement;
    btn.classList.toggle("buttonsubmit--loading");
    btn.disabled = true;
    eventtest.preventDefault();
    const form = document.querySelector(".contact-form form")
    const data = new FormData(form);
    console.log(data);
    const jsondata = Object.fromEntries(data.entries());
    jsondata.basevarOptions = data.getAll("basevarOptions");
    jsondata.salivaAmount = data.get("salivaAmount") || "";
    jsondata.serumAmount = data.get("serumAmount") || "";
    jsondata.tissueAmount = data.get("tissueAmount") || "";
    jsondata.plasmaAmount = data.get("plasmaAmount") || "";
    jsondata.bloodclotAmount = data.get("bloodclotAmount") || "";
    jsondata.redbloodcellAmount = data.get("redbloodcellAmount") || "";
    jsondata.buffycoatAmount = data.get("buffycoatAmount") || "";
    jsondata.fecalmicrobiomeAmount = data.get("fecalmicrobiomeAmount") || "";
    jsondata.expdescsplit = jsondata.expdesc.split('\n');
    jsondata.investigatorssplit = jsondata.investigators.split('\n');
    jsondata.backgroundsplit = jsondata.background.split('\n');
    jsondata.background2split = jsondata.background2.split('\n');
    jsondata.labassayssplit = jsondata.labassays.split('\n');
    jsondata.aimssplit = jsondata.aims.split('\n');
    jsondata.analyplansplit = jsondata.analyplan.split('\n');
    jsondata.timesplit = jsondata.timeline.split('\n');
    jsondata.budgetsplit = jsondata.budget.split('\n');
    jsondata.questionDatasplit = jsondata.questionData ? jsondata.questionData.split('\n') : [];
    jsondata.moleassayDatasplit = jsondata.moleassayData ? jsondata.moleassayData.split('\n') : [];

    // const results = document.querySelector(".results pre");
    // results.innerText = JSON.stringify(formJSON, null, 2);
    // fs.wrtieFile('test.json', formJSON);
    await generateWord(jsondata, btn, false);
    btn.classList.toggle("buttonsubmit--loading");
    btn.disabled = false;
  }

  let files = await getFolderItems(uploadFormFolder);
  const d = new Date();
  let filename =
    JSON.parse(localStorage.parms).login.split("@")[0] +
    "_" +
    d.getDate() +
    "_" +
    (d.getMonth() + 1) +
    "_" +
    d.getFullYear() +
    ".docx";

  // Find unique name
  let entries = files.entries;
  let i = 1;
  while (entries.includes(filename)) {
    let indexOfExtension = filename.indexOf(".");
    filename =
      filename.substring(0, indexOfExtension) +
      `(${i})` +
      filename.substring(indexOfExtension);
    i++;
  }
  const filesinfoldernames = [];
  const filesinfolderids = [];
  for (let i = 0; i < files.entries.length; i++) {
    filesinfoldernames.push(files.entries[i].name);
    filesinfolderids.push(files.entries[i].id);
  }

  async function handleFormDownload(eventtest) {
    const btn = document.activeElement;
    btn.classList.toggle("buttonsubmit--loading");
    btn.disabled = true;
    eventtest.preventDefault();
    const form = document.querySelector(".contact-form form");
    const data = new FormData(form);
    const jsondata = Object.fromEntries(data.entries());
    jsondata.basevar = data.getAll("basevar");
    jsondata.ibcvar = data.getAll("ibcvar");
    jsondata.reqcoh = data.getAll("reqcoh");

    let parentEl = eventtest.target.parentElement;
    let blob;
    if (parentEl.id === "downloadWord") {
      const doc = new docx.Document({
        styles: {
          default: {
            heading1: {
              run: {
                size: 22,
                bold: true,
                color: "#000000",
                font: "Verdana",
              },
            },
            heading2: {
              run: {
                size: 18,
                bold: true,
                color: "#000000",
                font: "Verdana",
              },
            },
          },
        },
        sections: [
          {
            properties: {},
            headers: {
              default: new docx.Header({
                children: [
                  new docx.Paragraph({
                    text: "Etiology of Aggressive Breast Cancer Study Analysis Proposal",
                    heading: docx.HeadingLevel.HEADING_1,
                    alignment: docx.AlignmentType.CENTER,
                  }),
                ],
              }),
            },
            children: [
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Date: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.date,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Project Title: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.projname,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Is this an amendment: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.amendment,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Amendment: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.conNum,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Contact Investigator(s): ",
                  }),
                  new docx.TextRun({
                    text: jsondata.investigators,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Institution(s): ",
                  }),
                  new docx.TextRun({
                    text: jsondata.institution,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Contact Email: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.email,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Are you a member of EABCS ",
                  }),
                  new docx.TextRun({
                    text: jsondata.member,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "EABCS Study Acronym(s) for the Contact Investigator: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.acro,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "All Investigators (and Institutions) who require access: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.investigators,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Background: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.background,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Aims: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.aims,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Analysis Plan: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.analyplan,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Core Variables: ",
                  }),
                  new docx.TextRun({
                    text: JSON.stringify(jsondata.basevar, null, 2)
                      .replace("[", "")
                      .replace("]", ""),
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "MMD Variables: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.mmdvarv,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "BRCA Variables: ",
                  }),
                  new docx.TextRun({
                    text: JSON.stringify(jsondata.ibcvar, null, 2)
                      .replace("[", "")
                      .replace("]", ""),
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Requested Cohorts: ",
                  }),
                  new docx.TextRun({
                    text: JSON.stringify(jsondata.reqcoh, null, 2)
                      .replace("[", "")
                      .replace("]", ""),
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Timeline: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.timeline,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Authorship: ",
                  }),
                  new docx.TextRun({
                    text: jsondata.authorship,
                    bold: false,
                  }),
                ],
                spacing: {
                  after: 150,
                },
              }),
            ],
          },
        ],
      });

      blob = docx.Packer.toBlob(doc);
    }

    // if (parentEl.id === "downloadJSON") {
    //   blob = new Blob([JSON.stringify(jsondata)], {
    //     type: "application/json",
    //   });
    // }
    const downloadLink = URL.createObjectURL(blob);
    let filename = jsondata.projname;

    let a = document.createElement("a");

    a.href = downloadLink;
    a.download = filename;

    a.click();
    btn.classList.toggle("buttonsubmit--loading");
  }
  async function handleFormSubmit(eventtest) {
    const btn = document.activeElement;
    btn.classList.toggle("buttonsubmit--loading");
    btn.disabled = true;
    eventtest.preventDefault();
    const form = document.querySelector(".contact-form form")
    const data = new FormData(form);
    console.log(data);
    const jsondata = Object.fromEntries(data.entries());
    jsondata.basevarOptions = data.getAll("basevarOptions");
    jsondata.salivaAmount = data.get("salivaAmount") || "";
    jsondata.serumAmount = data.get("serumAmount") || "";
    jsondata.tissueAmount = data.get("tissueAmount") || "";
    jsondata.plasmaAmount = data.get("plasmaAmount") || "";
    jsondata.bloodclotAmount = data.get("bloodclotAmount") || "";
    jsondata.redbloodcellAmount = data.get("redbloodcellAmount") || "";
    jsondata.buffycoatAmount = data.get("buffycoatAmount") || "";
    jsondata.fecalmicrobiomeAmount = data.get("fecalmicrobiomeAmount") || "";
    jsondata.expdescsplit = jsondata.expdesc.split('\n');
    jsondata.investigatorssplit = jsondata.investigators.split('\n');
    jsondata.backgroundsplit = jsondata.background.split('\n');
    jsondata.background2split = jsondata.background2.split('\n');
    jsondata.labassayssplit = jsondata.labassays.split('\n');
    jsondata.aimssplit = jsondata.aims.split('\n');
    jsondata.analyplansplit = jsondata.analyplan.split('\n');
    jsondata.timesplit = jsondata.timeline.split('\n');
    jsondata.budgetsplit = jsondata.budget.split('\n');
    jsondata.questionDatasplit = jsondata.questionData ? jsondata.questionData.split('\n') : [];
    jsondata.moleassayDatasplit = jsondata.moleassayData ? jsondata.moleassayData.split('\n') : [];

    // const results = document.querySelector(".results pre");
    // results.innerText = JSON.stringify(formJSON, null, 2);
    // fs.wrtieFile('test.json', formJSON);
    await generateWord(jsondata, btn, true);
    btn.classList.toggle("buttonsubmit--loading");
    btn.disabled = false;
  }

  async function assigntasktochair() {
    let files = await getFolderItems(uploadFormFolder);
    const filesinfoldernames = [];
    const filesinfolderids = [];
    for (let i = 0; i < files.entries.length; i++) {
      filesinfoldernames.push(files.entries[i].name);
      filesinfolderids.push(files.entries[i].id);
    }

    let fileId = filesinfolderids[filesinfoldernames.indexOf(filename)];
    await createMetadata(fileId);
  }

  async function generateWord(jsondata, button, uploadReady=false) {
    const expdescRun = jsondata.expdescsplit.map(line=>new docx.TextRun({break:1,text:line}));
    const investigatorsRun = jsondata.investigatorssplit.map(line=>new docx.TextRun({break:1,text:line}));
    const backgroundRun = jsondata.backgroundsplit.map(line=>new docx.TextRun({break:1,text:line}));
    const backgroundRun2 = jsondata.background2split.map(line=>new docx.TextRun({break:1,text:line}));
    const aimsRun = jsondata.aimssplit.map(line=>new docx.TextRun({break:1,text:line}));
    const labassaysRun = jsondata.labassayssplit.map(line=>new docx.TextRun({break:1,text:line}));
    const analyplanRun = jsondata.analyplansplit.map(line=>new docx.TextRun({break:1,text:line}));
    const timeRun = jsondata.timesplit.map(line=>new docx.TextRun({break:1,text:line}));
    const budgetRun = jsondata.budgetsplit.map(line=>new docx.TextRun({break:1,text:line}));
    const questionDataRun = jsondata.questionDatasplit ? jsondata.questionDatasplit.map(line=>new docx.TextRun({break:1,text:line})) : [];
    const moleassayDataRun = jsondata.moleassayDatasplit ? jsondata.moleassayDatasplit.map(line=>new docx.TextRun({break:1,text:line})) : [];

    const doc = new docx.Document({
      styles: {
        default: {
          heading1: {
            run: {
              size: 22,
              bold: true,
              color: "#000000",
              font: "Verdana",
            },
          },
          heading2: {
            run: {
              size: 18,
              bold: true,
              color: "#000000",
              font: "Verdana",
            },
          },
        },
        paragraphStyles: [ 
          {
            id: "longinput",
            name: "Long Input",
            basedOn: "Normal",
            paragraph: {
              font: "Verdana",
              size: 18,
            },
            run: {
              font: "Verdana",
              size: 18,
          },
          },
        ],
      },
      sections: [
        {
          properties: {},
          headers: {
            default: new docx.Header({
              children: [
                new docx.Paragraph({
                  text: "Etiology of Aggressive Breast Cancer Study Analysis Proposal",
                  heading: docx.HeadingLevel.HEADING_1,
                  alignment: docx.AlignmentType.CENTER,
                }),
              ],
            }),
          },
          children: [
            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Date: ",
                }),
                new docx.TextRun({
                  text: jsondata.date,
                  bold: false,
                }),
              ],
              spacing: {
                after: 150,
              },
            }),
            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Study Title: ",
                }),
                new docx.TextRun({
                  text: jsondata.projname,
                  bold: false,
                }),
              ],
              spacing: {
                after: 150,
              },
            }),
            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Key Investigator(s) Names and Institutions: ",
                }),
              ],
              spacing: {
                after: 0,
              },
            }),
            new docx.Paragraph({
              style: "longinput",
              children: investigatorsRun,
              spacing: {
                after: 150,
              }}),
            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Description of study team's experience in subject area of proposed work: ",
                }),
              ],
              spacing: {
                after: 0,
              },
            }),
            new docx.Paragraph({
              style: "longinput",
              children: expdescRun,
              spacing: {
                after: 150,
              }}),

            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Background for the hypotheses to be evaluated in the proposed study: ",
                }),
              ],
              spacing: {
                after: 0,
              },
            }),
            new docx.Paragraph({
              style: "longinput",
              children: backgroundRun,
              spacing: {
                after: 150,
              }}),

            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "How will the data from this study contribute to the literature: ",
                }),
              ],
              spacing: {
                after: 0,
              },
            }),
            new docx.Paragraph({
              style: "longinput",
              children: backgroundRun2,
              spacing: {
                after: 150,
              }}),

            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Overall goal and specific aims: ",
                }),
              ],
              spacing: {
                after: 0,
              },
            }),
            new docx.Paragraph({
              style: "longinput",
              children: aimsRun,
              spacing: {
                after: 150,
              }}),

            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Data and biological specimens requested: ",
                }),
                new docx.TextRun({
                  text: jsondata.basevar || "No",
                  bold: false,
                }),
              ],
              spacing: {
                after: 150,
              },
            }),

            ...(jsondata.basevar === "Yes" && jsondata.basevarOptions && jsondata.basevarOptions.length > 0 ? [
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Requested specimens: ",
                  }),
                ],
                spacing: {
                  after: 0,
                },
              }),
              ...jsondata.basevarOptions.map(specimen => 
                new docx.Paragraph({
                  style: "longinput",
                  children: [
                    new docx.TextRun({
                      text: `${specimen}${jsondata[specimen.toLowerCase().replace(/\s+/g, '') + 'Amount'] ? ': ' + jsondata[specimen.toLowerCase().replace(/\s+/g, '') + 'Amount'] : ''}`,
                    }),
                  ],
                  spacing: {
                    after: 50,
                  },
                })
              ),
              new docx.Paragraph({
                text: "",
                spacing: {
                  after: 100,
                },
              }),
            ] : []),

            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Lab assays, collaborating laboratory(ies), and quality control measures: ",
                }),
              ],
              spacing: {
                after: 0,
              },
            }),
            new docx.Paragraph({
              style: "longinput",
              children: labassaysRun,
              spacing: {
                after: 150,
              }}),

            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Analysis Plan: ",
                }),
              ],
              spacing: {
                after: 0,
              },
            }),
            new docx.Paragraph({
              style: "longinput",
              children: analyplanRun,
              spacing: {
                after: 150,
              }}),

            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Budgetary considerations: ",
                }),
              ],
              spacing: {
                after: 0,
              },
            }),
            new docx.Paragraph({
              style: "longinput",
              children: budgetRun,
              spacing: {
                after: 150,
              }}),

            ...(jsondata.questionData ? [
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Question Data: ",
                  }),
                ],
                spacing: {
                  after: 0,
                },
              }),
              new docx.Paragraph({
                style: "longinput",
                children: questionDataRun,
                spacing: {
                  after: 150,
                }}),
            ] : []),

            ...(jsondata.moleassayData ? [
              new docx.Paragraph({
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.START,
                children: [
                  new docx.TextRun({
                    text: "Molecular Assay Data: ",
                  }),
                ],
                spacing: {
                  after: 0,
                },
              }),
              new docx.Paragraph({
                style: "longinput",
                children: moleassayDataRun,
                spacing: {
                  after: 150,
                }}),
            ] : []),

            new docx.Paragraph({
              heading: docx.HeadingLevel.HEADING_2,
              alignment: docx.AlignmentType.START,
              children: [
                new docx.TextRun({
                  text: "Timeline: ",
                }),
              ],
              spacing: {
                after: 0,
              },
            }),
            new docx.Paragraph({
              style: "longinput",
              children: timeRun,
              spacing: {
                after: 150,
              }}),
          ],
        },
      ],
    });

    // filename = jsondata.projname.substring(0, 10) + "_" + filename;
    // let files = await getFolderItems(uploadFormFolder);
    // const filesinfoldernames = [];
    // const filesinfolderids = [];
    // for (let i = 0; i < files.entries.length; i++) {
    //   filesinfoldernames.push(files.entries[i].name);
    //   filesinfolderids.push(files.entries[i].id);
    // }

    let user = JSON.parse(localStorage.parms).login.split('@')[0];
    const date = new Date();
    const today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    let filename = jsondata.projname + '_' + user + '_' + today + '.docx';
    await docx.Packer.toBlob(doc).then(async (blob, btn) => {
      if (uploadReady) {
        let response = await uploadWordFile(blob, filename, uploadFormFolder);
        console.log(response);
      if (response.status === 401) {
        btn.classList.toggle("buttonsubmit--loading");
        btn.disabled = false;
        document.getElementById("modalBody").innerHTML = `
            <p>Error detected, please upload again.</p>`;
        $("#popUpModal").modal("show");
      } else if (response.status === 409){
        document.getElementById("modalBody").innerHTML = `
        <p>Conflict detected, please upload again.</p>`;
        $("#popUpModal").modal("show");
        btn.classList.toggle("buttonsubmit--loading");
        btn.disabled = false;
      } else {
        let fileid = response.entries[0].id;
        document.getElementById("modalBody").innerHTML = `
            <p>File was successfully uploaded.</p>
            <p>Document ID: ${fileid}</p>`;
            $("#popUpModal").modal("show");
            let popup = document.getElementById('popUpModal');
            let btns = popup.querySelectorAll('button');
            for (let button of btns) {
              button.addEventListener('click', function () {
              location.reload();
              })
            }
        }}
        const downloadLink = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = downloadLink;
        a.download = filename;
        a.click();
    });
  }

  const form = await document.querySelector(".contact-form");
  form.addEventListener("submit", handleFormSubmit);

  const downloadBtn2 = document.getElementById("downloadForm");
  if (downloadBtn2) {
    downloadBtn2.addEventListener("click", handleFormSubmit2);
  }

  // Add event listeners for basevar radio buttons
  document.getElementById("basevarYes").addEventListener("change", function() {
    if (this.checked) {
      document.getElementById("basevarlistContainer").style.display = "block";
    }
  });

  document.getElementById("basevarNo").addEventListener("change", function() {
    if (this.checked) {
      document.getElementById("basevarlistContainer").style.display = "none";
    }
  });

  // Add event listeners for specimen checkboxes to show/hide amount text boxes
  document.getElementById("saliva").addEventListener("change", function() {
    document.getElementById("salivaAmount").style.display = this.checked ? "inline" : "none";
  });

  document.getElementById("serum").addEventListener("change", function() {
    document.getElementById("serumAmount").style.display = this.checked ? "inline" : "none";
  });

  document.getElementById("tissue").addEventListener("change", function() {
    document.getElementById("tissueAmount").style.display = this.checked ? "inline" : "none";
  });

  document.getElementById("plasma").addEventListener("change", function() {
    document.getElementById("plasmaAmount").style.display = this.checked ? "inline" : "none";
  });
  document.getElementById("bloodclot").addEventListener("change", function() {
    document.getElementById("bloodclotAmount").style.display = this.checked ? "inline" : "none";
  });
  document.getElementById("redbloodcell").addEventListener("change", function() {
    document.getElementById("redbloodcellAmount").style.display = this.checked ? "inline" : "none";
  });
  document.getElementById("buffycoat").addEventListener("change", function() {
    document.getElementById("buffycoatAmount").style.display = this.checked ? "inline" : "none";
  });
  document.getElementById("fecalmicrobiome").addEventListener("change", function() {
    document.getElementById("fecalmicrobiomeAmount").style.display = this.checked ? "inline" : "none";
  });
  // const downloadJSON = document.getElementById("downloadJSON");
  // downloadJSON.addEventListener("click", handleFormDownload);
};

const viewFiles = async (files) => {
  let template = ``;
  for (const id of files) {
    let fileinfo = await getFileInfo(id);
    template += `
            <div style="padding: 10px" aria-expanded="false" id="heading${id}">
              <div class = "row">
                <div class="col-md-4 card-title"><a href="https://nih.app.box.com/file/${id}">${fileinfo.name}</a></div>
                  <div class="col-md-1">
                      <button title="Expand/Collapse" class="transparent-btn collapse-panel-btn" data-toggle="collapse" data-target="#study${id}">
                          <i class="fas fa-caret-down fa-2x"></i>
                      </button>
                  </div>
                </div>
              </div>
            `;
    template += `
            <div id="study${id}" class="collapse" aria-labelledby="heading${id}">
              <div class="card-body dacc-submit" style="padding-left: 10px;background-color:#f6f6f6;">
                <form>
                  <label for"message">Send to Steering Committee</label>
                  <div class="input-group">
                    <textarea id="message" name="message" rows="10" cols="65"></textarea>
                  </div>
                  <button type="submit" value="${id}" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
                    <span class="buttonsubmit__text"> Send </span> </button>
                </form>
              </div>
            </div>
            `;
  }
  return template;
};

const viewDACCCompletedFiles = async (files, taskids) => {
  let template = ``;
  var ival = 0;
  for (const id of files) {
    let fileinfo = await getFileInfo(id);
    let taskid = taskids[ival];
    template += `
            <div style="padding: 10px" aria-expanded="false" id="heading${id}">
              <div class = "row">
                <div class="col-md-4 card-title"><a href="https://nih.app.box.com/file/${id}">${fileinfo.name}</a></div>
                  <div class="col-md-1">
                      <button title="Expand/Collapse" class="transparent-btn collapse-panel-btn" data-toggle="collapse" data-target="#study${id}">
                          <i class="fas fa-caret-down fa-2x"></i>
                      </button>
                  </div>
                </div>
              </div>
            `;
    template += `
            <div id="study${id}" class="collapse" aria-labelledby="heading${id}">
              <div class="card-body approvedeny" style="padding-left: 10px;background-color:#f6f6f6;">
                <form>
                  <label for="message">Enter Message for Submitter</label>
                  <div class="input-group">
                      <textarea id="message" name="message" rows="6" cols="65"></textarea>
                  </div>
                  <button type="submit" name="${taskid}" id="${id}" class="buttonsubmit" value="approved">
                    <span class="buttonsubmit__text"> Approve </span></button>
                  <button type="submit" name="${taskid}" id="${id}" class="buttonsubmit" value="rejected">
                    <span class="buttonsubmit__text"> Deny </span></button>
                </form>
              </div>
            </div>
            `;
    ival += 1;
  }
  return template;
};

const viewDACCFiles = async (files, taskids) => {
  let template = ``;
  var ival = 0;
  for (const id of files) {
    let fileinfo = await getFileInfo(id);
    let taskid = taskids[ival];
    template += `
            <div style="padding: 10px" aria-expanded="false" id="heading${id}">
              <div class = "row">
                <div class="col-md-4 card-title"><a href="https://nih.app.box.com/file/${id}">${fileinfo.name}</a></div>
                  <div class="col-md-1">
                      <button title="Expand/Collapse" class="transparent-btn collapse-panel-btn" data-toggle="collapse" data-target="#study${id}">
                          <i class="fas fa-caret-down fa-2x"></i>
                      </button>
                  </div>
                </div>
              </div>
            `;
    template += `
            <div id="study${id}" class="collapse" aria-labelledby="heading${id}">
              <div class="card-body dacc-comment" style="padding-left: 10px;background-color:#f6f6f6;">
                <form>
                  <label for"message">Submit Comment</label>
                  <div class="input-group">
                    <textarea id="message" name="message" rows="6" cols="65"></textarea>
                  </div>
                  <button type="submit" name="${taskid}" value="${id}" class="buttonsubmit" onclick="this.classList.toggle('buttonsubmit--loading')"> 
                    <span class="buttonsubmit__text"> Submit & Complete </span> </button>
                </form>
              </div>
            </div>
            `;
    ival += 1;
  }
  return template;
};
// const chairFileViews = async () => {
// }
export async function viewFinalDecisionFilesTemplate(files) {
  let template = "";
  let filesInfo = [];
  for (const file of files) {
    const fileInfo = await getFileInfo(file.id);
    filesInfo.push(fileInfo);
  }
  if (filesInfo.length > 0) {
    template += `
    <div id='decidedFiles'>
    <div class='row'>
      <div class="col-xl-12 filter-column" id="summaryFilterSiderBar">
          <div class="div-border white-bg align-left p-2">
              <div class="main-summary-row">
                  <div class="col-xl-12 pl-1 pr-0">
                      <span class="font-size-17 font-bold">Filter</span>
                      <div id="filterData" class="align-left"></div>
                  </div>
              </div>
          </div>
      </div>
      </div>
      <!--div class='table-responsive'>
      <table class='table'-->
      
      <div class='col-xl-12 pr-0'>`;

    template += viewFinalDecisionFilesColumns();

    template += '<div id="files"> </div>';

    template += '<!--tbody id="files"-->';
  } else {
    template += `
              No files to show.            
    </div>
    </div>`;
  }

  document.getElementById("decided").innerHTML = template;

  if (filesInfo.length !== 0) {
    console.log(filesInfo);
    await viewFinalDecisionFiles(filesInfo);
    for (const file of filesInfo) {
      document
        .getElementById(`study${file.id}`)
        .addEventListener("click", showCommentsDropDown(file.id));
    }

    let btns = Array.from(document.querySelectorAll(".preview-file"));
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        btn.dataset.target = "#gbhsPreviewerModal";
        const header = document.getElementById("gbhsPreviewerModalHeader");
        const body = document.getElementById("gbhsPreviewerModalBody");
        header.innerHTML = `<h5 class="modal-title">File preview</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>`;
        const fileId = btn.dataset.fileId;
        $("#gbhsPreviewerModal").modal("show");
        showPreview(fileId, "gbhsPreviewerModalBody");
      });
    });
    //Filtering and Sorting
    const table = document.getElementById("decidedFiles");
    const headers = table.querySelector(`.div-sticky`);
    Array.from(headers.children).forEach((header, index) => {
      header.addEventListener("click", (e) => {
        const sortDirection = header.classList.contains("header-sort-asc");
        sortTableByColumn(table, index, !sortDirection);
      });
    });

    filterSection(filesInfo);
    Array.from(document.getElementsByClassName("filter-var")).forEach((el) => {
      el.addEventListener("click", () => {
        const headerCell =
          document.getElementsByClassName("header-sortable")[0];
        const tableElement =
          headerCell.parentElement.parentElement.parentElement;
        filterCheckBox(tableElement, filesInfo);
      });
    });
    const input = document.getElementById("searchDataDictionary");
    input.addEventListener("input", () => {
      const headerCell = document.getElementsByClassName("header-sortable")[0];
      const tableElement = headerCell.parentElement.parentElement.parentElement;
      filterCheckBox(tableElement, filesInfo);
    });
  }
}

export function viewFinalDecisionFilesColumns() {
  return `<div class="row m-0 pt-2 pb-2 align-left div-sticky" style="border-bottom: 1px solid rgb(0,0,0, 0.1);">
    <div class="col-lg-3 text-left font-bold ws-nowrap header-sortable">Concept Name <button class="transparent-btn sort-column" data-column-name="Concept Name"><i class="fas fa-sort"></i></button></div>
    <div class="col-lg-2 text-left font-bold ws-nowrap header-sortable">Submitted By <button class="transparent-btn sort-column" data-column-name="Submitted By"><i class="fas fa-sort"></i></button></div>
    <div class="col-lg-3 text-left font-bold ws-nowrap header-sortable">Submission Date <button class="transparent-btn sort-column" data-column-name="Submission Date"><i class="fas fa-sort"></i></button></div>
    <div class="col-lg-2 text-left font-bold ws-nowrap header-sortable">Decision<button class="transparent-btn sort-column" data-column-name="Decision"><i class="fas fa-sort"></i></button></div>
    <div class="col-lg-2 text-left font-bold ws-nowrap header-sortable">Decided On<button class="transparent-btn sort-column" data-column-name="Decision Date"><i class="fas fa-sort"></i></button></div>
  </div>`;
}

export async function viewFinalDecisionFiles(files) {
  let template = "";

  for (const fileInfo of files) {
    console.log(fileInfo);
    const fileId = fileInfo.id;
    let filename = fileInfo.name.slice(0, -4).split("_").join(" ");
    console.log(filename);
    const shortfilename =
      filename.length > 30 ? filename.substring(0, 29) + "..." : filename;

    let completion_date = await getChairApprovalDate(fileId);
    template += `
<div class="card mt-1 mb-1 align-left" >
    <div style="padding: 10px" aria-expanded="false" id="file${fileId}" class='filedata'>
        <div class="row">
            <div class="col-lg-3 text-left">${shortfilename}<button class="btn btn-lg custom-btn preview-file" title='Preview File' data-file-id="${fileId}" aria-label="Preview File"  data-keyboard="false" data-backdrop="static" data-toggle="modal" data-target="#gbhsPreviewerModal"><i class="fas fa-external-link-alt"></i></button></div>
            <div class="col-lg-2 text-left">${fileInfo.created_by.name}</div>
            <div class="col-lg-2 text-center">${new Date(fileInfo.created_at)
              .toDateString()
              .substring(4)}</div>
            <div class="col-lg-2 pl-6 text-right">${
              fileInfo.parent.name === "Accepted"
                ? '<h6 class="badge badge-pill badge-success">Accepted</h6>'
                : fileInfo.parent.name === "Denied"
                ? '<h6 class="badge badge-pill badge-danger">Denied</h6>'
                : '<h6 class="badge badge-pill badge-warning">Under Review</h6>'
            }</div>
            <div class="col-lg-2 pl-6 text-right">${completion_date}</div>
            <div class="col-lg-1 text-right">
                <button title="Expand/Collapse" class="transparent-btn collapse-panel-btn" data-toggle="collapse" data-target="#study${fileId}">
                    <i class="fas fa-caret-down fa-2x"></i>
                </button>
            </div>
        </div>
        <div id="study${fileId}" class="collapse" aria-labelledby="file${fileId}">
                    <div class="card-body" style="padding-left: 10px;background-color:#f6f6f6;">
                    <div class="row mb-1 m-0">
                    <div class="col-12 font-bold">
                    Concept: ${filename}
                    </div>
                    </div>
                    <div class="row mb-1 m-0">
                      <div id='file${fileId}Comments' class='col-12'></div>
                    </div>
        </div>
    </div>
    </div>
    </div>`;
  }

  template += `</div></div></div></div>`;
  if (document.getElementById("files") != null)
    document.getElementById("files").innerHTML = template;
}

function filterSection(files) {
  //Get all possible values for filters (Submitted By and Decision)
  let template = "";
  const decisionFilterButtons = [
    ...new Set([...files.map((fileInfo) => fileInfo.parent.name)]),
  ];
  template += `
  <div class='row'>
    <div class='col-lg-7'>
      <div class="form-group" margin:0px>
          <div class="input-group ">
              <input type="search" class="form-control rounded" autocomplete="off" placeholder="Search min. 3 characters" aria-label="Search" id="searchDataDictionary" aria-describedby="search-addon" />
              <span class="input-group-text border-0 search-input">
                  <i class="fas fa-search"></i>
              </span>
              
          </div>
          
      </div>
      
  </div>
  <div class='col-lg-5'>

   `;
  if (decisionFilterButtons.length !== 0) {
    template += `
    <label class="filter-label font-size-17 font-bold" for="variableTypeList">Decision</label>
    <div class='row' id="decisionFilterList"></div>`;
  }
  let decisionFilterTemp = "";
  decisionFilterButtons.forEach((decision, index) => {
    if (decision === "Chair Final Review") {
      decision = "Under Review";
    }
    decisionFilterTemp += `
   <li class="filter-list-item">
     <input type="checkbox" data-variable-type="${decision}" name='decision${decision}' id="decision${index}" value='${decision}' class="filter-var" style="margin-left: 1px !important;" data-variable-column='Decision'>
     <label for="label${decision}" class="sub-category px-1" title="${decision}">${decision}</label>
     `;
  });
  document.getElementById("filterData").innerHTML = template;
  document.getElementById("decisionFilterList").innerHTML = decisionFilterTemp;
}

export const formFunctions = () => {
  document.getElementById("basevarv").addEventListener("click", (e) => {
    const inputList = document
      .getElementById("basevarlist")
      .getElementsByTagName("input");

    if (e.target.checked) {
      for (const element of inputList) {
        element.checked = true;
      }
    } else {
      for (const element of inputList) {
        element.checked = false;
      }
    }
  });

  document.getElementById("ibcvarv").addEventListener("click", (e) => {
    const inputList = document
      .getElementById("ibcvarlist")
      .getElementsByTagName("input");

    if (e.target.checked) {
      for (const element of inputList) {
        element.checked = true;
      }
    } else {
      for (const element of inputList) {
        element.checked = false;
      }
    }
  });
  document.getElementById("reqcohv").addEventListener("click", (e) => {
    const inputList = document
      .getElementById("reqcohlist")
      .getElementsByTagName("input");

    if (e.target.checked) {
      for (const element of inputList) {
        element.checked = true;
      }
    } else {
      for (const element of inputList) {
        element.checked = false;
      }
    }
  });
};

export const testingDataGov = async () => {
  console.log("testingDataLoaded")
  const testform = document.getElementById("submitID");
  testform.addEventListener("click", function(e) {
    e.preventDefault();
    dataGovTest();
  });
};

export const dataGovTest = async () => {
  console.log("testing data gov test function");
  ///
  const responseData = csv2Json3(await getFile(1987587625687)); // Get summary level data
  const lastModified = (await getFileInfo(1987587625687)).modified_at;

  const getCollaborators_Metadata = await getCollaboration(summaryStatsFolderId, 'folders', 1000);
  const getCollaborators_Upload = await getCollaboration(submitterFolder, 'folders', 1000);

  const pendingMetadataCollaborators = getCollaborators_Metadata.entries.filter(collab => collab.status === 'pending');
  console.log('Pending Metadata Collaborators:', pendingMetadataCollaborators);
  //console.log(pendingMetadataCollaborators);

  // Check for specific email
  const targetEmail = 'wkc15@columbia.edu';
  const foundCollab = getCollaborators_Metadata.entries.find((collab, index) => {
    const email = collab.invite_email || (collab.accessible_by && collab.accessible_by.login);
    if (email === targetEmail) {
      console.log(`Found ${targetEmail} at position ${index}:`, collab);
      return true;
    }
    return false;
  });
  
  if (!foundCollab) {
    console.log(`${targetEmail} not found in getCollaborators_Metadata`);
  }

  const emailsInMetadata = getCollaborators_Metadata.entries.map(collab => {
    if (collab.accessible_by) return collab.accessible_by.login.toLowerCase();
    if (collab.invite_email) return collab.invite_email.toLowerCase();
    console.error('Error: Both accessible_by and invite_email are null for:', collab);
    return null;
  }).filter(email => email !== null);
  

  
  const emailsInUploaddata = getCollaborators_Upload.entries.map(collab => {
    if (collab.accessible_by) return collab.accessible_by.login.toLowerCase();
    if (collab.invite_email) return collab.invite_email.toLowerCase();
    console.error('Error: Both accessible_by and invite_email are null for:', collab);
    return null;
  }).filter(email => email !== null);

  const allEmails = responseData.data.map(user => user.Email.toLowerCase());
  console.log(allEmails);

  // Metadata
  const includedEmailsMetadata = allEmails.filter(email => emailsInMetadata.includes(email));
  const notIncludedEmailsMetadata = allEmails.filter(email => !emailsInMetadata.includes(email));

  // Upload
  const includedEmailsUpload = allEmails.filter(email => emailsInUploaddata.includes(email));
  const notIncludedEmailsUpload = allEmails.filter(email => !emailsInUploaddata.includes(email));

  console.log('Metadata - Included:', includedEmailsMetadata);
  console.log('Metadata - Not included:', notIncludedEmailsMetadata);

  console.log('Upload - Included:', includedEmailsUpload);
  console.log('Upload - Not included:', notIncludedEmailsUpload);

  // Show modal and add missing collaborators
  let successfulUpdate = '';
  let issueCount = 0;
  const header = document.getElementById("confluenceModalHeader");
  const body = document.getElementById("confluenceModalBody");
  header.innerHTML = `
      <h5 class="modal-title">Confirm Adding Collaborators</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
  `;

  const hasUsersToAdd = notIncludedEmailsMetadata.length > 0 || notIncludedEmailsUpload.length > 0;
  
  let confirmationList;
  if (hasUsersToAdd) {
    confirmationList = '<p><strong>The following users will be added:</strong></p>';
    for (const email of notIncludedEmailsMetadata) {
      confirmationList += `<p>User: ${email}, Folder: Metadata, Permission: viewer</p>`;
    }

    for (const email of notIncludedEmailsUpload) {
      confirmationList += `<p>User: ${email}, Folder: Upload, Permission: uploader</p>`;
    }
  } else {
    confirmationList = '<p>No users to be added</p>';
  }

  body.innerHTML = `
    <div style="height: ${Math.floor(window.innerHeight * 2/3)}px; overflow-y: auto; padding-right: 15px;">
      ${confirmationList}
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
      <button type="button" class="btn btn-primary" id="confirmAddCollaborators" ${!hasUsersToAdd ? 'disabled' : ''}>OK - Add Collaborators</button>
    </div>
  `;

  $("#confluenceMainModal").modal("show");

// Add event listener for confirmation
if (hasUsersToAdd) {
  document.getElementById("confirmAddCollaborators").addEventListener("click", async () => {
  body.innerHTML = '<div id="collaboratorList"><p>Adding collaborators...</p></div>';
  const listElement = document.getElementById("collaboratorList");
  
  // Add delay function and rate limiting
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  let requestCount = 0;
  
  // Add missing collaborators with rate limiting
  for (const email of notIncludedEmailsMetadata) {
    if (requestCount >= 50) {
      listElement.innerHTML += `<p>Rate limit reached, waiting 60 seconds...</p>`;
      await delay(60000);
      requestCount = 0;
    }
    listElement.innerHTML += `<p>Adding User: ${email}, Folder: Metadata, Permission: viewer</p>`;
    successfulUpdate = await addNewCollaborator(summaryStatsFolderId, 'folder', email, 'viewer');
    requestCount++;
    if (successfulUpdate.status == '201') {
      listElement.innerHTML += `<p><span style="color: green;">Successful</span>: ${email}, Folder: Metadata, Permission: viewer</p>`;
    } else {
      listElement.innerHTML += `<p><span style="color: red;">Failed</span>: ${email}, Folder: Metadata, Permission: viewer</p>`;
      issueCount += 1;
    }
  }
  
  for (const email of notIncludedEmailsUpload) {
    if (requestCount >= 50) {
      listElement.innerHTML += `<p>Rate limit reached, waiting 60 seconds...</p>`;
      await delay(60000);
      requestCount = 0;
    }
    listElement.innerHTML += `<p>Adding User: ${email}, Folder: Upload, Permission: uploader</p>`;
    successfulUpdate = await addNewCollaborator(submitterFolder, 'folder', email, 'uploader');
    requestCount++;
    if (successfulUpdate.status == '201') {
      listElement.innerHTML += `<p><span style="color: green;">Successful</span>: ${email}, Folder: Upload, Permission: uploader</p>`;
    } else {
      listElement.innerHTML += `<p><span style="color: red;">Failed</span>: ${email}, Folder: Upload, Permission: uploader</p>`;
      issueCount += 1;
    }
  }
  
  if (issueCount > 0) {
    listElement.innerHTML += `<p><strong>${issueCount} issues detected. Please review list or try again.</strong></p>`;
  } else {
    listElement.innerHTML += '<p><strong>All collaborators added successfully!</strong></p>';
  }
  });
}

  ///
  document.getElementById("submitID").classList.toggle('buttonsubmit--loading');
  // let val = '0';
  // if(document.getElementById('folderID')) {
  //   val = document.getElementById('folderID').value
  // } else {
  //   val = dataPlatformDataFolder;
  // }
  // console.log(val);
  // const array = await getFolderInfo(val); //DCEG: 196554876811 BCRP: 145995765326, Confluence: 137304373658
  // if (!array) {
  //   document.getElementById("submitID").classList.toggle('buttonsubmit--loading');
  //   alert("Error: Please input a valid folder ID and check that you have the necessary permissions to access it.");
  //   return false;
  // }

  // let template =
  //   '<div class="card-body data-governance"><ul class="ul-list-style first-list-item collapsible-items p-0 m-0">';
  // const ID = array.id;
  // const consortiaName = array.name;
  // let type = array.type;
  // let liClass = type === "folder" ? "collapsible consortia-folder" : "";
  // let title = type === "folder" ? "Expand / Collapse" : "";
  // template += `<li class="collapsible-items">
  //           <button class="${liClass}" data-toggle="collapse" href="#toggle${ID}">
  //               <i title="${title}" data-type="${type}" data-id="${ID}" data-folder-name="${consortiaName}" data-status="pending" class="lazy-loading-spinner"></i>
  //           </button> ${consortiaName}
  //       </li>
  //       `;
  // template += `</ul></div></div>`;
  // document.getElementById("folderInput").innerHTML = template;
  // dataGovernanceLazyLoad();
  // dataGovernanceCollaboration();
  // document.getElementById("submitID").classList.toggle('buttonsubmit--loading');
  // return false;
}
