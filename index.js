const countDown = document.querySelector(".countdown");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const sessionTime = document.getElementById("session_time");
const breakTime = document.getElementById("break_time");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const b_plus = document.getElementById("b_plus");
const b_minus = document.getElementById("b_minus");
const reset = document.getElementById('reset');
const counter = document.getElementById("counter");


let initialSession = 20;
let initialBreak = 5;
let count = 1;

let minutes;
let seconds;
let intervalId;
let time = initialSession * 60;;
let time2 = initialBreak * 60;

VanillaTilt.init(document.querySelector(".container"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.04
});

window.onload = function() {
    sessionTime.innerText = initialSession + "min";
    breakTime.innerText = initialBreak + "min";
    countDown.innerText = initialSession + ':' + "00";
    counter.innerText = "Session" + count;
}

plus.addEventListener('click', function() {
    if (initialSession < 60)
        initialSession++;
    sessionTime.innerText = initialSession + "min";
    time = initialSession * 60;
});

minus.addEventListener('click', function() {
    if (initialSession > 1)
        initialSession--;
    sessionTime.innerText = initialSession + "min";
    time = initialSession * 60;
});

b_plus.addEventListener('click', function() {
    if (initialBreak < 20)
        initialBreak++;
    breakTime.innerText = initialBreak + "min";
    time2 = initialBreak * 60;
});

b_minus.addEventListener('click', function() {
    if (initialBreak > 1)
        initialBreak--;
    breakTime.innerText = initialBreak + "min";
    time2 = initialBreak * 60;
});



start.addEventListener('click', startTimer);


function startTimer() {

    intervalId = setInterval(function() {
        if (time >= 0) {
            minutes = Math.floor(time / 60);
            seconds = time % 60;

            seconds = seconds < 10 ? '0' + seconds : seconds;
            countDown.innerText = `${minutes}:${seconds}`;
            time--;
        } else if (time2 >= 0) {
            minutes = Math.floor(time2 / 60);
            seconds = time2 % 60;

            seconds = seconds < 10 ? '0' + seconds : seconds;
            countDown.innerText = `${minutes}:${seconds}`;
            time2--;
            counter.innerText = "Break";
        } else if (time == -1 && time2 == -1) {
            time = initialSession * 60;
            time2 = initialBreak * 60;
            count++;
            counter.innerText = "Session" + count;
        }

    }, 1000);


    plus.disabled = true;
    minus.disabled = true;
    b_plus.disabled = true;
    b_minus.disabled = true;
    start.style.display = "none";
    pause.style.display = "block";

}

pause.addEventListener('click', function() {
    clearInterval(intervalId);
    pause.style.display = "none";
    start.style.display = "block";
});




reset.addEventListener('click', function() {
    countDown.innerHTML = initialSession + ":" + "00";
    clearInterval(intervalId);
    plus.disabled = false;
    minus.disabled = false;
    b_plus.disabled = false;
    b_minus.disabled = false;
    start.style.display = "block";
    pause.style.display = "none";
    time = initialSession * 60;
    time2 = initialBreak * 60;
    count = 1;
    counter.innerText = "Session" + count;
});
