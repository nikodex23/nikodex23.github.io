const crimeData = {
    "traffic": {
        "jazda pod wpływem alkoholu lub substancji odurzających": {
            penalty: "Mandat i Więzienie",
            fineMin: 500,
            fineMax: 1000,
            imprisonmentMin: 3,
            imprisonmentMax: 5,
            description: "Jazda pod wpływem alkoholu lub substancji odurzających."
        },
        "jazda bez prawa jazdy": {
            penalty: "Mandat",
            fineMin: 200,
            fineMax: 800,
            imprisonmentMin: 0,
            imprisonmentMax: 2,
            description: "Jazda bez odpowiednich uprawnień."
        },
        "przekroczenie prędkości w terenie zabudowanym": {
            penalty: "Mandat",
            fineMin: 200,
            fineMax: 1000,
            imprisonmentMin: 0,
            imprisonmentMax: 0,
            description: "Przekroczenie prędkości w terenie zabudowanym."
        }
    },
    "light": {
        "niszczenie mienia publicznego": {
            penalty: "Mandat i Więzienie",
            fineMin: 1000,
            fineMax: 3000,
            imprisonmentMin: 1,
            imprisonmentMax: 3,
            description: "Zniszczenie mienia publicznego."
        },
        "fałszywe zgłoszenie": {
            penalty: "Mandat",
            fineMin: 500,
            fineMax: 1500,
            imprisonmentMin: 0,
            imprisonmentMax: 1,
            description: "Fałszywe zgłoszenie służbom."
        },
        "kradzież pojazdu": {
            penalty: "Więzienie",
            fineMin: 2000,
            fineMax: 5000,
            imprisonmentMin: 2,
            imprisonmentMax: 7,
            description: "Kradzież pojazdu."
        }
    },
    "heavy": {
        "zabójstwo pierwszego stopnia": {
            penalty: "Więzienie",
            fineMin: 10000,
            fineMax: 50000,
            imprisonmentMin: 25,
            imprisonmentMax: 30,
            description: "Zabójstwo pierwszego stopnia."
        }
    },
    "weapons": {
        "posiadanie broni bez zezwolenia": {
            penalty: "Więzienie i Mandat",
            fineMin: 2000,
            fineMax: 10000,
            imprisonmentMin: 5,
            imprisonmentMax: 10,
            description: "Posiadanie broni bez zezwolenia."
        }
    },
    "violence": {
        "agresja fizyczna": {
            penalty: "Mandat i Więzienie",
            fineMin: 3000,
            fineMax: 10000,
            imprisonmentMin: 1,
            imprisonmentMax: 5,
            description: "Agresja fizyczna."
        }
    },
    "substances": {
        "possession of drugs": {
            penalty: "Więzienie i Mandat",
            fineMin: 1000,
            fineMax: 5000,
            imprisonmentMin: 3,
            imprisonmentMax: 10,
            description: "Possession of illegal drugs."
        }
    },
    "gangs": {
        "membership in a criminal organization": {
            penalty: "Więzienie i Mandat",
            fineMin: 5000,
            fineMax: 15000,
            imprisonmentMin: 5,
            imprisonmentMax: 15,
            description: "Membership in a criminal organization."
        }
    }
};

document.getElementById("category").addEventListener("change", updateCrimes);
document.getElementById("crime").addEventListener("change", calculatePenalty);

function updateCrimes() {
    const category = document.getElementById("category").value;
    const crimeSelect = document.getElementById("crime");
    crimeSelect.innerHTML = '<option value="">Wybierz przestępstwo</option>';
    
    for (let crime in crimeData[category]) {
        const option = document.createElement("option");
        option.value = crime;
        option.textContent = crime;
        crimeSelect.appendChild(option);
    }

    calculatePenalty();
}

function calculatePenalty() {
    const category = document.getElementById("category").value;
    const crime = document.getElementById("crime").value;
    
    if (!crime) return;

    const crimeDetails = crimeData[category][crime];

    document.getElementById("penalty").textContent = crimeDetails.penalty;
    document.getElementById("fine").textContent = `${crimeDetails.fineMin} - ${crimeDetails.fineMax}`;
    document.getElementById("imprisonment").textContent = `${crimeDetails.imprisonmentMin} - ${crimeDetails.imprisonmentMax} lat`;
    document.getElementById("crime-description").textContent = crimeDetails.description;
}

// Initialize on page load
updateCrimes();
