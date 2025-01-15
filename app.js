// Dropdown selection handler
document.getElementById('campus-select').addEventListener('change', function () {
  const campus = this.value; // Get selected campus
  const campusName = document.getElementById('campus-name');
  const repInfo = document.getElementById('rep-info');
  const repName = document.getElementById('rep-name');

  // Define representatives for each campus
  const representatives = {
    "Royal Oak": [
      { name: "Sarah Johnson", phone: "586-604-4432", email: "sarah.johnson7170@gmail.com" },
      { name: "Lori Greenlee", phone: "586-651-1266", email: "lagreenlee71@gmail.com" },
      { name: "Sargon Mikho", phone: "586-567-1995", email: "s.mikho@icloud.com" }
    ],
    "Troy": [
      { name: "Katherine Wallace", phone: "248-404-8084", email: "gr8chi@aol.com" },
      { name: "Suzi Carbone", phone: "586-944-4520", email: "spcarbone3@gmail.com" },
      { name: "Shawn Hills", phone: "586-439-8799", email: "hillisshawn01@gmail.com" },
      { name: "Marley Shook, NP", phone: "586-567-3122", email: "Marleyshook313@gmail.com" }
    ],
    "Dearborn": [
      { name: "Becky Smola", phone: "734-693-3076", email: "rebeccasmola1984@gmail.com" },
      { name: "Michella Vincent", phone: "313-585-1858", email: "michella.vincent@yahoo.com" }
    ],
    "Farmington Hills": [
      { name: "Misty Croteau", phone: "734-658-0815", email: "mcroteau84@gmail.com" },
      { name: "Debbie Miracle", phone: "313-333-3296", email: "miraclefour@sbcglobal.net" }
    ],
    "Grosse Pointe": [
      { name: "Holly Kowal", phone: "313-418-2405", email: "lonemirage02@gmail.com" },
      { name: "Jody Woodley", phone: "586-212-8398", email: "jlynnwoodley@yahoo.com" }
    ],
    "Wayne": [
      { name: "Natalie Lunsford", phone: "734-250-4073", email: "natrn91@wowway.com" },
    ],
    "Southfield": [
      { name: "Meredith Corseti", phone: "248-376-7712", email: "millermeredith@hotmail.com" },
      { name: "Katie Wilson (Flex RN)", phone: "313-400-6424", email: "kwilso65@emich.edu" }
    ],
    "Taylor": [
      { name: "Kimberly Pavlich", phone: "313-590-5276", email: "kimberly.ann15@ymail.com" },
      { name: "Allison Lorentz", phone: "734-718-5366", email: "jrsice1@gmail.com" }
    ],
    "Trenton": [
      { name: "Keli Wludyka", phone: "313-268-7768", email: "Kwludyka@wowway.com" },
      { name: "Kerri Donovan", phone: "734-925-1162", email: "Kerridonovan5@gmail.com" },
      { name: "Cari York", phone: "313-300-3523", email: "Dougcupcake@sbcglobal.net" },
      { name: "Deb Lyles", phone: "313-549-7249", email: "Deblyles21@yahoo.com" }
    ]
  };

  // Display the selected campus name
  if (campus) {
    campusName.textContent = campus; // Set the campus name
    campusName.style.display = 'block';

    // Display representatives for the selected campus
    const reps = representatives[campus];
    repName.innerHTML = reps.map(rep => `
      <div style="margin-bottom: 15px;">
        <strong>Name:</strong> ${rep.name}<br>
        <strong>Phone:</strong> <a href="tel:${rep.phone}">${rep.phone}</a><br>
        <strong>Email:</strong> <a href="mailto:${rep.email}">${rep.email}</a>
      </div>
    `).join('');
    repInfo.style.display = 'block';
  } else {
    campusName.style.display = 'none';
    repInfo.style.display = 'none';
  }
});
