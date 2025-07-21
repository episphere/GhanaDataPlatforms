//Changes required regarding dictionary
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
let previousValue = "";

/**
 * Checks if a row appears to be a merged header row rather than a data row
 * @param {Object} row - The row object from the Excel sheet
 * @returns {boolean} - True if the row appears to be a merged header row
 */
const isMergedRow = (row) => {
    // Get all keys in the row
    const keys = Object.keys(row);
    
    // If the row has very few columns compared to what we expect, it might be a merged row
    if (keys.length < 2) {
        return true;
    }
    
    return false;
};

export const dataDictionaryTemplate = async () => {
  // const data = await (await fetch("static/GBHS_dataDictionary_Core+NewVar_16sep24.xlsx"));
  const data = await (await fetch("static/GBHS_dataplatform_DataDictionary_17June.xlsx"));
  console.log(data);
  // console.log(data);
  // const tsvData = tsv2Json(data);
  // console.log(tsvData);
  // tsvData.data.forEach(function(record) {
  //   record.Category = record.Category.replace('\n', '');
  //   if (record.Coding) {
  //     record.Coding = record.Coding.replaceAll('\n', '<br>');
  //     };
  //   }
  // );
  //let dictFile = 'static/GBHS_dataDictionary_Core+NewVar_16sep24.xlsx';
  //let data = await getFileXLSX(boxDictFile);
  //console.log(data);
  let file = await data.arrayBuffer();
  let workbook = XLSX.read(file);
  let worksheet = workbook.Sheets[workbook.SheetNames[0]];
  let raw_data = XLSX.utils.sheet_to_json(worksheet, {header: 1});
  // const allSheetData = [];
  // sheetData.forEach(row => {
  //           // Check if this row appears to have merged columns (header rows)
  //           // This typically happens when a row has a long text spanning multiple columns
  //           // and is missing most of the expected column values
  //           console.log(row);
  //           const isMergedHeaderRow = isMergedRow(row);
  //           console.log(isMergedHeaderRow)
            
  //           // Skip rows that appear to be merged header rows
  //           if (isMergedHeaderRow) {
  //               return;
  //           }
            
  //           // If Category is empty, use the last non-empty Category
  //           // if (!row.Category || row.Category.trim() === '') {
  //           //     row.Category = lastCategory;
  //           // } else {
  //           //     lastCategory = row.Category;
  //           // }
            
  //           allSheetData.push(row);
  //       });
  //const dictionary = allSheetData;

  let dictionary = array2Json(raw_data);
  
  // Modify Variable Category values containing 'riskfactors'
  dictionary.forEach(item => {
    if (item['Variable category '] && 
        item['Variable category '].toString().toLowerCase().replace(" ","").includes('riskfactors')) {
      item['Variable category '] = 'Risk Factors';
    }
  });
  
  //console.log(json_input);
  //const dictionary = tsvData.data;
  console.log(dictionary);
  // const headers = dictionary.headers;
  // console.log(headers);
  let headers =  [...new Set(dictionary.flatMap(Object.keys))];
  console.log(headers);
  let template = `
    <div class="col-xl-2 filter-column" id="summaryFilterSiderBar">
        <div class="div-border white-bg align-left p-2">
            <div class="main-summary-row">
                <div class="col-xl-12 pl-1 pr-0">
                    <span class="font-size-17 font-bold">Filter</span>
                    <div id="filterDataDictionary" class="align-left"></div>
                </div>
            </div>
        </div>
        <!---<button class='btn btn-primary' id='saveVars'>Save Variables</button>--->

    </div>
    <div class="col-xl-10 padding-right-zero" id="summaryStatsCharts">
        <button id="filterBarToggle"><i class="fas fa-lg fa-caret-left"></i></button>
        <div class="main-summary-row pl-2" style="min-height: 10px;margin-bottom: 1rem;">
            <div class="col white-bg div-border align-left font-size-17" style="padding: 0.5rem;" id="listFilters">
                <span class="font-bold">Variable Category:</span> All
            </div>
        </div>
        <div class="main-summary-row pl-2">
            <div class="col-xl-12 pb-2 pr-0 pl-0 white-bg div-border">
                <div class="allow-overflow" style="height: calc(100vh - 190px) !important;min-height: 500px;" id="dataDictionaryBody"></div>
            </div>
        </div>
    </div>
    `;
  document.getElementById("dataSummaryStatistics").innerHTML = template;
  renderDataDictionaryFilters(dictionary, headers);
  renderDataDictionary(dictionary, 60, headers);
  paginationHandler(dictionary, 60, headers);
  addEventFilterBarToggle();
  hideAnimation();
};

