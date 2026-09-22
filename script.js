/* =====================================================
   RESUMECRAFT
   ADVANCED RESUME BUILDER
===================================================== */


/* =====================================================
   STEP SYSTEM
===================================================== */

let currentStep = 1;

const totalSteps = 6;

const stepNames = [
    "Personal Information",
    "About Me",
    "Work Experience",
    "Education",
    "Skills",
    "Languages"
];


function updateStepUI() {

    /* Hide all steps */

    document
        .querySelectorAll(".form-step")
        .forEach(function(step) {

            step.classList.remove("active");

        });


    /* Show current */

    const activeStep =
        document.querySelector(
            `.form-step[data-step="${currentStep}"]`
        );


    if (activeStep) {

        activeStep.classList.add("active");

    }


    /* Number */

    document.getElementById("stepNumber")
        .textContent =
        String(currentStep).padStart(2, "0");


    /* Label */

    document.getElementById("stepLabel")
        .textContent =
        stepNames[currentStep - 1];


    /* Progress */

    const percentage =
        Math.round(
            (currentStep / totalSteps) * 100
        );


    document.getElementById("progressPercent")
        .textContent =
        percentage + "%";


    document.getElementById("progressFill")
        .style.width =
        percentage + "%";


    /* Indicators */

    document
        .querySelectorAll(".step-indicator")
        .forEach(function(indicator, index) {

            indicator.classList.remove(
                "active",
                "completed"
            );


            if (index + 1 === currentStep) {

                indicator.classList.add("active");

            }

            else if (index + 1 < currentStep) {

                indicator.classList.add("completed");

            }

        });


    /* Back button */

    const back =
        document.getElementById("backBtn");


    if (currentStep === 1) {

        back.style.visibility = "hidden";

    }

    else {

        back.style.visibility = "visible";

    }


    /* Next button */

    const next =
        document.getElementById("nextBtn");


    if (currentStep === totalSteps) {

        next.innerHTML = `
            Finish
            <i class="fa-solid fa-check"></i>
        `;

    }

    else {

        next.innerHTML = `
            Next
            <i class="fa-solid fa-arrow-right"></i>
        `;

    }


    /* Scroll builder to top */

    const builder =
        document.querySelector(".builder-panel");


    builder.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* NEXT */

function nextStep() {

    if (currentStep < totalSteps) {

        currentStep++;

        updateStepUI();

    }

    else {

        downloadResume();

    }

}


/* BACK */

function previousStep() {

    if (currentStep > 1) {

        currentStep--;

        updateStepUI();

    }

}


/* DIRECT STEP */

function goToStep(step) {

    if (
        step >= 1 &&
        step <= totalSteps
    ) {

        currentStep = step;

        updateStepUI();

    }

}


/* =====================================================
   PERSONAL INFORMATION
===================================================== */

const fieldMap = {

    name: "resumeName",

    jobTitle: "resumeJob",

    email: "resumeEmail",

    phone: "resumePhone",

    website: "resumeWebsite",

    location: "resumeLocation"

};


Object.keys(fieldMap).forEach(function(field) {

    const input =
        document.getElementById(field);


    input.addEventListener(
        "input",
        function() {

            const target =
                document.getElementById(
                    fieldMap[field]
                );


            target.textContent =
                input.value ||
                getDefault(field);

        }
    );

});


function getDefault(field) {

    const defaults = {

        name: "Your Name",

        jobTitle: "Your Job Title",

        email: "email@example.com",

        phone: "+91 0000000000",

        website: "www.example.com",

        location: "India"

    };


    return defaults[field] || "";

}


/* =====================================================
   PHOTO
===================================================== */

document
    .getElementById("photoInput")
    .addEventListener(
        "change",
        function(event) {

            const file =
                event.target.files[0];


            if (!file) return;


            if (
                file.size >
                2 * 1024 * 1024
            ) {

                alert(
                    "Photo must be smaller than 2MB."
                );

                event.target.value = "";

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function(e) {

                    const editorImage =
                        document.getElementById(
                            "photoPreview"
                        );


                    const icon =
                        document.getElementById(
                            "photoIcon"
                        );


                    const resumeImage =
                        document.getElementById(
                            "resumePhoto"
                        );


                    const defaultPhoto =
                        document.getElementById(
                            "defaultPhoto"
                        );


                    editorImage.src =
                        e.target.result;


                    editorImage.style.display =
                        "block";


                    icon.style.display =
                        "none";


                    resumeImage.src =
                        e.target.result;


                    resumeImage.style.display =
                        "block";


                    defaultPhoto.style.display =
                        "none";

                };


            reader.readAsDataURL(file);

        }
    );


/* =====================================================
   ABOUT ME
===================================================== */

const about =
    document.getElementById("about");


about.addEventListener(
    "input",
    function() {

        document.getElementById(
            "resumeAbout"
        ).textContent =
            about.value ||
            "Your professional summary will appear here.";


        document.getElementById(
            "aboutCount"
        ).textContent =
            about.value.length;

    }
);


/* =====================================================
   EXPERIENCE
===================================================== */

let experiences = [];


function addExperience() {

    experiences.push({

        position: "",

        company: "",

        date: "",

        description: ""

    });


    renderExperience();

}


function removeExperience(index) {

    experiences.splice(index, 1);

    renderExperience();

}


function updateExperience(
    index,
    field,
    value
) {

    experiences[index][field] = value;

    renderResumeExperience();

}


function renderExperience() {

    const container =
        document.getElementById(
            "experienceContainer"
        );


    container.innerHTML = "";


    experiences.forEach(
        function(item, index) {

            const div =
                document.createElement("div");


            div.className =
                "dynamic-item";


            div.innerHTML = `

                <button
                    class="remove-item"
                    onclick="removeExperience(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>


                <div class="dynamic-grid">

                    <input
                        type="text"
                        placeholder="Job Position"
                        value="${escapeHTML(item.position)}"
                        oninput="
                            updateExperience(
                                ${index},
                                'position',
                                this.value
                            )
                        ">


                    <input
                        type="text"
                        placeholder="Company"
                        value="${escapeHTML(item.company)}"
                        oninput="
                            updateExperience(
                                ${index},
                                'company',
                                this.value
                            )
                        ">


                    <input
                        type="text"
                        placeholder="2024 - Present"
                        value="${escapeHTML(item.date)}"
                        oninput="
                            updateExperience(
                                ${index},
                                'date',
                                this.value
                            )
                        ">

                </div>


                <textarea
                    rows="3"
                    placeholder="Describe your responsibilities and achievements..."
                    oninput="
                        updateExperience(
                            ${index},
                            'description',
                            this.value
                        )
                    "
                >${escapeHTML(item.description)}</textarea>

            `;


            container.appendChild(div);

        }
    );


    renderResumeExperience();

}


function renderResumeExperience() {

    const container =
        document.getElementById(
            "resumeExperience"
        );


    if (experiences.length === 0) {

        container.innerHTML = `
            <div class="empty-resume">
                Add your experience.
            </div>
        `;

        return;

    }


    container.innerHTML = "";


    experiences.forEach(
        function(item) {

            const div =
                document.createElement("div");


            div.className =
                "timeline-item";


            div.innerHTML = `

                <h4>
                    ${escapeHTML(
                        item.position ||
                        "Job Position"
                    )}
                </h4>


                <div class="timeline-company">

                    ${escapeHTML(
                        item.company ||
                        "Company Name"
                    )}

                </div>


                <div class="timeline-date">

                    ${escapeHTML(
                        item.date ||
                        "Date"
                    )}

                </div>


                <p class="timeline-description">

                    ${escapeHTML(
                        item.description ||
                        "Experience description."
                    )}

                </p>

            `;


            container.appendChild(div);

        }
    );

}


/* =====================================================
   EDUCATION
===================================================== */

let educations = [];


function addEducation() {

    educations.push({

        degree: "",

        institution: "",

        date: "",

        description: ""

    });


    renderEducation();

}


function removeEducation(index) {

    educations.splice(index, 1);

    renderEducation();

}


function updateEducation(
    index,
    field,
    value
) {

    educations[index][field] = value;

    renderResumeEducation();

}


function renderEducation() {

    const container =
        document.getElementById(
            "educationContainer"
        );


    container.innerHTML = "";


    educations.forEach(
        function(item, index) {

            const div =
                document.createElement("div");


            div.className =
                "dynamic-item";


            div.innerHTML = `

                <button
                    class="remove-item"
                    onclick="removeEducation(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>


                <div class="dynamic-grid">

                    <input
                        type="text"
                        placeholder="Degree / Course"
                        value="${escapeHTML(item.degree)}"
                        oninput="
                            updateEducation(
                                ${index},
                                'degree',
                                this.value
                            )
                        ">


                    <input
                        type="text"
                        placeholder="College / University"
                        value="${escapeHTML(item.institution)}"
                        oninput="
                            updateEducation(
                                ${index},
                                'institution',
                                this.value
                            )
                        ">


                    <input
                        type="text"
                        placeholder="2022 - 2026"
                        value="${escapeHTML(item.date)}"
                        oninput="
                            updateEducation(
                                ${index},
                                'date',
                                this.value
                            )
                        ">

                </div>


                <textarea
                    rows="2"
                    placeholder="Additional details..."
                    oninput="
                        updateEducation(
                            ${index},
                            'description',
                            this.value
                        )
                    "
                >${escapeHTML(item.description)}</textarea>

            `;


            container.appendChild(div);

        }
    );


    renderResumeEducation();

}


function renderResumeEducation() {

    const container =
        document.getElementById(
            "resumeEducation"
        );


    if (educations.length === 0) {

        container.innerHTML = `
            <div class="empty-resume">
                Add your education.
            </div>
        `;

        return;

    }


    container.innerHTML = "";


    educations.forEach(
        function(item) {

            const div =
                document.createElement("div");


            div.className =
                "timeline-item";


            div.innerHTML = `

                <h4>
                    ${escapeHTML(
                        item.degree ||
                        "Degree / Course"
                    )}
                </h4>


                <div class="timeline-company">

                    ${escapeHTML(
                        item.institution ||
                        "College / University"
                    )}

                </div>


                <div class="timeline-date">

                    ${escapeHTML(
                        item.date ||
                        "Date"
                    )}

                </div>


                <p class="timeline-description">

                    ${escapeHTML(
                        item.description
                    )}

                </p>

            `;


            container.appendChild(div);

        }
    );

}


/* =====================================================
   SKILLS
===================================================== */

let skills = [
    "HTML",
    "CSS",
    "JavaScript"
];


function addSkill() {

    const input =
        document.getElementById(
            "skillInput"
        );


    const value =
        input.value.trim();


    if (!value) {

        return;

    }


    skills.push(value);

    input.value = "";

    renderSkills();

}


document
    .getElementById("skillInput")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                addSkill();

            }

        }
    );


