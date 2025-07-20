import { addEventFilterBarToggle } from "../event.js";
import {
  defaultPageSize,
  getFile,
  shortenText,
  tsv2Json,
  selectProps,
  tsv2Json2,
  emailsAllowedToUpdateData
} from "./../shared.js";
import { pageNavBar } from "../components/navBarMenuItems.js";
import { downloadFiles } from "./dictionary.js";
let previousValue = "";

export const publicationNoSign = (modified_at) => {
  let template = `
  <div class="main-summary-row">
         <div class="row align-left w-100 m-0">
              <h1 class="col page-header pl-0 pt-2">Publications</h1>
                <div class="ml-auto allow-overflow mr-2" style="margin:1rem 0" id="pagesContainer"></div>
                <div class="ml-auto mt-3 mb-3 mr-2" id="pageSizeContainer"></div>
                <div class="ml-auto mt-3 mb-3" id="downloadContainer">
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
                <div class="main-summary-row pl-2">
                    <div class="col-xl-12 pb-2 pl-0 pr-0 white-bg div-border">
                        <div class="pt-0 pl-2 pb-2 pr-2 allow-overflow" style="height: calc(100vh - 190px) !important;min-height: 500px;" id="descriptionBody"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("overview").innerHTML = template;
  getDescription(false);
};

export const publication = (modified_at) => {
  let template = `
  <div class="main-summary-row">
         <div class="row align-left w-100 m-0">
              <h1 class="col page-header pl-0 pt-2">Publications</h1>
                <div class="ml-auto allow-overflow mr-2" style="margin:1rem 0" id="pagesContainer"></div>
                <div class="ml-auto mt-3 mb-3 mr-2" id="pageSizeContainer"></div>
                <div class="ml-auto mt-3 mb-3" id="downloadContainer">
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
                <div class="main-summary-row pl-2">
                    <div class="col-xl-12 pb-2 pl-0 pr-0 white-bg div-border">
                        <div class="pt-0 pl-2 pb-2 pr-2 allow-overflow" style="height: calc(100vh - 190px) !important;min-height: 500px;" id="descriptionBody"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("overview").innerHTML = template;
  getDescription(true);
};

