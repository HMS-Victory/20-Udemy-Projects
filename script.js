const inputContainer=document.getElementById('input-container');
const countdownForm=document.getElementById('countdown-form');
const dateEl=document.getElementById('date-picker');

const countdownEl=document.getElementById('countdown');
const countdownElTitle=document.getElementById('countdown-title');
const countdownBtn=document.getElementById('countdown-button');
const timeElements=document.querySelectorAll('span');

const completeEl=document.getElementById('complete');
const completElInfo=document.getElementById('complete-info');
const completeBtn=document.getElementById('complete-button');

let countdownTitle='';
let countdowndate='';
let countdownValue= Date;
let countdownActive;
let savedCountdown;

const second=1000;
const minute=second*60;
const hour=minute*60;
const day=hour*24;

//Set Date input
const today=new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

//Populate Countdown/Complete UI
function updateDOM() {
    countdownActive =setInterval(()=> {
    const now=new Date().getTime();
    const distance=countdownValue-now;

    const days=Math.floor(distance/day);
    const hours=Math.floor((distance % day)/hour);
    const minutes=Math.floor((distance % hour)/minute);
    const seconds=Math.floor((distance % minute)/second);

    //Hide Input
    inputContainer.hidden=true; 

    //If the countdown has ended, show complete
    if(distance<0) {
        countdownEl.hidden=true;
        clearInterval(countdownActive);
        completElInfo.textContent=`${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden=false;
    }else {
        //Else, show the countdown in progress
        countdownElTitle.textContent=`${countdownTitle}`;
        timeElements[0].textContent=`${days}`;
        timeElements[1].textContent=`${hours}`;
        timeElements[2].textContent=`${minutes}`;
        timeElements[3].textContent=`${seconds}`;
        completeEl.hidden=true;
        countdownEl.hidden=false;
    }
}, second);
}

//Take Values from Form Input
function updateCountdown(e) {
    //Check for valid date
    e.preventDefault();
    countdownTitle=e.srcElement[0].value;
    countdownDate=e.srcElement[1].value;
    savedCountdown={
        title: countdownTitle,
        date: countdownDate,
    };
    console.log(savedCountdown)
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    if (countdownDate==='') {
        alert('pleaseSelect a date for the countdown.');
    }else {

        // Get number version of current Date updateDOM
        countdownValue=new Date(countdownDate).getTime();
        ('countdown value:', countdownValue)
        updateDOM();
    }
}

//Reset All Values
function reset() {
    //Hide Countdowns, show input
    countdownEl.hidden=true;
    completeEl.hidden=true;
    inputContainer.hidden=false;
    //Stop the Countdown
    clearInterval(countdownActive);
    //Reset Values
    countdownTitle='';
    countdownDate='';
}

function restorePreviousCountdown() {
    //Get Countdown for local storage if available
    if (localStorage.getItem('countdown')){
        inputContainer.hidden=true;
        countdownEl.hidden=false;
        savedCountdown=JSON.parse(localStorage.getItem('countdown'));
        countdownTitle=savedCountdown.title;
        countdownDate=savedCountdown.date;
        countdownValue=new Date(countdownDate).getTime();
        updateDOM();
    }
}

countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

//On Load check local storage
restorePreviousCountdown();

//No matter what when making a website, make constants for all of the HTML elements you plan on working with.
//This will make your code much simpler.

/*When fixing an error, it Is not always about spelling the variables
 Always check the path from which you are recieving data Here,
  when we tried to getItem, we spelled savedCountdown wrong-
  This was a problem because it was throwing errors about 'title' and 'date'
   which are keys inside the object 'savedCountdown'.
    So really the errors were'nt about spelling. 
    So if you are certain the spelling is correct, than go straight along and
     check its paths.*/