// script.js
class SentencingCalculator {
    constructor() {
        this.cases = [];
        this.currentCase = {
            crimes: [],
            factors: {
                mitigating: {},
                aggravating: {}
            }
        };
    }

    // Nowa inteligentna metoda obliczania
    calculateSentence() {
        let baseFine = 0;
        let baseJail = 0;
        const sanctions = new Set();
        
        // Obliczenia podstawowe
        this.currentCase.crimes.forEach(crime => {
            // Grzywna - suma z limitem 200% najwyższej kary
            const crimeFine = this.parseFine(crime.fine);
            baseFine = Math.max(baseFine, crimeFine * 2);
            
            // Kara więzienia - najsurowsza kara + 30% pozostałych
            if (crime.jail !== '-') {
                const crimeJail = this.parseJail(crime.jail);
                if (crimeJail > baseJail) {
                    baseJail += (crimeJail - baseJail) * 1.3;
                } else {
                    baseJail += crimeJail * 0.3;
                }
            }
            
            // Sankcje
            if (crime.sanctions && crime.sanctions !== '-') {
                crime.sanctions.split(', ').forEach(s => sanctions.add(s));
            }
        });

        // Modyfikatory
        let mitigationFactor = 1;
        let explanation = [];
        
        // Czynniki łagodzące
        if (this.currentCase.factors.mitigating.cooperation) {
            mitigationFactor *= 0.7;
            explanation.push('Współpraca z organami (-30%)');
        }
        if (this.currentCase.factors.mitigating.honesty) {
            mitigationFactor *= 0.8;
            explanation.push('Szczerość (-20%)');
        }
        if (this.currentCase.factors.mitigating.firstTime) {
            mitigationFactor *= 0.9;
            explanation.push('Pierwsze przestępstwo (-10%)');
        }

        // Czynniki obciążające
        if (this.currentCase.factors.aggravating.recidivism) {
            mitigationFactor *= 1.5;
            explanation.push('Recydywa (+50%)');
        }
        if (this.currentCase.factors.aggravating.violence) {
            mitigationFactor *= 1.3;
            explanation.push('Stosowanie przemocy (+30%)');
        }

        const totalJail = Math.round(baseJail * mitigationFactor);
        const totalFine = Math.round(baseFine * mitigationFactor);

        return {
            totalJail,
            totalFine,
            sanctions: Array.from(sanctions).join(', '),
            explanation
        };
    }

    parseFine(fine) {
        // Implementacja jak wcześniej
    }

    parseJail(jail) {
        // Implementacja jak wcześniej
    }
}

// Inicjalizacja systemu
const calculator = new SentencingCalculator();

document.addEventListener('DOMContentLoaded', function() {
    // Obsługa checkboxów
    const factors = {
        mitigating: {
            cooperation: document.getElementById('cooperation'),
            honesty: document.getElementById('honesty'),
            firstTime: document.getElementById('first-time')
        },
        aggravating: {
            recidivism: document.getElementById('recidivism'),
            violence: document.getElementById('violence')
        }
    };

    // Generuj wyrok
    document.getElementById('generate-sentence').addEventListener('click', function() {
        // Aktualizuj czynniki
        for (const type in factors) {
            for (const factor in factors[type]) {
                calculator.currentCase.factors[type][factor] = factors[type][factor].checked;
            }
        }

        const sentence = calculator.calculateSentence();
        
        document.getElementById('calculated-fine').textContent = `$${sentence.totalFine.toLocaleString()}`;
        document.getElementById('calculated-jail').textContent = `${sentence.totalJail} dni`;
        document.getElementById('calculated-sanctions').textContent = sentence.sanctions || '-';
        
        const explanationHTML = sentence.explanation.length > 0 
            ? `<strong>Obliczenia:</strong><br>${sentence.explanation.join('<br>')}`
            : 'Brak modyfikatorów';
        document.getElementById('sentence-explanation').innerHTML = explanationHTML;
    });

    // Zapisz sprawę
    document.getElementById('save-case').addEventListener('click', function() {
        const savedCases = JSON.parse(localStorage.getItem('cases') || []);
        savedCases.push(calculator.currentCase);
        localStorage.setItem('cases', JSON.stringify(savedCases));
        alert('Sprawa zapisana w archiwum!');
    });

    // Dodawanie przestępstw (jak wcześniej)
    document.querySelectorAll('tbody tr').forEach(row => {
        // ... istniejący kod ...
    });
});