export const publicationAdmin = (modified_at) => {
  let template = `
  <div class="main-summary-row">
         <div class="row align-left w-100 m-0">
              <h1 class="col page-header pl-0 pt-2">Publications</h1>
                <div class="ml-auto allow-overflow mr-2" style="margin:1rem 0" id="pagesContainer"></div>
                <div class="ml-auto mt-3 mb-3 mr-2" id="pageSizeContainer"></div>
                <div class="ml-auto mt-3 mb-3" id="downloadContainer">
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

          <a id="updateToGithub" href="https://github.com/episphere/dataplatform/tree/production/imports" target="__blank" class="btn btn-outline-dark" data-backdrop="static">Github Page
          </a>
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
                <!---<div class="main-summary-row pl-2" style="min-height: 10px;margin-bottom: 1rem;">
                    <div class="col white-bg div-border align-left font-size-17" style="padding: 0.5rem;" id="listFilters">
                        <span class="font-bold">Region:</span> All
                    </div>
                </div>--->
                <div class="main-summary-row pl-2">
                    <div class="col-xl-12 pb-2 pl-0 pr-0 white-bg div-border">
                        <div class="pt-0 pl-2 pb-2 pr-2 allow-overflow" style="height: calc(100vh - 190px) !important;min-height: 500px;" id="descriptionBody"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("overview").innerHTML = template;
  getDescriptionAdmin(true);
};

const getDescription = async (signedIn) => {
  const data = await (await fetch("https://raw.githubusercontent.com/episphere/GhanaDataPlatforms/main/static/data/EABCS_Publications.txt")).text();
  const tsv = tsv2Json2(data);
  const json = tsv.data;
  const headers = tsv.headers;

  const allJournals = [];
  Object.values(json).forEach((dt) => {
    if (dt["journal_name"] === undefined) return;
    dt["journal_name"].split(",").forEach((ctr) => {
        if (ctr.trim()) allJournals.push(ctr.trim());
    });
  });

  const allRestrictions = [];
  Object.values(json).forEach((dt) => {
    if (dt["res"] === undefined) return;
    dt["res"].split(",").forEach((ctr) => {
        if (ctr.trim()) allRestrictions.push(ctr.trim());
    });
  });

  const uniqueJournals = allJournals
    .filter((d, i) => d && allJournals.indexOf(d.trim()) === i)
    .sort();

  let filterTemplate = `
        <div class="main-summary-row">
            <div style="width: 100%;">
                <div class="form-group" margin:0px>
                    <div id="searchContainer"></div>
                </div>
            </div>
        </div>
        `;
  filterTemplate += `
        <div class="main-summary-row">
            <div style="width: 100%;">
                <div class="form-group" margin:0px>
                    <label class="filter-label font-size-13" for="journalsList">Journal</label>
                    <ul class="remove-padding-left font-size-15 filter-sub-pub-div allow-overflow" id="journalsList">
                        `;
  uniqueJournals.forEach((journ) => {
    filterTemplate += `
                <li class="filter-list-item">
                    <input type="checkbox" data-journal="${journ}" id="label${journ}" class="select-journal" style="margin-left: 2px !important; margin-right: 2px !important">
                    <label for="label${journ}" class="journal-name" title="${journ}">${shortenText(journ,25)}</label>
                </li>
            `;
  });
  // filterTemplate += `
  //                 </ul>
  //                   <label class="filter-label font-size-13" for="restrictionsList">Restrictions</label>
  //                   <ul class="remove-padding-left font-size-15 filter-sub-div allow-overflow" id="restrictionsList">
  //                     <li class="filter-list-item">
  //                         <input type="checkbox" data-restrictions="nores" id="labelnores" class="select-restrictions" style="margin-left: 1px !important;">
  //                         <label for="labelnores" class="restrictions-name" title="nores">No Restrictions</label>
  //                     </li>
  //                     <li class="filter-list-item">
  //                         <input type="checkbox" data-restrictions="hmb" id="labelhmb" class="select-restrictions" style="margin-left: 1px !important;">
  //                         <label for="labelhmb" class="restrictions-name" title="hmb">Health/Medical/Biomedical</label>
  //                     </li>
  //                     <li class="filter-list-item">
  //                         <input type="checkbox" data-restrictions="ngm" id="labelngm" class="select-restrictions" style="margin-left: 1px !important;">
  //                         <label for="labelngm" class="restrictions-name" title="ngm">No General Methods</label>
  //                     </li>
  //                     <li class="filter-list-item">
  //                         <input type="checkbox" data-restrictions="nfp" id="labelnfp" class="select-restrictions" style="margin-left: 1px !important;">
  //                         <label for="labelnfp" class="restrictions-name" title="nfp">Not for Profit Use Only</label>
  //                     </li>
  //                     <li class="filter-list-item">
  //                         <input type="checkbox" data-restrictions="gru" id="labelgru" class="select-restrictions" style="margin-left: 1px !important;">
  //                         <label for="labelgru" class="restrictions-name" title="gru">General Research Use</label>
  //                     </li>
  //                     <li class="filter-list-item">
  //                         <input type="checkbox" data-restrictions="dsr" id="labeldsr" class="select-restrictions" style="margin-left: 1px !important;">
  //                         <label for="labeldsr" class="restrictions-name" title="dsr">Disease-Specific Research</label>
  //                     </li>
  //           `;
  filterTemplate += `
                    </ul>
                </div>
            </div>
        </div>
    `;
  document.getElementById("filterDataCatalogue").innerHTML = filterTemplate;
  // const descriptions = Object.values(json);
  document.getElementById("searchContainer").innerHTML = `
    <div class="input-group">
        <input type="search" class="form-control rounded" autocomplete="off" placeholder="Search min. 3 characters" aria-label="Search" id="searchDataCatalog" aria-describedby="search-addon" />
        <span class="input-group-text border-0 search-input">
            <i class="fas fa-search"></i>
        </span>
    </div>
    `;
  addEventFilterDataCatalogue(json, headers);
  downloadFiles(json, headers, "study_description", true);
  renderStudyDescription(json, defaultPageSize, headers, signedIn);
  paginationHandler(json, defaultPageSize, headers);
  document.getElementById("pageSizeContainer").innerHTML = pageSizeTemplate(
    json,
    defaultPageSize
  );
  addEventPageSizeSelection(json, headers);
  addEventFilterBarToggle();
};

