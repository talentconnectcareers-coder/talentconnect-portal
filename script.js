let allJobs = [];

async function loadJobs() {
    const response = await fetch("jobs.json");
    allJobs = await response.json();

    renderJobs(allJobs);
}

function renderJobs(jobs) {

    const container = document.getElementById("jobsGrid");

    container.innerHTML = "";

    jobs.forEach(job => {

        let skillsHTML = "";

        job.skills.forEach(skill => {
            skillsHTML += `
                <span class="skill-tag">${skill}</span>
            `;
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

                <div style="display:flex;gap:8px;">

                    <span class="positions-badge">
                        Open Positions: ${job.positions}
                    </span>

                    <span class="badge">
                        ${job.status}
                    </span>

                </div>

            </div>

            <div class="job-details">

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
                    <strong>Client:</strong>
                    ${job.client}
                </div>

            </div>

            <div class="job-desc">

                <strong>Job Description:</strong>

                ${job.jobDescription}

            </div>

            <div class="job-desc">

                <strong>Special Notes:</strong>

                ${job.specialNotes}

            </div>

            <div class="job-footer">

                <div class="skills-list">

                    ${skillsHTML}

                </div>

                talentconnectconsulting.hr@gmail.com?subject=Candidate Submission for ${job.jobId}

                    Send Candidate CV

                </a>

            </div>

        </div>

        `;
    });
}

function filterJobs(){

    let searchText =
        document.getElementById('searchInput')
        .value
        .toLowerCase();

    let filtered = allJobs.filter(job =>

        job.title.toLowerCase().includes(searchText)

        ||

        job.skills.join(" ").toLowerCase().includes(searchText)

        ||

        job.location.toLowerCase().includes(searchText)

    );

    renderJobs(filtered);
}

loadJobs();