const saveVariables = () => {
  //Get all the checked data variables
  const vars = Array.from(
    document.getElementsByClassName("select-variable-type")
  );
  const varArr = [];
  vars.forEach((v) => {
    if (v.checked) {
      varArr.push(v.id.split("label")[1]);
    }
  });

  localStorage.setItem("dictionaryVars", varArr);
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
        renderDataDictionary(
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
    })
  });
}

const renderDataDictionaryFilters = (dictionary, headers) => {
  // var coreArray = Object.values(dictionary).filter(function (el) {
  //   return el.Category === "Participant Recruitment/Enrollment Variables";
  // });
  // var mamArray = Object.values(dictionary).filter(function (el) {
  //   return el.Category === "Demographic Data";
  // });
  // var incArray = Object.values(dictionary).filter(function (el) {
  //   return el.Category.trim() === "Biopsy and Case Diagnosis Data";
  // });
  // var riskArray = Object.values(dictionary).filter(function (el) {
  //   return el.Category.trim() === "Risk Factors";
  // });

  // const coreVariableType = coreArray.map((dt) => dt["Sub-Category"]);
  // const mamVariableType = mamArray.map((dt) => dt["Sub-Category"]);
  // const incVariableType = incArray.map((dt) => dt["Sub-Category"]);
  // //const allVariableType = Object.values(dictionary).map(dt => dt['Sub-Category']);
  // //const uniqueType = allVariableType.filter((d,i) => allVariableType.indexOf(d) === i).sort();
  // const coreuniqueType = coreVariableType
  //   .filter((d, i) => coreVariableType.indexOf(d) === i);
  //   // .sort();
  // const mamuniqueType = mamVariableType
  //   .filter((d, i) => mamVariableType.indexOf(d) === i);
  //   // .sort();
  // const incuniqueType = incVariableType
  //   .filter((d, i) => incVariableType.indexOf(d) === i);
  //   // .sort();
  const allVariableType = Object.values(dictionary).filter(dt => dt['Variable category ']).map(dt => dt['Variable category ']);
  const uniqueType = allVariableType.filter((d,i) => allVariableType.indexOf(d) === i);

  let template = '';
  template += `
  <div class="main-summary-row">
      <div style="width: 100%;">
          <div class="form-group" margin:0px>
              <div class="input-group">
                  <input type="search" class="form-control rounded" autocomplete="off" placeholder="Search min. 3 characters" aria-label="Search" id="searchDataDictionary" aria-describedby="search-addon" />
                  <!--<span class="input-group-text border-0 search-input">
                      <i class="fas fa-search"></i>
                  </span>-->
              </div>
          </div>
      </div>
  </div>
  <div class="main-summary-row">
      <div style="width: 100%;">
          <div class="form-group" margin:0px>
              <label class="filter-label font-size-13" for="variableTypeList">Variable Category </label>
              <ul class="remove-padding-left font-size-15 filter-sub-div allow-overflow" id="variableTypeList">
              `
              uniqueType.forEach(vt => {
                  template += `
                      <li class="filter-list-item">
                          <input type="checkbox" data-variable-type="${vt}" id="label${vt}" class="select-variable-type" style="margin-left: 1px !important;">
                          <label for="label${vt}" class="variable-type" title="${vt}">${shortenText(vt, 60)}</label>
                      </li>
                  `
              })
              template +=`
              </ul>
          </div>
      </div>
  </div>
  `
  document.getElementById("filterDataDictionary").innerHTML = template;
  addEventFilterDataDictionary(dictionary, headers);
  downloadFiles(dictionary, headers, "dictionary");
  document.getElementById("pageSizeContainer").innerHTML = pageSizeTemplate(dictionary,60);
  addEventPageSizeSelection(dictionary, headers);
};

