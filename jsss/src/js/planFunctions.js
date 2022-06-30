const creatingPanelSaveBtn = document.querySelector(".creating-panel__save-plan-btn");
const creatingPanelTitle= creatingPanel.querySelector(".creating-panel__title input");
const creatingPanelCheckbox= creatingPanel.querySelector(".creating-panel__public-plan--checkbox");
const creatingPanelDescription= creatingPanel.querySelector("textarea");

const myPlansCardContainer= document.querySelector(".my-plans__card-container");
const myPlansCratePlanBtn= document.querySelector(".my-plans__crate-plan-btn");


const showPlan = document.querySelector(".show-plan");
const showSet = document.querySelector(".show-set");
const showSetCloseBtn = document.querySelector(".show-set__close-btn");
const showPlanCloseBtn = document.querySelector(".show-plan__close-btn");
const showPlanAddBtn = document.querySelector(".show-plan__add-btn");

const displayPlanPreviousBtn = document.querySelector(".display-plan__previous-btn");
const displayPlanNextBtn = document.querySelector(".display-plan__next-btn");

let displayedPlan;
let wholeDisplayedPlan;
let displayedExerciseNumber = 0;
let allPlans = [];
let currentFillPlan;
let planHistory =[[],[]];

myPlansCratePlanBtn.addEventListener("click" , ()=>{
    switchDisplay(creatingPanel,"grid");
});
showPlanCloseBtn.addEventListener("click" , ()=>{
    exit.click();
});
showSetCloseBtn.addEventListener("click" , ()=>{
    exit.click();
});

//poprzednio wyswietlane zadanie
displayPlanPreviousBtn.addEventListener("click" , ()=>{
    if(displayedExerciseNumber != 0){
        displayedExerciseNumber-=1;
        dispalyTask();
        deleteUnnecessaryDiv();
    }
});

//następne zadanie
displayPlanNextBtn.addEventListener("click" , ()=>{
    if(displayedExerciseNumber < (displayedPlan.length - 1)){
        displayedExerciseNumber+=1;
        dispalyTask();
        deleteUnnecessaryDiv();
    }else if(displayedExerciseNumber == displayedPlan.length ){
        let lengthRecentPanel =recentPanel.length ;
        for(let i = 0 ; i < lengthRecentPanel ; i++){
            exit.click();
        }
        displayedExerciseNumber = 0;
        planHistory[0].push(wholeDisplayedPlan);
        const date = new Date();
        if(workoutHistory.indexOf((date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear())) != -1){
            workoutHistory.push((date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear()));
        }
        saveOnDBHistory();
        console.log("tak tak");
    }else{
        stopTimer();
        displayedExerciseNumber+=1;
        displayPlan.querySelector(".display-plan__show-exercise--title").textContent = "DOBRA ROBOTA😎";
        displayPlan.querySelector(".display-plan__show-exercise--details").style.display = "none";

        displayPlan.querySelector(".display-plan__show-exercise--description").innerHTML = "Ukończyłęś swój 1 trening zają ci on <br>"+timer;
        displayPlan.querySelector(".display-plan__progress-bar--title").textContent = wholeDisplayedPlan.title+ ` 100%`;
        displayPlan.querySelector(".display-plan__progress-bar--fill").style.width = `calc(100% - 1.5rem)`;
        displayPlanNextBtn.textContent ="ZAKOŃCZ TRENING";
    }
    
});


creatingPanelSaveBtn.addEventListener("click" , ()=>{
    let title =creatingPanelTitle.value;
    creatingPanelTitle.value= "";
    if(title !=""){
        if (myPlansCardContainer.querySelector(".empty")){
            myPlansCardContainer.innerHTML = ""; 
        }
        let public =creatingPanelCheckbox.checked
        let description =creatingPanelDescription.value;
        creatingPanelDescription.value = "";
        div = cardTemp.content.firstElementChild.cloneNode(true);
        div.querySelector(".card__description--title").textContent = title;
        div.querySelector(".card__description--text").textContent = description;
        let newEl = new plan (title,description,div,public ,takeOrder(planContainer , "all"));
        myPlansCardContainer.appendChild(newEl.div);
        let lengthRecentPanel =recentPanel.length ;
        for(let i = 0 ; i < lengthRecentPanel ; i++){
            exit.click();
        }
        takeOrder(planContainer , "all").forEach(el =>{
            el.div.remove();
        });
        // sendJson(allPlans ,"plans");
        // exit.click();
    }else{
        errorMessage("dodaj nazwe planu");
    }
});

