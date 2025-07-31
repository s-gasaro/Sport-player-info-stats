const form = document.getElementById('searchForm');
const input = document.getElementById('playerInput');
const infoBox = document.getElementById('playerInfo');

// Replace with your own endpoint later
const API_URL = 'https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const playerName = input.value.trim();
  if (!playerName) return;

  try {
    const res = await fetch(`${API_URL}${encodeURIComponent(playerName)}`);
    const data = await res.json();
    if (data && data.player && data.player.length > 0) {
      const player = data.player[0];
      renderPlayer(player);
    } else {
      infoBox.innerHTML = `<p>No results found for "${playerName}".</p>`;
      infoBox.classList.remove('hidden');
    }
  } catch (err) {
    infoBox.innerHTML = `<p>Error fetching player data. Try again later.</p>`;
    infoBox.classList.remove('hidden');
  }
});

function renderPlayer(player) {
  infoBox.innerHTML = `
    <h2>${player.strPlayer}</h2>
    <p><strong>Nationality:</strong> ${player.strNationality}</p>
    <p><strong>Team:</strong> ${player.strTeam}</p>
    <p><strong>Position:</strong> ${player.strPosition}</p>
    <p><strong>Date of Birth:</strong> ${player.dateBorn}</p>
    <p><strong>Description:</strong> ${player.strDescriptionEN?.slice(0, 200)}...</p>
  `;
  infoBox.classList.remove('hidden');
}
