function incrementNumber() {
    const numberInput = document.getElementById('numberInput');
    let number = parseInt(numberInput.value) || 0;
    if (number < 999) {
        number++;
        numberInput.value = number;
        convertNumberToWords();
    }
}

function convertNumberToWords() {
    const number = document.getElementById('numberInput').value;
    const result = document.getElementById('result');
    result.textContent = numberToWords(number);
}

function numberToWords(num) {
    if (num === "") return "Please enter a number";
    if (num < 0 || num > 999) return "Number out of range";

    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const hundreds = ["", "One Hundred", "Two Hundred", "Three Hundred", "Four Hundred", "Five Hundred", "Six Hundred", "Seven Hundred", "Eight Hundred", "Nine Hundred"];

    let word = "";

    if (num == 0) {
        return "Zero";
    }

    if (num > 99) {
        word += hundreds[Math.floor(num / 100)] + " ";
        num %= 100;
    }

    if (num > 10 && num < 20) {
        word += teens[num - 11] + " ";
    } else {
        word += tens[Math.floor(num / 10)] + " ";
        word += ones[num % 10] + " ";
    }

    return word.trim();
}

function checkWord() {
    console.log("checkWord function called"); // Debug log
    const number = document.getElementById('numberDisplay').textContent;
    const wordInput = document.getElementById('wordInput').value.trim();
    const correctWord = numberToWords(number).toUpperCase();
    const checkResult = document.getElementById('checkResult');

    if (wordInput.toUpperCase() === correctWord) {
        checkResult.innerHTML = "&#10004; Correct!"; // Tick mark
        checkResult.style.color = "green";
        playAudio('correct.mp3');
    } else {
        //checkResult.innerHTML = "&#10060; Incorrect! The correct spelling is <br>\"" + correctWord + "\""; // Cross mark
        checkResult.innerHTML = "&#10060; Incorrect! <a href='#' onclick='speak(" + number + ")'>Try again</a>";
        checkResult.style.color = "red";
        playAudio('incorrect.mp3');
    }
}

function toggleWordInput() {
    const numberDisplay = document.getElementById('numberDisplay').textContent;
    const wordInput = document.getElementById('wordInput');
    console.log("Number display value:", numberDisplay); // Debug log
    wordInput.disabled = numberDisplay === "";
    console.log("Word input disabled:", wordInput.disabled); // Debug log
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

function playAudio(file) {
    const audio = new Audio(file);
    audio.play();
}

function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 30);
    document.getElementById('numberDisplay').textContent = randomNumber;
    document.getElementById('wordInput').value = ""; // Reset wordInput field
    document.getElementById('checkResult').innerHTML = ""; // Reset checkResult field
    document.getElementById('numberDisplay').setAttribute('title', numberToWords(randomNumber).toUpperCase()); // Set the title attribute to the number in words
    toggleWordInput();
    speak(randomNumber.toString()); // Speak the generated number
}

document.addEventListener('DOMContentLoaded', (event) => {
    generateRandomNumber();
});
