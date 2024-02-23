function setup() {
    var generateButton = document.getElementById('getData');
    generateButton.addEventListener('click', fetchData);

}

function fetchData() {
    const url = new URL("http://localhost:3000/packets")
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            return response.json();
        })
        .then((json) => {
            document.getElementById("getContent").value = json
        })
        .then(data => console.log(data))
        .catch(error => console.error('Error: ', error));
}

window.addEventListener("load", setup)