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

function parseCSV(csvData) {
    // Implement CSV parsing logic here or use a library like Papaparse
    // Example: const parsedData = Papa.parse(csvData, { header: true });
    // Replace this line with your actual parsing logic

    // For demonstration purposes, returning a simple array with headers and data
    return {
        headers: ['Column1', 'Column2', 'Column3'],
        data: [
            [1, 10, 100],
            [2, 20, 200],
            [3, 30, 300]
        ]
    };
}

function generateGraphs(parsedData) {
    const labels = parsedData.headers.slice(1); // Exclude the first column as labels
    const datasets = parsedData.data.map(row => ({
        label: `Data ${row[0]}`,
        data: row.slice(1),
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
        borderWidth: 1
    }));

    // Example: Create a bar chart
    const ctx = document.getElementById('graphsContainer').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function getRandomColor() {
    // Generate a random hex color code
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}