const getDescriptionAdmin = async (signedIn) => {
  //const data = await (await fetch("https://raw.githubusercontent.com/episphere/dataplatform/production/imports/DCEG_Publications.tsv")).text();
  const data = await getFile(1506807971290);
  const tsv = tsv2Json2(data);
  const json = tsv.data;
  const headers = tsv.headers;
  // json.forEach((obj) => {
  //   if (obj["nores"] === "true") obj["nores"] = "No Restrictions";
  //   if (obj["hmb"] === "true") obj["hmb"] = "Health/Medical/Biomedical";
  //   if (obj["ngm"] === "true") obj["ngm"] = "No General Methods";
  //   if (obj["nfp"] === "true") obj["nfp"] = "Not for Profit Use Only";
  //   if (obj["gru"] === "true") obj["gru"] = "General Research Use";
  //   if (obj["dsr"] === "true") obj["dsr"] = "Disease-Specific Research";
  //   if (obj["dsr_value"] === undefined) obj["dsr_value"] = "False";
  // });

  const allJournals = [];
  Object.values(json).forEach((dt) => {
    if (dt["journal_name"] === undefined) return;
    dt["journal_name"].split(",").forEach((ctr) => {
        if (ctr.trim()) allJournals.push(ctr.trim());
    });
  });

  const allRestrictions = [];
  Object.values(json).forEach((dt) => {
    if (dt["res"] === undefined) return;
    dt["res"].split(",").forEach((ctr) => {
        if (ctr.trim()) allRestrictions.push(ctr.trim());
    });
  });

  const uniqueJournals = allJournals
    .filter((d, i) => d && allJournals.indexOf(d.trim()) === i)
    .sort();
  
  const uniqueRestrictions = allRestrictions
    .filter((d, i) => d && allRestrictions.indexOf(d.trim()) === i)
    .sort();

  const allTitles = Object.values(json).map((dt) => dt["title"]);

  // const countries = allCountries
  //   .filter((d, i) => allCountries.indexOf(d) === i)
  //   .sort();
  const uniqueTitles = allTitles
    .filter((d, i) => d && allTitles.indexOf(d.trim()) === i)
    .sort();

  let filterTemplate = `
        <div class="main-summary-row">
            <div style="width: 100%;">
                <div class="form-group" margin:0px>
                    <div id="searchContainer"></div>
                </div>
            </div>
        </div>
        `;
  filterTemplate += `
        <div class="main-summary-row">
            <div style="width: 100%;">
                <div class="form-group" margin:0px>
                    <label class="filter-label font-size-13" for="journalsList">Journal</label>
                    <ul class="remove-padding-left font-size-15 filter-sub-div allow-overflow" id="journalsList">
                        `;
  uniqueJournals.forEach((journ) => {
    filterTemplate += `
                <li class="filter-list-item">
                    <input type="checkbox" data-journal="${journ}" id="label${journ}" class="select-journal" style="margin-left: 1px !important;">
                    <label for="label${journ}" class="journal-name" title="${journ}">${shortenText(journ,25)}</label>
                </li>
            `;
  });

  filterTemplate += `
          </ul>
            <label class="filter-label font-size-13" for="restrictionsList">Restrictions</label>
              <ul class="remove-padding-left font-size-15 filter-sub-div allow-overflow" id="restrictionsList">`

  uniqueRestrictions.forEach((res) => {
  filterTemplate += `
                      <li class="filter-list-item">
                          <input type="checkbox" data-restrictions="${res}" id="label${res}" class="select-restrictions" style="margin-left: 1px !important;">
                          <label for="label${res}" class="restrictions-name" title="${res}">${res}</label>
                      </li>
            `;
    })
  filterTemplate += `
                    </ul>
                </div>
            </div>
        </div>
    `;
  document.getElementById("filterDataCatalogue").innerHTML = filterTemplate;
  // const descriptions = Object.values(json);
  document.getElementById("searchContainer").innerHTML = `
    <div class="input-group">
        <input type="search" class="form-control rounded" autocomplete="off" placeholder="Search min. 3 characters" aria-label="Search" id="searchDataCatalog" aria-describedby="search-addon" />
        <span class="input-group-text border-0 search-input">
            <i class="fas fa-search"></i>
        </span>
    </div>
    `;
  addEventFilterDataCatalogue(json, headers);
  downloadFiles(json, headers, "study_description", true);
  renderStudyDescription(json, defaultPageSize, headers, signedIn);
  paginationHandler(json, defaultPageSize, headers);
  document.getElementById("pageSizeContainer").innerHTML = pageSizeTemplate(
    json,
    defaultPageSize
  );
  addEventPageSizeSelection(json, headers);
  addEventFilterBarToggle();
};

