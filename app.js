// Dropdown selection handler
document.getElementById('campus-select').addEventListener('change', function () {
  const campus = this.value; // Get selected campus
  const repInfo = document.getElementById('rep-info');
  const repName = document.getElementById('rep-name');

  // Define representatives
  const representatives = {
    "Royal Oak": "John Doe",
    "Troy": "Jane Smith",
    "Dearborn": "Ahmed Khan",
    "Farmington Hills": "Emily Davis",
    "Wayne": "Michael Brown",
    "Southfield": "Sarah Wilson",
    "Taylor": "Chris Johnson",
    "Trenton": "Anna Lee"
  };

  // Display representative info
  if (campus) {
    repName.textContent = `Your representative is ${representatives[campus]}.`;
    repInfo.style.display = 'block';
  } else {
    repInfo.style.display = 'none';
  }
});
