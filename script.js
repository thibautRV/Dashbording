document.getElementById('csvFileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file) {
        // Read the content of the file
        const reader = new FileReader();
        reader.onload = function (e) {
            const csvData = e.target.result;
            
            // Process the CSV data (you may use a CSV parsing library)
            const parsedData = parseCSV(csvData);

            // Call a function to generate graphs using the parsed data
            generateGraphs(parsedData);
        };

        reader.readAsText(file);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Upload and read the selected file
    var input = document.getElementById('uploadCSV');
    input.addEventListener('change', function() {
       var file = this.files[0];
       var reader = new FileReader();
   
       // Generate graphs based on the parsed data
       reader.onload = function(e) {
         var csvData = e.target.result;
         var parsedData = parseCSV(csvData);
         generateGraphs(parsedData);
       };
   
       // Read the file content
       reader.readAsText(file);
    });
   });
   
   function parseCSV(csvData) {
    return Papa.parse(csvData, {
       header: true,
       dynamicTyping: true,
    }).data;
   }
   
   function generateGraphs(parsedData) {
    console.log("Generating Graphs");
    let graphDiv = document.createElement("div");
    graphDiv.setAttribute("id", "graphContainer");
    document.body.appendChild(graphDiv);

    for (let i = 1; i < parsedData.length - 2; i++) {
        // Bar Chart
        let div = document.createElement("div");
        div.setAttribute("class", "col s6 m3 l3");
        let canvas = document.createElement("canvas");
        canvas.width = "450";
        canvas.height = "450";
        div.appendChild(canvas);
        graphDiv.appendChild(div);
        var ctx = canvas.getContext("2d");
        var barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: parsedData.columns.slice(1),
                datasets: [{
                    label: parsedData[i].label,
                    data: parsedData[i].values,
                    backgroundColor: getRandomColor(),
                    borderColor: getRandomColor(),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Line Chart
        let lineDiv = document.createElement("div");
        lineDiv.setAttribute("class", "col s6 m3 l3");
        let lineCanvas = document.createElement("canvas");
        lineCanvas.width = "450";
        lineCanvas.height = "450";
        lineDiv.appendChild(lineCanvas);
        graphDiv.appendChild(lineDiv);
        var lineCtx = lineCanvas.getContext("2d");
        var lineChart = new Chart(lineCtx, {
            type: "line",
            data: {
                labels: parsedData.map(function(row) { return row.label; }),
                datasets: [{
                    label: "Value",
                    data: parsedData.map(function(row) { return row.value; }),
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)"
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function displayDataset(parsedData) {
    // Create a table element
    const table = document.createElement('table');
    table.setAttribute('class', 'table'); // You might want to add a class for styling

    // Create the table header
    const headerRow = table.insertRow(0);
    for (const column of parsedData.columns) {
        const th = document.createElement('th');
        th.textContent = column;
        headerRow.appendChild(th);
    }

    // Create the table rows with data
    for (const row of parsedData) {
        const tableRow = table.insertRow();
        for (const column of parsedData.columns) {
            const cell = tableRow.insertCell();
            cell.textContent = row[column];
        }
    }

    // Append the table to a container in your HTML (e.g., a div with id 'tableContainer')
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = ''; // Clear previous content
    tableContainer.appendChild(table);
}
