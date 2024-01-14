
/*const newSkaters = [
    {level: 'new', name: 'Liv', number: '0', position: 'new'}

];


const rookieSkaters = [
    {level: 'rookie', name: 'Mortal wombat', number: '10', position: 'Blocker'}
];
*/

var advancedSkaters = [
    {level: 'advanced', name: 'Lockdown', number: '13', position: 'Blocker'}
];

function displayAdvanced(advancedSkaters) {
    var advancedLog = document.getElementById('advancedLog');
    var ul = document.createElement('ul');
    advancedSkaters.forEach(function(item){
        var li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });

    advancedLog.appendChild(ul);
}

// formScript.js

function addSkater(name, number, position, level) {
    const skater = { name, number, position, level};

    switch (level) {
        case 'new':
            newSkaters.push(skater);
            break;
        case 'rookie':
            rookieSkaters.push(skater);
            break;
        case 'advanced':
            advancedSkaters.push(skater);
            break;
        default:
            alert('Invalid level. Please enter "new", "rookie", or "advanced".');
            return;
    }
}
