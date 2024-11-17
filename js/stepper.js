document.addEventListener("DOMContentLoaded", () => {
    const stepper = document.querySelector(".fr-stepper__steps");
    const stepsDetails = document.querySelector(".fr-stepper__details span");
    const title = document.querySelector(".fr-stepper__title");
    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");
    const formSteps = document.querySelectorAll("[data-step]");
    const faitsContainer = document.getElementById("faits-container");
    const addFaitButton = document.getElementById("add-fait");
    const totalSteps = formSteps.length;
    let currentStep = 1;

    const stepTitles = [
        "Identification",
        "Faits",
        "Récapitulatif",
        "Génération",
    ];

    const updateStepsVisibility = () => {
        formSteps.forEach((step, index) => {
            step.style.display = index === currentStep - 1 ? "" : "none";
        });
    };

    const updateUI = () => {
        stepper.setAttribute("data-fr-current-step", currentStep);
        title.innerHTML = `${stepTitles[currentStep - 1]} <span class="fr-stepper__state">Étape ${currentStep} sur ${totalSteps}</span>`;
        stepsDetails.innerText = currentStep < totalSteps ? stepTitles[currentStep] : "Finalisation";

        prevButton.style.display = currentStep > 1 ? "inline-block" : "none";
        nextButton.innerText = currentStep < totalSteps ? "Suivant" : "Télécharger";
    };

    addFaitButton.addEventListener("click", () => {
        const newFait = document.createElement("div");
        newFait.classList.add("fr-col-12");
        const index = faitsContainer.children.length + 2;
        newFait.innerHTML = `
            <label class="fr-label" for="fait-${index}">Fait ${index}</label>
            <textarea class="fr-input" id="fait-${index}" name="faits[]"></textarea>
        `;
        faitsContainer.appendChild(newFait);
    });

    nextButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentStep < totalSteps) {
            currentStep++;
            updateStepsVisibility();
            updateUI();
        } else {
            alert("Téléchargement du document...");
        }
    });

    prevButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentStep > 1) {
            currentStep--;
            updateStepsVisibility();
            updateUI();
        }
    });

    // Initialisation
    updateStepsVisibility();
    updateUI();
});
