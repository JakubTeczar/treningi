const informationCardContainer = document.querySelector(".information__card-container");
const emptyTemp = document.querySelector(".empty-temp");

const calendar = document.querySelector(".calendar");
let monthDifference = 0;
const start = Date.now();
const previousMonth = document.querySelector(".calendar-switch-month__arrow");
const nextMonth = document.querySelector(".calendar-switch-month__arrow:last-child");
const displayYearAndMonth = document.querySelector(".calendar-switch-month__name");
const showDay = document.querySelector(".show-day");
const showDayYesBtn = document.querySelector(".show-day__yes-btn");
const showDayNoBtn = document.querySelector(".show-day__no-btn");
let workoutHistory =[];
let currentDay = '';
let currentDayDiv;
//poprzedni miesiąc
previousMonth.addEventListener('click' ,function (){
    monthDifference = monthDifference -1;
    PlanHowToRenderCal();
});
//następny miesiąc
nextMonth.addEventListener('click' ,function (){
    monthDifference = monthDifference +1;
    PlanHowToRenderCal();
});

//zatwierdź dzień treningu
showDayYesBtn.addEventListener('click' ,function (){
    //sprawdzanie czy juz nie ma 
    if(workoutHistory.indexOf(currentDay) == -1){
        workoutHistory.push(currentDay);
    }
    currentDayDiv.classList.add("workoutDay");
    exit.click();
    planHistory[1] =workoutHistory;
    saveOnDBHistory();
});

//nie dzień treningowy
showDayNoBtn.addEventListener('click' ,function (){
    let deleteDay = false;
    if(workoutHistory.indexOf(currentDay) !=-1){
        deleteDay=true;
    }
    let newList =[];
    workoutHistory.forEach(el =>{
        if(el == currentDay && deleteDay){
            
        }else{
            newList.push(el);
        }
    });
    workoutHistory = newList;
    currentDayDiv.classList.remove("workoutDay");
    exit.click();
    planHistory[1] =workoutHistory;
    saveOnDBHistory();
});

//jak wygenerować kalendarz
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
    calendaryRender(howMuchToAddEnd,0,false,true);
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

//generowanie kalendarza
const calendaryRender = (howMuch,start,visibilityDays,endMounth=false) => {
   
    const today = new Date ();
    if(visibilityDays==false ){
        for(let day = start-howMuch+1; day <= start ; day++){
            calendar.insertAdjacentHTML("beforeend",`<div class="calendar__day hidden"></div>`);
        }
    }else{
        for(let day = 1; day <= howMuch; day++){
            let date = new Date (today.getFullYear(),today.getMonth()+ monthDifference,day);
            let newDiv = document.createElement("div");
            if(today.getDate() == date.getDate() && today.getMonth() == date.getMonth()  && today.getYear() == date.getYear() ){
                newDiv.className = "calendar__day today";
               
            }else if(endMounth == false ){
                // calendar.insertAdjacentHTML("beforeend",`<div class="calendar__day"></div>`);
                newDiv.className = "calendar__day";
            }else{
                // calendar.insertAdjacentHTML("beforeend",`<div class="calendar__day hidden" ></div>`);
                newDiv.className = "calendar__day hidden";
            }
            newDiv.addEventListener("click",()=>{
                switchDisplay(showDay,"block");
                showDay.querySelector(".show-day__date").textContent = date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
                currentDay =date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
                currentDayDiv = newDiv;
            }); 
            if(workoutHistory.indexOf((date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear())) !=-1){
                newDiv.classList.add("workoutDay");
            }
            calendar.appendChild(newDiv);  
            
          
        }
    }

};

PlanHowToRenderCal(); 
// getJson("history").then((valueFromDB)=>{
//     if(valueFromDB[1] == undefined){
//         workoutHistory =[];
//         planHistory =  [[],[]];
//     }else{
//         workoutHistory =valueFromDB[1];
//         planHistory =  valueFromDB;
//     }
   
 
// }).then(()=>{
//     PlanHowToRenderCal(); 
//     let newList = [];
//     planHistory[0].forEach(onePlan =>{
//         let newPlan ;
//         div = cardTemp.content.firstElementChild.cloneNode(true);
//         div.querySelector(".card__description--title").textContent = onePlan.title;
//         div.querySelector(".card__description--text").textContent = onePlan.description;
//         newPlan= new plan(onePlan.title,onePlan.description,div ,onePlan.publicPlan,onePlan.elements,onePlan.myPlan ,false) ;
//         newPlan.elements= [];
//         informationCardContainer.appendChild(newPlan.div);
//         onePlan.elements.forEach(el =>{
//             let newElement ;
//             if (el.elements){  
//                 const div = setTemp.content.firstElementChild.cloneNode(true);
//                 div.querySelector(".plan__set--name").textContent = el.title;
//                 el = new set(el.title,el.elements,div);
//                 el.elements.forEach(el =>{
//                     const div = selectElementTemp.content.firstElementChild.cloneNode(true);
//                     div.querySelector(".select-container__element--name").textContent = el.title;
//                     el = new exercise(el.title,div ,el.description,el.weight,el.repetitions,el.set );
//                 });
//                 newElement = el;
//             }else{
//                 const div = exerciseTemp.content.firstElementChild.cloneNode(true);
//                 div.querySelector(".plan__exercise--name").textContent = el.title;
//                 div.querySelector(".plan__exercise--repat").textContent = el.repetitions+ "razy";
//                 div.querySelector(".plan__exercise--weight").textContent = el.weight+ "KG";
//                 el = new exercise( el.title,div ,el.description,el.weight,el.repetitions,el.set );
//                 newElement = el;
                
//             }
            
//             newPlan.elements.push(newElement)
//         });
//     onePlan = newPlan;
//     newList.push(newPlan);
//     });
//     if(!informationCardContainer.querySelector("div")){
//         const div = emptyTemp.content.firstElementChild.cloneNode(true);
//         div.querySelector(".empty__title").textContent = "Nie zarejstrowano aktywności";
//         informationCardContainer.appendChild(div);
//     }
//     planHistory[0] = newList;
// }); 