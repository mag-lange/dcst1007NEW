//Script file for OOP5 
//Several sources were used including GeeksforGeeks, W3Schools and lefletjs.com
//ChatGPT was used for the formatting (CSS) of the table as well as fixing issues related to the markers
//This is probably the coolest program I have ever made 
fetch('mountains.json')
  .then(response => response.json())
  .then(data => {
    data.fjelltopper.sort((a, b) => b.elevation - a.elevation);
    const mountainsTable = document.getElementById('mountainsTable');
    const tbody = mountainsTable.querySelector('tbody');

    data.fjelltopper.forEach(mountain => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${mountain.fylke}</td>
        <td>${mountain.name}</td>
        <td>${mountain.elevation}</td>
      `;
      tbody.appendChild(row);
    });
    //Now for the map part, mostly code copied/modified from leafletjs.com + some mr. GPT
    const map = L.map('map').setView([61.92411, 8.02015], 6); //Default viewpoint, in the middle of Norway

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    data.fjelltopper.forEach(mountain => {
      const marker = L.marker([parseFloat(mountain.x), parseFloat(mountain.y)]).addTo(map);
      marker.bindPopup(`<b>${mountain.name}</b><br>Elevation: ${mountain.elevation}m`);
    }); //bindPopup makes them dynamic so you can press them and see their name and elevation
  })
  .catch(error => {
    console.error('Error fetching JSON:', error); //This will never execute, but nice for larger webpages where json files are not stored locally
  });