function removeSkill(index) {

    skills.splice(index, 1);

    renderSkills();

}


function renderSkills() {

    const editor =
        document.getElementById(
            "skillsContainer"
        );


    editor.innerHTML = "";


    skills.forEach(
        function(skill, index) {

            const div =
                document.createElement("div");


            div.className =
                "skill-tag";


            div.innerHTML = `

                ${escapeHTML(skill)}

                <button
                    onclick="removeSkill(${index})">

                    <i class="fa-solid fa-xmark"></i>

                </button>

            `;


            editor.appendChild(div);

        }
    );


    const preview =
        document.getElementById(
            "resumeSkills"
        );


    preview.innerHTML = "";


    skills.forEach(
        function(skill) {

            const div =
                document.createElement("div");


            div.className =
                "skill-resume";


            div.textContent = skill;


            preview.appendChild(div);

        }
    );

}


/* =====================================================
   LANGUAGES
===================================================== */

let languages = [

    {
        name: "English",
        level: "Fluent"
    }

];


function addLanguage() {

    languages.push({

        name: "",

        level: "Intermediate"

    });


    renderLanguages();

}


function removeLanguage(index) {

    languages.splice(index, 1);

    renderLanguages();

}


function updateLanguage(
    index,
    field,
    value
) {

    languages[index][field] = value;

    renderLanguages();

}


