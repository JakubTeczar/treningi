const calendar = document.querySelector(".calendar");
let monthDifference = 0;
const start = Date.now();
const previousMonth = document.querySelector(".calendar-switch-month__arrow");
const nextMonth = document.querySelector(".calendar-switch-month__arrow:last-child");
const displayYearAndMonth = document.querySelector(".calendar-switch-month__name");

previousMonth.addEventListener('click' ,function (){
    monthDifference = monthDifference -1;
    PlanHowToRenderCal();
});
nextMonth.addEventListener('click' ,function (){
    monthDifference = monthDifference +1;
    PlanHowToRenderCal();
});

const PlanHowToRenderCal = () => {
    calendar.innerHTML = '';
    let today = new Date ();
    today = new Date (today.getFullYear() ,today.getMonth()+ monthDifference ,1);

    const mounthName = new Intl.DateTimeFormat("pl-US", { month:"long"}).format(today); 
    displayYearAndMonth.textContent =mounthName+" "+today.getFullYear() ;

    let lastDayCurrentMonth = lastDay(today.getYear(),today.getMonth());
    let firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    let lastDayFirstMounth;
    if(today.getMonth() == 0){
        lastDayFirstMounth = lastDay(today.getYear()-1,today.getMonth()+11);
    }else{
        lastDayFirstMounth = lastDay(today.getYear(),today.getMonth()-1);
    }
    let lastDayOfWeek = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDay();
    let howMuchToAddFirst = 0;
    let howMuchToAddEnd = 0;
    if(firstDayOfWeek != 0){
        howMuchToAddFirst =firstDayOfWeek -1;
    }else{
        howMuchToAddFirst =6;
    }
    if(lastDayOfWeek != 0){
        howMuchToAddEnd =7-lastDayOfWeek;
    }else{
        howMuchToAddEnd = 0;
    }


    calendaryRender(howMuchToAddFirst,lastDayFirstMounth,false);
    calendaryRender(lastDayCurrentMonth,firstDayOfWeek,true);
    calendaryRender(howMuchToAddEnd,0,true,true);
    let allDays =document.querySelectorAll(".calendar__day");

    // if ( allDays.length != 42){
    //     calendaryRender(7,0,true,true);
    // }

    allDays.forEach(element =>
        element.addEventListener('click' ,function (){
           console.log("dziala");
        })
    );
  
}


let lastDay = function(y,m){
    return new Date(y, m +1, 0).getDate();
}

const calendaryRender = (howMuch,start,visibilityDays,endMounth=false) => {
   
    const today = new Date ();
    if(visibilityDays==false ){
        for(let day = start-howMuch+1; day <= start ; day++){
            calendar.insertAdjacentHTML("beforeend",`<div class="calendar__day hidden"></div>`);
        }
    }else{
        for(let day = 1; day <= howMuch; day++){
            let date = new Date (today.getFullYear(),today.getMonth()+ monthDifference,day);
            if(today.getDate() == date.getDate() && today.getMonth() == date.getMonth()  && today.getYear() == date.getYear() ){
                
                calendar.insertAdjacentHTML("beforeend",`<div class="calendar__day today"> </div>`);

            }else if(endMounth == false ){
                calendar.insertAdjacentHTML("beforeend",`<div class="calendar__day"></div>`);
            
            }else{
                calendar.insertAdjacentHTML("beforeend",`<div class="calendar__day hidden" ></div>`);
            }
          
        }
    }

};
PlanHowToRenderCal();