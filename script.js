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
    const number = document.getElementById('numberInput').value;
    const wordInput = document.getElementById('wordInput').value.trim();
    const correctWord = numberToWords(number).toUpperCase();
    const checkResult = document.getElementById('checkResult');

    if (wordInput.toUpperCase() === correctWord) {
        checkResult.textContent = "Correct!";
        checkResult.style.color = "green";
        playAudio('correct.mp3');
    } else {
        checkResult.textContent = `Incorrect! The correct spelling is "${correctWord}"`;
        checkResult.style.color = "red";
        playAudio('incorrect.mp3');
    }
}

function toggleWordInput() {
    const numberInput = document.getElementById('numberInput').value;
    const wordInput = document.getElementById('wordInput');
    console.log("Number input value:", numberInput); // Debug log
    wordInput.disabled = numberInput === "";
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

// Attach event listener to number input
document.getElementById('numberInput').addEventListener('input', toggleWordInput);

// Call toggleWordInput on page load
document.addEventListener('DOMContentLoaded', toggleWordInput);