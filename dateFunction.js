
document.addEventListener('DOMContentLoaded', function () {
    const monthsDropdown = document.getElementById('months');
    const resultContainer = document.getElementById('result-container');

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

    // Event listener for the dropdown change event
    monthsDropdown.addEventListener('change', function () {
        const selectedMonth = parseInt(monthsDropdown.value);
        const currentYear = new Date().getFullYear(); // Get the current year or set it as needed

        // Call the function to find Sundays and Tuesdays for the selected month
        const sundays = findSpecificDays(currentYear, selectedMonth, 0, 0);
        const tuesdays = findSpecificDays(currentYear, selectedMonth, 2, 2);

        // Combine the arrays and sort them
        const allDays = sundays.concat(tuesdays).sort((a, b) => a - b);

        // Create a string with the results, using <br> for line breaks
        const resultString = `Sundays and Tuesdays in ${months[selectedMonth - 1]} ${currentYear}:<br>${allDays.join('<br>')}`;

        // Update the result container in the HTML
        resultContainer.innerHTML = resultString;
    });
});
