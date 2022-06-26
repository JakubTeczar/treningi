const creatingPanelSaveBtn = document.querySelector(".creating-panel__save-plan-btn");
const creatingPanelTitle= creatingPanel.querySelector(".creating-panel__title input");
const creatingPanelCheckbox= creatingPanel.querySelector(".creating-panel__public-plan--checkbox");
const creatingPanelDescription= creatingPanel.querySelector("textarea");

const myPlansCardContainer= document.querySelector(".my-plans__card-container");
const myPlansCratePlanBtn= document.querySelector(".my-plans__crate-plan-btn");


const showPlan = document.querySelector(".show-plan");
const showPlanCloseBtn = document.querySelector(".show-plan__close-btn");
const showPlanAddBtn = document.querySelector(".show-plan__add-btn");

const displayPlanPreviousBtn = document.querySelector(".display-plan__previous-btn");
const displayPlanNextBtn = document.querySelector(".display-plan__next-btn");

let displayedPlan;
let displayedPlanName;
let displayedExerciseNumber = 0;
let allPlans = [];

myPlansCratePlanBtn.addEventListener("click" , ()=>{
    switchDisplay(creatingPanel,"grid");
});
showPlanCloseBtn.addEventListener("click" , ()=>{
    exit.click();
});
showPlanAddBtn.addEventListener("click" , ()=>{
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
    }else{
        stopTimer();
        displayedExerciseNumber+=1;
        displayPlan.querySelector(".display-plan__show-exercise--title").textContent = "DOBRA ROBOTA😎";
        displayPlan.querySelector(".display-plan__show-exercise--details").style.display = "none";

        displayPlan.querySelector(".display-plan__show-exercise--description").innerHTML = "Ukończyłęś swój 1 trening zają ci on <br>"+timer;
        displayPlan.querySelector(".display-plan__progress-bar--title").textContent = displayedPlanName+ ` 100%`;
        displayPlan.querySelector(".display-plan__progress-bar--fill").style.width = `calc(100% - 1.5rem)`;
        displayPlanNextBtn.textContent ="ZAKOŃCZ TRENING";
    }
    
});


creatingPanelSaveBtn.addEventListener("click" , ()=>{
    let title =creatingPanelTitle.value;

    if(title !=""){
        let public =creatingPanelCheckbox.checked
        let description =creatingPanelDescription.value;
        div = cardTemp.content.firstElementChild.cloneNode(true);
        div.querySelector(".card__description--title").textContent = title;
        div.querySelector(".card__description--text").textContent = creatingPanelDescription.value;
        let newEl = new plan (title,description,div,public ,takeOrder(planContainer , "all"));
        myPlansCardContainer.appendChild(newEl.div);
        let lengthRecentPanel =recentPanel.length ;
        for(let i = 0 ; i < lengthRecentPanel ; i++){
            exit.click();
        }
      
        // exit.click();
    }else{
        errorMessage("dodaj nazwe planu");
    }
});

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

const dispalyTask = ()=>{
    let planPercentages = Math.round((displayedExerciseNumber / (displayedPlan.length )) *100);

    displayPlan.querySelector(".display-plan__show-exercise--title").textContent = displayedPlan[displayedExerciseNumber].title;
    displayPlan.querySelector(".repetitions .value").textContent = displayedPlan[displayedExerciseNumber].repetitions +" razy";
    displayPlan.querySelector(".weight .value").textContent = displayedPlan[displayedExerciseNumber].weight +" kg";
    displayPlan.querySelector(".display-plan__show-exercise--description").textContent = displayedPlan[displayedExerciseNumber].description;
    displayPlan.querySelector(".display-plan__progress-bar--title").textContent = displayedPlanName+ ` ${planPercentages}%`;
    displayPlan.querySelector(".display-plan__progress-bar--fill").style.width = `calc(${planPercentages}% - 1.5rem)`;
    let nextExercise =(displayedExerciseNumber+1) < displayedPlan.length ? displayedPlan[displayedExerciseNumber+1].title : "";
    displayPlan.querySelector(".display-plan__next-exercise").textContent  =nextExercise!="" ? `następne ćwiczenie: ${nextExercise}`:"";
    
};
class plan {
        constructor(title , description , div , publicPlan , elements,myPlan=true)
        {
            this.title = title;
            this.description = description;
            this.div = div;
            this.public = publicPlan;
            this.elements = elements;
            this.myPlan = myPlan;
            allPlans.push(this);
            this.eventListener()
        }
        eventListener(){
            this.div.querySelector(".card__action--select-plan").addEventListener("click" , ()=>{
                console.log("zaczynamy trening");
                switchDisplay(displayPlan,"block");
                displayedExerciseNumber = 0;
                displayedPlan = setToExercise(this.elements);
                displayedPlanName= this.title;
                dispalyTask();
                deleteUnnecessaryDiv();
                resetTimer();
                startTimer();
            });
            this.div.querySelector(".card__action--show-details").addEventListener("click" , ()=>{
                console.log("pokaż detale");
                switchDisplay(showPlan,"block");
                showPlan.querySelector(".show-plan__title").value = this.title;
                showPlan.querySelector(".show-plan__description").value = this.description;
                showPlan.querySelector(".plan__container").innerHTML = "";
                this.elements.forEach(el => {
                    console.log(el);
                    let copy = el.div.cloneNode(true)
                    showPlan.querySelector(".plan__container").appendChild(copy);
                    copy.setAttribute("draggable", "fasle");
                });
                
            });
        }
}



























let div = cardTemp.content.firstElementChild.cloneNode(true);
div.querySelector(".card__description--title").textContent = "test";
div.querySelector(".card__description--text").textContent = "taki tam trening no wlasnie taki";
let newElnew =new plan ("test","taki tam trening no wlasnie taki",div,"false" ,[
    {
        "title": "pompki",
        "description": "",
        "weight": "",
        "repetitions": "15",
        "div": {},
        "parent": {},
        "set": false
    },
    {
        "title": "nogi",
        "elements": [
            {
                "title": "przysiady",
                "description": "przysiady razem z hantlami",
                "weight": "10",
                "repetitions": "15",
                "div": {},
                "parent": {},
                "set": false
            },
            {
                "title": "wykroki",
                "description": "4 kg w każdej ręce",
                "weight": "4",
                "repetitions": "15",
                "div": {},
                "parent": {},
                "set": false
            },
            {
                "title": "przysiady",
                "description": "przysiady razem z hantlami",
                "weight": "10",
                "repetitions": "15",
                "div": {},
                "parent": {},
                "set": false
            },
            {
                "title": "wykroki",
                "description": "4 kg w każdej ręce",
                "weight": "4",
                "repetitions": "15",
                "div": {},
                "parent": {},
                "set": false
            }
        ],
        "div": {},
        "parent": {}
    },
    {
        "title": "pompki",
        "description": "",
        "weight": "",
        "repetitions": "15",
        "div": {},
        "parent": {},
        "set": false
    },
    {
        "title": "wyciskanie sztangi",
        "description": "",
        "weight": "45",
        "repetitions": "14",
        "div": {},
        "parent": {},
        "set": false
    },
    {
        "title": "wyciskanie sztangi",
        "description": "",
        "weight": "50",
        "repetitions": "12",
        "div": {},
        "parent": {},
        "set": false
    },
    {
        "title": "pompki",
        "description": "","weight": "","repetitions": "15","div": {},"parent": {},"set": false},{"title": "wyciskanie sztangi","description": "","weight": "70","repetitions": "4","div": {},"parent": {},"set": false}]);
myPlansCardContainer.appendChild(newElnew.div);

