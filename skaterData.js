// --- TITLE CASE ---
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}

// --- FUNCTION TO ADD PLAYER ---
function addPlayer () {
    const newPlayerInput = document.getElementById("add-player-id")
    let newPlayer = toTitleCase(newPlayerInput.value.trim().toUpperCase())

    if (newPlayer && isNaN(newPlayer)) {

        if (!window.players) {
            window.players = []
        }

        window.players.splice(1, 0, newPlayer)

        document.getElementById("add-player-id").value = ""

        updatePlayerArray()
        generatePlayerList()
        console.log(window.players)

        alert(`${newPlayer} added`)

    } else {
        document.getElementById("add-player-id").value = ""
    }
}

// --- FUNCTION TO POPULATE CURRENT PLAYERS LIST ---
function generatePlayerList() {
    const playerList = document.getElementById("player-list")
    playerList.innerHTML = ""

    if (window.players) {
        window.players.slice(1).forEach(function(player) {
            const listItem = document.createElement("li")
            listItem.textContent = player
            listItem.addEventListener("click", function() {
                const selectedPlayer = window.players.indexOf(player)
                
                if (selectedPlayer > -1) {
                    const confirmation = confirm(`Are you sure you'd like to remove ${player} from the team?`)
                    
                    if (confirmation) {
                        alert(`${player} has been removed from the team.`)
                        window.players.splice(selectedPlayer, 1)
                        updatePlayerArray()
                        generatePlayerList()
                        console.log(window.players)
                    }
                }
            })
            playerList.appendChild(listItem)
        })
    }
}



