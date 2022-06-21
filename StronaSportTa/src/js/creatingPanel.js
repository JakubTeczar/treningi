const creatingPanel = document.querySelector(".creating-panel");
const exerciseAddPanel = document.querySelector(".exercise-add-panel");
const exerciseEditPanel = document.querySelector(".exercise-edit-panel");
const setEditPanel = document.querySelector(".set-edit-panel");
const selectPlan = document.querySelector(".select-plan");
const displayPlan = document.querySelector(".display-plan");
const CratePlanBtn = document.querySelector(".select-plan__crate-plan-btn");
const creatingPanelAddExercise = document.querySelector(".creating-panel__add-btn");
const creatingPanelSelectContainer = document.querySelector(".creating-panel__select-container");
const planContainer = document.querySelector(".plan__container");

const exerciseAddBtn = document.querySelector(".exercise-add-panel__add-btn");
const errorDiv = document.querySelector(".error");


const exit = document.querySelector(".exit");
const confirmChooseDiv = document.querySelector(".confirm-choose");

// templates
const selectElementTemp = document.querySelector(".select-element-temp");
const cardTemp = document.querySelector(".card-temp");
const exerciseTemp = document.querySelector(".exercise-temp");
const setTemp = document.querySelector(".set-temp");

const mainStartTrainingBtn = document.querySelector(".main__start-training-btn");


let recentPanel = [];
let cuurentPanel, timeOutId;
let zIndex = 20;
let allExercise = [];


const switchDisplay = (element , display) =>{
    element.style.display = display;
    element.style.zIndex = String(zIndex);
    zIndex+=1;
    exit.style.display = "block";
    recentPanel.push(element);
};

const errorMessage = (text) =>{
    if(timeOutId){
        clearTimeout(timeOutId);
    }
    errorDiv.querySelector(".error__message").textContent = text ;
    errorDiv.classList.add("erron-animation");
    timeOutId = setTimeout(() => {
        errorDiv.classList.remove("erron-animation");
    }, 2500);
};

mainStartTrainingBtn.addEventListener("click" , () =>{
    switchDisplay(selectPlan,"grid");
});

exit.addEventListener("click" , () =>{
    recentPanel.pop().style.display = "none";
    zIndex -= 1;
    if (zIndex == 20){
        exit.style.display ="none";
    }
});

CratePlanBtn.addEventListener("click" , () =>{
    switchDisplay(creatingPanel,"grid");
});

creatingPanelAddExercise.addEventListener("click" , () =>{
    switchDisplay(exerciseAddPanel,"grid");
});

exerciseAddBtn.addEventListener("click" , () =>{
    let title =exerciseAddPanel.querySelector("input").value;
    let description =exerciseAddPanel.querySelector("textarea").value;
    // let weight =exerciseAddPanel.querySelector(".exercise-add-panel__weight input").value;
    // let repetitions =exerciseAddPanel.querySelector(".exercise-add-panel__repetitions input").value;
    if(title){
        const el = selectElementTemp.content.cloneNode(true);
        el.querySelector(".select-container__element--name").textContent = title;
        creatingPanelSelectContainer.appendChild(el);
        let newExercise = new exercise(title,description );
        allExercise.push(newExercise);
        

        const elements = creatingPanelSelectContainer.querySelectorAll(".select-container__element");
        console.log(elements);
        elements.forEach(el => {
            el.addEventListener("dragstart", () => {
                el.classList.add("dragging");
                recentParent = creatingPanelSelectContainer;
            });
            el.addEventListener("click" , ()=>{
                switchDisplay(exerciseEditPanel,"grid");
            });
        
            el.addEventListener("dragend", () => {
                el.classList.remove("dragging");
        
            });
        });
        exit.click();
    }else{
        errorMessage("dodaj nazwę ćwiczenia");
    }
});
class exercise{
    constructor(title , description ="",weight =0,repetitions =0){
        this.title = title;
        this.description = description;
        this.weight = weight;
        this.repetitions = repetitions;
    }
};


mainStartTrainingBtn.click();
CratePlanBtn.click();