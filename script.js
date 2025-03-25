// WYSZUKIWANIE
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const offenseRows = document.querySelectorAll('.offense-row:not(.header)');

  offenseRows.forEach(row => {
    const text = row.innerText.toLowerCase();
    // Jeżeli wiersz nie zawiera wpisanego tekstu, ukrywamy go
    if (text.includes(query)) {
      row.style.display = 'flex';
    } else {
      row.style.display = 'none';
    }
  });
});

// WYŚWIETLANIE WYBRANYCH PRZESTĘPSTW
function showSelected() {
  const selectedContainer = document.getElementById('selectedOffenses');
  selectedContainer.innerHTML = ''; // czyścimy poprzednią listę

  // Zaznaczone checkboxy
  const checks = document.querySelectorAll('.offense-check:checked');
  if (checks.length === 0) {
    selectedContainer.innerHTML = '<p>Brak wybranych przestępstw.</p>';
    return;
  }

  const list = document.createElement('ul');
  list.style.listStyle = 'disc';
  list.style.marginLeft = '40px';

  checks.forEach(check => {
    // Szukamy nazwy przestępstwa w rodzeństwie checkboxa
    const row = check.closest('.offense-row');
    const cells = row.querySelectorAll('.offense-cell');
    // 0: checkbox cell, 1: nazwa przestępstwa, 2: kara finansowa, 3: kara więzienia
    const name = cells[1].innerText;
    const fine = cells[2].innerText;
    const prison = cells[3].innerText;

    const li = document.createElement('li');
    li.innerText = `${name} – ${fine} – ${prison}`;
    list.appendChild(li);
  });

  const title = document.createElement('h3');
  title.innerText = 'Wybrane przestępstwa:';
  selectedContainer.appendChild(title);
  selectedContainer.appendChild(list);
}

// RESETOWANIE ZARZUTÓW
function resetOffenses() {
  const checks = document.querySelectorAll('.offense-check');
  checks.forEach(check => {
    check.checked = false;
  });

  // Czyścimy listę wybranych
  const selectedContainer = document.getElementById('selectedOffenses');
  selectedContainer.innerHTML = '<p>Brak wybranych przestępstw.</p>';
}
