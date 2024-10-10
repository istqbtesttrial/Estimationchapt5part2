// Variables to hold random values for estimation
let randomA, randomM, randomB;

// Function to generate random values for a new exercise
function generateRandomExercise() {
    randomA = (Math.random() * 10).toFixed(2);
    randomM = (Math.random() * 10).toFixed(2);
    randomB = (Math.random() * 10).toFixed(2);

    document.getElementById("randomValues").innerText = `Optimiste (a) : ${randomA}, La plus probable (m) : ${randomM}, Pessimiste (b) : ${randomB}`;
}

// Function to copy random values into the input fields
function copyValues() {
    document.getElementById("optimistic").value = randomA;
    document.getElementById("most_likely").value = randomM;
    document.getElementById("pessimistic").value = randomB;
}

// Function to calculate estimation from input fields
function calculateEstimation() {
    let a = parseFloat(document.getElementById("optimistic").value);
    let m = parseFloat(document.getElementById("most_likely").value);
    let b = parseFloat(document.getElementById("pessimistic").value);

    if (!isNaN(a) && !isNaN(m) && !isNaN(b)) {
        let estimation = (a + 4 * m + b) / 6;
        let error = (b - a) / 6;
        document.getElementById("result").innerText = `Estimation: ${estimation.toFixed(2)} ± ${error.toFixed(2)}`;
    } else {
        document.getElementById("result").innerText = "Veuillez entrer des valeurs valides.";
    }
}

// Function to show the solution with the formula and results
function showSolution() {
    let a = parseFloat(randomA);
    let m = parseFloat(randomM);
    let b = parseFloat(randomB);

    if (!isNaN(a) && !isNaN(m) && !isNaN(b)) {
        let estimation = (a + 4 * m + b) / 6;
        let error = (b - a) / 6;
        document.getElementById("solution").innerHTML = `
            <p><strong>Formule :</strong> Estimation = (a + 4 * m + b) / 6 = (${a} + 4 * ${m} + ${b}) / 6 = ${estimation.toFixed(2)}</p>
            <p><strong>Erreur :</strong> Erreur = (b - a) / 6 = (${b} - ${a}) / 6 = ${error.toFixed(2)}</p>
        `;
    } else {
        document.getElementById("solution").innerText = "Erreur : valeurs non valides.";
    }
}

// Smooth scroll effect for the CTA button
gsap.to(".cta-button", {duration: 1, y: 20, repeat: -1, yoyo: true});

// Function to validate the order of test cases (first exercise)
function validateOrder() {
    const items = document.querySelectorAll("#sortable li");
    const correctOrder = ["Cas de test 3 (haute priorité)", "Cas de test 2 (priorité moyenne)", "Cas de test 1 (faible priorité)"];
    let isCorrect = true;

    items.forEach((item, index) => {
        if (item.innerText.trim() !== correctOrder[index]) {
            isCorrect = false;
        }
    });

    const result = document.getElementById("validationResult");
    if (isCorrect) {
        result.innerText = "L'ordre est correct !";
        result.classList.add("text-green-600");
    } else {
        result.innerText = "L'ordre est incorrect. Réessayez !";
        result.classList.add("text-red-600");
    }
}

// Function to validate the order of test cases with dependencies (second exercise)
function validateOrder2() {
    const items = document.querySelectorAll("#sortable2 li");
    const correctOrder = [
        "Cas de test 1 (Priorité Moyenne, Dépendance: Aucun)",
        "Cas de test 4 (Priorité Très Haute, Dépendance: Cas de test 1)",
        "Cas de test 3 (Priorité Faible, Dépendance: Aucun)",
        "Cas de test 2 (Priorité Haute, Dépendance: Cas de test 3)",
        "Cas de test 5 (Priorité Moyenne, Dépendance: Cas de test 2)"
    ];

    let isCorrect = true;
    items.forEach((item, index) => {
        if (item.innerText.trim() !== correctOrder[index]) {
            isCorrect = false;
        }
    });

    const result = document.getElementById("validationResult2");
    if (isCorrect) {
        result.innerText = "L'ordre est correct !";
        result.classList.add("text-green-600");
    } else {
        result.innerText = "L'ordre est incorrect. Réessayez !";
        result.classList.add("text-red-600");
    }
}
function showRiskAnalysis() {
    const scenario = document.getElementById('scenario').value;
    let result = "";

    switch (scenario) {
        case '1':
            result = "Scénario 1 : Risque d'allongement des délais dû à la taille réduite de l'équipe. Atténuation : Augmenter la productivité par des outils adaptés.";
            break;
        case '2':
            result = "Scénario 2 : Risque de perte de données critiques. Atténuation : Mise en place de sauvegardes régulières.";
            break;
        case '3':
            result = "Scénario 3 : Risque de non-respect des délais. Atténuation : Priorisation des fonctionnalités essentielles.";
            break;
        default:
            result = "Sélectionnez un scénario valide.";
            break;
    }

    document.getElementById("riskResult").innerText = result;
}
function showMetrics() {
    const executed = parseInt(document.getElementById("executed").value);
    const passed = parseInt(document.getElementById("passed").value);
    const failed = parseInt(document.getElementById("failed").value);

    if (!isNaN(executed) && !isNaN(passed) && !isNaN(failed) && executed > 0) {
        const successRate = (passed / executed) * 100;
        const failureRate = (failed / executed) * 100;

        const ctx = document.getElementById('metricsChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Réussis', 'Échoués'],
                datasets: [{
                    label: 'Métriques de Test',
                    data: [successRate, failureRate],
                    backgroundColor: ['#4caf50', '#f44336'],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
                            }
                        }
                    }
                }
            }
        });
    } else {
        alert("Veuillez entrer des valeurs valides.");
    }
}
// Array to store configuration items
let configItems = [];

// Function to add configuration item
function addConfig() {
    const configItem = document.getElementById('configItem').value.trim();
    const version = document.getElementById('version').value.trim();

    if (configItem && version) {
        // Check for duplicate items
        const duplicate = configItems.find(item => item.name === configItem && item.version === version);
        if (duplicate) {
            alert("Cet élément de configuration existe déjà.");
        } else {
            const newItem = { name: configItem, version: version };
            configItems.push(newItem);
            displayConfigList();
        }
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}

// Function to display configuration list
function displayConfigList() {
    const configList = document.getElementById('configList');
    configList.innerHTML = ''; // Clear the current list

    configItems.forEach((item, index) => {
        configList.innerHTML += `
            <div class="bg-gray-100 p-2 rounded flex justify-between items-center">
                <span>${item.name} - Version: ${item.version}</span>
                <button onclick="removeConfig(${index})" class="bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
            </div>
        `;
    });
}

// Function to remove a configuration item
function removeConfig(index) {
    configItems.splice(index, 1);
    displayConfigList();
}
