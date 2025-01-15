document.getElementById('campus-select').addEventListener('change', handleCampusChange);

const representatives = {
  "Royal Oak": [
    { name: "Sarah Johnson", phone: "5866044432", email: "sarah.johnson7170@gmail.com" },
    { name: "Lori Greenlee", phone: "5866511266", email: "lagreenlee71@gmail.com" },
    { name: "Sargon Mikho", phone: "5865671995", email: "s.mikho@icloud.com" }
  ],
  "Troy": [
    { name: "Katherine Wallace", phone: "2484048084", email: "gr8chi@aol.com" },
    { name: "Suzi Carbone", phone: "5869444520", email: "spcarbone3@gmail.com" },
    { name: "Shawn Hills", phone: "5864398799", email: "hillisshawn01@gmail.com" },
    { name: "Marley Shook, NP", phone: "5865673122", email: "Marleyshook313@gmail.com" }
  ]
  // Add more campuses here
};

function handleCampusChange() {
  const campus = this.value;
  const campusName = document.getElementById('campus-name');
  const repInfo = document.getElementById('rep-info');
  const repName = document.getElementById('rep-name');

  if (campus && representatives[campus]) {
    campusName.textContent = campus;
    campusName.style.display = 'block';
    repInfo.style.display = 'block';

    repName.innerHTML = representatives[campus]
      .map(rep => `
        <div class="rep-card">
          <div><span>Name:</span><span>${rep.name}</span></div>
          <div><span>Phone:</span><a href="tel:${rep.phone}">${rep.phone}</a></div>
          <div><span>Email:</span><a href="mailto:${rep.email}">${rep.email}</a></div>
        </div>
      `)
      .join('');
  } else {
    campusName.style.display = 'none';
    repInfo.style.display = 'none';
  }
}
