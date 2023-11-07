function enableEditingMode() {
    var contentDiv = document.getElementById("editable-content");
    var title = document.getElementById("title");
    var description = document.getElementById("description");

    // Create an input field for editing the title
    var titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = title.textContent;

    // Replace the title with the input field
    contentDiv.replaceChild(titleInput, title);

    // Create a textarea for editing the description
    var descriptionTextarea = document.createElement("textarea");
    descriptionTextarea.value = description.textContent;

    // Replace the description with the textarea
    contentDiv.replaceChild(descriptionTextarea, description);
}

document.getElementById("enable-editing-button").addEventListener("click", enableEditingMode);
   
function disableEditingMode() {
    // Code to disable editing mode. For example, you might hide the input field after the user is done editing.
    var inputField = document.getElementById('inputField');
    inputField.removeAttribute('contenteditable');
}
   

// This function takes the URL of the CSV file as an argument and reads it using the fetch API
function readCSV(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const dataAsArray = data.split('\n').map(row => row.split(','));
            const output = document.getElementById('output');

            // Loop through the rows of the CSV file and append them as table rows to the output element
            dataAsArray.forEach(row => {
                const rowElement = document.createElement('div');
                rowElement.innerHTML = row.join(' ');
                output.appendChild(rowElement);
            });
        });
}

// Replace the URL with the URL of your CSV file
readCSV('https://example.com/your_file.csv');
 