import {
  showAnimation,
  hideAnimation,
  getFile,
  csvJSON,
  numberWithCommas,
  summaryStatsFileId,
  getFileInfo,
  mapReduce,
  summaryStatsCasesFileId,
  reSizePlots,
  csv2Json2,
  csv2Json,
  getMail
} from "./shared.js";
import { variables } from "./variables.js";
//import { graphVariables } from "./graphVariables.js";
import graphVariables from "../graphVariables.json" with { type: 'json' };
import graphVariablesCases from "../graphVariablesCases.json" with { type: 'json' };
import { addEventSummaryStatsFilterForm, filterData } from "./event.js";

//console.log(data);
const plotTextSize = 10.5;

const chartLabels = {
  yes: "Yes",
  no: "No",
  DK: "Don't know",
  pos: "Positive",
  neg: "Negative",
};

export const getFileContent = async () => {
  showAnimation();
  //const data = await (await fetch('https://raw.githubusercontent.com/episphere/GhanaDataPlatforms/main/static/data/testghana26march2025.csv')).text();
  const {jsonData, headers} = csvJSON(await getFile(summaryStatsFileId));//csv2Json(data)//await getFile(summaryStatsFileId));
  console.log(headers);
  //const lastModified = (await getFileInfo(summaryStatsFileId)).modified_at;
  //document.getElementById("dataLastModified").innerHTML = `Data current as of - ${new Date(lastModified).toLocaleString()}`;
  if (jsonData.length === 0) {
    document.getElementById(
      "confluenceDiv"
    ).innerHTML = `You don't have access to summary level data, please contact NCI for the access.`;
    return;
  }
  renderAllCharts(jsonData, headers);

  const graph1 = document.getElementById("dataSummaryVizLabel1");
    graph1.addEventListener("change", function (event) {
      filterData(jsonData, headers);
      });

  const graph2 = document.getElementById("dataSummaryVizLabel2");
    graph2.addEventListener("change", function (event) {
      filterData(jsonData, headers);
      });

  const graph3 = document.getElementById("dataSummaryVizLabel3");
    graph3.addEventListener("change", function (event) {
      filterData(jsonData, headers);
      });

  const graph4 = document.getElementById("dataSummaryVizLabel4");
    graph4.addEventListener("change", function (event) {
      filterData(jsonData, headers);
      });

  const graph5 = document.getElementById("dataSummaryVizLabel5");
    graph5.addEventListener("change", function (event) {
      filterData(jsonData, headers);
      });

  const graph6 = document.getElementById("dataSummaryVizLabel6");
    graph6.addEventListener("change", function (event) {
      filterData(jsonData, headers);
      });

  allFilters(jsonData, headers, "all");
  hideAnimation();
};

const allFilters = (jsonData, headers, caseSelection) => {
  document.getElementById("allFilters").innerHTML = "";
  const div1 = document.createElement("div");
  div1.classList = ["row select"];
  const site_values = getSites(jsonData);
  const case_control = getCase_Control(jsonData);

  let siteOptions = "";
  Object.keys(site_values).forEach((element) => {
    siteOptions =
    siteOptions + `<option value='${element}'>${element}</option>`;
  });

  // let casecontrolOptions = "";
  // Object.keys(case_control).forEach((element) => {
  //   casecontrolOptions =
  //   casecontrolOptions + `<option value='${element}'>${element}</option>`;
  // });

  let template = `
        <div style="width: 100%;">
        `;
    template += `
            <div class="col-md-12 p-0 form-group">
                <label class="filter-label font-size-13" for="subcasesSelection">Site</label>
                <select class="form-control font-size-15" id="subcasesSelection" data-variable='subcases'>
                    <option value='all' selected>All</option>
                    ${siteOptions}
                </select>
            </div>
`;

  // template += `  
  //           <div class="form-group">
  //               <label class="filter-label font-size-13" for="case_control">Case/Control</label>
  //               <select class="form-control font-size-15" id="case_control" data-variable='case_control'>
  //                   <option selected value='all'>All</option>
  //                   ${casecontrolOptions}
  //               </select>
  //           </div>
  //   `;

  template += `</br>
    </div>`;
  div1.innerHTML = template;
  document.getElementById("allFilters").appendChild(div1);
  addEventSummaryStatsFilterForm(jsonData, headers);
  addEventConsortiumSelect();
};

