let timer ="";

let hr = 0;
let min = 0;
let sec = 0;
let stoptime = true;

function startTimer() {
  if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
    if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }
    let hrString ,minString;
    if (hr == 0){
        hrString ="";
    }else{
        hrString = hr >1 ? "godziny": "godzine";
    }
    if (min == 0){
        minString ="";
    }else{
        minString = min >4 ? "minut": "minuty";
    }
    

    timer = hrString!="" && minString!= "" ?hrString +" i "+ minString :hrString +" "+ minString;
    console.log(timer,min,sec);
    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
    timer = '0';
}