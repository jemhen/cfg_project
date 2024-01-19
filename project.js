// --- RUN FUNCTIONS ON LOAD + ADD EVENTLISTENER TO BUTTON
window.onload = function() {
    
    // --- STORED PLAYERS ---
    const storedPlayers = localStorage.getItem('players')

    console.log("Stored players:", storedPlayers)

    if (storedPlayers !== null && storedPlayers !== "undefined" && storedPlayers !== undefined) {
        try {
            window.players = JSON.parse(storedPlayers)
        } catch (error) {
            console.error("Error parsing stored players:", error)
            window.players = ["Please select a player"]
        }
    } else if (storedPlayers === "undefined") {
        window.players = ["Please select a player"]
    } else {
        window.players = ["Please select a player"]
    }

   // --- POPULATE DROPDOWNS ---
    if (document.getElementById("months")) {
        window.populateDateDropdown()
    }

    if (document.getElementById("dropdown-player-list")) {    
        window.populatePlayerDropdown()
    }

    // --- POPULATE CURRENT PLAYERS LIST ---
    if (document.getElementById("player-list")) {
        window.generatePlayerList()
    }

    // --- ATTACH EVENT LISTENER TO BUTTON CLICK ---
    if (document.getElementById("button-confirm-attendance")){
        const confirmAttendanceButton = document.getElementById("button-confirm-attendance")
        confirmAttendanceButton.addEventListener("click", confirmAttendance)
    }
    
    // --- ADD PLAYER BUTTON ---
    const addPlayerButton = document.getElementById("add-player-button")

    if (addPlayerButton) {
        addPlayerButton.addEventListener("click", addPlayer)
    }
}

// --- DEFINE FUNCTION TO STORE PLAYERS ARRAY ---
function updatePlayerArray() {
    localStorage.setItem('players', JSON.stringify(players))
    if (window.populatePlayerDropdown){
        window.populatePlayerDropdown()
    }
}


// --- FUNCTION TO POPULATE THE PLAYER DROPDOWN ---
window.populatePlayerDropdown = function() {
    const playerDropdown = document.getElementById("dropdown-player-list")

    if (playerDropdown) {
        if (window.players) {
            playerDropdown.innerHTML = ""

            window.players.forEach(function(player) {
                let option = document.createElement("option")
                option.value = player
                option.text = player
                playerDropdown.appendChild(option)
                })
        }
    } 
}

// --- FUNCTION TO STOP TEXT "Please select a date" BEING CONVERTED INTO DATE
function containsNumbers(dropdownDates) {
    return /^\D*$/.test(dropdownDates)
}

// --- FUNCTION TO FORMAT DATES ---
function formatDate(dateString) {
        if (containsNumbers(dateString)){
            return dateString
        } else {
            const date = new Date(dateString)
            const day = date.getDate().toString().padStart(2,'0')
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const year = date.getFullYear()

            return `${day}-${month}-${year}`
    }
}

// --- FUNCTION TO POPULATE THE DATE DROPDOWN ---
function populateDateDropdown() {
    const dateDropdown = document.getElementById("months")

    if (dateDropdown) {
        dateDropdown.innerHTML = ""
    } else {
        console.error("Element with ID 'dropdown-dates' not on this page.");
    }

    window.dates.forEach(function(dateString){
        const formattedDate = formatDate(dateString)

        let option = document.createElement("option")
        option.value = dateString
        option.text = formattedDate
        dateDropdown.appendChild(option)
    })
}

// --- FUNCTION TO REGISTER ATTENDANCE ---
function confirmAttendance() {
    const selectedPlayer = document.getElementById("dropdown-player-list").value
    const selectedDate = document.getElementById("months").value
    
    if (selectedPlayer !== "Please select a player" && selectedDate !== "Please select a date") {
        console.log(`${selectedPlayer} has been marked as present on ${formatDate(selectedDate)}.`)
        alert("Thank you. Your attendance has been confirmed.")

    } else if (selectedPlayer == "Please select a player" && selectedDate == "Please select a date"){
        alert("Please select from the dropdown menus.")

    } else if (selectedPlayer == "Please select a player"){
        alert("Please select a player before proceeding.")

    } else if (selectedDate == "Please select a date"){
        alert("Please select a date before proceeding.")
    }
}   