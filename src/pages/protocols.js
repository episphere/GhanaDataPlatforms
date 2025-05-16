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
            <div class="general-bg padding-bottom-1rem">
              <div class="body-min-height">
                <div class="main-summary-row">
                    <div class="align-left">
                        <h1 class="col page-header pl-0 pt-2">${pageHeader}</h1>  
                    </div>
                </div>
                <div class="confluence-resources white-bg div-border font-size-18 height100" id="protocolPage"></div>
                <div class="main-summary-row">
                    <div class="col p-0">
                        <div class="offset-xl-2 pl-4 align-left" id="dataLastModified"></div>
                    </div>
                </div>
            </div>
        </div>
      </div></div>
    `;
};

export const protocolsTemplate = async (page) => {
    //document.getElementById("downloadContainer").style.display = 'none';
    let template = ``;
    console.log(page);
    if (page == "Anthropometry"){
        template = `
                <div class="confluence-resources white-bg div-border font-size-18 height100">
                  <iframe src="./static/files/GBHS_Questionnaire_Annotated_withV2_d20170821_TOC.pdf" width="100%" height="100%">
                </div>
                `
    } else if (page == "Saliva"){
        template = `
                <div class="confluence-resources white-bg div-border font-size-18 height100">
                  <iframe src="./static/files/GBHS_Questionnaire_Annotated_withV2_d20170821_TOC.pdf" width="100%" height="100%">
                </div>
                `
    } else if (page == "Stool"){
        template = `
                <div class="confluence-resources white-bg div-border font-size-18 height100">
                  <iframe src="./static/files/GBHS_Questionnaire_Annotated_withV2_d20170821_TOC.pdf" width="100%" height="100%">
                </div>
                `
       } else if (page == "Blood"){
        template = `
                <div class="confluence-resources white-bg div-border font-size-18 height100">
                  <iframe src="./static/files/GBHS_Questionnaire_Annotated_withV2_d20170821_TOC.pdf" width="100%" height="100%">
                </div>
                `
       }   else if (page == "Breast Tissue Biopsy Collection"){
        template = `
                <div class="confluence-resources white-bg div-border font-size-18 height100">
                  <iframe src="./static/files/GBHS_Questionnaire_Annotated_withV2_d20170821_TOC.pdf" width="100%" height="100%">
                </div>
                `
       } else {
    template = `
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
    </div>`}

    document.getElementById("protocolPage").innerHTML = template;
    hideAnimation();
}