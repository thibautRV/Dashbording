// script.js
let selectedDataAttribute; // Variable to store the selected data attribute
let myChart; // Variable to store the Chart.js chart instance

document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the server
  fetch('/api/data')
    .then(response => response.json())
    .then(data => {
      // Update the HTML page with the first 10 rows of data
      updateDataTable(data);

      // Get available data attributes (assuming Variety is the last column)
      const dataAttributes = Object.keys(data[0]).slice(0, -1);

      // Populate the dropdown with data attributes
      const dropdown = document.getElementById('dataAttribute');
      dataAttributes.forEach(attribute => {
        const option = document.createElement('option');
        option.value = attribute;
        option.text = attribute;
        dropdown.appendChild(option);
      });

      // Set the default selected data attribute
      selectedDataAttribute = dataAttributes[0];

      // Update the graph based on the default selected data attribute
      updateGraph();
    })
    .catch(error => console.error('Error fetching data:', error));
});

function updateDataTable(data) {
  // Assuming you have a table with the ID 'dataTable'
  const dataTable = document.getElementById('dataTable');

  // Clear existing content
  dataTable.innerHTML = '';

  // Create table headers
  const headerRow = document.createElement('tr');
  for (const key in data[0]) {
    const th = document.createElement('th');
    th.textContent = key;
    headerRow.appendChild(th);
  }
  dataTable.appendChild(headerRow);

  // Create table rows with the first 10 rows of data
  for (let i = 0; i < Math.min(data.length, 10); i++) {
    const row = document.createElement('tr');
    for (const key in data[i]) {
      const td = document.createElement('td');
      td.textContent = data[i][key];
      row.appendChild(td);
    }
    dataTable.appendChild(row);
  }
}

function updateGraph() {
  // Randomly select an attribute from the available data attributes
  const dataAttributes = Array.from(document.getElementById('dataAttribute').options);
  const randomIndex = Math.floor(Math.random() * dataAttributes.length);
  selectedDataAttribute = dataAttributes[randomIndex].value;

  // Fetch data from the server
  fetch('/api/data')
    .then(response => response.json())
    .then(data => {
      // Update the graph based on the selected data attribute and chart type
      createBarChart(data, selectedDataAttribute);
      createLineChart(data, selectedDataAttribute);
      createPieChart(data, selectedDataAttribute);
    })
    .catch(error => console.error('Error fetching data:', error));
}


function createBarChart(data, attribute) {
  const attributeValues = data.map(item => item[attribute]);

  const ctx = document.getElementById('myBarChart').getContext('2d');

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(item => item.Variety).slice(0, 10),
      datasets: [{
        label: `${attribute} - Setosa`,
        data: data.map(item => (item.Variety === 'Setosa' ? item[attribute] : null)).slice(0, 10),
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
        borderWidth: 1,
      }, {
        label: `${attribute} - Versicolor`,
        data: data.map(item => (item.Variety === 'Versicolor' ? item[attribute] : null)).slice(0, 10),
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
        borderWidth: 1,
      }, {
        label: `${attribute} - Virginica`,
        data: data.map(item => (item.Variety === 'Virginica' ? item[attribute] : null)).slice(0, 10),
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function createLineChart(data, attribute) {
  const attributeValues = data.map(item => item[attribute]);

  const ctx = document.getElementById('myLineChart').getContext('2d');

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(item => item.Variety).slice(0, 10),
      datasets: [{
        label: `${attribute} - Setosa`,
        data: data.map(item => (item.Variety === 'Setosa' ? item[attribute] : null)).slice(0, 10),
        borderColor: getRandomColor(),
        borderWidth: 1,
        fill: false,
      }, {
        label: `${attribute} - Versicolor`,
        data: data.map(item => (item.Variety === 'Versicolor' ? item[attribute] : null)).slice(0, 10),
        borderColor: getRandomColor(),
        borderWidth: 1,
        fill: false,
      }, {
        label: `${attribute} - Virginica`,
        data: data.map(item => (item.Variety === 'Virginica' ? item[attribute] : null)).slice(0, 10),
        borderColor: getRandomColor(),
        borderWidth: 1,
        fill: false,
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function createPieChart(data, attribute) {
  const attributeValues = data.map(item => item[attribute]);

  const ctx = document.getElementById('myPieChart').getContext('2d');

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Setosa', 'Versicolor', 'Virginica'],
      datasets: [{
        data: [
          data.map(item => (item.Variety === 'Setosa' ? item[attribute] : null)).reduce((a, b) => a + b, 0),
          data.map(item => (item.Variety === 'Versicolor' ? item[attribute] : null)).reduce((a, b) => a + b, 0),
          data.map(item => (item.Variety === 'Virginica' ? item[attribute] : null)).reduce((a, b) => a + b, 0),
        ],
        backgroundColor: getRandomColors(3),
        borderColor: getRandomColors(3),
        borderWidth: 1,
      }],
    },
  });
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(getRandomColor());
  }
  return colors;
}