const addEventPageSizeSelection = (data, headers) => {
  const select = document.getElementById("pageSizeSelector");
  select.addEventListener("change", () => {
    const value = select.value;
    renderDataDictionary(data, value, headers);
    paginationHandler(data, value, headers);
  });
};

const addEventFilterDataDictionary = (dictionary, headers) => {
  const variableTypeSelection = document.getElementsByClassName(
    "select-variable-type"
  );
  Array.from(variableTypeSelection).forEach((ele) => {
    ele.addEventListener("click", () => {
      filterDataBasedOnSelection(dictionary, headers);
    });
  });

  const input = document.getElementById("searchDataDictionary");
  input.addEventListener("input", () => {
    filterDataBasedOnSelection(dictionary, headers);
  });
};

const filterDataBasedOnSelection = (dictionary, headers) => {
  const highlightData = filterDataHandler(dictionary);
  const pageSize =
    highlightData.length < 60
      ? Math.floor(highlightData.length / 10) * 10 === 0
        ? 10
        : Math.floor(highlightData.length / 10) * 10
      : 60;
  paginationHandler(highlightData, pageSize);
  document.getElementById("pageSizeContainer").innerHTML = pageSizeTemplate(
    highlightData,
    pageSize
  );
  renderDataDictionary(highlightData, document.getElementById("pageSizeSelector").value, headers);
  addEventPageSizeSelection(highlightData);
  console.log(highlightData);
  console.log(pageSize);
};

const filterDataHandler = (dictionary) => {
  const variableTypeSelection = Array.from(
    document.getElementsByClassName("select-variable-type")
  )
    .filter((dt) => dt.checked)
    .map((dt) => dt.dataset.variableType);

  let filteredData = dictionary;
  if (variableTypeSelection.length > 0) {
    filteredData = filteredData.filter(
      dt => variableTypeSelection.indexOf(dt["Variable category "]) !== -1
    );
  }
  if (variableTypeSelection.length === 0) filteredData = dictionary;

  document.getElementById("listFilters").innerHTML = `
    ${
      variableTypeSelection.length > 0
        ? `
        <span class="font-bold">Variable Category: </span>${variableTypeSelection[0]} ${
            variableTypeSelection.length > 1
              ? `and <span class="other-variable-count">${
                  variableTypeSelection.length - 1
                } other</span>`
              : ``
          }
    `
        : `
        <span class="font-bold">Variable Category:</span> All`
    }
    `;

  const input = document.getElementById("searchDataDictionary");
  const currentValue = input.value.trim().toLowerCase();
  if (
    currentValue.length <= 2 &&
    (previousValue.length > 2 || previousValue.length === 0)
  ) {
    return filteredData;
  }
  previousValue = currentValue;
  let searchedData = JSON.parse(JSON.stringify(filteredData));
  searchedData = searchedData.filter((dt) => {
    console.log(dt["Variable Name"]);
    let found = false;
    if (dt['Variable Name']) {
      if (dt["Variable Name"].toLowerCase().includes(currentValue)) found = true;
    };
    if (dt["Data Type by Category"]) {
      if (dt["Data Type by Category"].toLowerCase().includes(currentValue)) found = true;
    }
    if (found) return dt;
  });
  let highlightData = JSON.parse(JSON.stringify(searchedData));
  highlightData.map((dt) => {
    dt["Variable Name"] = dt["Variable Name"].replace(
      new RegExp(currentValue, "gi"),
      "<b>$&</b>"
    );
    dt["Data Type by Category"] = dt["Data Type by Category"].replace(
      new RegExp(currentValue, "gi"),
      "<b>$&</b>"
    );
    return dt;
  });
  return highlightData;
};

