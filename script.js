document.addEventListener('DOMContentLoaded', function() {
    // Inicjalizacja kalkulatora
    const calculator = {
        selectedCrimes: [],
        factors: {
            mitigating: {
                cooperation: false,
                honesty: false,
                firstTime: false
            },
            aggravating: {
                recidivism: false,
                violence: false
            }
        }
    };

    // Funkcja parsująca kwoty
    function parseFine(fineText) {
        const range = fineText.replace(/\$/g, '').split('-');
        const min = parseInt(range[0]) || 0;
        const max = parseInt(range[1]) || min;
        return (min + max) / 2;
    }

    // Funkcja parsująca kary więzienia
    function parseJail(jailText) {
        if (!jailText || jailText === '-') return 0;
        const range = jailText.split('-');
        const min = parseInt(range[0]) || 0;
        const max = parseInt(range[1]) || min;
        return (min + max) / 2;
    }

    // Dodawanie przestępstwa do kalkulatora
    document.querySelectorAll('.add-to-calculator').forEach(button => {
        button.addEventListener('click', function() {
            const crime = JSON.parse(this.dataset.crime);
            calculator.selectedCrimes.push(crime);
            updateCalculatorUI();
        });
    });

    // Obsługa checkboxów
    document.querySelectorAll('.factors input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const type = this.id in calculator.factors.mitigating ? 'mitigating' : 'aggravating';
            calculator.factors[type][this.id] = this.checked;
        });
    });

    // Generowanie wyroku
    document.getElementById('generate-sentence').addEventListener('click', function() {
        calculateSentence();
    });

    // Funkcja aktualizująca UI
    function updateCalculatorUI() {
        const crimesList = document.getElementById('selected-crimes-list');
        crimesList.innerHTML = '';
        
        calculator.selectedCrimes.forEach((crime, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${crime.name} 
                <button onclick="removeCrime(${index})">×</button>
            `;
            crimesList.appendChild(li);
        });
    }

    // Funkcja obliczająca wyrok
    function calculateSentence() {
        let totalFine = 0;
        let totalJail = 0;
        const sanctions = new Set();

        // Obliczenia podstawowe
        calculator.selectedCrimes.forEach(crime => {
            totalFine += parseFine(crime.fine);
            totalJail += parseJail(crime.jail);
            
            if (crime.sanctions) {
                crime.sanctions.split(', ').forEach(s => sanctions.add(s));
            }
        });

        // Modyfikatory
        let explanation = [];
        let factor = 1;

        // Czynniki łagodzące
        if (calculator.factors.mitigating.cooperation) {
            factor *= 0.7;
            explanation.push('Współpraca z organami (-30%)');
        }
        if (calculator.factors.mitigating.honesty) {
            factor *= 0.9;
            explanation.push('Szczerość (-10%)');
        }
        if (calculator.factors.mitigating.firstTime) {
            factor *= 0.8;
            explanation.push('Pierwsze przestępstwo (-20%)');
        }

        // Czynniki obciążające
        if (calculator.factors.aggravating.recidivism) {
            factor *= 1.5;
            explanation.push('Recydywa (+50%)');
        }
        if (calculator.factors.aggravating.violence) {
            factor *= 1.3;
            explanation.push('Przemoc (+30%)');
        }

        // Zastosuj modyfikatory
        totalFine = Math.round(totalFine * factor);
        totalJail = Math.round(totalJail * factor);

        // Aktualizacja UI
        document.getElementById('calculated-fine').textContent = `$${totalFine}`;
        document.getElementById('calculated-jail').textContent = `${totalJail} dni`;
        document.getElementById('calculated-sanctions').textContent = 
            sanctions.size > 0 ? Array.from(sanctions).join(', ') : '-';
        
        document.getElementById('sentence-explanation').innerHTML = 
            explanation.length > 0 ? explanation.join('<br>') : 'Brak modyfikatorów';
    }

    // Funkcja usuwająca przestępstwo (globalna)
    window.removeCrime = function(index) {
        calculator.selectedCrimes.splice(index, 1);
        updateCalculatorUI();
        calculateSentence();
    };
});

// Funkcja do pokazywania/ukrywania porad
function toggleTips(id) {
    const element = document.getElementById(`tips-${id}`);
    element.style.display = element.style.display === 'block' ? 'none' : 'block';
}
