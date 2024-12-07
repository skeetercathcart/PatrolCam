// Script
document.addEventListener("DOMContentLoaded", () => {
    initializeTabs();
    initializeStatusDropdowns();
    initializeOfficerToggle();
    initializeAccountEdit();
});

// Tab Initialization
function initializeTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            tabButtons.forEach((btn) => btn.classList.remove("active"));
            tabContents.forEach((content) => content.classList.remove("active"));

            button.classList.add("active");
            const targetTab = document.getElementById(button.dataset.tab);
            targetTab.classList.add("active");
        });
    });
}


// Status Dropdown Logic
function initializeStatusDropdowns() {
    const statusDropdowns = document.querySelectorAll(".status-dropdown");

    statusDropdowns.forEach((dropdown) => {
        dropdown.addEventListener("change", (event) => {
            const color = event.target.value === "active" ? "limegreen" : "red";
            event.target.style.color = color;
        });

        dropdown.dispatchEvent(new Event("change"));
    });
}

// Save Changes
async function saveChanges(entityType, id, payload) {
    const url = `/api/${entityType}/${id}`;

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            alert("Changes saved successfully.");
        } else {
            console.error(`Failed with status: ${response.status}`);
            alert("Failed to save changes.");
        }
    } catch (error) {
        console.error(`Error saving ${entityType} changes:`, error);
        alert("An error occurred while saving changes.");
    }
}

// Save Officer Changes Handler
function saveOfficerChanges(officerId) {
    const email = document.getElementById(`email-${officerId}`).value;
    const password = document.getElementById(`password-${officerId}`).value;

    const payload = { email, password };
    saveChanges("officers", officerId, payload);
}

// Save Camera Changes Handler
function saveCameraChanges(cameraId) {
    const name = document.getElementById(`name-${cameraId}`).value;
    const location = document.getElementById(`location-${cameraId}`).value;
    const status = document.getElementById(`status-${cameraId}`).value;

    const payload = { name, location, status };
    saveChanges("camera", cameraId, payload);
}

// Editable Pencil Icon

function initializeAccountEdit() {
    const editIcon = document.querySelector("#account-info .edit-icon");
    const inputFields = document.querySelectorAll("#account-info input");
    const subscriptionDropdown = document.getElementById("subscription-plan");
    const submitButton = document.querySelector(".submit-btn");

    let isEditable = false;

    editIcon.addEventListener("click", () => {
        isEditable = !isEditable;

        inputFields.forEach((input) => {
            input.readOnly = !isEditable; // Toggle readonly
            input.classList.toggle("editable", isEditable); // Apply editable style
        });

        if (isEditable) {
            subscriptionDropdown.removeAttribute("disabled"); // Enable dropdown
            subscriptionDropdown.classList.add("editable");
        } else {
            subscriptionDropdown.setAttribute("disabled", ""); // Disable dropdown
            subscriptionDropdown.classList.remove("editable");
        }

        submitButton.disabled = !isEditable; // Enable or disable submit button
    });
}


function initializeOfficerToggle() {
    const officerCards = document.querySelectorAll(".officer-card");

    officerCards.forEach((card) => {
        const header = card.querySelector(".officer-header");
        header.addEventListener("click", () => toggleOfficerDetails(card));
    });
}

function toggleOfficerDetails(card) {
    console.log("Toggling card:", card);  // Debugging output
    card.classList.toggle("active");
}







