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

export const protocolSummary = (activeTab, pageHeader) => {
  return `
        <div class="general-bg">
            <div class="container2 body-min-height">
                ${
                   pageNavBar("forms", activeTab, "Forms", "Anthropometry", "Saliva", "Stool", "Blood", "Breast Tissue Biopsy Collection")//, "Anthropometry", "Saliva", "Stool", "Blood", "Breast tissue biopsy collection")
                } 
            <div class="general-bg padding-bottom-1rem">
              <div class="body-min-height">
                <div class="main-summary-row">
                    <div class="align-left">
                        <h1 class="col page-header pl-0 pt-2">${pageHeader}</h1>  
                    </div>
                </div>
                <div class="confluence-resources font-size-18" id="protocolPage"></div>
            </div>
        </div>
      </div></div>
    `;
};

export const protocolsTemplate = async (page) => {
    //document.getElementById("downloadContainer").style.display = 'none';
    let template = ``;
    if (page == "Anthropometry"){
        template = `
                <div class="confluence-resources white-bg div-border font-size-18 height100">
                  <iframe src="./static/files/GBHS_Anthropometry_Annotated_d20170821.pdf" width="100%" height="100%">
                </div>
                `
    } else if (page == "Saliva"){
        template = `
                <div class="confluence-resources white-bg div-border font-size-18 height100">
                  <iframe src="./static/files/GBHS_Saliva_Collection_Annotated_d20170821.pdf" width="100%" height="100%">
                </div>
                `
    } else if (page == "Stool"){
        template = `
                <div class="confluence-resources white-bg div-border font-size-18 height100">
                  <iframe src="./static/files/GBHS_Stool_Collection_Annotated_d20170821.pdf" width="100%" height="100%">
                </div>
                `
       } else if (page == "Blood"){
        template = `
                <div class="confluence-resources white-bg div-border font-size-18 height100">
                  <iframe src="./static/files/GBHS_Blood_Collection_Annotated_d20170821.pdf" width="100%" height="100%">
                </div>
                `
       }   else if (page == "Breast Tissue Biopsy Collection"){
        template = `
                <div class="confluence-resources white-bg div-border font-size-18 height100">
                  <iframe src="./static/files/GBHS_Breast_Biopsy_Annotated_WithV2_d20170821.pdf" width="100%" height="100%">
                </div>
                `
       } else {
    template = `
        <h5 class="font-bold mb-3">Downloadable Documents</h5>
        <p class="mb-4">Download forms and documentation for the study:</p>
        <div class="list-group shadow-sm">
            <a href="./static/files/GBHS_Anthropometry_Annotated_d20170821.docx" download class="list-group-item list-group-item-action d-flex align-items-center">
                <i class="fas fa-file-download me-3 text-primary"></i>
                <div>
                    <strong>Anthropometry</strong>
                    <small class="d-block text-muted">Form for anthropometric measurements</small>
                </div>
            </a>
            <a href="./static/files/GBHS_Saliva_Collection_Annotated_d20170821.docx" download class="list-group-item list-group-item-action d-flex align-items-center">
                <i class="fas fa-file-download me-3 text-primary"></i>
                <div>
                    <strong>Saliva Collection</strong>
                    <small class="d-block text-muted">Form for saliva sample collection</small>
                </div>
            </a>
            <a href="./static/files/GBHS_Stool_Collection_Annotated_d20170821.docx" download class="list-group-item list-group-item-action d-flex align-items-center">
                <i class="fas fa-file-download me-3 text-primary"></i>
                <div>
                    <strong>Stool Collection</strong>
                    <small class="d-block text-muted">Form for stool sample collection</small>
                </div>
            </a>
            <a href="./static/files/GBHS_Blood_Collection_Annotated_d20170821.docx" download class="list-group-item list-group-item-action d-flex align-items-center">
                <i class="fas fa-file-download me-3 text-primary"></i>
                <div>
                    <strong>Blood Collection</strong>
                    <small class="d-block text-muted">Form for blood sample collection</small>
                </div>
            </a>
            <a href="./static/files/GBHS_Breast_Biopsy_Annotated_WithV2_d20170821.docx" download class="list-group-item list-group-item-action d-flex align-items-center">
                <i class="fas fa-file-download me-3 text-primary"></i>
                <div>
                    <strong>Breast Tissue Biopsy Collection</strong>
                    <small class="d-block text-muted">Form for breast tissue biopsy collection</small>
                </div>
            </a>
        </div>
    `}

    document.getElementById("protocolPage").innerHTML = template;
    hideAnimation();
}
