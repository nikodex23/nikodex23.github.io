const crimeData = {
    property: {
        "kradzież": 5,
        "włamanie": 7
    },
    life: {
        "morderstwo": 25,
        "uszkodzenie ciała": 10
    },
    order: {
        "zakłócenie porządku": 2,
        "używanie przemocy": 5
    }
};

document.getElementById("category").addEventListener("change", updateCrimes);
document.getElementById("calculate").addEventListener("click", calculatePenalty);

function updateCrimes() {
    const category = document.getElementById("category").value;
    const crimeSelect = document.getElementById("crime");
    
    // Clear previous options
    crimeSelect.innerHTML = "";
    
    // Add new options based on selected category
    for (let crime in crimeData[category]) {
        const option = document.createElement("option");
        option.value = crime;
        option.textContent = crime;
        crimeSelect.appendChild(option);
    }
}

function calculatePenalty() {
    const category = document.getElementById("category").value;
    const crime = document.getElementById("crime").value;
    
    const penalty = crimeData[category][crime] || 0;
    document.getElementById("penalty").textContent = penalty;
}

// Initial population of crimes on page load
updateCrimes();
