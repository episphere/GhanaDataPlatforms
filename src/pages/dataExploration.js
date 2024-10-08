import {
  getFile,
  showAnimation,
  hideAnimation,
  csv2Json,
  numberWithCommas,
  emailsAllowedToUpdateData,
  getFileInfo,
  missingnessStatsFileId,
  missingnessStatsCasesFileId,
  reSizePlots,
  applicationURLs,
  tsv2Json
} from "../shared.js";
import {
  addEventConsortiumSelect,
  getSelectedStudies,
} from "../visualization.js";
import {
  addEventVariableDefinitions,
  addEventFilterBarToggle,
  addEventMissingnessFilterBarToggle,
} from "../event.js";
import { variables as CONSTANTS } from "../variables.js";
//import {graphVariables} from "../graphVariables.js";

import { pageNavBar } from "../components/navBarMenuItems.js";

export const dataSummary = (
  pageHeader,
  showPages,
  subCases,
  showUpdateButton,
  publicAccess
) => {
  return `
        <div class="general-bg">
            <div class="container2 body-min-height">
                ${
                  publicAccess
                    ? pageNavBar("data_exploration", "dictionary", "Dictionary")
                    : pageNavBar(
                        "data_exploration",
                        "summary",
                        "Dictionary",
                        "Summary Statistics",
                        "Subset Statistics"
                      )
                } 
                
                <div class="main-summary-row">
                    <div class="row align-left w-100 m-0">
                        <h1 class="col page-header pl-0 pt-2">${pageHeader}</h1>
                        ${
                          showPages
                            ? `
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
                        `
                            : ``
                        }   
                    </div>
                </div>
                
                ${
                  showUpdateButton &&
                  localStorage.parms &&
                  JSON.parse(localStorage.parms).login &&
                  emailsAllowedToUpdateData.indexOf(
                    JSON.parse(localStorage.parms).login
                  ) !== -1
                    ? `
                    <div class="main-summary-row">
                      <button id="updateSummaryStatsData" class="btn btn-outline-dark" aria-label="Update summary stats data" data-keyboard="false" data-backdrop="static" data-toggle="modal" data-target="#confluenceMainModal">Update data</button>
                      <button id="createaccessStats" class="btn btn-outline-dark" aria-label="Create access stats CSV" data-keyboard="false" data-backdrop="static" data-toggle="modal" data-target="#confluenceMainModal">Create Access Stats</button>
                    </div>
                `
                    : ``
                }
                <div class="main-summary-row" id="dataSummaryStatistics"></div>
                <div class="main-summary-row">
                    <div class="col p-0">
                        <div class="offset-xl-2 pl-4 align-left" id="dataLastModified"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

export const dataSummaryStatisticsTemplate = () => {
  let template = "";
  template = `
    <div class="col-xl-2 filter-column" id="summaryFilterSiderBar">
        <div class="card">
            <div class="card-header align-left card-filter-header">
                <strong class="side-panel-header font-size-17">Filter</strong>
            </div>
            <div id="cardContent" class="card-body">
                <div id="allFilters" class="align-left"></div>
            </div>
        </div>
    </div>
    <div class="col-xl-10 padding-right-zero" id="summaryStatsCharts">
        <button id="filterBarToggle"><i class="fas fa-lg fa-caret-left"></i></button>
        <div class="main-summary-row pl-2" style="min-height: 10px;margin-bottom: 1rem;">
            <div class="col white-bg div-border align-left font-size-17" style="padding: 0.5rem;" id="participantCount">
                <p id='participantCount'></p>
            </div>
        </div>

        <div class="main-summary-row" id="chartRow1"></div>
        <div class="main-summary-row" id="chartRow2"></div>

    </div>
    `;
  document.getElementById("dataSummaryStatistics").innerHTML = template;
  addEventFilterBarToggle();
};

/**
 * 1. title must be string
 * 2. value => array[string]
 *
 * @param {string} title
 * @param {string[]} value
 * @returns html template
 */
const filterItemTemplate = (title, values) => {
  if (values.length > 4) {
    return `
      <span class="font-bold">${title}:</span>
      <span>
      ${values
        .map((option) => option.replaceAll(/_|-/g, " "))
        .slice(0, 4)
        .join(", ")}
      , and other
      </span>
      `;
  } else
    return `
    <span class="font-bold">${title}:</span>
    <span>
      ${
        values.length
          ? values.map((option) => option.replaceAll(/_|-/g, " ")).join(", ")
          : "None"
      }
    </span>
  `;
};

export const dataSummaryMissingTopBarTemplate = () => {
  const div1 = document.createElement("div");
  div1.classList = ["col-xl-2 filter-column"];
  div1.id = "missingnessFilter";

  const div2 = document.createElement("div");

  /**
   
   * 2. Create a function to make one filter item
   */

  div2.classList = ["col-xl-10"];
  div2.innerHTML = `
        <button id="filterBarToggle">
            <i class="fas fa-lg fa-caret-left"></i>
        </button>
        <div class="main-summary-row" style="min-height: 10px;margin-bottom: 1rem;margin-left: 1rem;">
            <div class="col white-bg div-border align-left font-size-17" style="padding: 0.5rem;" id="listFilters">
                ${filterItemTemplate("Race", ["All"])}
                <span style="padding-left: 5px; padding-right: 5px">|</span>
                ${filterItemTemplate("Ethnicity", ["All"])}
                <span style="padding-left: 5px; padding-right: 5px">|</span>
                ${filterItemTemplate("Cohort", ["All"])}
                <span style="padding-left: 5px; padding-right: 5px">|</span>
                ${filterItemTemplate("Variable", ["height, weight, bmi, bmi earlyadult"])}
            </div>
        </div>
        `;
  const row = document.createElement("div");
  row.classList = ["main-summary-row div-border overflow-x mb-2"];
  row.id = "missingnessTable";

  div2.appendChild(row);
  document.getElementById("dataSummaryStatistics").appendChild(div1);
  document.getElementById("dataSummaryStatistics").appendChild(div2);
}

export const dataSummaryMissingTemplate = async (popVal) => {
  showAnimation();
  let response = "";
  let lastModified = "";
  if (popVal == "Full Cohort"){
    response = await getFile(missingnessStatsFileId);//missingnessStatsFileId);
    lastModified = (await getFileInfo(missingnessStatsFileId)).modified_at;
  } else {
    response = await getFile(missingnessStatsCasesFileId);
    lastModified = (await getFileInfo(missingnessStatsCasesFileId)).modified_at;
  }
  //const lastModified = (await getFileInfo(missingnessStatsFileId)).modified_at;
  document.getElementById("dataLastModified").innerHTML = `Data current as of - ${new Date(lastModified).toLocaleString()}`;
  const { data, headers } = csv2Json(response);
  const variables = headers.filter((dt) => !dt.match(/ethnicity|race|cohort/i));
  const initialSelection =
    variables.length > 4 ? variables.slice(0, 4) : variables;
  const cohorts = {};
  data.forEach((dataOption) => {
    if (cohorts[dataOption.Cohort]) return;
    cohorts[dataOption.Cohort] = {};
  });
  const race = {};
  data.forEach((dataOption) => {
    //if (race[dataOption.race]) return;
    race[dataOption.race] = CONSTANTS.BCRPP.race[dataOption.race];
  });

  const ethnicity = {};
  data.forEach((dataOption) => {
    if (ethnicity[dataOption.ethnicity]) return;
    ethnicity[dataOption.ethnicity] =
      CONSTANTS.BCRPP.ethnicityClass[dataOption.ethnicity];
  });
  const data2 = await (await fetch("./BCRP_DataDictionary.txt")).text();
  const tsvData = tsv2Json(data2);
  const dictionary = tsvData.data;
  const varselect = [];
  variables.forEach(option => {
    //console.log(option);
    if(varselect[option]) return;
    let varSelectValue = dictionary.find(o => o['Variable Name'] === option) ? {variable: option, subcategory: dictionary.find(o => o['Variable Name'] === option)['Sub-Category']} : {variable: option, subcategory: 'other'};
    varselect.push(varSelectValue);
  })

  renderFilter(data,initialSelection,Object.keys(cohorts),variables,race,ethnicity,popVal, varselect);
  midset(data, initialSelection);
  addEventMissingnessFilterBarToggle();
  hideAnimation();
};

const renderFilter = (
  data,
  acceptedVariables,
  acceptedCohorts,
  headers,
  race,
  ethnicity,
  popVal,
  varselect
) => {
  let template = "";
  template += `
    <div class="card midset-card">
        <div class="card-header align-left card-filter-header">
            <strong class="side-panel-header">Filter</strong>
            
        </div>
        <div class="card-body" id="cardContent">
            <div id="midsetFilterData" class="row ethnicity-select align-left"></div>
        </div>
    </div>
    `;
  document.getElementById("missingnessFilter").innerHTML = template;
  renderMidsetFilterData(
    data,
    acceptedVariables,
    acceptedCohorts,
    headers,
    race,
    ethnicity,
    popVal,
    varselect
  );
};

const renderMidsetFilterData = (
  data,
  acceptedVariables,
  acceptedCohorts,
  headers,
  race,
  ethnicity,
  popVal,
  varselect
) => {
  let template = "";

  const transformRace = Object.entries(race);
  transformRace.push(["all", "All"]);
  const transformEthnicity = Object.entries(ethnicity);
  transformEthnicity.push(["all", "All"]);

  template += `
        <div style="width:100%;">
            `;
  //console.log(popVal);
  if (popVal == "Full Cohort") {
  template += `
        <div class="form-group" id="population">
        <label class="filter-label font-size-13" for="populationSelection">Population</label>
        <select class="form-control font-size-15" id="populationSelection">
          <option value="Full Cohort" selected>Full Cohort</option>
          <option value="Cases">Cases</option>
        </select>
  `
  };
  if (popVal == "Cases") {
    template += `
          <div class="form-group" id="population">
          <label class="filter-label font-size-13" for="populationSelection">Population</label>
          <select class="form-control font-size-15" id="populationSelection">
            <option value="Full Cohort">Full Cohort</option>
            <option value="Cases" selected>Cases</option>
          </select>
    `
    };
  template += `
            <div class="form-group" id="raceList">
            <label class="filter-label font-size-13" for="raceSelection">Race</label>
            <select class="form-control font-size-15" id="raceSelection">`;
  transformRace.forEach((anc) => {
    if (anc[0] === "undefined") return;

    template += `<option value="${anc[0]}" ${
      anc[1] === "All" ? "selected" : ""
    }>${anc[1]}</option>`;
  });
  template += `</select>
        </div>
          <div class="form-group" id="ethnicityList">
              <label class="filter-label font-size-13" for="ethnicitySelection">Ethnicity</label>
              <select class="form-control font-size-15" id="ethnicitySelection">`;
  transformEthnicity.forEach((anc) => {
    if (anc[0] === "undefined") return;
    template += `<option value="${anc[0]}" ${
      anc[1] === "All" ? "selected" : ""
    }>${anc[1]}</option>`;
  });
  template += "</select></div>";
  template += `
        <div class="form-group" id='midsetCohorts'>
          <li class="filter-list-item">
            <label class="filter-label font-size-13" for="studiesList">Cohort<span class='required-label'>&nbsp;</span></label>
            <label>
              <input
                id="cohortallcheckbox"
                checked
                type="checkbox"
                class="cohort-name select-all"
                title="all"
              />
              Check All
            </label>
          </li>
  `;
  let cohortsTemplate = "<ul class='remove-padding-left font-size-15'>";
  for (let cohort of acceptedCohorts) {
    cohortsTemplate += `
  <li class="filter-list-item">
      <input
        type="checkbox"checked
        data-variable="${cohort}"
        id="label${cohort}"
        class="select-cohort"
      />
  
      <label for="label${cohort}" class="cohort-name" title="${cohort}">${
      cohort.length > 10 ? `${cohort.substr(0, 10)}...` : cohort
    }</label>
  </li>`;
  }
  cohortsTemplate += "</ul>";
  template += `${cohortsTemplate}

            </div>
            <div class="form-group">
                <label class="filter-label font-size-13" for="variableSelectionList">Variable Selection</label>
                <div id="variableSelectionList" class="font-size-15">
            `;
  //console.log(varselect);
  let unique_cat = varselect
        .map((item) => item.subcategory)
        .filter(
            (value, index, current_value) => current_value.indexOf(value) === index
        );
  unique_cat.forEach((cat) => {
    let catnospace = cat.replace(/ /g,"");
    template += `<ul class="remove-padding-left">
                  <li class="custom-borders filter-list-item consortia-study-list" data-variable="${catnospace}">
                    <label for="label${catnospace}" class="variable-name" title="${catnospace}">${cat}</label>`
    template += unique_cat.indexOf(cat) === 0 ?
                    `<div class="ml-auto">
                      <button type="button" class="consortium-selection consortium-selection-btn" data-toggle="collapse" href="#toggle${catnospace}">
                        <i class="fas fa-caret-up"></i>
                      </button>
                    </div>
                  </li>
                  <ul class="collapse show no-list-style custom-padding allow-overflow max-height-study-list" aria-expanded="true" id="toggle${catnospace}">
                  ` :
                  `<div class="ml-auto">
                  <button type="button" class="consortium-selection consortium-selection-btn" data-toggle="collapse" href="#toggle${catnospace}">
                    <i class="fas fa-caret-down"></i>
                  </button>
                </div>
              </li>
              <ul class="collapse no-list-style custom-padding allow-overflow max-height-study-list" aria-expanded="false" id="toggle${catnospace}">
                  `;
    let variables = varselect.filter(dt => dt.subcategory === cat);
    variables.forEach((variable) => {
      template += `<li class="filter-list-item">
                          <input type="checkbox" ${acceptedVariables.indexOf(variable.variable) !== -1 ? "checked": ""} 
                            data-variable="${variable.variable}" data-variable-type="${cat}" id="label${variable.variable}" class="select-variable"/>
                          <label for="label${variable.variable}" class="variable-name" title="${variable.variable}">
                            ${variable.variable.replace(/_|-/g, " ")}
                          </label>
                        </li>
                          `
      })
      template += `</ul></ul>`;
    });
  template += `</div></div>
        </div>
    `;
  document.getElementById("midsetFilterData").innerHTML = template;
  addEventConsortiumSelect();
  addEventMidsetFilterForm(data);
};

const generateFilterSummary = () => {
  const popEl = document.getElementById("populationSelection");
  const popValue = popEl.value;
  const raceEl = document.getElementById("raceSelection");
  const raceValue = raceEl.value;
  const raceText = Array.from(raceEl.options).find(
    (el) => el.value.toString() === raceValue.toString()
  ).text;
  const ethnicityEl = document.getElementById("ethnicitySelection");
  const ethnicityValue = ethnicityEl.value;
  const ethnicityText = Array.from(ethnicityEl.options).find(
    (el) => el.value.toString() === ethnicityValue.toString()
  ).text;

  // Total variables
  // total: 4
  // selected: 2
  const selectedVariables = getSelectedVariables2().map((dt) => dt.split("@#$")[1]);
  //const totalVariables = getAllVariables2();
  //const isAllVariablesSelected = selectedVariables.length === totalVariables;
  // Total Cohort
  const selectedCohorts = getSelectedVariables("midsetCohorts");
  const totalCohorts = getAllVariables("midsetCohorts");
  const isAllCohortsSelected =
    selectedCohorts.filter((cohort) => {
      return cohort !== undefined;
    }).length === totalCohorts;

  const container = document.getElementById("listFilters");

  container.innerHTML = `
  ${filterItemTemplate(
    "Cohort",
    isAllCohortsSelected
      ? ["All"]
      : selectedCohorts.filter((cohort) => {
          return cohort !== undefined;
        })
  )}
    <span style="padding-left: 5px; padding-right: 5px">|</span>
    ${filterItemTemplate("Race", [raceText])}
    <span style="padding-left: 5px; padding-right: 5px">|</span>
    ${filterItemTemplate("Ethnicity", [ethnicityText])}
    <span style="padding-left: 5px; padding-right: 5px">|</span>
    ${filterItemTemplate(
      "Variable", 
      selectedVariables.filter((cohort) => {
            return cohort !== undefined;
          })
    )}
  `;
};

const addEventMidsetFilterForm = (data) => {
  const race = document.getElementById("raceSelection");
  race.addEventListener("change", () => {
    filterMidsetData(data);
    generateFilterSummary();
  });
  const ethnicity = document.getElementById("ethnicitySelection");
  ethnicity.addEventListener("change", async () => {
    await showAnimation();
    generateFilterSummary();
    filterMidsetData(data);
  });

  const variableTypes = document.getElementsByClassName("select-variable-type");
  Array.from(variableTypes).forEach((ele) => {
    ele.addEventListener("click", async () => {
      await showAnimation();
      generateFilterSummary();
      filterMidsetData(data);
    });
  });

  const variables = document.getElementsByClassName("select-variable");
  Array.from(variables).forEach((ele) => {
    ele.addEventListener("click", async () => {
      await showAnimation();
      generateFilterSummary();
      filterMidsetData(data);
    });
  });

  const popSelection = document.getElementById("populationSelection");
  popSelection.addEventListener("change", function (event) {
    if (event.target.value == "Full Cohort") dataSummaryMissingTemplate("Full Cohort");
    if (event.target.value == "Cases") dataSummaryMissingTemplate("Cases");
  });

  const cohortsAllCheckbox = document.getElementById("cohortallcheckbox");
  const cohorts = document.getElementsByClassName("select-cohort");

  Array.from(cohorts).forEach((ele) => {
    ele.addEventListener("change", () => {
      const selectedCohorts = document.querySelectorAll(
        ".select-cohort:checked"
      );
      if (cohorts.length === selectedCohorts.length)
        cohortsAllCheckbox.checked = true;
      if (selectedCohorts.length < cohorts.length) {
        cohortsAllCheckbox.checked = false;
      }
      generateFilterSummary();
      filterMidsetData(data);
    });
  });

  cohortsAllCheckbox.addEventListener("change", (e) => {
    Array.from(cohorts).forEach((input) => {
      input.checked = e.target.checked;
    });
    generateFilterSummary();
    filterMidsetData(data);
  });
};

const filterMidsetData = async (data) => {
  showAnimation();
  const population = document.getElementById("populationSelection").value
  const race = document.getElementById("raceSelection").value;
  const ethnicity = document.getElementById("ethnicitySelection").value;
  const selectedVariables = getSelectedVariables2().map((dt) => dt.split("@#$")[1]);
  const selectedCohorts = getSelectedVariables("midsetCohorts");
  const selectedVariableTypes = Array.from(document.querySelectorAll('input:checked.select-variable-type')).map((dt) => dt.dataset.variable);

  let newData = data;
  if (selectedCohorts.length > 0 || selectedVariableTypes.length > 0) {
    newData = newData.filter((filterItem) => {
      if (filterItem) {
        return selectedCohorts.indexOf(filterItem.Cohort) > -1;
      }
    });
  }

  if (ethnicity !== "all") {
    newData = newData.filter((dt) => dt.ethnicity === ethnicity);
  }

  if (race !== "all") {
    newData = newData.filter((dt) => dt.race === race);
  }
  console.log(selectedVariables);
  midset(newData, selectedVariables);
  //hideAnimation();
};

const getSelectedVariables = (parentId) => {
  const selections = [];
  let cardBody = document.getElementById(parentId);
  const variables = cardBody.querySelectorAll("input:checked");
  Array.from(variables).forEach((el) => selections.push(el.dataset.variable));
  return selections;
};

const getSelectedVariables2 = () => {
  const elements = document.querySelectorAll(`input:checked.select-variable`);
  const array = [];
  Array.from(elements).forEach(element => {
      const variabletype = element.dataset.variableType;
      const variable = element.dataset.variable;
      const value = `${variabletype}@#$${variable}` 
      if(array.indexOf(value) === -1) array.push(value);
  })
  return array;
};

