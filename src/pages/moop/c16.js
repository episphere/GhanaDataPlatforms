export const c16 = {
    title: "Chapter 16: Data Entry and Transmittal",
    html: `
        <h3>16.1 Overview of the Data Entry and Management System</h3>
        <p>Information collected on the Eligibility Screener, Recruitment Outcome Form, Risk Factor Questionnaire, Anthropometry Form, and biospecimen forms will be entered by Ghanaian data entry staff into the Data Entry and Management System. This system is composed of modules which provide the study forms for data entry, monitor the completion of data entry into these forms (User Interface), and transmit the data forms to Westat (Web Services). The general information maintained by the system will contribute to reports relating to overall study progress. This system will reside on the #1 PC at each data entry site in Ghana and will be used by the staff at those sites. The system will also be accessible to Westat staff.</p>
        <p>In addition to managing the data entry of all forms, the system will also monitor and transmit scanned images of the completed forms to Westat. In order to retain electronic copies of study forms for future reference, Ghanaian staff at each data entry site will scan each form using the FUJITSU fi-6240 scanner. The resultant image files (in .tif format) will be saved to a specific folder on the #1 PC at the data entry sites and then periodically transmitted to Westat. The form images will be retained in an image storage and retrieval system at Westat, allowing for easy retrieval and review during the data editing process, if needed.</p>
        
        <h3>16.2 The User Interface</h3>
        <p>The User Interface (UI) application is called the “Ghana Client App” and is represented as the green boxes in the diagram. This is a program that will run on each PC in Ghana that will be used for data entry. The UI allows the data entry personnel to enter data from each form for each participant. The data entry forms were developed in the MS InfoPath 2010 software and the UI launches this software that then allows access to the data entry forms. The UI application is a custom-designed wrapper around the MS InfoPath 2010 commercial off-the-shelf product that provides the capabilities of designing, filling, and submitting electronic forms containing keyed structured data. The UI saves all study data to a single database located on the #1 PC at each study data entry site (represented by the blue boxes on the diagram).</p>
        <p>As part of the UI, three screens have been created: (1) the login screen, (2) the PID/Barcode Input Screen, and (3) the Data Grid Screen, which will link the forms to MS InfoPath for data entry and allow for the monitoring of the completion of the forms. Added features of the UI include the ability to launch each of the study forms directly from the application and to save and retrieve data when a form is closed in the application.</p>
        <p>Login credentials (user IDs and passwords) to the UI application will be provided to data entry staff at the start of the data entry phase of the study. For quality assurance purposes, data from each study form will be entered twice into the application by two independent data entry staff members. A user’s reference guide providing step-by-step instructions on how to navigate the system will be provided. The user’s guide will also be available on the UI system for download and printing.</p>
        
        <h3>16.3 Windows Service Application</h3>
        <p>As noted above, the #1 PC at each study data entry site will maintain the database for all the data entry performed at that study site. In order to transmit this database to Westat, a Windows Service application (shown as the orange boxes in the diagram) will run continuously on the #1 PC. This program will check for newly updated form data or newly scanned images and attempt to upload this data to the Westat servers. If the upload is unsuccessful, the system will try again during the next scheduled attempt. The system is currently set to check for updates every 15 minutes.</p>
        
        <h3>16.4 Web Services Application</h3>
        <p>The Westat system component that receives new data forms and image documents is called the Westat Service and is represented by the red box in the diagram. This application waits for data forms and images to be transmitted from the study sites. This system collects the new data and inserts the files into a database in the secure Westat corporate data zone. If the data files are successfully added to the database, then the system records the current date and time. The appropriate database in Ghana is then updated with the information regarding a successful data transfer.</p>
        
        <h3>16.5 Data Entry and Management System Requirements</h3>
        <p>This system was designed to overcome some deficiencies in the quality and reliability of Internet connectivity at the Ghana study sites. In order to eliminate the need to synchronize databases on more than one PC in Ghana, the database for all data entry and scanning is located only on PC #1 at each of the data entry sites. Consequently, the #1 PC at each study data entry site must remain powered on and running at all times. If the #1 PC is not on and functional, then data entry cannot occur nor can data be transmitted. Westat provided a UPS device for each computer to allow the computers to safely power down and power back up in the event of a power outage.</p>
        
        <h3>16.6 User’s Guide for the Data Entry and Management System</h3>
        <p>The instructions in this User’s Guide were created to assist the staff who will be performing the data entry.</p>
        <ol>
            <li>Start the Data Entry and Management System. Click on the program shortcut “Breast Cancer Project.”</li>
            <li>The login screen will be displayed.
                <ul>
                    <li>Please enter your data entry user ID. The user ID will be three letters followed by three numbers (e.g., ABC123, GHT537). Please log in only with the user ID assigned to you, because all data entry will be linked to your user ID.</li>
                    <li>Please enter the password, which will be given to you when your data entry user ID is assigned. The password is case sensitive, so please verify that the “Caps Lock” key is turned off and enter upper and lower case characters carefully.</li>
                    <li>Click the “Enter” button.</li>
                </ul>
            </li>
            <li>The Participant ID (PID) screen will be displayed.
                <ul>
                    <li>Using the hand scanner, scan the barcoded PID from the label on the first data collection form. The PID consists of five numbers, a dash, and one number (e.g., “12345-6”). The dash should appear in the box. Please verify that the scanned PID in the box is correct. If it is incorrect, please scan it again. If it is still incorrect, please manually correct it in the box and report this problem to your supervisor.</li>
                    <li>Once the correct PID has been entered, click the “Submit” button.</li>
                </ul>
            </li>
            <li>If this is the first time that data entry is started for this participant ID, then the Case or Control screen will be displayed. If data entry had already begun for this participant ID, then the Case or Control screen will not be displayed.
                <ul>
                    <li>Look at Question 1 on the Recruitment Outcome Form to determine if the participant is a Case or a Control.</li>
                    <li>Click the drop-down arrow in the “Is the participant a Case or Control?” box and select the appropriate “Case” or “Control” status.</li>
                    <li>If you are not able to determine the participant’s Case or Control status, please contact your supervisor.</li>
                    <li>Click the “Submit” button.</li>
                </ul>
            </li>
            <li>The Data Entry Form screen will be displayed.
                <ul>
                    <li>At the top of the screen, the PID, study site and Case or Control status will be displayed. If any of this information is incorrect, please contact your supervisor.</li>
                    <li>All applicable data collection forms for this participant are listed and the data entry status for each of the two required data entries are displayed. The data entry possibilities are as follows:
                        <table class="table table-bordered">
                            <tr><td>Ready to Enter</td><td>No data entry yet</td></tr>
                            <tr><td>Partial – DE_ID</td><td>Data entry was started, but not yet finished</td></tr>
                            <tr><td>Complete – DE_ID</td><td>Data entry was completed for this form</td></tr>
                        </table>
                        DE_ID is the data entry ID of the person who entered the data onto this form.
                    </li>
                    <li>Note that in January 2014, Version 2 forms were added to the data entry system and the system was adapted to allow for entry of Version 1 or Version 2 forms. This requires that you first select the Version and then select the form.</li>
                    <li>If the form you plan to key has “Ready to Enter” under both the “First Data Entry” and “Second Data Entry” columns, then you are the first data entry person for this form. Click on the “Ready to Enter” under the “First Data Entry” column.</li>
                    <li>If the form you plan to key has “Partial” or “Complete” under the “First Data Entry” column and “Ready to Enter” under the “Second Data Entry” column, then you are the second data entry person for this form. Click on the “Ready to Enter” under the “Second Data Entry” column.</li>
                    <li>If you did not finish keying a form, then you should see “Partial” followed by your user ID. Click on “Partial” to finish data entry of that form. Only the person who started data entry on this form may open this form again.</li>
                    <li>You may be the first data entry person for one form and the second data entry person for a different form. The system will not allow the same person to key the same form twice. Forms with a “Complete” status cannot be opened again.</li>
                    <li>If you had difficulty with a specific form, please enter a message into the “Comments” box. Please also include the name of the form and your DE_ID.</li>
                    <li>After data entry completion and form submittal, the data will be automatically transmitted to Westat. After a successful transmission, the “Upload Status” and “Upload Date” columns will be updated for that form.</li>
                    <li>You may return to the Data Entry Form screen several times during your data entry session. When you are finished with the session, click on the “Return” button.</li>
                </ul>
            </li>
            <li>If you clicked on ‘Ready to Enter’ or ‘Partial’ for one of the forms on the Data Entry Form screen, then the requested Data Entry form will be displayed.
                <ul>
                    <li>If the status of the form was “Ready to Enter,” then a new form will appear.</li>
                    <li>If the status of the form was “Partial,” then the partially keyed form will appear and you may continue with data entry.</li>
                    <li>Expand the window to full size by clicking the square box in the upper right corner.</li>
                    <li>Key the data into the form. Please refer to the User Guidelines for Data Entry in Section 16.7.</li>
                </ul>
            </li>
            <li>To SAVE a completed or partially completed form, please follow these instructions.
                <ul>
                    <li>Click the “Save” button at the top.</li>
                    <li>A Windows “Save” screen will appear. The “File name” will be automatically filled in and the folder location where the file will be saved is automatically designated. Please do NOT change the file name or folder location. It is critical for successful data transmission that the completed forms have specific names and are stored in the designated folder.</li>
                    <li>Click the “Save” button at the bottom of the Windows “Save” screen.</li>
                    <li>You may continue data entry of this form. At any time, you may again click the “Save” button at the top of the screen and again click the “Save” button on the Windows save screen to save what you have entered. This feature is especially useful when performing data entry of the Questionnaire, since it is a long form.</li>
                    <li>After finishing data entry, click the “Save” button at the top of the screen and again click the “Save” button on the Windows save screen to save what you have entered.</li>
                    <li>Exit the form by clicking the “I” button in the upper left corner. The “I” is an abbreviation for InfoPath, which is the MS software used for this data entry.</li>
                </ul>
            </li>
            <li>The Data Entry Form screen will be displayed again after you have exited from the data entry form. The system will automatically search for the saved form in the designated folder and store it in the system database with a notification that the database was updated.
                <ul>
                    <li>Click the “OK” button in the notification box.</li>
                </ul>
            </li>
            <li>On the Data Entry Form screen, you will be prompted to submit the form, which means that data entry is complete for the form and the form is ready for transmission to Westat.
                <ul>
                    <li>If the form is complete, then click the “Yes” button. The data entry status for that form will change from “Ready to Enter” or “Partial – DE_ID” to “Complete – DE_ID,” where DE_ID is your data entry ID. The form has not yet been transmitted, so the “Upload Status” and “Upload Date” will still be blank.</li>
                    <li>If you are not finished with data entry or would like to continue reviewing the form, then click the “No” button. The data entry status for that form will change from “Ready to Enter” to “Partial – DE_ID,” then it will remain the same. Only forms with a “Complete” status will be transmitted to Westat.</li>
                    <li>If you had difficulty with the form, please enter a message into the “Comments” box. Please include the name of the form and your DE ID in the comments.</li>
                </ul>
            </li>
            <li>The Data Entry Form screen will be refreshed.
                <ul>
                    <li>If you would like to enter data for another form for this PID, then repeat the data entry process by clicking on the appropriate form.</li>
                    <li>If you are finished with data entry for this participant, but would like to enter forms for another participant, then click the “Return” button. You can then begin or continue with data entry for that participant.</li>
                    <li>If you are finished with this data entry session and would like to log out of the system, then click the “Log Out” button.</li>
                </ul>
            </li>
        </ol>
        
        <h3>16.7 User Guidelines for Data Entry</h3>
        <p>These guidelines provide additional information for data entry staff regarding the data entry task.</p>
        <ol>
            <li>Forms should be reviewed for clarity and completeness prior to data entry or scanning. Any personally identifiable information that may identify the participants on the form should be removed. For example, a specific address that was written down for location of the interview should be redacted. In addition, any additional information written between questions, such as a physician’s name, should be redacted. Breast Biopsy Forms and Breast Case Abstract forms require personal identifiers of treating staff. This information should not be redacted. Interviewer notes about issues/uncertainties related to the questionnaire that are made directly on the questionnaire itself should not be deleted.</li>
            <li>The data entry forms were designed to look very similar to the original paper forms. However, on the first page of the data entry form, the following items have been added:
                <table class="table table-bordered">
                    <tr><td>Data Entry Person ID</td><td>Enter your DE_ID (three letters and three numbers)</td></tr>
                    <tr><td>Data Entry Date</td><td>Enter the date the data entry for this form started</td></tr>
                    <tr><td>Data Entry Time</td><td>Enter the start time of data entry (24-hour clock)</td></tr>
                </table>
            </li>
            <li>Enter the numeric response codes, dates, and times into each question as recorded on the paper form. Only numbers may be entered into a numeric field. If there is a response to an “open-ended” question (e.g., when a participant responded ‘Other’ and specified further details), please enter the exact response, verbatim. Lower and upper case may be used in text fields.</li>
            <li>Algorithms have been built into each data entry form in order to identify unexpected data. If a data item fails, then the box will be outlined in red. The following are some situations where entered data may fail and how to correct the data:
                <table class="table table-bordered">
                    <thead><tr><th>Failure</th><th>Corrective Action</th></tr></thead>
                    <tbody>
                        <tr><td>A letter or some other character is entered into a numeric field</td><td>Make correction since only a number may be entered into a numeric field</td></tr>
                        <tr><td>A single number is keyed into a numeric field, but the box is outlined in red</td><td>If the box allows for two numbers or three numbers, then add leading zeros. Example: day of month requires two digits.</td></tr>
                    </tbody>
                </table>
            </li>
            <li>The data entry forms were designed to allow all data to be keyed, even if information should not have been recorded for the question or too many responses were recorded. These situations could occur when question skip patterns were not followed correctly, or with instructions such as “Choose One” had more than one response. Please enter all data from the form even if it follows one of these ‘incorrect’ patterns.</li>
            <li>Since out-of-range numbers can be accidentally entered into numeric fields, please review the data entry form before considering it final. If desired, the form can be printed. Most of the forms are a few pages long. However, the Questionnaire is very lengthy and contains at least 30 pages. The data entry form is ready for submittal to the database and transmission to Westat only after data entry is complete and the form has been visually reviewed.</li>
            <li>When entering the Sample ID for the Blood Collection Form, the Saliva Collection Form, and the Stool Collection Form, always scan the Sample ID with the hand scanner. This prevents data entry errors and helps to ensure a correct link between the samples and the participant.</li>
            <li>The Form ID in the Data Entry system was expanded to allow for the lengthier Form IDs that began at the second printing of forms. The Form ID is in the bottom left corner of each form. For a period of time when the Form ID exceeded 5 digits but the field in the data entry system had not yet been expanded, Westat informed the sites that it was not necessary to key the Form ID. After the field was expanded, the entering of the Form ID should have resumed. Please continue to enter the Form ID on all new data entry forms.</li>
            <li>When the study pilot phase was initiated, the original plan was to wait until all forms for a subject were completed before beginning that participant’s data entry. This was impractical as there is a considerable time delay before the Breast Case Abstract Form information becomes available. The current protocol is to begin and submit data entry when all forms other than the Breast Case Abstract Form have been completed. The Breast Case Abstract Form should be entered when Section A: Diagnosis Information is complete but should remain unsubmitted until the rest of the form can be completed.</li>
            <li>The priority for data entry should be to complete one data entry for each form per subject. The second data entry should follow as closely behind as possible given the availability of data entry staff. Scanning should follow the second data entry as closely as possible.</li>
        </ol>
        
        <h3>16.8 User Instructions for Scanning of Forms</h3>
        <p>The Study Managers at each data entry site will scan all study forms for preservation as electronic images for future reference. The image files will be managed by the Data Entry and Management System for periodic transmission to Westat and retained in an image storage and retrieval system.</p>
        <ol>
            <li>Preparation of forms for scanning.
                <ul>
                    <li>It is assumed that each form has been reviewed by study staff for clarity and completeness, and does not contain any personally identifiable information. If the form is ready to be scanned, then it is also ready for data entry.</li>
                    <li>If you need to re-scan a form to correct a data error or omission, be sure you have communicated with Westat and have approval to proceed before re-scanning.</li>
                    <li>Carefully remove the staple or binder from the form.</li>
                </ul>
            </li>
            <li>Double-click on the shortcut “Windows Fax and Scan” and the application will launch. This application will maintain the scanned images as pages are scanned.</li>
            <li>Place the form on the scanner using the following instructions. (Place the form into the scanner with the top edge facing down.) Then, flip the entire form over, so that the front of the first page is facing away from you towards the scanner tray.</li>
            <li>When the form is correctly placed on the scanner, then click the “New Scan” button located in the upper left side of the “Windows Fax and Scan” application.</li>
            <li>The scanner setup page will be displayed, which allows you to verify that the proper settings are designated. These are the CORRECT settings:
                <ul>
                    <li>Profile: DOCUMENTS (Default)</li>
                    <li>Source: FEEDER (Scan both sides)</li>
                    <li>Paper Size: LETTER 8.5 x 11 inches</li>
                    <li>Color Format: BLACK AND WHITE</li>
                    <li>File Type: TIF (TIFF image)</li>
                    <li>Resolution: 300</li>
                    <li>Brightness: 40 - 50</li>
                </ul>
            </li>
            <li>After verifying that the settings are correctly set, click the “Scan” button. This will initiate the scan.</li>
            <li>After all pages of the form have been fed through the scanner, the “New Scan” screen will automatically close. The scanned image file should now be listed on the “Windows Fax and Scan” application screen with the generic file name of “Image.” This is a temporary file.</li>
            <li>Review the image file to verify that the quality of the scan is acceptable and that pages were scanned in order with none missing. Double-click on the image file and the file will open in “Windows Photo Viewer.” To view the pages, click on the forward arrow. Click on the back arrow to return to the previous page. After you have finished reviewing the file, close it in photo viewer by clicking the “X” button on the lower right corner of the program.</li>
            <li>If the image file is NOT acceptable (e.g., a page is missing or the text is not readable), you should delete the temporary image file before scanning the form again.
                <ul>
                    <li>Right click on File Name “Image” in the “Windows Scan and Fax” application.</li>
                    <li>Select “Delete.”</li>
                    <li>The “Delete File” box will display with the message “Are you sure you want to permanently delete this item?” Verify that file to be deleted is “Image” and then click the “Yes” button.</li>
                    <li>Then, re-scan the form starting with Step 3.</li>
                </ul>
                If the image file is acceptable, then save it as a permanent file. Click on the “Save As” button at the top.
            </li>
            <li>A “File Saver” screen will be displayed, so that you can specify a file name and folder location.
                <ul>
                    <li>You must save the image file into the folder “C:\\Ghana\\Form Images”.</li>
                    <li>Click on the drop down icon in the “Save in” box and select “OSDisk (C:)”.</li>
                    <li>Double click the “Ghana” folder and then double click the “Form Images” folder.</li>
                    <li>In the “File name” box, type in a file name using the following file naming convention: “[form name abbreviation]_[six-digit PID number with no dash].TIF”</li>
                    <li>Use the following form name abbreviations:
                        <table class="table table-bordered">
                            <tr><th>Abbreviation</th><th>Full form name</th></tr>
                            <tr><td>Elig</td><td>Study Eligibility Screener</td></tr>
                            <tr><td>Recruit</td><td>Recruitment Outcome Form</td></tr>
                            <tr><td>Quest</td><td>Risk Factor Questionnaire</td></tr>
                            <tr><td>Anthro</td><td>Anthropometry</td></tr>
                            <tr><td>Saliva</td><td>Saliva Collection Form</td></tr>
                            <tr><td>Blood</td><td>Blood Collection and Processing Form</td></tr>
                            <tr><td>Stool</td><td>Stool Collection Form</td></tr>
                            <tr><td>Biopsy</td><td>Biopsy Collection and Processing Form</td></tr>
                            <tr><td>Abstract</td><td>Breast Case Abstract Form</td></tr>
                        </table>
                    </li>
                    <li>File name examples: Blood_123456.TIF, Quest_735214.TIF</li>
                    <li>All Biopsy forms can be saved with the form name abbreviation ‘Biopsy’, regardless if it is Biopsy Form 1, Biopsy Form 2, etc, for a given case.</li>
                    <li>Verify that in the “Save as type” box, a TIF format is specified.</li>
                    <li>Click the “Save” button. The image file should now be stored in the “C:\\Ghana\\Form Images” folder with the file name that you specified.</li>
                </ul>
            </li>
            <li>After the image file has been saved into folder “C:\\Ghana\\Form Images” with the file name you specified, delete the temporary image file from the “Windows Fax and Scan” application.
                <ul>
                    <li>Right click on File Name “Image” in the “Windows Scan and Fax” application.</li>
                    <li>Select “Delete.” The “Delete File” box will display with the message “Are you sure you want to permanently delete this item?” Verify that file to be deleted is “Image” and then click the “Yes” button.</li>
                </ul>
            </li>
            <li>Remove the scanned form from the scanner. If it is a multi-page form re-staple the pages. Repeat the process for the next form to be scanned starting with Step 3.</li>
        </ol>
    `
};