const renderStudyDescription = (descriptions, pageSize, headers, signedIn) => {
  let template = "";
  const newDesc = descriptions.map(selectProps("title", "date", "first author", "journal_name", "doi", "all authors"));
	
  let uniqueTitles = [...new Map(newDesc.map((item) => [item["title"], item])).values()];
  // const allTitles = Object.values(newDesc).map((dt) => [dt["title"], dt["date"], dt["author"], dt["journal_name"], dt["journal_acro"]]);
  // let set = new Set(allTitles.map(JSON.stringify));
  // let uniqueTitles = Array.from(set).map(JSON.parse);
  // const countries = allCountries
  //   .filter((d, i) => allCountries.indexOf(d) === i)
  //   .sort();
  //const uniqueTitles = allTitles.filter((d, i) => d && allTitles.indexOf(d.trim()) === i).sort();


  if (descriptions.length > 0) {
    template = `
        <div class="row m-0 pt-2 pb-2 align-left div-sticky" style="border-bottom: 1px solid rgb(0,0,0, 0.1);">
            <div class="col-md-7 font-bold ws-nowrap pl-2">Title of Publication <button class="transparent-btn sort-column" data-column-name="title"><i class="fas fa-sort"></i></button></div>
            <div class="col-md-2 font-bold ws-nowrap">First Author <button class="transparent-btn sort-column" data-column-name="first author"><i class="fas fa-sort"></i></button></div>
            <div class="col-md-2 font-bold ws-nowrap">Publication Date <button class="transparent-btn sort-column" data-column-name="date"><i class="fas fa-sort"></i></button></div>
            <div class="col-md-1"></div>
        </div>`;
    uniqueTitles.forEach((desc, index) => {
      if (index > pageSize) return;
      var desc2 = descriptions.filter((dt) => dt['title'] === desc["title"]);
        template += `
              <div class="card mt-1 mb-1 align-left">
                  <div style="padding: 10px" aria-expanded="false" id="heading${desc["title"].replace(/\s+/g,"").replace(/[^a-zA-Z ]/g, "")}">
                      <div class="row">
                          <div class="col-md-7">${
                            desc["title"] ? desc["title"] : ""
                          }</div>
                          <div class="col-md-2">${
                            desc["first author"] ? desc["first author"] : ""
                          }</div>
                          <div class="col-md-2">${
                            desc["date"] ? desc["date"].split('/').pop() : ""
                          }</div>
                          <div class="col-md-1">
                              <button title="Expand/Collapse" class="transparent-btn collapse-panel-btn" data-toggle="collapse" data-target="#study${desc["title"].replace(/\s+/g,"").replace(/[^a-zA-Z ]/g, "")}">
                                  <i class="fas fa-caret-down fa-2x"></i>
                              </button>
                          </div>`
      // if(signedIn) {
      //   template += `
      //                     <div class-"col-md-1">
      //                       <button title="Link To Data Access" class="buttonsubmit" data-id='{"title": "${desc["title"]}", "author": "${desc["author"]}", "date": "${desc["date"]}", "journal": "${desc["journal_name"]}"}' onClick="localStorage.setItem('dataSelected', JSON.stringify($(this).data('id'))); window.location.href = '#data_access/form'"><span class="buttonsubmit__text"> Request Data </span></button>
      //                     </div>
      //                     `
      // } else {
      //   template += `
      //   <div class-"col-md-1">
      //     <a href="#dataAccessHowTo"><button title="Please Log In" class="buttonsubmit"><span class="buttonsubmit__text"> Data Access Process </span></button></a>
      //   </div>
      //   `
      // }
        template += `
                      </div>
                  </div>
                  <div id="study${desc["title"].replace(/\s+/g,"").replace(/[^a-zA-Z ]/g, "")}" class="collapse" aria-labelledby="heading${desc["title"]}">
                      <div class="card-body" style="padding-left: 10px;background-color:#f6f6f6;">
                      ${
                        desc["journal_name"]
                          ? `<div class="row mb-1 m-0"><div class="col-md-3 font-bold">Journal</div><div class="col">${desc["journal_name"]}</div></div>`
                          : ``
                      }
                      ${
                        desc["journal_acro"]
                          ? `<div class="row mb-1 m-0"><div class="col-md-3 font-bold">Journal Acronym</div><div class="col">${desc["journal_acro"]}</div></div>`
                          : ``
                      }
                      ${
                        desc["all authors"]
                          ? `<div class="row mb-1 m-0"><div class="col-md-3 font-bold">Authors</div><div class="col">${desc["all authors"]}</div></div>`
                          : ``
                      }
                      ${
                        desc["doi"]
                          ? `<div class="row mb-1 m-0"><div class="col-md-3 font-bold">doi</div><div class="col"><a href=${desc["doi"]} target="__blank">${desc["doi"]}</a></div></div>`
                          : ``
                      }`

        template += `
                      </div>
                  </div>
              </div>`;
    });
  } else {
    template += "Data not found!";
  }
  document.getElementById("descriptionBody").innerHTML = template;
  addEventToggleCollapsePanelBtn();
  addEventSortColumn(descriptions, pageSize, headers);
};

