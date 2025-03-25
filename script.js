// Baza przestępstw
const przestepstwa = {
    "Jazda pod wpływem": { kasa: 5000, wiezienie: 10 },
    "Kradzież sklepowa": { kasa: 2000, wiezienie: 5 }
};

// Funkcja obliczająca wyrok
function oblicz() {
    let sumaKasa = 0;
    let sumaWiezienie = 0;
    
    // Zbierz zaznaczone przestępstwa
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        const nazwa = checkbox.parentElement.nextElementSibling.textContent;
        const przestepstwo = przestepstwa[nazwa];
        
        if(przestepstwo) {
            sumaKasa += przestepstwo.kasa;
            sumaWiezienie += przestepstwo.wiezienie;
        }
    });

    // Zastosuj zniżki
    const znizka = document.querySelectorAll('.kalkulator input:checked').length * 0.1;
    sumaKasa *= (1 - znizka);
    sumaWiezienie *= (1 - znizka);

    // Pokaz wynik
    document.getElementById('wynik').innerHTML = `
        <h4>Podsumowanie:</h4>
        <p>Grzywna: $${sumaKasa.toFixed(0)}</p>
        <p>Więzienie: ${Math.ceil(sumaWiezienie)} dni</p>
    `;
}

// Wyszukiwarka
document.getElementById('szukaj').addEventListener('input', function(e) {
    const szukanaFraza = e.target.value.toLowerCase();
    
    document.querySelectorAll('.wiersj').forEach(wiersz => {
        const tekst = wiersz.textContent.toLowerCase();
        wiersz.style.display = tekst.includes(szukanaFraza) ? 'grid' : 'none';
    });
});
