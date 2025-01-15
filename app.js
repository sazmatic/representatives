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
  ],
  "Dearborn": [
    { name: "Becky Smola", phone: "7346933076", email: "rebeccasmola1984@gmail.com" },
    { name: "Michella Vincent", phone: "3135851858", email: "michella.vincent@yahoo.com" }
  ],
  "Farmington Hills": [
    { name: "Misty Croteau", phone: "7346580815", email: "mcroteau84@gmail.com" },
    { name: "Debbie Miracle", phone: "3133333296", email: "miraclefour@sbcglobal.net" }
  ],
  "Grosse Pointe": [
    { name: "Holly Kowal", phone: "3134182405", email: "lonemirage02@gmail.com" },
    { name: "Jody Woodley", phone: "5862128398", email: "jlynnwoodley@yahoo.com" }
  ],
  "Wayne": [
    { name: "Natalie Lunsford", phone: "7342504073", email: "natrn91@wowway.com" }
  ],
  "Southfield": [
    { name: "Meredith Corseti", phone: "2483767712", email: "millermeredith@hotmail.com" },
    { name: "Katie Wilson (Flex RN)", phone: "3134006424", email: "kwilso65@emich.edu" }
  ],
  "Taylor": [
    { name: "Kimberly Pavlich", phone: "3135905276", email: "kimberly.ann15@ymail.com" },
    { name: "Allison Lorentz", phone: "7347185366", email: "jrsice1@gmail.com" }
  ],
  "Trenton": [
    { name: "Keli Wludyka", phone: "3132687768", email: "Kwludyka@wowway.com" },
    { name: "Kerri Donovan", phone: "7349251162", email: "Kerridonovan5@gmail.com" },
    { name: "Cari York", phone: "3133003523", email: "Dougcupcake@sbcglobal.net" },
    { name: "Deb Lyles", phone: "3135497249", email: "Deblyles21@yahoo.com" }
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