// const addEventSortColumn = (descriptions, pageSize, headers) => {
//   const btns = document.getElementsByClassName("sort-column");
//   Array.from(btns).forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const columnName = btn.dataset.columnName;
//       descriptions = descriptions.sort((a, b) =>
//         a[columnName] > b[columnName]
//           ? 1
//           : b[columnName] > a[columnName]
//           ? -1
//           : 0
//       );
//       renderStudyDescription(descriptions, pageSize, headers);
//     });
//   });
// };

const addEventSortColumn = (descriptions, pageSize, headers) => {
  const btns = document.getElementsByClassName("sort-column");
  Array.from(btns).forEach((btn) => {
    btn.addEventListener("click", () => {
      const sortDirection = !btn.classList.contains("sort-column-asc") ? 1 : -1;
      const columnName = btn.dataset.columnName;
      descriptions = descriptions.sort((a, b) =>
        a[columnName] > b[columnName]
          ? 1 * sortDirection
          : b[columnName] > a[columnName]
          ? -1 * sortDirection
          : 0
      );
      btn.classList.remove("sort-column-asc", "sort-column-desc");

      renderStudyDescription(descriptions, pageSize, headers);

      if (sortDirection === 1) {
        document
          .querySelectorAll(`[data-column-name="${columnName}"]`)[0]
          .classList.add("sort-column-asc");
      } else {
        document
          .querySelectorAll(`[data-column-name="${columnName}"]`)[0]
          .classList.add("sort-column-desc");
      }
    });
  });
};

const addEventFilterDataCatalogue = (descriptions, headers) => {
  // const consortiumTypeSelection =
  //   document.getElementsByClassName("select-consortium");
  // Array.from(consortiumTypeSelection).forEach((ele) => {
  //   ele.addEventListener("click", () => {
  //     filterDataBasedOnSelection(descriptions, headers);
  //   });
  // });

  const journalSelection = document.getElementsByClassName("select-journal");
  Array.from(journalSelection).forEach((ele) => {
    ele.addEventListener("click", () => {
      filterDataBasedOnSelection(descriptions, headers);
    });
  });

  const restrictionsSelection = document.getElementsByClassName("select-restrictions");
  Array.from(restrictionsSelection).forEach((ele) => {
    ele.addEventListener("click", () => {
      filterDataBasedOnSelection(descriptions, headers);
    });
  });

  const input = document.getElementById("searchDataCatalog");
  input.addEventListener("input", () => {
    filterDataBasedOnSelection(descriptions, headers);
  });
};

