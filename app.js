window.addEventListener('load', init);

let inputDOM =document.querySelector('#input');
let timeleftDOM =document.querySelector('#time-left');
let secDOM =document.querySelector('#sec');
let scoreDOM =document.querySelector('#score');
let wordDOM =document.querySelector('#givingWord');
let messageDOM =document.querySelector('#message');
let levelBtnDOM = document.querySelector('#level');

//levels
const levels = {
    easy:5,
    medium:3,
    hard:2
}

let  currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

const words = [
    'background',
    'width',
   'developer',
   'height',
   'javascript',
   'angular',
   'transform',
   'designer',
   'container',
   'bootstrap'
];


//local storage
myStorage = window.localStorage;
myStorage.setItem('words',JSON.stringify(words));


function init() {
    messageDOM.innerHTML = '';
    secDOM.innerHTML = currentLevel;
    levelBtnDOM.addEventListener("change",changeLevel);
    //get word from array
    //showWord(words);
    showWord(JSON.parse(localStorage.getItem("words")));
    //start matching words
    inputDOM.addEventListener('input', startMatch);
    //set timer for time and check if playing
    setInterval(countDown, 1000);
    setInterval(checkIsPlaying, 50);
}


function showWord(words){
    const randemIndex = Math.floor(Math.random() * words.length);
    wordDOM.innerHTML = words[randemIndex];
}

function countDown(){
    if(time > 0){
        time--;
    }else if(time === 0){
        isPlaying = false;
    }

    timeleftDOM.innerHTML = time;
}

function checkIsPlaying() {
    if(!isPlaying  && time ===0 ){
        messageDOM.innerHTML = 'Game Over!!!'
        score = -1;

    }
}


function startMatch() {
    if(matchWord()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
    }

    if(score === -1){
        scoreDOM.innerHTML = 0;
    }else{
        scoreDOM.innerHTML = score;
    }
}


function matchWord() {
    if(inputDOM.value === wordDOM.innerHTML){
        inputDOM.value = '';
        score++;
        scoreDOM.innerHTML = score;
        messageDOM.innerHTML = 'Correct !!!!';
        return true
    } else {
        messageDOM.innerHTML = '';
        return false
    }
};

function changeLevel(){
    if(levelBtnDOM.value == 'easy') {
        currentLevel = levels.easy;
    }else if(levelBtnDOM.value == 'medium') {
        currentLevel = levels.medium;
    }else {
        currentLevel = levels.hard;
    }
}
