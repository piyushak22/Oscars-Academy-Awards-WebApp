localStorage.clear();
document.addEventListener("DOMContentLoaded", function() {
	
    // Getting the elements from html form
	const form = document.getElementById("myForm");
	const outputDiv = document.getElementById("output")
    outputDiv.style.maxHeight = '400px';
    outputDiv.style.overflowY = 'auto';

	const clearInputBtn = document.getElementById("clear-input");
	const clearOutputBtn = document.getElementById("clear-output");
    const getNomineesBtn = document.getElementById("get-nominees")
	const getNominationsBtn = document.getElementById("get-nominations");

    // Logic for Clear Input Button
	clearInputBtn.addEventListener("click", function() {
		form.reset();
	})

    // Logic for Clear Input Button
	clearOutputBtn.addEventListener("click", function() {
		outputDiv.innerHTML = "";
	});

    // EventListener for nominee and info value restriction 
    nominee.addEventListener('input', checkAndWarn);
    info.addEventListener('input', checkAndWarn);
    nomInfo.addEventListener('input', checkAndWarn);

    function checkAndWarn() {
        if ((nominee.value.trim() || info.value.trim()) && nomInfo.value.trim()) {
            alert("You can only enter a value in either the Nominee, Info textboxes or Nominee/Info textbox, not in both.");
            nomInfo.value = ''; // Clear the conflicting input
        }
    }

    // Logic for Clear getNomination button click
	getNominationsBtn.addEventListener("click", function(event) {
        event.preventDefault();

        const year = document.getElementById('year').value;
        const category = document.getElementById('category').value;
        const nominee = document.getElementById('nominee').value;
        const info = document.getElementById('info').value;
        const nomInfo = document.getElementById('nomInfo').value;
        const won = document.getElementById('won').value;

        // Construct the query URL with parameters from the form
        const queryParams = new URLSearchParams({
            year,
            category,
            nominee,
            info,
            nomInfo,
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
            console.log("Number of Records on Get Nominations Button Click : ", data.length)
            totalRecordsInfo.textContent = `Total number of records: ${data.length}`;
            outputDiv.appendChild(totalRecordsInfo);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            outputDiv.innerHTML = "Failed to fetch data.";
        });
    });

    // Logic for Clear getNomination button click
    getNomineesBtn.addEventListener("click", function(event) {
        event.preventDefault();
        const year = document.getElementById('year').value;
        const category = document.getElementById('category').value;
        const nominee = document.getElementById('nominee').value.trim();
        const info = document.getElementById('info').value.trim();
        const nomInfo = document.getElementById('nomInfo').value;
        const numberOfTimes = document.getElementById('times').value;
        const won = document.getElementById('won').value;


        // Construct the query URL with parameters from the form
        const queryParams = new URLSearchParams({
            year,
            category,
            nominee,
            info,
            nomInfo,
            numberOfTimes,
            won
        }).toString();

        fetch(`http://localhost:8080/nominees?${queryParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data received in UI: ", data.length);
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
            console.log("Number of Records on Get Nominees Button Click : ", data.length)
            totalRecordsInfo.textContent = `Total number of records: ${data.length}`;
            outputDiv.appendChild(totalRecordsInfo);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            outputDiv.innerHTML = "Failed to fetch data.";
        });
    });
});
