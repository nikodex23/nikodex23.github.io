function toggleTips(id) {
    const element = document.getElementById(`tips-${id}`);
    element.style.display = element.style.display === 'block' ? 'none' : 'block';
}

function calculateSentence() {
    let totalFine = 0;
    let totalJail = 0;
    let sanctions = [];
    
    // Obliczanie podstawowych kar
    document.querySelectorAll('.offense-row:not(.header)').forEach(row => {
        const quantity = parseInt(row.querySelector('.quantity-input').value) || 1;
        const fineText = row.cells[1].textContent;
        const jailText = row.cells[2].textContent;
        const sanctionText = row.cells[3].textContent;
        
        // Obliczanie średniej wartości dla zakresów
        const fineValue = calculateAverageValue(fineText);
        const jailValue = calculateAverageValue(jailText);
        
        totalFine += fineValue * quantity;
        totalJail += jailValue * quantity;
        
        if (sanctionText !== '-' && !sanctions.includes(sanctionText)) {
            sanctions.push(sanctionText);
        }
    });
    
    // Zastosowanie modyfikatorów
    let modifier = 1;
    if (document.getElementById('cooperation').checked) modifier -= 0.2;
    if (document.getElementById('first-time').checked) modifier -= 0.1;
    if (document.getElementById('recidivism').checked) modifier += 0.3;
    if (document.getElementById('violence').checked) modifier += 0.5;
    
    // Obliczanie ostatecznych kar
    totalFine = Math.round(totalFine * modifier);
    totalJail = Math.round(totalJail * modifier);
    
    // Wyświetlanie wyników
    document.getElementById('total-fine').textContent = `$${totalFine}`;
    document.getElementById('total-jail').textContent = `${totalJail} dni`;
    document.getElementById('total-sanctions').textContent = sanctions.join(', ') || '-';
    
    // Podświetlenie szczególnie surowych wyroków
    if (totalJail >= 30) {
        document.getElementById('total-jail').style.color = 'red';
    } else {
        document.getElementById('total-jail').style.color = '';
    }
}

function calculateAverageValue(text) {
    if (!text) return 0;
    
    // Usuwanie znaków nieliczbowych
    const numbers = text.replace(/[^\d-]/g, ' ')
                        .trim()
                        .split(/\s+/)
                        .map(Number)
                        .filter(n => !isNaN(n));
    
    if (numbers.length === 0) return 0;
    if (numbers.length === 1) return numbers[0];
    
    // Obliczanie średniej dla zakresu
    return (numbers[0] + numbers[1]) / 2;
}

function resetCalculator() {
    // Resetowanie ilości przestępstw
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.value = 1;
    });
    
    // Resetowanie checkboxów
    document.querySelectorAll('.factors input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Resetowanie wyników
    document.getElementById('total-fine').textContent = '$0';
    document.getElementById('total-jail').textContent = '0 dni';
    document.getElementById('total-sanctions').textContent = '-';
    document.getElementById('total-jail').style.color = '';
}

// Inicjalizacja
document.addEventListener('DOMContentLoaded', function() {
    console.log('Taryfikator został załadowany');
});
