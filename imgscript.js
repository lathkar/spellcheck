const images = ["apple.png", "ball.png", "cat.png", "dog.png", "elephant.png",
"fan.png", "fish.png", "hat.png", "house.png", "kite.png",
"lion.png", "octopus.png", "rabbit.png", "rocket.png", "sun.png",
"tree.png", "umbrella.png", "violin.png", "watch.png", "duck.png"
];

function displayImage(index) {
    const imageElement = document.getElementById('image');
    imageElement.src = "objects/"+images[index];
    imageElement.setAttribute('data-index', index); // Store the index of the displayed image
    imageElement.setAttribute('title', images[index].split('.')[0].toUpperCase());
}

function displayRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    displayImage(randomIndex);
    document.getElementById('wordInput').value = ""; // Reset wordInput field
    document.getElementById('result').innerHTML = ""; // Reset result field
    speak(images[randomIndex].split('.')[0]); // Speak the word
}

function playAudio(file) {
    const audio = new Audio(file);
    audio.play();
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

function checkSpelling() {
    const imageElement = document.getElementById('image');
    const index = imageElement.getAttribute('data-index'); // Get the index of the displayed image
    const correctSpelling = images[index].split('.')[0]; // Get the correct spelling from the image name
    const userSpelling = document.getElementById('wordInput').value.trim().toLowerCase();
    const result = document.getElementById('result');

    if (userSpelling === correctSpelling) {
        result.innerHTML = "&#10004; Correct!"; // Tick mark
        result.style.color = "green";
        playAudio('correct.mp3');
    } else {
        //result.innerHTML = "&#10060; Incorrect! The correct spelling is \"" + correctSpelling + "\""; // Cross mark
        result.innerHTML = "&#10060; Incorrect! <a href='#' onclick='retryImage(" + index + ")'>Try again</a>";
        result.style.color = "red";
        playAudio('incorrect.mp3');
    }
}

function retryImage(index) {
    displayImage(index);
    speak(images[index].split('.')[0]);
    document.getElementById('wordInput').value = ""; // Reset wordInput field
    document.getElementById('result').innerHTML = ""; // Reset result field
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('wordInput').setAttribute('autocomplete', 'off');
    displayRandomImage(); // Display a random image when the page loads
});
