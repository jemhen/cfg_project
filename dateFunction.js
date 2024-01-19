document.addEventListener('DOMContentLoaded', function () {
    const monthsDropdown = document.getElementById('months');
    const resultContainer = document.getElementById('result-container');
    
    const registerButton = document.getElementById('button-confirm-attendance');
    registerButton.addEventListener('click', function () {
        const selectedPlayer = document.getElementById('dropdown-player-list').value;
        const selectedMonth = document.getElementById('months').value;

        if (selectedPlayer && selectedMonth) {
            const attendanceDate = new Date(); // Assuming today's date, you can modify this as needed
            const attendanceRecord = {
                player: selectedPlayer,
                month: selectedMonth,
                date: attendanceDate.toISOString()
            };

            // Log the attendance record (you can modify this part based on your requirements)
            console.log('Attendance Registered:', attendanceRecord);

            // Optionally, you can update the UI or perform other actions
            alert(`Attendance registered for ${selectedPlayer} in ${months[selectedMonth - 1]} on ${attendanceDate.toDateString()}`);
        } else {
            alert('Please select a player and a month to register attendance.');
        }
    });



    // Array of months
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Populate the dropdown with options
    months.forEach(function (month, index) {
        const option = document.createElement('option');
        option.value = index + 1;  // Months are 1-indexed in JavaScript Date object
        option.text = month;
        monthsDropdown.add(option);
    });

    // Function to find Sundays and Tuesdays for the selected month
    function findSpecificDays(year, month, dayOfWeek1, dayOfWeek2) {
        const specificDays = [];

        // Set the date to the first day of the month
        const currentDate = new Date(year, month - 1, 1);

        // Find the first occurrences of the specified days of the week in the month
        while (currentDate.getDay() !== dayOfWeek1 && currentDate.getDay() !== dayOfWeek2) {
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Iterate through the rest of the month and collect all occurrences of the specified days
        while (currentDate.getMonth() === month - 1) {
            specificDays.push(new Date(currentDate.getTime()));
            currentDate.setDate(currentDate.getDate() + 7); // Move to the next week
        }

        return specificDays;
    }

    // Function to create radio buttons for each day
    function createRadioButtons(days) {
        const radioButtons = days.map(day => {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'attendance';
            radio.value = day.toISOString(); // Using ISO string for unique identification
            const label = document.createElement('label');
            label.textContent = day.toDateString();
            const lineBreak = document.createElement('br');
            return [radio, label, lineBreak];
        });

        return radioButtons.flat();
    }

    // Event listener for the dropdown change event
    monthsDropdown.addEventListener('change', function () {
        const selectedMonth = parseInt(monthsDropdown.value);
        const currentYear = new Date().getFullYear(); // Get the current year or set it as needed

        // Call the function to find Sundays and Tuesdays for the selected month
        const sundays = findSpecificDays(currentYear, selectedMonth, 0, 0);
        const tuesdays = findSpecificDays(currentYear, selectedMonth, 2, 2);

        // Combine the arrays and sort them
        const allDays = sundays.concat(tuesdays).sort((a, b) => a - b);

        // Create radio buttons for each day
        const radioButtons = createRadioButtons(allDays);

        // Append radio buttons to the result container
        resultContainer.innerHTML = '';
        radioButtons.forEach(button => resultContainer.appendChild(button));

        // Enable the register button
        registerButton.disabled = false;
    });

    // Event listener for the register button
    registerButton.addEventListener('click', function () {
        const selectedRadioButton = document.querySelector('input[name="attendance"]:checked');
        if (selectedRadioButton) {
            const selectedDate = new Date(selectedRadioButton.value);
            alert(`Attendance registered for ${selectedDate.toDateString()}`);
        } else {
            alert('Please select a day to register attendance.');
        }
    });

});

