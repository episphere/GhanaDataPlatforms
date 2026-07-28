import {
  getAppAssetUrl,
  hideAnimation,
  loadPdfIntoIframe
} from "../shared.js";
import { pageNavBar } from "../components/navBarMenuItems.js";

export const moopSummary = (activeTab, pageHeader) => {
  const navBarItems = pageNavBar(
    "about",
    activeTab,
    "Overview",
    "Study Team Members",
    "Study Questionaire",
    "MOOP"
  );

  return `
        <div class="general-bg align-left">
            <div class="container">
                ${navBarItems}
            </div>
            <div class="container2 body-min-height">
                <div class="main-summary-row" style="margin-top: 10px; margin-bottom: 10px;">
                    <div class="col-xl-3 filter-column black-font" id="moopFilterSidebar">
                        <div class="div-border white-bg align-left p-2">
                            <div class="p-2 border-bottom">
                                <span class="font-size-17 font-bold">Table of Contents</span>
                            </div>
                            <div id="moopTOC" class="align-left mt-2" style="max-height: calc(100vh - 250px); overflow-y: auto;"></div>
                        </div>
                    </div>
                    <div class="col-xl-9 padding-right-zero padding-left-1" id="moopContentArea">
                        <div class="main-summary-row">
                            <div class="col-xl-12 pb-2 pe-0 ps-0 white-bg div-border align-left">
                                <div class="p-4" id="moopBody" style="height: calc(100vh - 190px) !important; overflow-y: auto;">
                                    <div id="moopActualContent" class="align-left">
                                        <h1 class="page-header">${pageHeader}</h1>
                                        <p>Select a chapter from the Table of Contents to view its content.</p>
                                        <p>The Manual of Operations and Procedures (MOOP) provides detailed guidelines and protocols for the Ghana Breast Health Study.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const moopChapters = [
    { id: "c1", title: "Chapter 1: Introduction", file: "C1_V2 0_FINAL.pdf" },
    { id: "c2", title: "Chapter 2: Staff Responsibilities", file: "C2_V2 0_FINAL.pdf" },
    { id: "c3", title: "Chapter 3: Recruitment & Eligibility", file: "C3_V2 0_FINAL.pdf" },
    { id: "c4", title: "Chapter 4: Informed Consent", file: "C4_V2 0_FINAL.pdf" },
    { id: "c5", title: "Chapter 5: Risk Factor Questionnaire", file: "C5_V2 0_FINAL.pdf" },
    { id: "c6", title: "Chapter 6: Anthropometry", file: "C6_V2 0_FINAL.pdf" },
    { id: "c7", title: "Chapter 7: Preparing for Biospecimens", file: "C7_V2 0_FINAL.pdf" },
    { id: "c8", title: "Chapter 8: Saliva Collection", file: "C8_V2 0_FINAL.pdf" },
    { id: "c9", title: "Chapter 9: Stool Collection", file: "C9_V2 0_FINAL.pdf" },
    { id: "c10", title: "Chapter 10: Blood Collection", file: "C10_V2 0_FINAL.pdf" },
    { id: "c11", title: "Chapter 11: Breast Tissue Biopsies", file: "C11_V2 0_FINAL.pdf" },
    { id: "c12", title: "Chapter 12: Shipping Biospecimens", file: "C12_V2 0_FINAL.pdf" },
    { id: "c13", title: "Chapter 13: Reporting Adverse Events", file: "C13_V2 0_FINAL.pdf" },
    { id: "c14", title: "Chapter 14: Medical Record Abstraction", file: "C14_V2 0_FINAL.pdf" },
    { id: "c15", title: "Chapter 15: Reports & Quality Control", file: "C15_V2 0_FINAL.pdf" },
    { id: "c16", title: "Chapter 16: Data Entry & Transmittal", file: "C16_V2 0_FINAL.pdf" },
    { id: "c17", title: "Chapter 17: Data Management", file: "C17_V2 0_FINAL.pdf" }
];

export const moopTemplate = async () => {
    const tocContainer = document.getElementById("moopTOC");
    if (!tocContainer) return;

    let tocHtml = `<div class="list-group list-group-flush">`;
    moopChapters.forEach(chapter => {
        tocHtml += `
            <button type="button" class="list-group-item list-group-item-action moop-toc-item border-0" data-file="${chapter.file}" data-title="${chapter.title}">
                ${chapter.title}
            </button>
        `;
    });
    tocHtml += `</div>`;
    tocContainer.innerHTML = tocHtml;

    const tocItems = document.getElementsByClassName("moop-toc-item");
    Array.from(tocItems).forEach(item => {
        item.addEventListener("click", () => {
            const file = item.dataset.file;
            const title = item.dataset.title;
            renderChapter(file, title);
            
            // Update active state
            Array.from(tocItems).forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });

    hideAnimation();
};

const renderChapter = async (file, title) => {
    const contentArea = document.getElementById("moopActualContent");
    const pdfUrl = getAppAssetUrl(`MOOP/${file}`);

    contentArea.innerHTML = `
        <div class="mb-4 border-bottom pb-2">
            <h2 class="m-0">${title}</h2>
        </div>
        
        ${renderPdfContent(title)}
        
        <div class="mt-4 pt-3 border-top">
            <a href="${pdfUrl}" target="_blank" class="btn btn-sm btn-link text-primary p-0">
                <i class="fas fa-download me-1"></i> Download original PDF
            </a>
        </div>
    `;

    await loadPdfIntoIframe("moopPdfViewer", pdfUrl);
};

const renderPdfContent = (title) => {
    return `
        <div class="div-border" style="height: calc(100vh - 350px);">
            <iframe id="moopPdfViewer" title="${title} PDF" width="100%" height="100%" style="border: none;"></iframe>
        </div>
    `;
};

