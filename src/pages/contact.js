import { getAppAssetUrl } from "../shared.js";

export const confluenceContactPage = () => {
  const template = `
        <div class="general-bg padding-bottom-1rem">
            <div class="body-min-height">
                <div class="main-summary-row">
                    <div class="align-left">
                         <h1 class="page-header">Study Team Members</h1>
                    </div>
                </div>

                <!-- NCI/DCEG Teams -->
                <div class="main-summary-row mb-4">
                    <div class="col">
                        <h4 class="font-bold mb-3">NCI Division of Cancer Epidemiology and Genetics (DCEG)</h4>
                        <div class="row">
                            <div class="col-lg-6 mb-3">
                                <div class="card shadow-sm h-100">
                                    <div class="card-body">
                                        <h5 class="card-title font-bold text-primary">Integrative Tumor Epidemiology Branch (ITEB)</h5>
                                        <ul class="list-unstyled mb-0">
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Jonine Figueroa, Ph.D., M.P.H</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Mustapha Abubakar, M.D., Ph.D.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Khushali Keyur Shahm, M.P.H</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="card shadow-sm h-100">
                                    <div class="card-body">
                                        <h5 class="card-title font-bold text-primary">Trans-Divisional Research Program (TDRP)</h5>
                                        <ul class="list-unstyled mb-0">
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Thomas Ahearn, Ph.D.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Louise A. Brinton, Ph.D. (retired)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="card shadow-sm h-100">
                                    <div class="card-body">
                                        <h5 class="card-title font-bold text-primary">Occupational and Environmental Epidemiology Branch (OEEB)</h5>
                                        <ul class="list-unstyled mb-0">
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Laura Beane-Freeman, Ph.D.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="card shadow-sm h-100">
                                    <div class="card-body">
                                        <h5 class="card-title font-bold text-primary">Office of the Director (OD)</h5>
                                        <ul class="list-unstyled mb-0">
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Brittny Davis Lynn, Ph.D. M.P.H.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="card shadow-sm h-100">
                                    <div class="card-body">
                                        <h5 class="card-title font-bold text-primary">Infectious and Immunology Epidemiology Branch (IIB)</h5>
                                        <ul class="list-unstyled mb-0">
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>James J. Goedert (retired), M.D.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Sam Mbulaiteye, M.D.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="card shadow-sm h-100">
                                    <div class="card-body">
                                        <h5 class="card-title font-bold text-primary">Biostatistics Branch (BB)</h5>
                                        <ul class="list-unstyled mb-0">
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Barry Graubard (retired), Ph.D.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Ruth Pfeiffer, Ph.D.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="card shadow-sm h-100">
                                    <div class="card-body">
                                        <h5 class="card-title font-bold text-primary">Molecular and Digital Pathology Lab (MDPL)</h5>
                                        <ul class="list-unstyled mb-0">
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Petra Lenz M.D.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="card shadow-sm h-100">
                                    <div class="card-body">
                                        <h5 class="card-title font-bold text-primary">Metabolic Epidemiology Branch (MEB)</h5>
                                        <ul class="list-unstyled mb-0">
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Rashmi Sinha, Ph.D.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Emily Vogtmann Ph.D.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Ghana Collaborators -->
                <div class="main-summary-row mb-4">
                    <div class="col">
                        <h4 class="font-bold mb-3">Ghana Collaborators</h4>
                        <div class="row">
                            <div class="col-lg-6 mb-3">
                                <div class="card shadow-sm h-100">
                                    <div class="card-body">
                                        <h5 class="card-title font-bold text-primary">Korle Bu Teaching Hospital and University of Ghana, Accra</h5>
                                        <ul class="list-unstyled mb-0">
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Joe Clegg-Lamptey, M.D.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Naomi Ohene Oti, R.N.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Florence Dedey, M.D.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Lawrence Edusei, M.D.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Joel Yarney, M.D.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Verne Vanderpuye, M.D.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="card shadow-sm h-100">
                                    <div class="card-body">
                                        <h5 class="card-title font-bold text-primary">University of Ghana</h5>
                                        <ul class="list-unstyled mb-0">
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Kofi Nyarko, M.D., M.P.H.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="card shadow-sm h-100">
                                    <div class="card-body">
                                        <h5 class="card-title font-bold text-primary">Komfo Anokye Teaching Hospital, Kumasi</h5>
                                        <ul class="list-unstyled mb-0">
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Baffour Awuah, M.D.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Ernest Adjei, M.D.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Francis Aitpillah, M.D.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Daniel Ansong, M.D.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Ernest Osei Bonsu Baawuah, M.D.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Amankwaa Fiempong, M.D.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Nicolas Titiloye, M.D.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="card shadow-sm h-100">
                                    <div class="card-body">
                                        <h5 class="card-title font-bold text-primary">Peace and Love Hospitals, Kumasi</h5>
                                        <ul class="list-unstyled mb-0">
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Beatrice Wiafe Addai, M.D., Ph.D.</li>
                                            <li class="py-1"><i class="fas fa-user-circle me-2 text-muted"></i>Seth A Wiafe, M.P.H., G.I.S.P., Ph.D.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Outside Collaborators -->
                <div class="main-summary-row mb-4">
                    <div class="col">
                        <h4 class="font-bold mb-3">Outside Collaborators</h4>
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <ul class="list-unstyled mb-0">
                                    <li class="py-2 border-bottom"><i class="fas fa-user-circle me-2 text-muted"></i><strong>Montserrat Garcia-Closas, M.D., Dr.Ph.</strong> - The Institute of Cancer Research, UK</li>
                                    <li class="py-2 border-bottom"><i class="fas fa-user-circle me-2 text-muted"></i><strong>Melissa Troester Ph.D., M.P.H.</strong> - University of North Carolina, NC</li>
                                    <li class="py-2 border-bottom"><i class="fas fa-user-circle me-2 text-muted"></i><strong>Doratha A Byrd Ph.D., M.P.H.</strong> - Moffit Cancer Center, FL</li>
                                    <li class="py-2 border-bottom"><i class="fas fa-user-circle me-2 text-muted"></i><strong>Dezheng Huo Ph.D., M.D.</strong> - University of Chicago, IL</li>
                                    <li class="py-2 border-bottom"><i class="fas fa-user-circle me-2 text-muted"></i><strong>Olufunmilayo (Funmi) I. Olopade, Ph.D., M.D.</strong> - University of Chicago, IL</li>
                                    <li class="py-2 border-bottom"><i class="fas fa-user-circle me-2 text-muted"></i><strong>Christopher A Haiman Sc.D.</strong> - Norris Comprehensive Cancer Center, CA</li>
                                    <li class="py-2 border-bottom"><i class="fas fa-user-circle me-2 text-muted"></i><strong>Wei Zheng Ph.D.</strong> - Vanderbilt University School of Medicine, TN</li>
                                    <li class="py-2"><i class="fas fa-user-circle me-2 text-muted"></i><strong>Maire Duggan, M.D.</strong> - University of Calgary, Canada</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Info Card -->
                <div class="main-summary-row mb-4">
                    <div class="col">
                        <div class="card shadow-sm" style="background-color: #f8f9fa;">
                            <div class="card-body text-center p-4">
                                <p class="mb-2 font-size-18">For questions about the Etiology of Aggressive Breast Cancer Study</p>
                                <p class="mb-0">
                                    <i class="fas fa-envelope me-2"></i>
                                    <strong>Email:</strong> <a href="mailto:NCIGBHS@mail.nih.gov">NCIGBHS@mail.nih.gov</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("overview").innerHTML = template;
};

export const confluenceQuestionairePage = () => {
    const template = `
          <div class="general-bg padding-bottom-1rem">
              <div class="body-min-height">
                  <div class="main-summary-row">
                      <div class="align-left">
                           <h1 class="page-header">Study Questionaire</h1>
                      </div>
                  </div>
                  <div class="confluence-resources white-bg div-border font-size-18 height100">
                    <iframe src="${getAppAssetUrl("static/files/GBHS_Questionnaire_Annotated_withV2_d20170821_TOC.pdf")}" width="100%" height="100%"></iframe>
                  </div>
                </div>
            </div>
                  `
    document.getElementById("overview").innerHTML = template;
}