const getAllVariables = (parentId) => {
  let cardBody = document.getElementById(parentId);
  const variables = cardBody.querySelectorAll("input:not(.select-all)");
  return variables.length;
};

const getAllVariables2 = () => {
  const variables = document.getElementsByClassName('select-variable');
  return variables.length;
};

const midset = (data, acceptedVariables) => {
  let template = "";
  let plotData = [];
  let headerData = "";

  if (acceptedVariables.length === 0) {
    template += "No variable selected. Please, select at least one variable and one cohort.";
    hideAnimation();
    document.getElementById("missingnessTable").innerHTML = template;
    return;
  }
  if (data.length > 0) {
    template +=
      '<table class="table table-hover table-borderless missingness-table table-striped"><thead class="midset-table-header">';
    const headerCount = computeHeader(data, acceptedVariables);
    headerData = headerCount;
    const result = computeSets(data, acceptedVariables);
    // template += `<tr class="midset-header"><th class="missing-column"><p>Number of subjects with data based on the selection of variables</p>
    //             <button class="info-btn variable-definition" aria-label="More info" data-keyboard="false" data-backdrop="static" data-toggle="modal" 
    //               data-target="#confluenceMainModal" data-variable='midsetTopBars'>
    //             <i class="fas fa-question-circle cursor-pointer"></i></button></th><th class='bar-chart-cell' 
    //             colspan="${Object.keys(headerCount).length}">
    //             <div id="midsetHeader"></div></th><th class="missing-column"></th></tr>`;

    // template += `<tr><th class="missing-column"></th>`;
    // for (let variable in headerCount) {
    //   template += `<th class="missing-column cell-equal-width">${numberWithCommas(
    //     headerCount[variable]
    //   )}</th>`;
    // }
    template += `<tr><th></th>`
    // for (let variable in headerCount) {
    //   template += `<th></th>`
    // }
    //template += `<th class="missing-column" colspan="2">Total patients based on Population, Race, Ethnicity, and Cohort</th></tr><tr><td class="missing-column"></td>`;
    for (let variable in headerCount) {
      template += `<th class="missing-column cell-equal-width rowspan="2">${variable
        .replace("_Data available", "")
        .replace(/_|-/g, " ")}</th>`;
    }
    template += `<th class="missing-column align-top" colspan="2">Total participants based on Population, Race, Ethnicity, and Cohort <br> <p style="font-size:22px;">${numberWithCommas(data.length)}</p></th></tr>`;
    // template += `<th class="missing-column, align-top" colspan="2">${numberWithCommas(data.length)}</th>
    //             `
    template += `<tr><th class="missing-column set-label">
                  Participant Count 
                  <button class="info-btn variable-definition" aria-label="More info" data-keyboard="false" data-backdrop="static" 
                  data-toggle="modal" data-target="#confluenceMainModal" data-variable='midsetTopBars'><i class="fas fa-question-circle cursor-pointer"></i></button>
                </th>`;
    for (let variable in headerCount) {
      template += `<th class="missing-column cell-equal-width">${numberWithCommas(
        headerCount[variable]
      )}
      </th>`;
    }
    template += `<th class="missing-column"></th>
                    <th class="missing-column"><button class="info-btn variable-definition" aria-label="More info" data-keyboard="false" data-backdrop="static" data-toggle="modal" data-target="#confluenceMainModal"  data-variable='midsetSideBars'><i class="fas fa-question-circle cursor-pointer"></i></button></th>
                    </tr></thead><tbody>
                    <!--<tr>
                        <td class="missing-column set-label">
                            All Patients 
                            <button class="info-btn variable-definition" aria-label="More info" data-keyboard="false" data-backdrop="static" data-toggle="modal" data-target="#confluenceMainModal"  data-variable='allSubjects'><i class="fas fa-question-circle cursor-pointer"></i></button>
                        </td>-->`;

    const set0 = data.length;
    //console.log(acceptedVariables);
    //console.log(Object.keys(result));
    // acceptedVariables.forEach((variable, index) => {
    //   template += `<td class="missing-column">-</td>`;
    //   if (index === acceptedVariables.length - 1)
    //     template += `<td class="missing-column">${numberWithCommas(set0)}</td>
    //   <!--<td id="midsetChart" rowspan="${Object.keys(result).length + 2}"></td>-->`;
    // });
    template += `<!--</tr>-->
                    <tr>
                        <td class="missing-column set-label">
                            Complete Set 
                            <button class="info-btn variable-definition" aria-label="More info" data-keyboard="false" data-backdrop="static" data-toggle="modal" data-target="#confluenceMainModal"  data-variable='completeSet'><i class="fas fa-question-circle cursor-pointer"></i></button>
                        </td>`;
    const set1 = setLengths(data, acceptedVariables);
    acceptedVariables.forEach((variable, index) => {
      template += `<td class="missing-column">&#9899</td>`;
      if (index === acceptedVariables.length - 1)
        template += `<td class="missing-column">${numberWithCommas(set1)}</td>
        <td id="midsetChart" rowspan="${Object.keys(result).length + 2}"></td>`;
    });
    template += "</tr>";
    let ignore = "";
    acceptedVariables.forEach((v, i) => {
      if (i === 0) ignore += v;
      else ignore += `@#$${v}`;
      delete result[v];
    });
    delete result[ignore];
    plotData = Object.values(result);
    plotData.unshift(set1);
    //plotData.unshift(set0);

    let variableDisplayed = {};
    for (let key in result) {
      const allVariables = key.split("@#$");
      const firstVar = key.split("@#$")[0];
      template += "<tr>";
      if (variableDisplayed[firstVar] === undefined) {
        template += `<td class="missing-column set-label">${firstVar.replace(
          "_Data available",
          ""
        )}</td>`;
        variableDisplayed[firstVar] = "";
      } else {
        template += '<td class="missing-column"></td>';
      }
      acceptedVariables.forEach((variable, index) => {
        if (variable === firstVar) {
          template += '<td class="missing-column">&#9899</td>';
        } else if (
          variable !== firstVar &&
          allVariables.indexOf(variable) !== -1
        ) {
          template += '<td class="missing-column">&#9899</td>';
        } else if (
          variable !== firstVar &&
          allVariables.indexOf(variable) === -1
        ) {
          template += '<td class="missing-column">&#9898</td>';
        }
        if (index === acceptedVariables.length - 1) {
          template += `<td class="missing-column">${numberWithCommas(
            result[key]
          )}</td>`;
        }
      });
      template += "</tr>";
    }

    template += "</tbody></table>";
  } else template += "Data not found";

  document.getElementById("missingnessTable").innerHTML = template;
  addEventVariableDefinitions();
  //if (data.length > 0){
  renderMidsetPlot(plotData.reverse(), "midsetChart");
  // renderMidsetHeader(
  //   acceptedVariables,
  //   Object.values(headerData),
  //   "midsetHeader"
  // );
  //};
  reSizePlots();
  hideAnimation();
};

