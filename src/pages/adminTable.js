import { showPreview } from "../components/boxPreview.js";
import { pageNavBar } from "../components/navBarMenuItems.js";
import {
  acceptedFolder,
  chairReviewFolder,
  daccReviewChairFolder,
  daccReviewFolder,
  deniedFolder,
  getFileInfo,
  getFolderItems,
  isDataAdmin,
  listComments,
  uploadFormFolder
} from "../shared.js";

const workflowFolders = [
  {
    id: uploadFormFolder,
    status: "New Concept",
    badgeClass: "bg-secondary"
  },
  {
    id: daccReviewFolder,
    status: "Steering Committee Review",
    badgeClass: "bg-primary"
  },
  {
    id: daccReviewChairFolder,
    status: "Steering Committee Re-review",
    badgeClass: "bg-info text-dark"
  },
  {
    id: chairReviewFolder,
    status: "Chair Review",
    badgeClass: "bg-warning text-dark"
  },
  {
    id: acceptedFolder,
    status: "Accepted",
    badgeClass: "bg-success"
  },
  {
    id: deniedFolder,
    status: "Denied",
    badgeClass: "bg-danger"
  }
];

let adminRecords = [];
const adminCommentCache = new Map();

const ratingDescriptions = {
  "1": "Approved as submitted",
  "2": "Approved, pending conditions or clarification",
  "3": "Approved, but data release will be delayed",
  "4": "Not approved",
  "5": "Decision pending clarification",
  "6": "Decision pending clarification",
  "777": "Duplicate proposal"
};

const escapeHtml = value =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const formatDate = value => {
  if (!value) return "--";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "--" : date.toLocaleDateString();
};

const getSubmitter = fileInfo =>
  fileInfo.created_by?.name || fileInfo.created_by?.login || "--";

const getRating = comment => {
  const match = comment?.message?.match(/Rating:\s*([^\r\n]+)/i);
  return match ? match[1].trim() : null;
};

const getLatestRating = comments => {
  const ratedComments = comments
    .filter(comment => getRating(comment))
    .sort(
      (a, b) =>
        new Date(b.created_at || 0).getTime() -
        new Date(a.created_at || 0).getTime()
    );

  if (ratedComments.length === 0) return null;
  return {
    value: getRating(ratedComments[0]),
    comment: ratedComments[0]
  };
};

const renderLatestRating = comments => {
  const latestRating = getLatestRating(comments);
  if (!latestRating) {
    return `<span class="text-muted">No rating has been submitted.</span>`;
  }

  const description = ratingDescriptions[latestRating.value];
  return `
    <span class="badge bg-primary me-2">Rating ${escapeHtml(latestRating.value)}</span>
    <span>${escapeHtml(description || "Most recent submitted rating")}</span>
    <span class="text-muted small ms-2">
      ${escapeHtml(formatDate(latestRating.comment.created_at))}
    </span>
  `;
};

const renderComments = comments => {
  if (comments.length === 0) {
    return `<p class="text-muted mb-0">No comments to show.</p>`;
  }

  const sortedComments = [...comments].sort(
    (a, b) =>
      new Date(b.created_at || 0).getTime() -
      new Date(a.created_at || 0).getTime()
  );

  return sortedComments
    .map(comment => {
      const author =
        comment.created_by?.name || comment.created_by?.login || "Unknown user";
      const createdAt = comment.created_at
        ? new Date(comment.created_at).toLocaleString()
        : "--";

      return `
        <div class="border-top pt-2 mt-2">
          <div class="d-flex justify-content-between gap-3">
            <strong class="text-primary">${escapeHtml(author)}</strong>
            <span class="text-muted small">${escapeHtml(createdAt)}</span>
          </div>
          <div class="mt-1" style="white-space: pre-wrap;">${escapeHtml(comment.message || "")}</div>
        </div>
      `;
    })
    .join("");
};

const getAdminComments = async fileId => {
  if (adminCommentCache.has(fileId)) {
    return adminCommentCache.get(fileId);
  }

  const response = await listComments(fileId);
  if (!response) throw new Error("No response received from Box comments");

  const data = JSON.parse(response);
  const comments = Array.isArray(data.entries) ? data.entries : [];
  adminCommentCache.set(fileId, comments);
  return comments;
};