const addEventSortColumn = (dictionary, pageSize, headers) => {
  const btns = document.getElementsByClassName("sort-column");
  Array.from(btns).forEach((btn) => {
    btn.addEventListener("click", () => {
      const sortDirection = !btn.classList.contains("sort-column-asc") ? 1 : -1;
      const columnName = btn.dataset.columnName;
      dictionary = dictionary.sort((a, b) =>
        a[columnName] > b[columnName]
          ? 1 * sortDirection
          : b[columnName] > a[columnName]
          ? -1 * sortDirection
          : 0
      );
      btn.classList.remove("sort-column-asc", "sort-column-desc");

      renderDataDictionary(dictionary, pageSize, headers);

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

const renderDataDictionary = (dictionary, pageSize, headers) => {
  let template = `
        <div class="row pt-md-3 pb-md-3 m-0 align-left div-sticky">
            <div class="col-md-11">
                <div class="row">
                    <div class="col-md-4 font-bold">Variable <button class="transparent-btn sort-column" data-column-name="Variable Name"><i class="fas fa-sort"></i></button></div>
                    <div class="col-md-5 font-bold">Category <button class="transparent-btn sort-column" data-column-name="Data Type by Category"><i class="fas fa-sort"></i></button></div>
                    <div class="col-md-3 font-bold">Variable category <button class="transparent-btn sort-column" data-column-name="Variable category "><i class="fas fa-sort"></i></button></div>
                </div>
            </div>
            <div class="ml-auto"></div>
        </div>
        <div class="row m-0 align-left allow-overflow w-100">
        `;
  dictionary.forEach((desc, index) => {
    //console.log(desc.Coding);
    if (index > pageSize) return;
    template += `
        <div class="card border-0 mt-1 mb-1 align-left w-100 pt-md-1 dictionaryData">
            <div class="pl-3 pt-1 pr-3 pb-1" aria-expanded="false" id="heading${desc["Variable Name"]}">
                <div class="row">
                    <div class="col-md-11">
                        <div class="row">
                            <div class="col-md-4">${
                              desc["Variable Name"] ? desc["Variable Name"] : ""
                            }</div>
                            <div class="col-md-5">${
                              desc["Data Type by Category"] ? desc["Data Type by Category"] : ""
                            }</div>
                            <div class="col-md-3">${
                              desc["Variable category "] ? desc["Variable category "] : ""
                            }</div>
                        </div>
                    </div>
                    <div class="ml-auto">
                        <div class="col-md-12"><button title="Expand/Collapse" class="transparent-btn collapse-panel-btn" data-toggle="collapse" 
                        data-target="#study${desc["Variable Name"] ? desc["Variable Name"].replace(/(<b>)|(<\/b>)/g,"") : ""}"><i class="fas fa-caret-down fa-2x"></i></button></div>
                    </div>
                </div>
            </div>
            <div id="study${desc["Variable Name"] ? desc["Variable Name"].replace(/(<b>)|(<\/b>)/g,"") : ""}" class="collapse" aria-labelledby="heading${desc["Variable Name"]}">
                <div class="card-body" style="padding-left: 10px;background-color:#f6f6f6;">
                    ${
                      desc["Data Source"]
                        ? `<div class="row mb-1 m-0"><div class="col-md-2 pl-2 font-bold">Data Source</div><div class="col">${desc["Data Source"]}</div></div>`
                        : ``
                    }
                   ${
                      desc["Question Text"]
                        ? `<div class="row mb-1 m-0"><div class="col-md-2 pl-2 font-bold">Question Text</div><div class="col">${desc["Question Text"]}</div></div>`
                        : ``
                    }
                    ${
                      desc["Variable Type"]
                        ? `<div class="row mb-1 m-0"><div class="col-md-2 pl-2 font-bold">Variable Type</div><div class="col">${desc["Variable Type"]}</div></div>`
                        : ``
                    }
                    ${
                      desc["Variable Length"]
                        ? `<div class="row mb-1 m-0"><div class="col-md-2 pl-2 font-bold">Variable Length</div><div class="col">${desc["Variable Length"]}</div></div>`
                        : ``
                    }
                    ${
                      desc["Derived variable macro Code"]
                        ? `<div class="row mb-1 m-0"><div class="col-md-2 pl-2 font-bold">Derived variable macro Code</div><div class="col">${desc["Derived variable macro Code"]}</div></div>`
                        : ``
                    }
                    ${
                      desc["Format/Value"]
                        ? `<div class="row mb-1 m-0"><div class="col-md-2 pl-2 font-bold">Format/Value</div><div class="col">${desc["Format/Value"]}</div></div>`
                        : ``
                    }
                `;
    template += `
                </div>
            </div>
        </div>`;
  });
  template += `</div>`;
  document.getElementById("dataDictionaryBody").innerHTML = template;
  addEventToggleCollapsePanelBtn();
  addEventSortColumn(dictionary, pageSize, headers);
};

export const downloadFiles = (data, headers, fileName, studyDescription) => {
  if (studyDescription) {
    let flatArray = [];
    headers.splice(headers.indexOf("PI"), 1);
    headers.splice(headers.indexOf("PI_Email"), 1);
    data.forEach((dt) => {
      if (dt.pis) {
        const flatObj = {
          ...dt,
        };
        dt.pis.forEach((obj, index) => {
          const piColumnName = `PI_${index + 1}`;
          const piEmailColumnName = `PI_Email_${index + 1}`;
          flatObj[piColumnName] = obj.PI;
          flatObj[piEmailColumnName] = obj.PI_Email;
          if (headers.indexOf(piColumnName) === -1) headers.push(piColumnName);
          if (headers.indexOf(piEmailColumnName) === -1)
            headers.push(piEmailColumnName);
        });
        flatArray.push(flatObj);
      } else flatArray.push(dt);
    });
    data = flatArray;
  }
  const downloadDictionaryCSV = document.getElementById("downloadDictionaryCSV");
  downloadDictionaryCSV.addEventListener("click", e => {
    e.stopPropagation();
    const csvContent = json2other(data, headers).replaceAll('<br>', '; ').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replace(/(<b>)|(<\/b>)/g, '');
    // const encodedUri = encodeURI(csvContent);
    // console.log(encodedUri);
    // const link = document.createElement("a");
    // link.setAttribute("href", encodedUri);
    // link.setAttribute("download", `${fileName}.csv`);
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    const blob = new Blob([csvContent], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute('href', url);
    a.setAttribute('download', `${fileName}.csv`);
    a.click();
    a.removeAttribute('download');
  });

  const downloadDictionaryTSV = document.getElementById(
    "downloadDictionaryTSV"
  );
  downloadDictionaryTSV.addEventListener("click", (e) => {
    e.stopPropagation();
    let tsvContent = json2other(data, headers, true).replaceAll('<br>', '; ').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replace(/(<b>)|(<\/b>)/g, "");
    // const encodedUri = encodeURI(tsvContent);
    // const link = document.createElement("a");
    // link.setAttribute("href", encodedUri);
    // link.setAttribute("download", `${fileName}.tsv`);
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    const blob = new Blob([tsvContent], {type: 'text/tsv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute('href', url);
    a.setAttribute('download', `${fileName}.tsv`);
    a.click();
    a.removeAttribute('download');
  });
};