const addEventFilterDMSPCatalogue = (descriptions, headers) => {
  // const consortiumTypeSelection =
  //   document.getElementsByClassName("select-consortium");
  // Array.from(consortiumTypeSelection).forEach((ele) => {
  //   ele.addEventListener("click", () => {
  //     filterDataBasedOnSelection(descriptions, headers);
  //   });
  // });

  const input = document.getElementById("searchDataCatalog");
  input.addEventListener("input", () => {
    filterDataBasedOnSelection(descriptions, headers);
  });
};

export const addEventToggleCollapsePanelBtn = () => {
  const btns = document.getElementsByClassName("collapse-panel-btn");
  Array.from(btns).forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.querySelector(".fas.fa-2x").classList.contains("fa-caret-down")) {
        btn.querySelector(".fas.fa-2x").classList.remove("fa-caret-down");
        btn.querySelector(".fas.fa-2x").classList.add("fa-caret-up");
      } else {
        btn.querySelector(".fas.fa-2x").classList.remove("fa-caret-up");
        btn.querySelector(".fas.fa-2x").classList.add("fa-caret-down");
      }
    });
  });
};

const filterDataBasedOnSelection = (descriptions, headers) => {
  // const consortiumSelected = Array.from(
  //   document.getElementsByClassName("select-consortium")
  // )
  //   .filter((dt) => dt.checked)
  //   .map((dt) => dt.dataset.consortium);

  const journalSelected = Array.from(
    document.getElementsByClassName("select-journal")
  )
    .filter((dt) => dt.checked)
    .map((dt) => dt.dataset.journal);

  let filteredData = descriptions;

  if (journalSelected.length > 0) {
    filteredData = filteredData.filter(
      (dt) => journalSelected.indexOf(dt["journal_name"]) !== -1
    );
  }

  if (journalSelected.length === 0 ) filteredData = descriptions;
  const input = document.getElementById("searchDataCatalog");
  const currentValue = input.value.trim().toLowerCase();

  if (
    currentValue.length <= 2 &&
    (previousValue.length > 2 || previousValue.length === 0)
  ) {
    document.getElementById("pageSizeContainer").innerHTML = pageSizeTemplate(
      filteredData,
      defaultPageSize
    );
    renderStudyDescription(
      filteredData,
      document.getElementById("pageSizeSelector").value,
      headers
    );
    paginationHandler(
      filteredData,
      document.getElementById("pageSizeSelector").value,
      headers
    );
    addEventPageSizeSelection(filteredData, headers);
    return;
  }
  previousValue = currentValue;
  let searchedData = JSON.parse(JSON.stringify(filteredData));
  searchedData = searchedData.filter((dt) => {
    let found = false;
    if (dt["title"].toLowerCase().includes(currentValue)) found = true;
    if (dt["first author"].toLowerCase().includes(currentValue)) found = true;
    if (dt["date"].toLowerCase().includes(currentValue)) found = true;
    if (dt["journal_name"].toLowerCase().includes(currentValue)) found = true;
    if (dt["all authors"].toLowerCase().includes(currentValue)) found = true;
    if (found) return dt;
  });
  searchedData = searchedData.map((dt) => {
    dt["title"] = dt["title"].replace(
      new RegExp(currentValue, "gi"),
      "<b>$&</b>"
    );
    dt["first author"] = dt["first author"].replace(
      new RegExp(currentValue, "gi"),
      "<b>$&</b>"
    );
    dt["date"] = dt["date"].replace(
      new RegExp(currentValue, "gi"),
      "<b>$&</b>"
    );
    dt["journal_name"] = dt["journal_name"].replace(
      new RegExp(currentValue, "gi"),
      "<b>$&</b>"
    );
    // dt["nores"] = dt["nores"].replace(
    //   new RegExp(currentValue, "gi"),
    //   "<b>$&</b>"
    // );
    // dt["dsr_value"] = dt["dsr_value"].replace(
    //   new RegExp(currentValue, "gi"),
    //   "<b>$&</b>"
    // );
    return dt;
  });

  document.getElementById("pageSizeContainer").innerHTML = pageSizeTemplate(
    searchedData,
    defaultPageSize
  );
  renderStudyDescription(
    searchedData,
    document.getElementById("pageSizeSelector").value,
    headers
  );
  paginationHandler(
    searchedData,
    document.getElementById("pageSizeSelector").value,
    headers
  );
  addEventPageSizeSelection(searchedData, headers);
};

