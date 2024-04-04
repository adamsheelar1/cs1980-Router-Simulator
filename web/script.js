function setup() {
    var generateButton = document.getElementById('getData');
    var generateButton = document.getElementById('getServerTotalData');
    var generateButton = document.getElementById('getServerData');
    var generateButton = document.getElementById('displayData')

    generateButton.addEventListener('click', fetchThroughData);
    generateButton.addEventListener('click', fetchServerTotal);
    generateButton.addEventListener('click', fetchServer);
    generateButton.addEventListener('click', displayData);
}

var throughTotal = null;
var serverTotal = null;
var server = null;

//   const data = [
//     { id: 'A', value: 100 },
//     { id: 'B', value: 200 },
//     { id: 'C', value: 300 },
//     { id: 'D', value: 100 },
//   ];

function populateObject() {
    
}

function displayData() {
    console.log(throughTotal)
    console.log(server)
    console.log(serverTotal)
    if (throughTotal != null) document.getElementById('area1').value = throughTotal;
    if (server != null) document.getElementById('area2').value = server
    if (serverTotal != null) document.getElementById('area3').value = serverTotal
}

function fetchThroughData() {
    const url = new URL("http://localhost:3000/packets")
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return response.json();
        })
        .then((json) => {
            throughTotal = JSON.stringify(json)
        })
        .then(data => console.log(JSON.stringify(data)))
        .catch(error => console.error('Error: ', error));
}

function fetchServerTotal() {
    const url = new URL("http://localhost:3000/serverTotal")
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return response.json();
        })
        .then((json) => {
            serverTotal = JSON.stringify(json)
        })
        .then(data => console.log(JSON.stringify(data)))
        .catch(error => console.error('Error: ', error));
}

function fetchServer() {
    const url = new URL("http://localhost:3000/server")
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return response.json();
        })
        .then((json) => {
            server = JSON.stringify(json)
        })
        .then(data => console.log(JSON.stringify(data)))
        .catch(error => console.error('Error: ', error));
}

window.addEventListener("load", setup)