const aggegrateData = (jsonData) => {
  let obj = {};
  // obj['totalSubjects'] = 0;
  jsonData.forEach((value) => {
    if (obj[value.consortium] === undefined) obj[value.consortium] = {};
    if (obj[value.consortium]) {
      if (obj[value.consortium]["consortiumTotal"] === undefined)
        obj[value.consortium]["consortiumTotal"] = 0;
      obj[value.consortium]["consortiumTotal"] += parseInt(value.total);
      if (obj[value.consortium][value.study] === undefined) {
        obj[value.consortium][value.study] = {};
        obj[value.consortium][value.study].total = 0;
      }
      obj[value.consortium][value.study].total += parseInt(value.total);
    }
  });
  return obj;
};
const getStudies = (jsonData) => {
  let obj = {};
  jsonData.forEach((value) => {
    if (obj[value.study] === undefined) obj[value.study] = {};
    if (obj[value.study]) {
      if (obj[value.study]["consortiumTotal"] === undefined)
        obj[value.study]["consortiumTotal"] = 0;
      obj[value.study]["consortiumTotal"] += parseInt(value.total);
      obj[value.study].total += parseInt(value.total);
    }
  });
  return obj;
};
const getCase_Control = (jsonData) => {
  let obj = {};
  // obj['totalSubjects'] = 0;
  jsonData.forEach((value) => {
    obj[value.status] = value.status;
  });
  return obj;
};
const getSites = (jsonData) => {
  let obj = {};
  // obj['totalSubjects'] = 0;
  jsonData.forEach((value) => {
    obj[value.site] = value.site;
  });
  return obj;
}
const getEthnicity = (jsonData) => {
  let obj = {};
  // obj['totalSubjects'] = 0;
  jsonData.forEach((value) => {
    obj[value.ethnicity] = value.ethnicity;
  });
  return obj;
};
export const addEventConsortiumSelect = () => {
  const elements = document.getElementsByClassName("consortium-selection");
  Array.from(elements).forEach((element) => {
    element.addEventListener("click", () => {
      if (element.lastElementChild.classList.contains("fa-caret-up")) {
        element.lastElementChild.classList.add("fa-caret-down");
        element.lastElementChild.classList.remove("fa-caret-up");
      } else {
        element.lastElementChild.classList.add("fa-caret-up");
        element.lastElementChild.classList.remove("fa-caret-down");
      }
    });
  });
  const cohorts = document.querySelectorAll(".select-cohorts .select-study");
  Array.from(cohorts).forEach((element) => {
    element.addEventListener("click", () => {});
  });
};
export const renderAllCharts = (data) => {
  document.getElementById("chartRow1").innerHTML = "";
  document.getElementById("chartRow2").innerHTML = "";
  let finalData = {};
  finalData = data;

  let totalSubjects = 0;
  data.forEach((value) => (totalSubjects += 1));
  document.getElementById("participantCount").innerHTML = `<b>No. of Participants:</b> ${totalSubjects.toLocaleString("en-US")}`;

  generateBarChart(
    "age_cat",
    "dataSummaryVizChart1",
    "dataSummaryVizLabel1",
    finalData,
    "chartRow1",
    "Full Cohort"
  );
  generateBarChart(
    "flag_gen",
    "dataSummaryVizChart2",
    "dataSummaryVizLabel2",
    finalData,
    "chartRow1",
    "Full Cohort"
  );
  generateBarChart(
    "flag_weights",
    "dataSummaryVizChart3",
    "dataSummaryVizLabel3",
    finalData,
    "chartRow1",
    "Full Cohort"
  );
  generateBarChart(
    "bodysize_cat",
    "dataSummaryVizChart4",
    "dataSummaryVizLabel4",
    finalData,
    "chartRow2",
    "Full Cohort"
  );
  generateBarChart(
    "consdiag_cnt",
    "dataSummaryVizChart5",
    "dataSummaryVizLabel5",
    finalData,
    "chartRow2",
    "Full Cohort"
  );
  generateBarChart(
    "menop",
    "dataSummaryVizChart6",
    "dataSummaryVizLabel6",
    finalData,
    "chartRow2",
    "Full Cohort"
  );
};

export const updateAllCharts2 = (data) => {
  let finalData = {};
  finalData = data;
  let totalSubjects = 0;
  data.forEach((value) => (totalSubjects += 1));
  document.getElementById("participantCount").innerHTML = `<b>No. of Participants:</b> ${totalSubjects.toLocaleString("en-US")}`;

  updateBarChart(
    document.getElementById("dataSummaryVizLabel1").value,
    "dataSummaryVizChart1",
    "dataSummaryVizLabel1",
    finalData,
    "chartRow1",
    "Full Cohort"
  );
  updateBarChart(
    document.getElementById("dataSummaryVizLabel2").value,
    "dataSummaryVizChart2",
    "dataSummaryVizLabel2",
    finalData,
    "chartRow1",
    "Full Cohort"
  );
  updateBarChart(
    document.getElementById("dataSummaryVizLabel3").value,
    "dataSummaryVizChart3",
    "dataSummaryVizLabel3",
    finalData,
    "chartRow1",
    "Full Cohort"
  );
  updateBarChart(
    document.getElementById("dataSummaryVizLabel4").value,
    "dataSummaryVizChart4",
    "dataSummaryVizLabel4",
    finalData,
    "chartRow2",
    "Full Cohort"
  );
  updateBarChart(
    document.getElementById("dataSummaryVizLabel5").value,
    "dataSummaryVizChart5",
    "dataSummaryVizLabel5",
    finalData,
    "chartRow2",
    "Full Cohort"
  );
  updateBarChart(
    document.getElementById("dataSummaryVizLabel6").value,
    "dataSummaryVizChart6",
    "dataSummaryVizLabel6",
    finalData,
    "chartRow2",
    "Full Cohort"
  );
};

export const renderAllCasesCharts = (data) => {
  document.getElementById("chartRow1").innerHTML = "";
  document.getElementById("chartRow2").innerHTML = "";

  let totalCases = 0;
  data.forEach((value) => (totalCases += parseInt(value.TotalCases)));
  document.getElementById(
    "participantCount"
  ).innerHTML = `<b>No. of Participants:</b> ${totalCases.toLocaleString(
    "en-US"
  )}`;

  let finalData = {};
  finalData = data;
  generateBarChart(
    "dxdate_primary1",
    "dataSummaryVizChart1",
    "dataSummaryVizLabel1",
    finalData,
    "chartRow1",
    "Cases"
  );
  generateBarChart(
    "invasive_primary1",
    "dataSummaryVizChart2",
    "dataSummaryVizLabel2",
    finalData,
    "chartRow1",
    "Cases"
  );
  generateBarChart(
    "detection_primary1",
    "dataSummaryVizChart3",
    "dataSummaryVizLabel3",
    finalData,
    "chartRow1",
    "Cases"
  );
  generateBarChart(
    "er_primary1",
    "dataSummaryVizChart4",
    "dataSummaryVizLabel4",
    finalData,
    "chartRow2",
    "Cases"
  );
  generateBarChart(
    "grade_primary1",
    "dataSummaryVizChart5",
    "dataSummaryVizLabel5",
    finalData,
    "chartRow2",
    "Cases"
  );
};

