// WYSZUKIWANIE - przeszukiwanie wszystkich wierszy w tabelach
const searchInput = document.getElementById('search-input');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const offenseRows = document.querySelectorAll('.offense-row:not(.header)');
    offenseRows.forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(query) ? 'flex' : 'none';
    });
  });
}

// FUNKCJE NAWIGACYJNE - Pokazywanie/Zamykanie kategorii przestępstw
function toggleCategory(id) {
  var element = document.getElementById(id);
  element.style.display = (element.style.display === 'none' || element.style.display === '') ? 'block' : 'none';
}

// PODSUMOWANIE WYBRANYCH PRZESTĘPSTW
function showSelected() {
  const selectedContainer = document.getElementById('selectedOffenses');
  selectedContainer.innerHTML = ''; // Czyścimy poprzednie podsumowanie

  const checks = document.querySelectorAll('.offense-check:checked');
  if (checks.length === 0) {
    selectedContainer.innerHTML = '<p>Brak wybranych przestępstw.</p>';
    return;
  }

  let totalFine = 0;
  let maxPrison = 0;
  let additionalPrison = 0;
  const summaryList = [];

  checks.forEach(check => {
    const row = check.closest('.offense-row');
    const cells = row.querySelectorAll('.offense-cell');
    const name = cells[1].innerText;
    const fineText = cells[2].innerText.replace('$', '').trim();
    const prisonText = cells[3].innerText.replace('dni', '').trim();
    const fine = parseFloat(fineText) || 0;
    const prison = parseInt(prisonText) || 0;

    totalFine += fine;

    if (prison > maxPrison) {
      additionalPrison += maxPrison; // Poprzednia maksymalna kara przechodzi jako "dodatkowy czas"
      maxPrison = prison; // Najwyższa kara jest główną wartością
    } else {
      additionalPrison += prison; // Jeśli kara jest mniejsza, dodajemy ją jako dodatek
    }

    summaryList.push(`${name} – Mandat: $${fine}, Więzienie: ${prison} dni`);
  });

  // Finalne przeliczenie więzienia - jeśli mamy dodatkowe kary, dodajemy 50% ich wartości
  let finalPrison = maxPrison + Math.ceil(additionalPrison * 0.5);

  const summaryText = `<h3>Podsumowanie wybranych przestępstw:</h3>
      <ul>${summaryList.map(item => `<li>${item}</li>`).join('')}</ul>
      <p><strong>Łączny mandat:</strong> $${totalFine}</p>
      <p><strong>Łączny wyrok więzienia:</strong> ${finalPrison} dni</p>`;

  selectedContainer.innerHTML = summaryText;
}

// RESETOWANIE ZAZNACZEŃ
function resetOffenses() {
  const checks = document.querySelectorAll('.offense-check');
  checks.forEach(check => check.checked = false);
  document.getElementById('selectedOffenses').innerHTML = '<p>Brak wybranych przestępstw.</p>';
}

// [Dodaj wszystkie funkcje kalkulatora z poprzedniej odpowiedzi]

// Funkcja generująca dokument PDF
function generateSentencePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  doc.text("OFFICIAL SENTENCING REPORT - CHICAGO PD", 10, 10);
  doc.autoTable({
    head: [["Przestępstwo", "Grzywna", "Więzienie"]],
    body: selectedCrimes.map(crime => [
      crime.name, 
      `$${crime.fine}`, 
      `${crime.prison} dni`
    ])
  });
  
  doc.save(`wyrok_${new Date().toLocaleDateString()}.pdf`);
}