export const adminTableTemplate = () => {
  if (!isDataAdmin()) {
    return `
      <div class="general-bg body-min-height padding-bottom-1rem">
        <div class="container">
          <div class="alert alert-danger mt-3" role="alert">
            You do not have permission to view the Admin Table.
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="general-bg body-min-height padding-bottom-1rem">
      <div class="container">
        ${pageNavBar("data_access", "admin", "Overview", "dbGaP Study", "Submit Concept Form")}
        <div class="main-summary-row align-items-center">
          <div class="col align-left">
            <h1 class="page-header">Admin Table</h1>
            <p class="mb-0">EABCS analysis proposals across the review workflow.</p>
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-outline-primary" id="refreshAdminTable">
              <i class="fas fa-sync-alt me-1"></i> Refresh
            </button>
          </div>
        </div>

        <div class="data-submission div-border white-bg font-size-18 p-3">
          <div id="adminTableSummary" class="row mb-3"></div>
          <div class="row mb-3">
            <div class="col-md-8 mb-2 mb-md-0">
              <label class="visually-hidden" for="adminTableSearch">Search proposals</label>
              <input
                type="search"
                class="form-control"
                id="adminTableSearch"
                placeholder="Search by concept name or submitter"
              >
            </div>
            <div class="col-md-4">
              <label class="visually-hidden" for="adminStatusFilter">Filter by status</label>
              <select class="form-select" id="adminStatusFilter">
                <option value="">All statuses</option>
                ${workflowFolders
                  .map(
                    folder =>
                      `<option value="${escapeHtml(folder.status)}">${escapeHtml(folder.status)}</option>`
                  )
                  .join("")}
              </select>
            </div>
          </div>

          <div id="adminTableError"></div>
          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col">Concept Name</th>
                  <th scope="col">Submitted By</th>
                  <th scope="col">Submitted</th>
                  <th scope="col">Last Updated</th>
                  <th scope="col">Status</th>
                  <th scope="col" class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody id="adminTableBody">
                <tr>
                  <td colspan="6" class="text-center py-4">
                    <i class="fas fa-spinner fa-spin me-2"></i> Loading proposals...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
};

const renderSummary = records => {
  const summary = document.getElementById("adminTableSummary");
  if (!summary) return;

  const counts = new Map(
    workflowFolders.map(folder => [
      folder.status,
      records.filter(record => record.status === folder.status).length
    ])
  );

  summary.innerHTML = `
    <div class="col-md-3 col-6 mb-2">
      <div class="card h-100">
        <div class="card-body py-2">
          <div class="small text-muted">Total Proposals</div>
          <div class="h4 mb-0">${records.length}</div>
        </div>
      </div>
    </div>
    ${workflowFolders
      .map(
        folder => `
          <div class="col-md-3 col-6 mb-2">
            <div class="card h-100">
              <div class="card-body py-2">
                <div class="small text-muted">${escapeHtml(folder.status)}</div>
                <div class="h4 mb-0">${counts.get(folder.status)}</div>
              </div>
            </div>
          </div>
        `
      )
      .join("")}
  `;
};

const renderRows = () => {
  const tableBody = document.getElementById("adminTableBody");
  const searchInput = document.getElementById("adminTableSearch");
  const statusFilter = document.getElementById("adminStatusFilter");
  if (!tableBody || !searchInput || !statusFilter) return;

  const query = searchInput.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;
  const filteredRecords = adminRecords.filter(record => {
    const searchableText = `${record.fileInfo.name} ${getSubmitter(record.fileInfo)}`.toLowerCase();
    return (
      (!query || searchableText.includes(query)) &&
      (!selectedStatus || record.status === selectedStatus)
    );
  });

  if (filteredRecords.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-muted py-4">
          No proposals match the selected filters.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filteredRecords
    .map(
      record => `
        <tr id="adminConceptRow${escapeHtml(record.fileInfo.id)}">
          <td>${escapeHtml(record.fileInfo.name)}</td>
          <td>${escapeHtml(getSubmitter(record.fileInfo))}</td>
          <td>${escapeHtml(formatDate(record.fileInfo.created_at))}</td>
          <td>${escapeHtml(formatDate(record.fileInfo.modified_at))}</td>
          <td>
            <span class="badge ${record.badgeClass}">${escapeHtml(record.status)}</span>
          </td>
          <td class="text-end">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary toggle-admin-comments me-1"
              data-file-id="${escapeHtml(record.fileInfo.id)}"
              aria-expanded="false"
              aria-controls="adminConceptDetails${escapeHtml(record.fileInfo.id)}"
              title="Show comments and latest rating"
            >
              <i class="fas fa-chevron-down"></i>
              <span class="visually-hidden">Show comments and latest rating</span>
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-primary preview-admin-file"
              data-file-id="${escapeHtml(record.fileInfo.id)}"
              data-file-name="${escapeHtml(record.fileInfo.name)}"
            >
              <i class="fas fa-external-link-alt me-1"></i> Preview
            </button>
          </td>
        </tr>
        <tr id="adminConceptDetails${escapeHtml(record.fileInfo.id)}" class="d-none">
          <td colspan="6" class="bg-light">
            <div class="admin-concept-comments p-3" data-loaded="false">
              <div class="text-muted">Expand to load comments and rating.</div>
            </div>
          </td>
        </tr>
      `
    )
    .join("");

  document.querySelectorAll(".toggle-admin-comments").forEach(button => {
    button.addEventListener("click", async () => {
      const fileId = button.dataset.fileId;
      const detailsRow = document.getElementById(`adminConceptDetails${fileId}`);
      const details = detailsRow?.querySelector(".admin-concept-comments");
      if (!detailsRow || !details) return;

      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isExpanded));
      detailsRow.classList.toggle("d-none", isExpanded);

      const icon = button.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-chevron-down", isExpanded);
        icon.classList.toggle("fa-chevron-up", !isExpanded);
      }

      if (isExpanded || details.dataset.loaded === "true") return;

      details.innerHTML = `
        <div class="text-muted">
          <i class="fas fa-spinner fa-spin me-2"></i> Loading comments...
        </div>
      `;

      try {
        const comments = await getAdminComments(fileId);
        details.innerHTML = `
          <div class="mb-3">
            <h6 class="font-bold mb-2">Most Recent Rating</h6>
            ${renderLatestRating(comments)}
          </div>
          <div>
            <h6 class="font-bold mb-2">Box Comments (${comments.length})</h6>
            ${renderComments(comments)}
          </div>
        `;
        details.dataset.loaded = "true";
      } catch (error) {
        console.error(`Unable to load comments for file ${fileId}:`, error);
        details.innerHTML = `
          <div class="alert alert-warning mb-0" role="alert">
            Comments and rating could not be loaded. Collapse this row and try again.
          </div>
        `;
      }
    });
  });

  document.querySelectorAll(".preview-admin-file").forEach(button => {
    button.addEventListener("click", () => {
      const header = document.getElementById("bcrppPreviewerModalHeader");
      const body = document.getElementById("bcrppPreviewerModalBody");
      const modalElement = document.getElementById("bcrppPreviewerModal");
      if (!header || !body || !modalElement) return;

      header.innerHTML = `
        <h5 class="modal-title">${escapeHtml(button.dataset.fileName)}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      `;
      body.innerHTML = "";
      window.bootstrap.Modal.getOrCreateInstance(modalElement).show();
      showPreview(button.dataset.fileId, "bcrppPreviewerModalBody");
    });
  });
};

const fetchAdminRecords = async () => {
  const folderResponses = await Promise.all(
    workflowFolders.map(async folder => {
      const response = await getFolderItems(folder.id);
      return (response?.entries || [])
        .filter(item => item.type === "file")
        .map(item => ({ item, ...folder }));
    })
  );

  const records = folderResponses.flat();
  const detailedRecords = await Promise.all(
    records.map(async record => ({
      ...record,
      fileInfo: (await getFileInfo(record.item.id)) || record.item
    }))
  );

  return detailedRecords.sort((a, b) => {
    const aDate = new Date(a.fileInfo.created_at || 0).getTime();
    const bDate = new Date(b.fileInfo.created_at || 0).getTime();
    return bDate - aDate;
  });
};

export const loadAdminTable = async () => {
  if (!isDataAdmin()) return;

  adminCommentCache.clear();
  const tableBody = document.getElementById("adminTableBody");
  const errorContainer = document.getElementById("adminTableError");
  if (!tableBody || !errorContainer) return;

  tableBody.innerHTML = `
    <tr>
      <td colspan="6" class="text-center py-4">
        <i class="fas fa-spinner fa-spin me-2"></i> Loading proposals...
      </td>
    </tr>
  `;
  errorContainer.innerHTML = "";

  try {
    adminRecords = await fetchAdminRecords();
    renderSummary(adminRecords);
    renderRows();
  } catch (error) {
    console.error("Unable to load the Admin Table:", error);
    errorContainer.innerHTML = `
      <div class="alert alert-danger" role="alert">
        The Admin Table could not be loaded. Please refresh and try again.
      </div>
    `;
    tableBody.innerHTML = "";
  }

  const searchInput = document.getElementById("adminTableSearch");
  const statusFilter = document.getElementById("adminStatusFilter");
  const refreshButton = document.getElementById("refreshAdminTable");

  if (searchInput && !searchInput.dataset.listenerAttached) {
    searchInput.addEventListener("input", renderRows);
    searchInput.dataset.listenerAttached = "true";
  }
  if (statusFilter && !statusFilter.dataset.listenerAttached) {
    statusFilter.addEventListener("change", renderRows);
    statusFilter.dataset.listenerAttached = "true";
  }
  if (refreshButton && !refreshButton.dataset.listenerAttached) {
    refreshButton.addEventListener("click", loadAdminTable);
    refreshButton.dataset.listenerAttached = "true";
  }
};
