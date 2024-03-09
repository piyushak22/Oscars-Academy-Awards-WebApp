document.addEventListener("DOMContentLoaded", function() {
	
	const form = document.getElementById("myForm");
	const outputDiv = document.getElementById("output")

	const clearInputBtn = document.getElementById("clear-input");
	const clearOutputBtn = document.getElementById("clear-output");
    const getNomineesBtn = document.getElementById("get-nominees")
	const getNominationsBtn = document.getElementById("get-nominations");

	clearInputBtn.addEventListener("click", function() {
		form.reset();
	})

	clearOutputBtn.addEventListener("click", function() {
		outputDiv.innerHTML = "";
	});

	getNominationsBtn.addEventListener("click", function(event) {
        event.preventDefault();

        // Construct the query URL with parameters from the form
        const year = document.getElementById('year').value;
        const category = document.getElementById('category').value;
        const nominee = document.getElementById('nominee').value;
        const info = document.getElementById('info').value;
        const won = document.getElementById('won').value;

        const queryParams = new URLSearchParams({
            year,
            category,
            nominee,
            info,
            won
        }).toString();

        fetch(`http://localhost:8080/nominations?${queryParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            outputDiv.innerHTML = "";
            console.log("DATA--------------------------------------------------", data)
            const table = document.createElement("table");
            table.className = "resultsTable";
            const headerRow = table.insertRow();
            const headers = ["Year", "Category", "Nominee", "Info", "Won"];
            headers.forEach(headerText => {
                const headerCell = document.createElement("th");
                headerCell.textContent = headerText;
                headerRow.appendChild(headerCell);
            });

            data.forEach(item => {
                const row = table.insertRow();
                headers.forEach(header => {
                    const cell = row.insertCell();
                    const value = item[header.charAt(0).toUpperCase() + header.slice(1).toLowerCase()];
                    const text = document.createTextNode(value || '');
                    cell.appendChild(text);
                });
            });

            outputDiv.appendChild(table);
            const totalRecordsInfo = document.createElement("p");
            totalRecordsInfo.textContent = `Total number of records: ${data.length}`;
            outputDiv.appendChild(totalRecordsInfo);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            outputDiv.innerHTML = "Failed to fetch data.";
        });
    });

    getNomineesBtn.addEventListener("click", function(event) {
        event.preventDefault();

        const numberOfTimes = document.getElementById('times').value;
        const wonOption = document.getElementById('won').value;

        // Construct the query URL with parameters from the form
        const queryParams = new URLSearchParams({
            numberOfTimes,
            wonOption
        }).toString();

        fetch(`http://localhost:8080/nominees?${queryParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            outputDiv.innerHTML = "";  // Clear previous results

            const table = document.createElement("table");
            table.className = "resultsTable";
            
            // Create header
            const headerRow = table.insertRow();
            ["Nominee", "Number of times"].forEach(text => {
                let headerCell = document.createElement("th");
                headerCell.textContent = text;
                headerRow.appendChild(headerCell);
            });

            // Populate table rows
            data.forEach(({ nominee, count }) => {
                let row = table.insertRow();
                [nominee, count].forEach(text => {
                    let cell = row.insertCell();
                    cell.textContent = text;
                });
            });

            outputDiv.appendChild(table);
            const totalRecordsInfo = document.createElement("p");
            totalRecordsInfo.textContent = `Total number of records: ${data.length}`;
            outputDiv.appendChild(totalRecordsInfo);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            outputDiv.innerHTML = "Failed to fetch data.";
        });
    });
});





    //     fetch('http://localhost:8080/nominees')
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         const outputDiv = document.getElementById("results");
    //         outputDiv.innerHTML = "";  // Clear previous results
    
    //         const table = document.createElement("table");
    //         table.className = "resultsTable";
            
    //         // Create header
    //         const headerRow = table.insertRow();
    //         ["Nominee", "Number of times"].forEach(text => {
    //             let headerCell = document.createElement("th");
    //             headerCell.textContent = text;
    //             headerRow.appendChild(headerCell);
    //         });
    
    //         // Populate table rows
    //         data.forEach(({ nominee, count }) => {
    //             let row = table.insertRow();
    //             [nominee, count].forEach(text => {
    //                 let cell = row.insertCell();
    //                 cell.textContent = text;
    //             });
    //         });
    
    //         outputDiv.appendChild(table);
    //     })
    //     .catch(error => {
    //         console.error("Error fetching data:", error);
    //         outputDiv.innerHTML = "Failed to fetch data.";
    //     });
    // });

