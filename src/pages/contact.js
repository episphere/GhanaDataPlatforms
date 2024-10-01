export const confluenceContactPage = () => {
  const template = `
        <div class="general-bg padding-bottom-1rem">
            <div class="body-min-height">
                <div class="main-summary-row">
                    <div class="align-left">
                         <h1 class="page-header">Study Team Members</h1>
                    </div>
                </div>
                <div class="main-summary-row confluence-resources white-bg div-border font-size-18">
                    <div class="col">
                        <span>For questions about the Ghana Breast Health Study </span></br>
                        <span>Send email to: GBHS at </strong> <a href="gbhs@mail.nih.gov">gbhs@mail.nih.gov</a></span></br>
                        </br>
                        <div class="row">
                            <div class="col-4">
                                <b>Trans-Divisional Research Program (TDRP)</b>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> Thomas Ahearn, Ph.D. </li>
                                    <li class="list-group-item"> Louise A. Brinton, Ph.D. </li>
                                </ul>

                                <b>Occupational and Environmental Epidemiology Branch (OEEB)</b>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> Laura Beane-Freeman, Ph.D. </li>
                                </ul>

                                <b>Office of the Director (OD)</b>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> Brittny Davis Lynn, Ph.D. M.P.H. </li>
                                </ul>

                                <b>Infectious and Immunology Epidemiology Branch (IIB)</b>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> James J. Goedert (retired), M.D.</li>
                                    <li class="list-group-item"> Sam Mbulaiteye, M.D. </li>
                                </ul>

                                <b>Biostatistics Branch (BB)</b>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> Barry Graubard (retired), Ph.D. </li>
                                    <li class="list-group-item"> Ruth Pfeiffer, Ph.D. </li>
                                </ul>

                                <b>Molecular and Digital Pathology Lab (MDPL)</b>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> Petra Lenz M.D. </li>
                                </ul>

                                <b>Metabolic Epidemiology Branch (MEB)</b>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Rashmi Sinha, Ph.D.</li>
                                    <li class="list-group-item">Emily Vogtmann Ph.D.</li>
                                </ul>

                            </div>
                            <div class="col-4">
                                <b>Korle Bu Teaching Hospital and University of Ghana, Accra, Ghana</b>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> Joe Clegg-Lamptey, M.D.  </li>
                                    <li class="list-group-item"> Naomi Ohene Oti, R.N. </li>
                                    <li class="list-group-item"> Florence Dedey, M.D. </li>
                                    <li class="list-group-item"> Lawrence Edusei, M.D. </li>
                                    <li class="list-group-item"> Joel Yarney, M.D. </li>
                                    <li class="list-group-item"> Verne Vanderpuye, M.D. </li>
                                </ul>

                                <b>University of Ghana</b>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Kofi Nyarko, M.D., M.P.H.</li>
                                </ul>
                                
                                <b>Komfo Anokye Teaching Hospital, Kumasi, Ghana</b>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> Baffour Awuah, M.D.</li>
                                    <li class="list-group-item"> Ernest Adjei, M.D.</li>
                                    <li class="list-group-item"> Francis Aitpillah, M.D.</li>
                                    <li class="list-group-item"> Daniel Ansong, M.D.</li>
                                    <li class="list-group-item"> Ernest Osei Bonsu Baawuah, M.D.</li>
                                    <li class="list-group-item"> Amankwaa Fiempong, M.D.</li>
                                    <li class="list-group-item"> Nicolas Titiloye, M.D.</li>
                                </ul>

                                <b>Peace and Love Hospitals, Kumasi, Ghana</b>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Beatrice Wiafe Addai, M.D.,Ph.D.</li>
                                    <li class="list-group-item">Seth A Wiafe, M.P.H., G.I.S.P., Ph.D.</li>
                                </ul>
                            </div>
                            <div class="col-4">
                                <b>Outside Collaborators </b>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> Montserrat Garcia-Closas, M.D., Dr.Ph. The Institute of Cancer Research, UK</li>
                                    <li class="list-group-item"> Melissa Troester Ph.D., M.P.H., University of North Carolina, NC </li>
                                    <li class="list-group-item"> Doratha A Byrd Ph.D., M.P.H., Moffit Cancer Center, FL</li>
                                    <li class="list-group-item"> Dezheng Huo Ph.D., M.D., University of Chicago, IL</li>
                                    <li class="list-group-item"> Olufunmilayo (Funmi) I. Olopade, Ph.D., M.D., University of Chicago, IL</li>
                                    <li class="list-group-item"> Christopher A Haiman Sc.D., Norris Comprehensive Cancer Center, CA</li>
                                    <li class="list-group-item"> Wei Zheng Ph.D., Vanderbilt University school of medicine, TN</li>
                                    <li class="list-group-item"> Maire Duggan, M.D., University of Calgary, Canada</li>
                                </ul>

                            </div>
                        </div>
                                <!---<table class="table table-bordered table-responsive w-100 d-block d-md-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Member</th>
                                            <th scope="col">Cohort</th>
                                            <th scope="col">Affiliation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Pete Kraft</td>
                                            <td>Prostate, Lung, Colorectal and Ovarian Cancer Screening Trial</td>
                                            <td>Division of Cancer Epidemiology and Genetics, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Montserrat Garcia-Closas</td>
                                            <td>Generations Study</td>
                                            <td>The Institute of Cancer Research, London</td>
                                        </tr>
                                        <tr>
                                            <td>Jeanine Genkinger</td>
                                            <td>Breast Cancer Family Registry </td>
                                            <td>Columbia University, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Julie Palmer</td>
                                            <td>Black Women's Health Study</td>
                                            <td>Boston University, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Matt Barnet</td>
                                            <td>Carotene and Retinol Efficacy Trial</td>
                                            <td>Fred Hutch, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Kala Visvanathan</td>
                                            <td>Clue Cohort Study-II</td>
                                            <td>Johns Hopkins University, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Mia Gaudet</td>
                                            <td>Connect for Cancer Prevention Cohort Study</td>
                                            <td>Division of Cancer Epidemiology and Genetics, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Lauren Teras</td>
                                            <td>Cancer Prevention Study 2</td>
                                            <td>American Cancer Society, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Thomas Rohan</td>
                                            <td>Canadian Study of Diet, Lifestyle and Health</td>
                                            <td>Albert Eisten College of Medicine, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Jim Lacey</td>
                                            <td>California Teachers Study</td>
                                            <td>City of Hope, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Rudolf Kaaks</td>
                                            <td>European Prospective Investigation of Cancer and Nutrition</td>
                                            <td>German Cancer Research Center, Germany</td>
                                        </tr>
                                        <tr>
                                            <td>Archie Campbell</td>
                                            <td>Generation Scotland</td>
                                            <td>University of Edinburgh, UK</td>
                                        </tr>
                                        <tr>
                                            <td>Renee Fortner</td>
                                            <td>Janus Serum Bank Cohort</td>
                                            <td>Cancer Registry of Norway, Norway</td>
                                        </tr>
                                        <tr>
                                            <td>Roger Milne</td>
                                            <td>Melbourne Collaborative Cohort Study </td>
                                            <td>Cancer Council Victoria, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Chris Haiman</td>
                                            <td>Multiethnic Cohort</td>
                                            <td>University of South California, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Celine Vachon</td>
                                            <td>Mayo Mammography Health Study</td>
                                            <td>Mayo Clinic, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Heather Eliasson</td>
                                            <td>Nurses Health Study</td>
                                            <td>Harvard T.H. Chan School of Public Health, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Yu Chen</td>
                                            <td>New York University Women s Health Study </td>
                                            <td>NYU Langone Health, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Katie O'Brien</td>
                                            <td>Sister Study</td>
                                            <td>National Institute of Environmental Health Sciences, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Ylva Lagerros</td>
                                            <td>Swedish National March Cohort</td>
                                            <td>Karolinska Institutet, Sweden</td>
                                        </tr>
                                        <tr>
                                            <td>Emily White</td>
                                            <td>VITamins And Lifestyle Cohort</td>
                                            <td>Fred Hutchinson Cancer Research Center, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Garnet Anderson</td>
                                            <td>Women's Health Initiatve</td>
                                            <td>Fred Hutchinson Cancer Research Center, USA</td>
                                        </tr>
                                        <tr>
                                            <td>I-min Lee</td>
                                            <td>Women's Health Study</td>
                                            <td>Harvard T.H. Chan School of Public Health, USA</td>
                                        </tr>
                                        <tr>
                                            <td>Sven Sandin</td>
                                            <td>Women's Lifestyle and Health</td>
                                            <td>Karolinska Institutet, Sweden</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>--->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("overview").innerHTML = template;
};