const renderMidsetHeader = (x, y, id) => {
  x = x.map((dt) => dt.replace("_Data available", ""));
  const data = [
    {
      type: "bar",
      x,
      y,
      marker: {
        color: "#7F7F7F",
        //color: '#319fbe'
      },
    },
  ];

  const layout = {
    xaxis: {
      autorange: true,
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: true,
      ticks: "",
      showticklabels: false,
      fixedrange: true,
    },
    yaxis: {
      autorange: true,
      showgrid: false,
      showline: false,
      autotick: true,
      fixedrange: true,
      tickformat: ",d",
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0,
    },
  };

  const options = {
    responsive: true,
    displayModeBar: false,
    useResizeHandler: true,
    style: {
      width: "100%",
      height: "100%",
    },
  };
  Plotly.newPlot(id, data, layout, options);
};

const renderMidsetPlot = (x, id) => {
  const data = [
    {
      type: "bar",
      x: x,
      hoverinfo: "x",
      orientation: "h",
      marker: {
        color: "#8bc1e8",
      },
    },
  ];

  const layout = {
    xaxis: {
      showgrid: false,
      zeroline: false,
      fixedrange: true,
      tickformat: ",d",
    },
    yaxis: {
      autorange: true,
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: true,
      ticks: "",
      showticklabels: false,
      fixedrange: true,
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
    },
  };

  const options = {
    responsive: true,
    displayModeBar: false,
    useResizeHandler: true,
    style: {
      width: "100%",
      height: "100%",
    },
  };
  Plotly.newPlot(id, data, layout, options);
};