function renderLanguages() {

    const container =
        document.getElementById(
            "languagesContainer"
        );


    container.innerHTML = "";


    languages.forEach(
        function(item, index) {

            const div =
                document.createElement("div");


            div.className =
                "dynamic-item";


            div.innerHTML = `

                <button
                    class="remove-item"
                    onclick="removeLanguage(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>


                <div class="language-grid">

                    <input
                        type="text"
                        placeholder="Language"
                        value="${escapeHTML(item.name)}"
                        oninput="
                            updateLanguage(
                                ${index},
                                'name',
                                this.value
                            )
                        ">


                    <select
                        onchange="
                            updateLanguage(
                                ${index},
                                'level',
                                this.value
                            )
                        ">

                        <option
                            value="Beginner"
                            ${item.level === "Beginner"
                                ? "selected"
                                : ""}>
                            Beginner
                        </option>

                        <option
                            value="Intermediate"
                            ${item.level === "Intermediate"
                                ? "selected"
                                : ""}>
                            Intermediate
                        </option>

                        <option
                            value="Fluent"
                            ${item.level === "Fluent"
                                ? "selected"
                                : ""}>
                            Fluent
                        </option>

                        <option
                            value="Native"
                            ${item.level === "Native"
                                ? "selected"
                                : ""}>
                            Native
                        </option>

                    </select>

                </div>

            `;


            container.appendChild(div);

        }
    );


    const preview =
        document.getElementById(
            "resumeLanguages"
        );


    preview.innerHTML = "";


    languages.forEach(
        function(language) {

            const div =
                document.createElement("div");


            div.className =
                "language-resume";


            div.innerHTML = `

                ${escapeHTML(
                    language.name ||
                    "Language"
                )}

                <span>
                    •
                    ${escapeHTML(
                        language.level
                    )}
                </span>

            `;


            preview.appendChild(div);

        }
    );

}


/* =====================================================
   TEMPLATE SWITCHER
===================================================== */

function changeTemplate(template) {

    const resume =
        document.getElementById(
            "resume"
        );


    resume.classList.remove(
        "green",
        "blue",
        "gold"
    );


    resume.classList.add(template);


    document
        .querySelectorAll(".template-btn")
        .forEach(
            function(button) {

                button.classList.remove(
                    "active"
                );

            }
        );


    const buttons =
        document.querySelectorAll(
            ".template-btn"
        );


    if (template === "green") {

        buttons[0].classList.add("active");

    }


    if (template === "blue") {

        buttons[1].classList.add("active");

    }


    if (template === "gold") {

        buttons[2].classList.add("active");

    }

}


/* =====================================================
   RESET
===================================================== */

function resetResume() {

    const confirmReset =
        confirm(
            "Are you sure you want to reset your resume?"
        );


    if (!confirmReset) {

        return;

    }


    location.reload();

}


/* =====================================================
   DOWNLOAD
===================================================== */

function downloadResume() {

    window.print();

}


/* =====================================================
   SECURITY
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   INITIALIZE
===================================================== */

renderSkills();

renderLanguages();

renderExperience();

renderEducation();

updateStepUI();