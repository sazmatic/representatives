// Dropdown selection handler
document.getElementById('campus-select').addEventListener('change', function () {
  const campus = this.value; // Get selected campus
  const repInfo = document.getElementById('rep-info');
  const repName = document.getElementById('rep-name');

  // Define representatives for each campus
  const representatives = {
    "Royal Oak": [
      { name: "John Doe", phone: "555-123-4567", email: "johndoe@example.com" },
      { name: "Mary Jane", phone: "555-987-6543", email: "maryjane@example.com" }
    ],
    "Troy": [
      { name: "Jane Smith", phone: "555-234-5678", email: "janesmith@example.com" },
      { name: "Robert Brown", phone: "555-345-6789", email: "robertbrown@example.com" }
    ],
    "Dearborn": [
      { name: "Ahmed Khan", phone: "555-345-6789", email: "ahmedkhan@example.com" },
      { name: "Fatima Ali", phone: "555-654-9876", email: "fatimaali@example.com" }
    ],
    "Farmington Hills": [
      { name: "Emily Davis", phone: "555-456-7890", email: "emilydavis@example.com" },
      { name: "Steve Grant", phone: "555-765-4321", email: "stevegrant@example.com" }
    ],
    "Wayne": [
      { name: "Michael Brown", phone: "555-567-8901", email: "michaelbrown@example.com" },
      { name: "Lisa White", phone: "555-123-7890", email: "lisawhite@example.com" }
    ],
    "Southfield": [
      { name: "Sarah Wilson", phone: "555-678-9012", email: "sarahwilson@example.com" },
      { name: "Paul Adams", phone: "555-890-1234", email: "pauladams@example.com" }
    ],
    "Taylor": [
      { name: "Chris Johnson", phone: "555-789-0123", email: "chrisjohnson@example.com" },
      { name: "Nina Bell", phone: "555-987-6543", email: "ninabell@example.com" }
    ],
    "Trenton": [
      { name: "Anna Lee", phone: "555-890-1234", email: "annalee@example.com" },
      { name: "Kevin Hart", phone: "555-456-7890", email: "kevinhart@example.com" }
    ]
  };

  // Display representative info
  if (campus) {
    const reps = representatives[campus];
    repName.innerHTML = reps.map(rep => `
      <div style="margin-bottom: 15px;">
        <strong>Name:</strong> ${rep.name}<br>
        <strong>Phone:</strong> <a href="tel:${rep.phone}">${rep.phone}</a><br>
        <strong>Email:</strong> <a href="mailto:${rep.email}">${rep.email}</a>
      </div>
    `).join(''); // Join all reps for the selected campus
    repInfo.style.display = 'block';
  } else {
    repInfo.style.display = 'none';
  }
});