//rozbija serie na pojedyncze ćwiczenia
const setToExercise = (array)=>{
    flatArray =[];
    array.forEach(el =>{
        if (el.elements){
            flatArray = [...flatArray, ...el.elements];
        }else{
            flatArray.push(el);
        }
    });
    return flatArray;
};

//usuwa niepotrzebne elementy
const deleteUnnecessaryDiv = ()=>{
    displayPlanNextBtn.textContent ="Następne";
    if(!displayedPlan[displayedExerciseNumber].repetitions){
        displayPlan.querySelector(".repetitions").style.display = "none";
    }else{
        displayPlan.querySelector(".repetitions").style.display = "block";
    }
    if(!displayedPlan[displayedExerciseNumber].weight){
        displayPlan.querySelector(".weight").style.display = "none";
    }else{
        displayPlan.querySelector(".weight").style.display = "block";
    }
    if (!displayedPlan[displayedExerciseNumber].weight || !displayedPlan[displayedExerciseNumber].repetitions){
        displayPlan.querySelector(".line").style.display = "none";
    }else{
        displayPlan.querySelector(".line").style.display = "block";
    }
    displayPlan.querySelector(".display-plan__show-exercise--details").style.display = "flex";
};

//wyswietlanie zadan
const dispalyTask = ()=>{
    let planPercentages = Math.round((displayedExerciseNumber / (displayedPlan.length )) *100);

    displayPlan.querySelector(".display-plan__show-exercise--title").textContent = displayedPlan[displayedExerciseNumber].title;
    displayPlan.querySelector(".repetitions .value").textContent = displayedPlan[displayedExerciseNumber].repetitions +" razy";
    displayPlan.querySelector(".weight .value").textContent = displayedPlan[displayedExerciseNumber].weight +" kg";
    displayPlan.querySelector(".display-plan__show-exercise--description").textContent = displayedPlan[displayedExerciseNumber].description;
    displayPlan.querySelector(".display-plan__progress-bar--title").textContent = wholeDisplayedPlan.title+ ` ${planPercentages}%`;
    displayPlan.querySelector(".display-plan__progress-bar--fill").style.width = `calc(${planPercentages}% - 1.5rem)`;
    let nextExercise =(displayedExerciseNumber+1) < displayedPlan.length ? displayedPlan[displayedExerciseNumber+1].title : "";
    displayPlan.querySelector(".display-plan__next-exercise").textContent  =nextExercise!="" ? `następne ćwiczenie: ${nextExercise}`:"";
    
};