const paginationHandler = (data, pageSize, headers) => {
  const dataLength = data.length;
  const pages = Math.ceil(dataLength / pageSize);
  const array = [];

  for (let i = 0; i < pages; i++) {
    array.push(i + 1);
  }
  document.getElementById("pagesContainer").innerHTML =
    paginationTemplate(array);
  addEventPageBtns(pageSize, data, headers);
};

export const pageSizeTemplate = (array, startPageSize) => {
  const contentSize =
    Math.ceil(array.length / defaultPageSize) * defaultPageSize;
  let pageSizes = [];
  for (let i = startPageSize; i <= contentSize; i += defaultPageSize) {
    pageSizes.push(i);
  }
  let template = `
    <select class="form-control" id="pageSizeSelector">`;
  pageSizes.forEach((size) => {
    template += `<option value="${size}">${size}</option>`;
  });
  template += `</select>
    `;
  return template;
};

const addEventPageSizeSelection = (data, headers) => {
  const select = document.getElementById("pageSizeSelector");
  select.addEventListener("change", () => {
    const value = select.value;
    renderStudyDescription(data, value, headers);
    paginationHandler(data, value, headers);
  });
};

export const paginationTemplate = (array) => {
  let template = `
        <nav aria-label="Page navigation example">
            <ul class="pagination m-0">`;

  array.forEach((a, i) => {
    if (i === 0) {
      template += `<li class="page-item">
                            <button class="page-link transparent-btn" id="previousPage" data-previous="1" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                            </button>
                        </li>`;
    }
    template += `<li class="page-item"><button class="page-link transparent-btn ${
      i === 0 ? "active-page" : ""
    }" data-page=${a}>${a}</button></li>`;

    if (i === array.length - 1) {
      template += `
            <li class="page-item">
                <button class="page-link transparent-btn" id="nextPage" data-next="1" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
                </button>
            </li>`;
    }
  });
  template += `
            </ul>
        </nav>
    `;
  return template;
};

export const dataPagination = (start, end, data) => {
  const paginatedData = [];
  for (let i = start; i < end; i++) {
    if (data[i]) paginatedData.push(data[i]);
  }
  return paginatedData;
};

const addEventPageBtns = (pageSize, data, headers) => {
  const elements = document.getElementsByClassName("page-link");
  Array.from(elements).forEach((element) => {
    element.addEventListener("click", () => {
      let previous = parseInt(element.dataset.previous);
      let next = parseInt(element.dataset.next);
      if (previous && !isNaN(previous) && previous === 1)
        previous = document.querySelectorAll("[data-page]").length + 1;
      if (
        next &&
        !isNaN(next) &&
        next === document.querySelectorAll("[data-page]").length
      )
        next = 0;
      const pageNumber = !isNaN(previous)
        ? previous - 1
        : !isNaN(next)
        ? next + 1
        : element.dataset.page;
      if (pageNumber < 1 || pageNumber > Math.ceil(data.length / pageSize))
        return;

      if (!element.classList.contains("active-page")) {
        let start = (pageNumber - 1) * pageSize;
        let end = pageNumber * pageSize;
        document.getElementById("previousPage").dataset.previous = pageNumber;
        document.getElementById("nextPage").dataset.next = pageNumber;
        renderStudyDescription(
          dataPagination(start, end, data),
          document.getElementById("pageSizeSelector").value,
          headers
        );
        Array.from(elements).forEach((ele) =>
          ele.classList.remove("active-page")
        );
        document
          .querySelector(`button[data-page="${pageNumber}"]`)
          .classList.add("active-page");
      }
    });
  });
};
