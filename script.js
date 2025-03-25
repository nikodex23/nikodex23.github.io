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

// FUNKCJE NAWIGACYJNE
function toggleCategory(id) {
  var element = document.getElementById(id);
  element.style.display = (element.style.display === 'none' || element.style.display === '') ? 'block' : 'none';
}

// PODSUMOWANIE WYBRANYCH PRZESTĘPSTW
function showSelected() {
  const selectedContainer = document.getElementById('selectedOffenses');
  selectedContainer.innerHTML = ''; // czyścimy poprzednią listę

  const checks = document.querySelectorAll('.offense-check:checked');
  if (checks.length === 0) {
    selectedContainer.innerHTML = '<p>Brak wybranych przestępstw.</p>';
    return;
  }

  let totalFine = 0;
  let maxPrison = 0;
  const summaryList = [];

  checks.forEach(check => {
    const row = check.closest('.offense-row');
    const cells = row.querySelectorAll('.offense-cell');
    const name = cells[1].innerText;
    const fineText = cells[2].innerText.replace('$', '').trim();
    const prisonText = cells[3].innerText.replace('dni', '').trim();
    const fine = parseFloat(fineText) || 0;
    const prison = parseInt(prisonText) || 0;

    // Dodajemy mandat do sumy
    totalFine += fine;
    // Ustalamy, że najcięższa kara więzienia jest ta z największą liczbą dni
    if (prison > maxPrison) {
      maxPrison = prison;
    }

    summaryList.push(`${name} – Mandat: $${fine}, Więzienie: ${prison} dni`);
  });

  const summaryText = `<h3>Podsumowanie wybranych przestępstw:</h3>
    <ul>${summaryList.map(item => `<li>${item}</li>`).join('')}</ul>
    <p><strong>Łączny mandat:</strong> $${totalFine}</p>
    <p><strong>Najcięższa kara więzienia:</strong> ${maxPrison} dni</p>`;
  selectedContainer.innerHTML = summaryText;
}

// RESETOWANIE ZAZNACZEŃ
function resetOffenses() {
  const checks = document.querySelectorAll('.offense-check');
  checks.forEach(check => check.checked = false);
  const selectedContainer = document.getElementById('selectedOffenses');
  selectedContainer.innerHTML = '<p>Brak wybranych przestępstw.</p>';
}