const computeSets = (data, acceptedVariables) => {
  let obj = {};
  const allCombinations = getCombinations(acceptedVariables);
  allCombinations.forEach((combination) => {
    const setLength = setLengths(data, combination.split("@#$"));
    if (setLength > 0) {
      obj[combination] = setLength;
    }
  });
  return obj;
};

const setLengths = (data, arr) => {
  arr.forEach((variable) => {
    if (variable) {
      data = data.filter((dt) => dt[variable] === "1");
    }
  });
  return data.length;
};

const getCombinations = (array) => {
  const result = [];
  const sets = (prefix, array) => {
    for (var i = 0; i < array.length; i++) {
      const str = `${prefix}${prefix ? "@#$" : ""}${array[i]}`;
      result.push(str);
      sets(str, array.slice(i + 1));
    }
  };
  sets("", array);
  return result;
};

const computeHeader = (data, acceptedVariables) => {
  let obj = {};
  acceptedVariables.forEach((variable) => {
    obj[variable] = data.filter((dt) => dt[variable] === "1").length;
  });
  return obj;
};

export const clearGraphAndParameters = () => {
  document.getElementById("dataSummaryVizBarChart").innerHTML = "";
  document.getElementById("dataSummaryVizPieChart").hidden = true;
  document.getElementById("dataSummaryVizChart2").innerHTML = "";
  document.getElementById("barChartLabel").innerHTML = "";
  document.getElementById("pieChartLabel").innerHTML = "";
  document.getElementById("statusPieChart").innerHTML = "";
};