export const updateAllCasesCharts = (data) => {
  let finalData = {};
  finalData = data;
  let totalCases = 0;
  data.forEach((value) => (totalCases += parseInt(value.TotalCases)));
  document.getElementById("participantCount").innerHTML = `<b>No. of Participants:</b> ${totalCases.toLocaleString("en-US")}`;

  updateBarChart(
    "dxdate_primary1",//document.getElementById("dataSummaryVizLabel1").value,
    "dataSummaryVizChart1",
    "dataSummaryVizLabel1",
    finalData,
    "chartRow1",
    "Cases"
  );
  updateBarChart(
    "invasive_primary1",//document.getElementById("dataSummaryVizLabel2").value,
    "dataSummaryVizChart2",
    "dataSummaryVizLabel2",
    finalData,
    "chartRow1",
    "Cases"
  );
  updateBarChart(
    "detection_primary1",//document.getElementById("dataSummaryVizLabel3").value,
    "dataSummaryVizChart3",
    "dataSummaryVizLabel3",
    finalData,
    "chartRow1",
    "Cases"
  );
  updateBarChart(
    "er_primary1",//document.getElementById("dataSummaryVizLabel4").value,
    "dataSummaryVizChart4",
    "dataSummaryVizLabel4",
    finalData,
    "chartRow2",
    "Cases"
  );
  updateBarChart(
    "grade_primary1",//document.getElementById("dataSummaryVizLabel5").value,
    "dataSummaryVizChart5",
    "dataSummaryVizLabel5",
    finalData,
    "chartRow2",
    "Cases"
  );
  // updateBarChart(
  //   document.getElementById("dataSummaryVizLabel6").value,
  //   "dataSummaryVizChart6",
  //   "dataSummaryVizLabel6",
  //   finalData,
  //   "chartRow2",
  //   "Cases"
  // );
};

export const updateCounts = (data) => {
  const obj = aggegrateData(data);
  for (let consortium in obj) {
    const elements = document.querySelectorAll(
      `[data-consortia="${consortium}"]`
    );
    Array.from(elements).forEach((element) => {
      element.innerHTML = numberWithCommas(obj[consortium].consortiumTotal);
    });
    for (let study in obj[consortium]) {
      const studyElements = document.querySelectorAll(
        `[data-consortia-study="${consortium}@#$${study}"]`
      );
      Array.from(studyElements).forEach((element) => {
        element.innerHTML = numberWithCommas(obj[consortium][study].total);
      });
    }
  }
};
export const getSelectedStudies = () => {
  const elements = document.querySelectorAll(`input:checked.select-study`);
  const array = [];
  Array.from(elements).forEach((element) => {
    const consortium = element.dataset.consortium;
    const study = element.dataset.study;
    const value = `${consortium}@#$${study}`;
    if (array.indexOf(value) === -1) array.push(value);
  });
  return array;
};

// Global variables for cross-filtering
let globalData = [];
let filteredData = [];
let chartIds = [];
let selectedBars = {};

const countObjectsWithKeyValue = (arr, key, value) => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] && arr[i].hasOwnProperty(key) && arr[i][key] === value) {
      count++;
    }
  }
  return count;
}

const generateBarChart = (parameter, id, labelID, jsonData, chartRow, population) => {
  const div = document.createElement("div");
  div.classList = ["col-xl-4 pl-2 padding-right-zero mb-3"];
  const dataGraphs = graphVariables;
  div.innerHTML = dataVisulizationCards({
    cardHeaderId: labelID,
    cardBodyId: id,
  });

  console.log(dataGraphs[parameter]);
  let x = Object.values(dataGraphs[parameter].values);
  let y = Object.keys(dataGraphs[parameter].values).map(key => countObjectsWithKeyValue(jsonData, parameter, key));

  let csvContent = '';
  for (let i =0; i<x.length;i++) {
    csvContent += x[i] + ',' + y[i] + '\n';
  }

  document.getElementById(chartRow).appendChild(div);
  const data = [
    {
      x: x,
      y: y,
      marker: {
        color: Array(Math.ceil(x.length/2)).fill(["#006B3D","#53ab78"]).flat(),
      },
      type: "bar",
    },
  ];
  const layout = {
    xaxis: {
      title: dataGraphs[parameter].units,
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
      type: 'category',
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    margin: { t: 30, r: 20, b: 80, l: 60 },
    // paper_bgcolor: "rgba(0,0,0,0)",
    // plot_bgcolor: "rgba(0,0,0,0)",
  };

  var config = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['hoverClosestCartesian', 'hoverCompareCartesian','toggleHover','toggleSpikelines','zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d'],
    displaylogo: false,
    toImageButtonOptions: {
      format: 'svg', // one of png, svg, jpeg, webp
      filename: parameter,
      height: 500,
      width: 700,
      scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
    },
    modeBarButtonsToAdd: [
      {
        name: 'Download Data',
        icon: Plotly.Icons.disk,
        direction: 'up',
        click: function(gd) {
          console.log(csvContent);
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
          const objUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = objUrl;
          link.download = `${parameter}.csv`;
          link.click();
      }}]
  };

  Plotly.newPlot(`${id}`, data, layout, config);
  
  // Store chart ID and add selection event
  chartIds.push(id);
  globalData = jsonData;
  filteredData = jsonData;
  
  document.getElementById(id).on('plotly_click', function(eventData) {
    if (eventData && eventData.points.length > 0) {
      const clickedValue = eventData.points[0].x;
      
      if (!selectedBars[id]) selectedBars[id] = [];
      
      const existingIndex = selectedBars[id].findIndex(bar => bar.value === clickedValue);
      
      if (existingIndex > -1) {
        // Deselect - remove from array
        selectedBars[id].splice(existingIndex, 1);
      } else {
        // Select - add to array
        const selectedKey = Object.keys(dataGraphs[parameter].values).find(key => 
          dataGraphs[parameter].values[key] === clickedValue
        );
        selectedBars[id].push({ value: clickedValue, key: selectedKey, parameter: parameter });
      }
      
      // Filter data based on all selected bars for this chart
      if (selectedBars[id].length > 0) {
        const selectedKeys = selectedBars[id].map(bar => bar.key);
        filteredData = globalData.filter(item => 
          selectedKeys.includes(String(item[parameter]))
        );
      } else {
        filteredData = globalData;
      }
      
      updateAllCharts(id);
    }
  });
  
  document.getElementById(id).on('plotly_doubleclick', function() {
    selectedBars = {};
    filteredData = globalData;
    updateAllCharts(id);
  });

  var htmlTitle = document.getElementById(labelID);
  htmlTitle.options[htmlTitle.options.length] = new Option(dataGraphs[parameter].title, parameter, true, true);
  
  document.getElementById(id).setAttribute('data-parameter', parameter);
  // for (let index in dataGraphs) {
  //   let defaultSelected = true ? index===parameter : false
  //   htmlTitle.options[htmlTitle.options.length] = new Option(dataGraphs[index].title, index, defaultSelected, defaultSelected);
  // }
};

