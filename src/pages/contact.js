import { getAppAssetUrl, loadPdfIntoIframe } from "../shared.js";

const studyTeamGithubUrl =
  "https://raw.githubusercontent.com/episphere/GhanaDataPlatforms/main/src/data/studyTeam.json";

const escapeHtml = value =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const validateStudyTeamData = data => {
  if (!data || !Array.isArray(data.sections)) {
    throw new Error("Study team data must include a sections array");
  }

  data.sections.forEach(section => {
    if (!section.title || !Array.isArray(section.groups)) {
      throw new Error("Each study team section requires a title and groups");
    }
    section.groups.forEach(group => {
      if (!Array.isArray(group.members)) {
        throw new Error("Each study team group requires a members array");
      }
      if (
        group.members.some(
          member => !member || typeof member.name !== "string" || !member.name.trim()
        )
      ) {
        throw new Error("Each study team member requires a name");
      }
    });
  });

  return data;
};

const fetchStudyTeamData = async () => {
  try {
    const githubResponse = await fetch(studyTeamGithubUrl, {
      cache: "no-store"
    });
    if (!githubResponse.ok) {
      throw new Error(`GitHub returned ${githubResponse.status}`);
    }
    return validateStudyTeamData(await githubResponse.json());
  } catch (githubError) {
    console.warn(
      "Unable to load the Study Team from GitHub; using the deployed fallback.",
      githubError
    );

    const fallbackResponse = await fetch(
      getAppAssetUrl("src/data/studyTeam.json"),
      { cache: "no-store" }
    );
    if (!fallbackResponse.ok) {
      throw new Error(`Local fallback returned ${fallbackResponse.status}`);
    }
    return validateStudyTeamData(await fallbackResponse.json());
  }
};

const renderMember = member => {
  const name = escapeHtml(member.name);
  const affiliation = member.affiliation
    ? ` - ${escapeHtml(member.affiliation)}`
    : "";

  return `
    <li class="py-2 border-bottom">
      <i class="fas fa-user-circle me-2 text-muted"></i>
      ${member.affiliation ? `<strong>${name}</strong>` : name}${affiliation}
    </li>
  `;
};

const renderStudyTeam = data =>
  data.sections
    .map(
      section => `
        <div class="main-summary-row mb-4">
          <div class="col">
            <h4 class="font-bold mb-3">${escapeHtml(section.title)}</h4>
            <div class="row">
              ${section.groups
                .map(
                  group => `
                    <div class="${group.wide ? "col-12" : "col-lg-6"} mb-3">
                      <div class="card shadow-sm h-100">
                        <div class="card-body">
                          ${
                            group.title
                              ? `<h5 class="card-title font-bold text-primary">${escapeHtml(group.title)}</h5>`
                              : ""
                          }
                          <ul class="list-unstyled mb-0">
                            ${group.members.map(renderMember).join("")}
                          </ul>
                        </div>
                      </div>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>
        </div>
      `
    )
    .join("");

export const confluenceContactPage = async () => {
  const overview = document.getElementById("overview");
  if (!overview) return;

  overview.innerHTML = `
    <div class="general-bg padding-bottom-1rem">
      <div class="body-min-height">
        <div class="main-summary-row">
          <div class="align-left">
            <h1 class="page-header">Study Team Members</h1>
          </div>
        </div>
        <div id="studyTeamContent">
          <div class="text-center py-5 text-muted">
            <i class="fas fa-spinner fa-spin me-2"></i> Loading study team...
          </div>
        </div>
      </div>
    </div>
  `;

  const content = document.getElementById("studyTeamContent");
  try {
    const data = await fetchStudyTeamData();
    if (document.getElementById("studyTeamContent") !== content) return;
    content.innerHTML = renderStudyTeam(data);
  } catch (error) {
    console.error("Unable to load Study Team Members:", error);
    if (document.getElementById("studyTeamContent") !== content) return;
    content.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Study Team Members could not be loaded. Please try again later.
      </div>
    `;
  }
};

export const confluenceQuestionairePage = () => {
  const pdfUrl = getAppAssetUrl(
    "static/files/GBHS_Questionnaire_Annotated_withV2_d20170821_TOC.pdf"
  );
  const template = `
    <div class="general-bg padding-bottom-1rem">
      <div class="body-min-height">
        <div class="main-summary-row">
          <div class="align-left">
            <h1 class="page-header">Study Questionaire</h1>
          </div>
        </div>
        <div class="confluence-resources white-bg div-border font-size-18 height100">
          <iframe id="questionnairePdfViewer" title="Study Questionnaire PDF" width="100%" height="100%"></iframe>
        </div>
      </div>
    </div>
  `;
  document.getElementById("overview").innerHTML = template;
  loadPdfIntoIframe("questionnairePdfViewer", pdfUrl);
};
