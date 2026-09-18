let allJobs = [];

async function loadJobs() {
try {

 

const response = await fetch("jobs.json");

 

console.log("Response:", response);

 
const data = await response.json();

 

console.log("Jobs Loaded:", data);

 

allJobs = data;

 

renderJobs(allJobs);

 

updateDashboard(allJobs);

 

}

catch(error){

 

console.error("ERROR LOADING JSON:", error);

}

}

function renderJobs(jobs) {

    const container = document.getElementById("jobsGrid");

    container.innerHTML = "";

    jobs.forEach(job => {

        let skillsHTML = "";

        job.skills.forEach(skill => {

            skillsHTML +=
                `<span class="skill-tag">${skill}</span>`;
        });

        container.innerHTML += `

        <div class="job-card">

            <div class="job-header">

                <div class="job-title-area">

                    <span class="job-id">
                        Job ID: ${job.jobId}
                    </span>

                    <h3>${job.title}</h3>

                </div>

                <div style="display:flex;gap:8px;flex-wrap:wrap;">

                    <span class="positions-badge">
                        Positions: ${job.positions}
                    </span>

                    <span class="badge">
                        ${job.status}
                    </span>

                </div>

            </div>

            <div class="job-details">

                <div>
                    <strong>Client:</strong>
                    ${job.client}
                </div>

                <div>
                    <strong>Location:</strong>
                    ${job.location}
                </div>

                <div>
                    <strong>Experience:</strong>
                    ${job.experience}
                </div>

                <div>
                    <strong>Budget:</strong>
                    ${job.budget}
                </div>

                <div>
                    <strong>Work Mode:</strong>
                    ${job.workMode}
                </div>

                <div>
                    <strong>Deadline:</strong>
                    ${job.submissionDeadline}
                </div>

            </div>

            <div class="job-desc">

                <strong>Job Description</strong>

                <br><br>

                ${job.jobDescription}

            </div>

            <div class="special-note">

                <strong>Special Notes:</strong>

                ${job.specialNotes}

            </div>

            <div class="job-footer">

                <div class="skills-list">

                    ${skillsHTML}

                </div>

                talentconnectconsulting.hr@gmail.com?subject=Candidate Submission for Job ID ${job.jobId} - ${job.title}
                    Send Candidate CV
                </a>

            </div>

        </div>

        `;
    });

}

function updateDashboard(jobs) {

    const activeJobs =
        jobs.filter(j => j.status.toLowerCase() === "active").length;

    const totalPositions =
        jobs.reduce((sum, j) =>
            sum + parseInt(j.positions || 0), 0);

    const clients =
        [...new Set(jobs.map(j => j.client))];

    document.getElementById("activeJobs").innerText =
        activeJobs;

    document.getElementById("totalPositions").innerText =
        totalPositions;

    document.getElementById("totalJobs").innerText =
        jobs.length;

    document.getElementById("clientCount").innerText =
        clients.length;
}

function filterJobs() {

    const searchText =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const filteredJobs =
        allJobs.filter(job =>

            job.title.toLowerCase().includes(searchText)

            ||

            job.location.toLowerCase().includes(searchText)

            ||

            job.skills.join(" ").toLowerCase().includes(searchText)

            ||

            job.client.toLowerCase().includes(searchText)

        );

    renderJobs(filteredJobs);
}

loadJobs();
