document.getElementById('campus-select').addEventListener('change', handleCampusChange);

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
    { name: "Natalie Lunsford", phone: "734-250-4073", email: "natrn91@wowway.com" }
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
          <div><span>Phone:</span><a href="tel:${rep.phone.replace(/-/g, '')}">${rep.phone}</a></div>
          <div><span>Email:</span><a href="mailto:${rep.email}">${rep.email}</a></div>
        </div>
      `)
      .join('');
  } else {
    campusName.style.display = 'none';
    repInfo.style.display = 'none';
  }
}
