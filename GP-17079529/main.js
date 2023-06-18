import { app, getFirestore, collection, addDoc, getDocs, doc, deleteDoc, db } from "/firebase.js";
import { userID } from "./Authen.js";

document.addEventListener('DOMContentLoaded', function () {
    let addReport = document.getElementById('addReport');

    if (addReport != null) { 
        let reportContainer = document.getElementById('reportContainer');
        let inputField = document.getElementById('inputField');
        let timer;

        getAllReports();

        addReport.addEventListener('click', async function () {
            if (inputField.value != "") {
                const aReport = inputField.value;
                inputField.value = "";
                const now = new Date();
                const report_date = `Report date: ${now.toLocaleDateString()} : ${now.toLocaleTimeString()} \n`;
                const docRef = await addDoc(collection(db, "reports"), {
                    uid: userID,
                    report_date: report_date,
                    report: aReport
                });
                getAllReports();
            }
        });

        reportContainer.addEventListener('dblclick', function (event) {
            if (event.target.classList.contains('reportElement')) {
                const report = event.target.textContent;
                navigator.clipboard.writeText(report).then(function () {
                    alert("Copied to your clipboard: " + report);
                });
            }
        });

        reportContainer.addEventListener('mousedown', function (event) {
            if (event.target.classList.contains('reportElement')) {
                // Start a timer when pressed down
                timer = setTimeout(async function () {
                    if (confirm("Are you sure you want to delete this report?")) {
                        await deleteDoc(doc(db, "reports", event.target.id));
                        alert("Document successfully deleted!");
                        getAllReports();
                    }
                }, 1000);
            }
        });

        reportContainer.addEventListener('mouseup', function (event) {
            if (event.target.classList.contains('reportElement')) {
                clearTimeout(timer);
            }
        });

        async function getAllReports() {
            reportContainer.innerHTML = "";
            const querySnapshot = await getDocs(collection(db, "reports"));

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const report = data.report;
                const reportID = doc.id;
                const report_date = data.report_date;

                // Check if the user  authorized to read this report
                if (data.uid === userID) {
                    const reportElement = document.createElement("p");
                    reportElement.style = "border-style: outset; font-size: 24px; background-color: #ffebcd; color: white; color: black;";
                    reportElement.id = reportID;
                    reportElement.classList.add('reportElement', 'paragraph-styling', 'has-background-info-dark');
                    reportElement.textContent = report_date + "\n" + report;
                    reportElement.style.whiteSpace = "pre-line";
                    reportContainer.appendChild(reportElement);
                }
            });

            // When no reports are exist
            if (querySnapshot.empty || reportContainer.innerHTML === "") {
                const noReportsMessage = document.createElement("p");
                noReportsMessage.textContent = "Nothing to show";
                reportContainer.appendChild(noReportsMessage);
            }
        }
    }
});