class plan {
        constructor(title , description , div , publicPlan , elements,myPlan=true,allPlan = true)
        {
            this.title = title;
            this.description = description;
            this.div = div;
            this.public = publicPlan;
            this.elements = elements;
            this.myPlan = myPlan;
            if(allPlan){
                allPlans.push(this);
            }
            this.eventListener()
        }
        eventListener(){
            this.div.querySelector(".card__action--select-plan").addEventListener("click" , ()=>{
                console.log("zaczynamy trening");
                switchDisplay(displayPlan,"block");
                displayedExerciseNumber = 0;
                displayedPlan = setToExercise(this.elements);
                wholeDisplayedPlan= this;
                dispalyTask();
                deleteUnnecessaryDiv();
                resetTimer();
                startTimer();
            });
            this.div.querySelector(".card__action--show-details").addEventListener("click" , ()=>{
                console.log("pokaż detale");
                currentFillPlan = this;
                switchDisplay(showPlan,"block");

                showPlan.querySelector(".show-plan__title").textContent = this.title;
                showPlan.querySelector(".show-plan__description").textContent = this.description;
                showPlan.querySelector(".plan__container").innerHTML = "";
                this.elements.forEach(el => {
                    console.log(el);
                    let copy = el.div.cloneNode(true)
                    showPlan.querySelector(".plan__container").appendChild(copy);
                    copy.setAttribute("draggable", "fasle");
                    if (el.elements){
                        copy.addEventListener("click", ()=>{
                            switchDisplay(showSet,"grid");
                            el.elements.forEach(el =>{
                                showSet.querySelector(".plan__container").innerHTML = "";
                                const div = exerciseTemp.content.firstElementChild.cloneNode(true);
                                div.querySelector(".plan__exercise--name").textContent = el.title;
                                div.querySelector(".plan__exercise--repat").textContent = el.repetitions+ "razy";
                                div.querySelector(".plan__exercise--weight").textContent = el.weight+ "KG";
                                showSet.querySelector(".plan__container").appendChild(div);
                            });
                            console.log(el.elements);
                        });

                        copy.querySelector(".plan__set--btn").addEventListener("click" , ()=>{
                            console.log(el.elements);
                        });
                        copy.querySelector(".plan__set--btn").textContent = "Sprawdz ćwiczenia w seri";
                        console.log(el.elements);
                    }
                });
                
            });
        }
}


let DBPlans;
// getJson("plans").then((valueFromDB)=>{
//     console.log(valueFromDB);
//     DBPlans = Object(valueFromDB);
//     CreatePlanFromDB();
// }).then(()=>{
//     if(allPlans.length == 0){
//         const div = emptyTemp.content.firstElementChild.cloneNode(true);
//         div.querySelector(".empty__title").textContent = "Nie stworzyłeś jeszcze żadnego planu treningowego";
//         myPlansCardContainer.appendChild(div);
//     }
// });
// const renderLeftExercise = ()=>{

// };

//tworzenie planów na podstwie informacji z bazy danych
const CreatePlanFromDB =()=>{
    let list =[];
    if (DBPlans[0] == undefined){
        //wystwetli ze nie ma ostatniej aktywnosci
    }
    
    DBPlans.forEach(onePlan =>{
        let newPlan ;
        div = cardTemp.content.firstElementChild.cloneNode(true);
        div.querySelector(".card__description--title").textContent = onePlan.title;
        div.querySelector(".card__description--text").textContent = onePlan.description;
        newPlan= new plan(onePlan.title,onePlan.description,div ,onePlan.publicPlan,onePlan.elements,onePlan.myPlan);
        newPlan.elements= [];
        myPlansCardContainer.appendChild(newPlan.div);
        onePlan.elements.forEach(el =>{
            let newElement ;
            if (el.elements){  
                const div = setTemp.content.firstElementChild.cloneNode(true);
                div.querySelector(".plan__set--name").textContent = el.title;
                el = new set(el.title,el.elements,div);
                el.elements.forEach(el =>{
                    const div = selectElementTemp.content.firstElementChild.cloneNode(true);
                    div.querySelector(".select-container__element--name").textContent = el.title;
                    el = new exercise(el.title,div ,el.description,el.weight,el.repetitions,el.set );
                });
                newElement = el;
            }else{
                const div = exerciseTemp.content.firstElementChild.cloneNode(true);
                div.querySelector(".plan__exercise--name").textContent = el.title;
                div.querySelector(".plan__exercise--repat").textContent = el.repetitions+ "razy";
                div.querySelector(".plan__exercise--weight").textContent = el.weight+ "KG";
                el = new exercise(el.title,div ,el.description,el.weight,el.repetitions,el.set );
                newElement = el;
                
            }
            
            newPlan.elements.push(newElement)
        });
    onePlan = newPlan;
    list.push(newPlan);

    });
    console.log(list);
};

//zapisywanie histori
const saveOnDBHistory = ()=>{
    let newList =[];
    if (planHistory[0].length > 3){
        newList.push(planHistory[0][-1]);
        newList.push(planHistory[0][-2]);
        newList.push(planHistory[0][-3]);
        planHistory[0] =  newList;
    }
   
   console.log(planHistory);
    // sendJson(planHistory, "history");
};