const updateBarChart = (parameter, id, labelID, jsonData, chartRow, population) => {
  const dataGraphs = population==="Full Cohort" ? graphVariables : graphVariablesCases;
  let x = Object.values(dataGraphs[parameter].values);
  let y = Object.keys(dataGraphs[parameter].values).map(key => countObjectsWithKeyValue(jsonData, parameter, key));
  let csvContent = '';
  for (let i =0; i<x.length;i++) {
    csvContent += x[i] + ',' + y[i] + '\n';
  }
  const data = [
    {
      x: x,
      y: y,
      marker: {
        color: Array(Math.ceil(x.length/2)).fill(["#006B3D","#53ab78"]).flat(),
      },
      type: "bar",
    },
  ];
  const layout = {
    xaxis: {
      title: dataGraphs[parameter].units,
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
      type: 'category',
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    // paper_bgcolor: "rgba(0,0,0,0)",
    // plot_bgcolor: "rgba(0,0,0,0)",
  };

  var config = {
    responsive: true,
    modeBarButtonsToRemove: ['hoverClosestCartesian', 'hoverCompareCartesian','toggleHover','toggleSpikelines','zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d'],
    displaylogo: false,
    toImageButtonOptions: {
      format: 'png', // one of png, svg, jpeg, webp
      filename: parameter,
      height: 500,
      width: 700,
      scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
    },
    modeBarButtonsToAdd: [
      {
        name: 'Download Data',
        icon: Plotly.Icons.disk,
        direction: 'up',
        click: function(gd) {
          console.log(csvContent);
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
          const objUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = objUrl;
          link.download = `${parameter}.csv`;
          link.click();
      }}]
  };

  Plotly.newPlot(`${id}`, data, layout, config);
};

const generateAgeBarChart = (parameter, id, labelID, jsonData, chartRow) => {
  const div = document.createElement("div");
  div.classList = ["col-xl-4 pl-2 padding-right-zero mb-3"];
  div.innerHTML = dataVisulizationCards({
    cardHeaderId: labelID,
    cardBodyId: id,
  });
  document.getElementById(chartRow).appendChild(div);
  const data = [
    {
      x: [
        "<20",
        "20 to 29",
        "30 to 39",
        "40 to 49",
        "50 to 59",
        "60 to 69",
        "70 to 79",
        "80 to 89",
        ">90",
        "Unknown",
      ],
      y: [
        mapReduce(jsonData, "<20"),
        mapReduce(jsonData, "20 to 29"),
        mapReduce(jsonData, "30 to 39"),
        mapReduce(jsonData, "40 to 49"),
        mapReduce(jsonData, "50 to 59"),
        mapReduce(jsonData, "60 to 69"),
        mapReduce(jsonData, "70 to 79"),
        mapReduce(jsonData, "80 to 89"),
        mapReduce(jsonData, "90 to 99") + mapReduce(jsonData, ">99"),
        mapReduce(jsonData, "age_DK"),
      ],
      marker: {
        color: [
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
        ],
      },
      type: "bar",
    },
  ];
  const layout = {
    xaxis: {
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };
  Plotly.newPlot(`${id}`, data, layout, {
    responsive: true,
    displayModeBar: false,
  });
  document.getElementById(
    labelID
  ).innerHTML = `${variables.BCRPP[parameter]["label"]}`;
};

const generateDetectionPrimBarChart = (
  parameter,
  id,
  labelID,
  jsonData,
  chartRow
) => {
  const div = document.createElement("div");
  div.classList = ["col-xl-4 pl-2 padding-right-zero mb-3"];
  div.innerHTML = dataVisulizationCards({
    cardHeaderId: labelID,
    cardBodyId: id,
  });
  document.getElementById(chartRow).appendChild(div);
  const data = [
    {
      x: ["Screen-detected", "Non-screen detected", "Unknown"],
      y: [
        mapReduce(jsonData, "detection_primary1_nonscreen"),
        mapReduce(jsonData, "detection_primary1_screen"),
        mapReduce(jsonData, "detection_primary1_DK"),
      ],
      marker: {
        color: ["#8bc1e8", "#319fbe", "#8bc1e8"],
      },
      type: "bar",
    },
  ];
  const layout = {
    xaxis: {
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };
  Plotly.newPlot(`${id}`, data, layout, {
    responsive: true,
    displayModeBar: false,
  });
  document.getElementById(
    labelID
  ).innerHTML = `${variables.BCRPP[parameter]["label"]}`;
};

const generateCancerInvBarChart = (
  parameter,
  id,
  labelID,
  jsonData,
  chartRow
) => {
  const div = document.createElement("div");
  div.classList = ["col-xl-4 pl-2 padding-right-zero mb-3"];
  div.innerHTML = dataVisulizationCards({
    cardHeaderId: labelID,
    cardBodyId: id,
  });
  document.getElementById(chartRow).appendChild(div);
  const data = [
    {
      x: ["Invasive", "In-situ", "Unknown"],
      y: [
        mapReduce(jsonData, "invasive_primary1_inv"),
        mapReduce(jsonData, "invasive_primary1_insitu"),
        mapReduce(jsonData, "invasive_primary1_DK"),
      ],
      marker: {
        color: ["#8bc1e8", "#319fbe", "#8bc1e8"],
      },
      type: "bar",
    },
  ];
  const layout = {
    xaxis: {
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };
  Plotly.newPlot(`${id}`, data, layout, {
    responsive: true,
    displayModeBar: false,
  });
  document.getElementById(
    labelID
  ).innerHTML = `${variables.BCRPP[parameter]["label"]}`;
};

const generateERTumorStatusBarChart = (
  parameter,
  id,
  labelID,
  jsonData,
  chartRow
) => {
  const div = document.createElement("div");
  div.classList = ["col-xl-4 pl-2 padding-right-zero mb-3"];
  div.innerHTML = dataVisulizationCards({
    cardHeaderId: labelID,
    cardBodyId: id,
  });
  document.getElementById(chartRow).appendChild(div);
  const data = [
    {
      x: ["Negative", "Positive", "Unknown"],
      y: [
        mapReduce(jsonData, "er_primary1_neg"),
        mapReduce(jsonData, "er_primary1_pos"),
        mapReduce(jsonData, "er_primary1_DK"),
      ],
      marker: {
        color: ["#8bc1e8", "#319fbe", "#8bc1e8"],
      },
      type: "bar",
    },
  ];
  const layout = {
    xaxis: {
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };
  Plotly.newPlot(`${id}`, data, layout, {
    responsive: true,
    displayModeBar: false,
  });
  document.getElementById(
    labelID
  ).innerHTML = `${variables.BCRPP[parameter]["label"]}`;
};

const generateTumorGradeBarChart = (
  parameter,
  id,
  labelID,
  jsonData,
  chartRow
) => {
  const div = document.createElement("div");
  div.classList = ["col-xl-4 pl-2 padding-right-zero mb-3"];
  div.innerHTML = dataVisulizationCards({
    cardHeaderId: labelID,
    cardBodyId: id,
  });
  document.getElementById(chartRow).appendChild(div);
  const data = [
    {
      x: [
        "Well differentiated",
        "Moderately differentiated",
        "Poorly/un-differentiated",
        "Unknown",
      ],
      y: [
        mapReduce(jsonData, "grade_primary1_1"),
        mapReduce(jsonData, "grade_primary1_2"),
        mapReduce(jsonData, "grade_primary1_3"),
        mapReduce(jsonData, "grade_primary1_DK"),
      ],
      marker: {
        color: ["#8bc1e8", "#319fbe", "#8bc1e8", "#319fbe"],
      },
      type: "bar",
    },
  ];

  const layout = {
    xaxis: {
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };
  Plotly.newPlot(`${id}`, data, layout, {
    responsive: true,
    displayModeBar: false,
  });
  document.getElementById(
    labelID
  ).innerHTML = `${variables.BCRPP[parameter]["label"]}`;
};

const generateBirthBarChart = (parameter, id, labelID, jsonData, chartRow) => {
  const div = document.createElement("div");
  div.classList = ["col-xl-4 pl-2 padding-right-zero mb-3"];
  div.innerHTML = dataVisulizationCards({
    cardHeaderId: labelID,
    cardBodyId: id,
  });
  document.getElementById(chartRow).appendChild(div);
  const data = [
    {
      x: [
        "<1900",
        "1900 to 1909",
        "1910 to 1919",
        "1920 to 1929",
        "1930 to 1939",
        "1940 to 1949",
        "1950 to 1959",
        "1960 to 1969",
        "1970 to 1979",
        "1980 to 1989",
        "1990 to 1999",
        ">2000",
      ],
      y: [
        mapReduce(jsonData, "birth_year_LT1900"),
        mapReduce(jsonData, "1900-1909"),
        mapReduce(jsonData, "1910-1919"),
        mapReduce(jsonData, "1920-1929"),
        mapReduce(jsonData, "1930-1939"),
        mapReduce(jsonData, "1940-1949"),
        mapReduce(jsonData, "1950-1959"),
        mapReduce(jsonData, "1960-1969"),
        mapReduce(jsonData, "1970-1979"),
        mapReduce(jsonData, "1980-1989"),
        mapReduce(jsonData, "1990-1999"),
        mapReduce(jsonData, "birth_year_GE2000"),
        mapReduce(jsonData, "birth_year_DK"),
      ],
      marker: {
        color: [
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
        ],
      },
      type: "bar",
    },
  ];

  const layout = {
    xaxis: {
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    // title : total,
  };
  Plotly.newPlot(`${id}`, data, layout, {
    responsive: true,
    displayModeBar: false,
  });
  document.getElementById(
    labelID
  ).innerHTML = `${variables.BCRPP[parameter]["label"]}`;
};

const generateMenarcheBarChart = (
  parameter,
  id,
  labelID,
  jsonData,
  chartRow
) => {
  const div = document.createElement("div");
  div.classList = ["col-xl-4 pl-2 padding-right-zero mb-3"];
  div.innerHTML = dataVisulizationCards({
    cardHeaderId: labelID,
    cardBodyId: id,
  });
  document.getElementById(chartRow).appendChild(div);

  const data = [
    {
      x: ["≤12", "13", "14", "15", ">15", "Unknown"],
      y: [
        mapReduce(jsonData, "agemenarche_LE12"),
        mapReduce(jsonData, "agemenarche_13"),
        mapReduce(jsonData, "agemenarche_14"),
        mapReduce(jsonData, "agemenarche_15"),
        mapReduce(jsonData, "agemenarche_GT15"),
        mapReduce(jsonData, "agemenarche_777") +
          mapReduce(jsonData, "agemenarche_DK"),
      ],
      marker: {
        color: [
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
        ],
      },
      type: "bar",
    },
  ];
  const layout = {
    xaxis: {
      type: "category",
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",

    // title : total,
  };
  Plotly.newPlot(`${id}`, data, layout, {
    responsive: true,
    displayModeBar: false,
  });
  document.getElementById(
    labelID
  ).innerHTML = `${variables.BCRPP[parameter]["label"]}`;
};

const generateParityBarChart = (parameter, id, labelID, jsonData, chartRow) => {
  const div = document.createElement("div");
  div.classList = ["col-xl-4 pl-2 padding-right-zero mb-3"];
  div.innerHTML = dataVisulizationCards({
    cardHeaderId: labelID,
    cardBodyId: id,
  });
  document.getElementById(chartRow).appendChild(div);

  const filteredData = jsonData
    .map((dt) => parseInt(dt["parous_0"]))
    .filter((dt) => isNaN(dt) === false);
  let total = 0;
  const data = [
    {
      x: ["Nullparous", "Parous", "Unknown"],
      y: [
        mapReduce(jsonData, "parous_0"),
        mapReduce(jsonData, "parous_1"),
        mapReduce(jsonData, "parous_DK"),
      ],
      marker: {
        color: ["#8bc1e8", "#319fbe", "#8bc1e8"],
      },
      type: "bar",
    },
  ];
  const layout = {
    xaxis: {
      type: "category",
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };
  Plotly.newPlot(`${id}`, data, layout, {
    responsive: true,
    displayModeBar: false,
  });
  document.getElementById(
    labelID
  ).innerHTML = `${variables.BCRPP[parameter]["label"]}`;
};

const generatePregnaciesBarChart = (
  parameter,
  id,
  labelID,
  jsonData,
  chartRow
) => {
  const div = document.createElement("div");
  div.classList = ["col-xl-4 pl-2 padding-right-zero mb-3"];
  div.innerHTML = dataVisulizationCards({
    cardHeaderId: labelID,
    cardBodyId: id,
  });
  document.getElementById(chartRow).appendChild(div);
  const data = [
    {
      x: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "Unknown",
      ],
      y: [
        mapReduce(jsonData, "parity_0"),
        mapReduce(jsonData, "parity_1"),
        mapReduce(jsonData, "parity_2"),
        mapReduce(jsonData, "parity_3"),
        mapReduce(jsonData, "parity_4"),
        mapReduce(jsonData, "parity_5"),
        mapReduce(jsonData, "parity_6"),
        mapReduce(jsonData, "parity_7"),
        mapReduce(jsonData, "parity_8"),
        mapReduce(jsonData, "parity_9"),
        mapReduce(jsonData, "parity_10"),
        mapReduce(jsonData, "parity_11"),
        mapReduce(jsonData, "parity_12"),
        mapReduce(jsonData, "parity_13"),
        mapReduce(jsonData, "parity_14"),
        mapReduce(jsonData, "parity_15"),
        mapReduce(jsonData, "parity_16"),
        mapReduce(jsonData, "parity_DK"),
      ],
      marker: {
        color: [
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
        ],
      },
      type: "bar",
    },
  ];
  let total = 0;
  const layout = {
    xaxis: {
      type: "category",
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",

    // title : total,
  };
  Plotly.newPlot(`${id}`, data, layout, {
    responsive: true,
    displayModeBar: false,
  });
  document.getElementById(
    labelID
  ).innerHTML = `${variables.BCRPP[parameter]["label"]}`;
};

const generateBMIBarChart = (parameter, id, labelID, jsonData, chartRow) => {
  const div = document.createElement("div");
  div.classList = ["col-xl-4 pl-2 padding-right-zero mb-3"];
  div.innerHTML = dataVisulizationCards({
    cardHeaderId: labelID,
    cardBodyId: id,
  });
  document.getElementById(chartRow).appendChild(div);
  const data = [
    {
      x: [
        "<18.5",
        "18.5 to 24.9",
        "25.0 to 29.9",
        "30.0 to 34.9",
        "35.0 to 39.9",
        ">40.0",
        "Unkown",
      ],
      y: [
        mapReduce(jsonData, "bmi_LT18_5"),
        mapReduce(jsonData, "bmi_18_5_24_9"),
        mapReduce(jsonData, "bmi_25_0_29_9"),
        mapReduce(jsonData, "bmi_30_0_34_9"),
        mapReduce(jsonData, "bmi_35_0_39_9"),
        mapReduce(jsonData, "bmi_GE40_0"),
        mapReduce(jsonData, "bmi_DK"),
      ],
      marker: {
        color: [
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
        ],
      },
      type: "bar",
    },
  ];
  const layout = {
    xaxis: {
      type: "category",
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };
  Plotly.newPlot(`${id}`, data, layout, {
    responsive: true,
    displayModeBar: false,
  });
  document.getElementById(
    labelID
  ).innerHTML = `${variables.BCRPP[parameter]["label"]}`;
};
const generateYearsDiagBarChart = (
  parameter,
  id,
  labelID,
  jsonData,
  chartRow
) => {
  const div = document.createElement("div");
  div.classList = ["col-xl-4 pl-2 padding-right-zero mb-3"];
  div.innerHTML = dataVisulizationCards({
    cardHeaderId: labelID,
    cardBodyId: id,
  });
  document.getElementById(chartRow).appendChild(div);
  const data = [
    {
      x: [
        "1970 to 1979",
        "1980 to 1989",
        "1990 to 1999",
        "2000 to 2009",
        "2010 to 2019",
        ">2019",
        "Unknown",
      ],
      y: [
        mapReduce(jsonData, "dxdate_primary1_1970_1979"),
        mapReduce(jsonData, "dxdate_primary1_1980_1989"),
        mapReduce(jsonData, "dxdate_primary1_1990_1999"),
        mapReduce(jsonData, "dxdate_primary1_2000_2009"),
        mapReduce(jsonData, "dxdate_primary1_2010_2019"),
        mapReduce(jsonData, "dxdate_primary1_GE2020"),
        mapReduce(jsonData, "dxdate_primary1_DK"),
      ],
      marker: {
        color: [
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
        ],
      },
      type: "bar",
    },
  ];
  const layout = {
    xaxis: {
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };
  Plotly.newPlot(`${id}`, data, layout, {
    responsive: true,
    displayModeBar: false,
  });
  document.getElementById(
    labelID
  ).innerHTML = `${variables.BCRPP[parameter]["label"]}`;
};

const generateModeDetCountBarChart = (
  parameter,
  id,
  labelID,
  jsonData,
  chartRow
) => {
  const div = document.createElement("div");
  div.classList = ["col-xl-4 pl-2 padding-right-zero mb-3"];
  div.innerHTML = dataVisulizationCards({
    cardHeaderId: labelID,
    cardBodyId: id,
  });
  document.getElementById(chartRow).appendChild(div);
  const data = [
    {
      x: [
        "1970 to 1979",
        "1980 to 1989",
        "1990 to 1999",
        "2000 to 2009",
        "2010 to 2019",
        "Unknown",
      ],
      y: [
        mapReduce(jsonData, "dxdate_primary11970_1979"),
        mapReduce(jsonData, "dxdate_primary11980_1989"),
        mapReduce(jsonData, "dxdate_primary11990_1999"),
        mapReduce(jsonData, "dxdate_primary12000_2009"),
        mapReduce(jsonData, "dxdate_primary12010_2019"),
        mapReduce(jsonData, "dxdate_primary1DK"),
      ],
      marker: {
        color: [
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
          "#8bc1e8",
          "#319fbe",
        ],
      },
      type: "bar",
    },
  ];
  const layout = {
    xaxis: {
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };
  Plotly.newPlot(`${id}`, data, layout, {
    responsive: true,
    displayModeBar: false,
  });
  document.getElementById(
    labelID
  ).innerHTML = `${variables.BCRPP[parameter]["label"]}`;
};

const generateBarSingleSelect = (
  parameter,
  id,
  labelID,
  jsonData,
  headers,
  chartRow
) => {
  const div = document.createElement("div");
  div.classList = ["col-xl-4 pl-2 padding-right-zero mb-3"];
  div.innerHTML = dataVisulizationCards({
    cardHeaderId: labelID,
    cardBodyId: id,
  });
  document.getElementById(chartRow).appendChild(div);
  document.getElementById(id).innerHTML = "";
  let x = headers.filter((dt) => /famHist_/.test(dt));
  let y = x.map((dt) => mapReduce(jsonData, dt));
  x = x.map((dt) =>
    chartLabels[dt.replace(/famHist_/, "")]
      ? chartLabels[dt.replace(/famHist_/, "")]
      : dt.replace(/famHist_/, "")
  );

  let tmpObj = {};
  x.forEach((l, i) => (tmpObj[l] = y[i]));
  for (let obj in tmpObj) {
    if (tmpObj[obj] === 0) delete tmpObj[obj];
  }
  x = Object.keys(tmpObj);
  y = Object.values(tmpObj);
  const data = [
    {
      x: x,
      y: y,
      marker: {
        color: ["#BF1B61", "#f7b6d2", "#7F7F7F", "#cccccc"],
      },
      type: "bar",
    },
  ];
  const layout = {
    xaxis: {
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };
  Plotly.newPlot(`${id}`, data, layout, {
    responsive: true,
    displayModeBar: false,
  });

  document.getElementById(
    labelID
  ).innerHTML = `${variables.BCAC[parameter]["label"]}`;
};

const renderPlotlyPieChart = (
  jsonData,
  parameter,
  id,
  labelID,
  headers,
  chartRow
) => {
  const div = document.createElement("div");
  div.classList = ["col-xl-4 pl-2 padding-right-zero mb-3"];
  div.innerHTML = dataVisulizationCards({
    cardHeaderId: labelID,
    cardBodyId: id,
  });
  document.getElementById(chartRow).appendChild(div);
  let pieLabel = "";
  if (variables.BCAC[parameter] && variables.BCAC[parameter]["label"]) {
    pieLabel = variables.BCAC[parameter]["label"];
  } else {
    pieLabel = parameter;
  }

  document.getElementById(labelID).innerHTML = `${pieLabel}`;
  let values = headers
    .filter((dt) => /ER_statusIndex_/.test(dt))
    .map((dt) => mapReduce(jsonData, dt));
  let labels = headers
    .filter((dt) => /ER_statusIndex_/.test(dt))
    .map((dt) =>
      chartLabels[dt.replace(/ER_statusIndex_/, "")]
        ? chartLabels[dt.replace(/ER_statusIndex_/, "")]
        : dt.replace(/ER_statusIndex_/, "")
    );
  let tmpObj = {};
  labels.forEach((l, i) => (tmpObj[l] = values[i]));
  for (let obj in tmpObj) {
    if (tmpObj[obj] === 0) delete tmpObj[obj];
  }
  values = Object.values(tmpObj);
  labels = Object.keys(tmpObj);
  const d3 = Plotly.d3;
  const format = d3.format(",3f");
  const total = values.reduce((a, b) => a + b);
  const text = values.map(
    (v, i) => `
            ${labels[i]}<br>
            ${format(v)}<br>
            ${(v / total) * 100}%
        `
  );
  const data = [
    {
      y: values,
      x: labels,
      type: "bar",
      marker: {
        color: ["#BF1B61", "#f7b6d2", "#7F7F7F", "#cccccc"],
      },
    },
  ];
  const layout = {
    xaxis: {
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };
  Plotly.newPlot(`${id}`, data, layout, {
    responsive: true,
    displayModeBar: false,
  });
};

const countStatus = (value, jsonData, parameter) => {
  let tmpArray = jsonData
    .filter((dt) => {
      if (dt[parameter] === value) return dt;
    })
    .map((dt) => dt["total"]);
  if (tmpArray.length === 0) return 0;
  return tmpArray.reduce((a, b) => a + b);
};

const renderStatusBarChart = (
  jsonData,
  parameter,
  id,
  labelID,
  xarray,
  chartRow
) => {
  let pieLabel = "";
  if (variables.BCAC[parameter] && variables.BCAC[parameter]["label"]) {
    pieLabel = variables.BCAC[parameter]["label"];
  } else {
    pieLabel = parameter;
  }
  const div = document.createElement("div");
  div.classList = ["col-xl-4 pl-2 padding-right-zero mb-3"];
  div.innerHTML = dataVisulizationCards({
    cardHeaderId: labelID,
    cardBodyId: id,
  });
  document.getElementById(chartRow).appendChild(div);

  document.getElementById(labelID).innerHTML = `${pieLabel}`;
  const yvalues = [...xarray.map((x) => countStatus(x, jsonData, parameter))];
  const data = [
    {
      x: xarray,
      y: yvalues,
      type: "bar",
      marker: {
        color: ["#BF1B61", "#f7b6d2", "#BF1B61", "#f7b6d2"],
      },
    },
  ];
  const layout = {
    xaxis: {
      fixedrange: true,
      automargin: true,
      tickangle: 45,
      tickfont: { size: plotTextSize },
    },
    yaxis: {
      title: `Count`,
      fixedrange: true,
      tickformat: ",d",
      tickfont: { size: plotTextSize },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };
  Plotly.newPlot(`${id}`, data, layout, {
    responsive: true,
    displayModeBar: false,
  });
};

const dataVisulizationCards = (obj) => `
        <div style="height:100%" class="card div-border background-white">
            <div class="card-header">
                ${
                  obj.cardHeaderId
                    ? `<span class="data-summary-label-wrap"><select class="sumstats font-size-17 font-bold" id="${obj.cardHeaderId}"></select></span>`
                    : ``
                }
            </div>
            <div class="card-body viz-card-body">
                <div class="dataSummary-chart" id="${obj.cardBodyId}"></div>
                <!---<div><p>Download Data</p></div>--->
            </div>
        </div>
    `;


//Sample size based on filter selection (Population, Race, Ethnicity, and Cohort)
//Number of cases according to Population, Race, Ethnicity, and Cohort

//Sample size according to Variable Selection distribution

// Function to update all charts when one is selected
const updateAllCharts = (excludeId) => {
  chartIds.forEach(chartId => {
    const parameter = document.getElementById(chartId).getAttribute('data-parameter');
    if (parameter) {
      const dataGraphs = graphVariables;
      let x = Object.values(dataGraphs[parameter].values);
      
      // Use original data for the selected chart, filtered data for others
      let dataToUse = (selectedBars[chartId] && selectedBars[chartId].length > 0) ? globalData : filteredData;
      let y = Object.keys(dataGraphs[parameter].values).map(key => 
        countObjectsWithKeyValue(dataToUse, parameter, key)
      );
      
      // Create color array with highlighting
      let colors = Array(Math.ceil(x.length/2)).fill(["#006B3D","#53ab78"]).flat();
      if (selectedBars[chartId] && selectedBars[chartId].length > 0) {
        const selectedValues = selectedBars[chartId].map(bar => bar.value);
        colors = x.map((xVal, index) => 
          selectedValues.includes(xVal) ? '#FF6B35' : 'rgba(0, 107, 61, 0.3)'
        );
      }
      
      Plotly.restyle(chartId, {
        'y': [y],
        'marker.color': [colors]
      });
    }
  });
};