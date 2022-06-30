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
const exerciseEditPanelDeleteBtn = document.querySelector(".exercise-edit-panel__delete-btn");
const exerciseEditPanelSaveBtn = document.querySelector(".exercise-edit-panel__save-btn");
const creatingPanelSwitchTypeSet = document.querySelector(".creating-panel__switch-type--set");
const creatingPanelSwitchTypeExercise= document.querySelector(".creating-panel__switch-type--exercise");
const errorDiv = document.querySelector(".error");

//panel edytowania seri
const setEditPanelSaveBtn = document.querySelector(".set-edit-panel__save-btn");
const setEditPanelDeleteBtn = document.querySelector(".set-edit-panel__delete-btn");
const setEditPanelContainer = setEditPanel.querySelector(".set-edit-panel__plan .plan__container")
const setEditSelectContainer = setEditPanel.querySelector(".select-container");



const exit = document.querySelector(".exit");
const confirmChooseDiv = document.querySelector(".confirm-choose");

// templates
const selectElementTemp = document.querySelector(".select-element-temp");
const cardTemp = document.querySelector(".card-temp");
const exerciseTemp = document.querySelector(".exercise-temp");
const setTemp = document.querySelector(".set-temp");

const mainStartTrainingBtn = document.querySelector(".main__start-training-btn");
const selectPanCardContainer = document.querySelector(".select-plan__card-container");

let recentPanel = [];
let cuurentPanel, timeOutId;
let zIndex = 20;
let allExercise = [];
let allOnLeftExercise = [];
let allDBLeftExercise = [];
let allSets = [];
let allOnLeftSets = [];
let allDBLeftSets = [];
let currentExercise;
let currentSet;
let currentType =exerciseAddPanel;
let saveOrAdd ="add";

/////////  ogólne funkcje  \\\\\\\\\\\

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
// ustalanie kolejnosci (ćwiczeń , serji) w podanym divie
const takeOrder = (container,type)=>{
    let list = [];
    let elements;
    type = (type =="exercise") ? allExercise : [...allExercise,...allSets];

   if (container == creatingPanelSelectContainer){
    elements = creatingPanelSelectContainer.querySelectorAll(".select-container__element");
   }else if(container == planContainer){
    elements = planContainer.querySelectorAll(".plan__exercise");
    if (type !=allExercise){
        elements= planContainer.querySelectorAll(".plan__set , .plan__exercise");
    }
    ///to jeszcze trzeba złączyć z serjami 
   }else if(container == setEditPanelContainer){
    elements = setEditPanelContainer.querySelectorAll(".plan__exercise");
   }else if(container == setEditSelectContainer){
    elements = setEditSelectContainer.querySelectorAll(".select-container__element");
   }
    elements.forEach(div => {
        type.forEach(el=>{
            if (el.div == div){
                list.push(el);
            }
        })  
    });
    return list;
}
/////////  wszystkie addEventlitery   \\\\\\\\\\\

//zaczęcie treningu (otwarcie wyboru planków treningowych)
mainStartTrainingBtn.addEventListener("click" , () =>{
    switchDisplay(selectPlan,"grid");
    selectPanCardContainer.innerHTML = "";
    allPlans.forEach(el =>{
        selectPanCardContainer.appendChild(el.div) ;
    });

});

//wyjscie z obecnego panelu 
// .querySelector(".cross")
exit.addEventListener("click" , () =>{
    recentEl = recentPanel.pop();
    recentEl.style.display = "none";
    zIndex -= 1;
    if (zIndex == 20){
        exit.style.display ="none";
        allPlans.forEach(el =>{
            myPlansCardContainer.appendChild(el.div) ;
        });
        // planHistory[0].forEach(el =>{
        //     informationCardContainer.appendChild(el.div) ;
        // });
        
    }
    if(setEditPanel == recentEl){
        allOnLeftExercise = takeOrder(setEditSelectContainer,"exercise");
    }
    if(recentEl == setEditPanel && currentType == exerciseAddPanel){
        allOnLeftExercise.forEach(el=>{
            
            creatingPanelSelectContainer.appendChild(el.div);
            el.parent = creatingPanelSelectContainer;
        });
    }
});

//tworzenie planu treningowego
CratePlanBtn.addEventListener("click" , () =>{
    switchDisplay(creatingPanel,"grid");
});
//otwieranie panelu do dodawania cwiczen
creatingPanelAddExercise.addEventListener("click" , () =>{
    switchDisplay(currentType,"grid");
    setEditPanel.querySelector("input").value = "";
    saveOrAdd ="add";
    setEditPanelContainer.querySelectorAll(".plan__exercise").forEach(el =>{
        el.remove();
    });
    // allSets
});

//zmiana na widok dostępnych seri
creatingPanelSwitchTypeSet.addEventListener("click" , () =>{
    allOnLeftExercise = takeOrder(creatingPanelSelectContainer , "exercise");
    allOnLeftExercise.forEach(e =>{

        setEditSelectContainer.appendChild(e.div);
        e.parent = setEditSelectContainer;

    });
    allOnLeftSets.forEach(el=>{
        creatingPanelSelectContainer.appendChild(el.div);
    });
    currentType =setEditPanel;
    creatingPanelAddExercise.textContent = "DODAJ SERIE";
    creatingPanelSwitchTypeExercise.classList.remove("selected");
    creatingPanelSwitchTypeSet.classList.add("selected");
    // switchDisplay(setEditPanel,"grid");
});
//dodawanie seri
setEditPanelSaveBtn.addEventListener("click" , () =>{
    let title = setEditPanel.querySelector("input").value;
    if(saveOrAdd =="add"){
        if(title == ""){
            errorMessage("dodaj nazwę seri");
        }else{
            const div = selectElementTemp.content.firstElementChild.cloneNode(true);
            div.style.background = "#26B5C5";
            div.querySelector(".select-container__element--name").textContent = title;
            setEditPanel.querySelector("input").value = "";
            creatingPanelSelectContainer.appendChild(div);
        
            let newEl = new set(title,takeOrder(setEditPanelContainer,"exercise"),div);
            allOnLeftSets.push(newEl);
            exit.click();  
            setEditPanelContainer.querySelectorAll(".plan__exercise").forEach(el =>{
                el.remove();
            });
        }
    }else{
        if(currentSet.parent == planContainer){
            currentSet.div.querySelector(".plan__set--name").textContent = title;
            currentSet.elements = takeOrder(setEditPanelContainer,"exercise");
        }else{
            currentSet.div.querySelector(".select-container__element--name").textContent = title;
            currentSet.elements = takeOrder(setEditPanelContainer,"exercise");
        }
        exit.click();  
    }
   
    
});
//zmiana na widok dostępnch ćwiczeń
creatingPanelSwitchTypeExercise.addEventListener("click" , () =>{
    creatingPanelAddExercise.textContent = "DODAJ Ćwiczenie";
    currentType =exerciseAddPanel;
    creatingPanelSwitchTypeSet.classList.remove("selected");
    creatingPanelSwitchTypeExercise.classList.add("selected");

    let currentElements = creatingPanelSelectContainer.querySelectorAll(".select-container__element");
    allOnLeftSets.forEach(el =>{
        el.div.remove();
    });
    allOnLeftExercise.forEach(el=>{
        let add =false;
        currentElements.forEach(div =>{
            if(el.div ==div){

            }else{
                add =true;
            }
        });
        if(add || Boolean(currentElements.length) == false ){
            creatingPanelSelectContainer.appendChild(el.div);
            el.parent = creatingPanelSelectContainer;
        }
    });
  
});

//edytowanie pojedynczego ćwiczenia
exerciseEditPanelSaveBtn.addEventListener("click" , ()=>{
    currentExercise.title =exerciseEditPanel.querySelector("input").value;
    currentExercise.description = exerciseEditPanel.querySelector("textarea").value;
    currentExercise.weight = exerciseEditPanel.querySelector(".exercise-edit-panel__weight input").value;
    currentExercise.repetitions = exerciseEditPanel.querySelector(".exercise-edit-panel__repetitions input").value;

    if(currentParent ==creatingPanelSelectContainer){
        currentExercise.div.querySelector(".select-container__element--name").textContent = currentExercise.title;
    }else{
        currentExercise.div.querySelector(".plan__exercise--name").textContent =currentExercise.title;
        currentExercise.div.querySelector(".plan__exercise--repat").textContent = currentExercise.repetitions == "" ? '0razy' :`${currentExercise.repetitions}razy`;
        currentExercise.div.querySelector(".plan__exercise--weight").textContent =currentExercise.weight == "" ? '0kg' :`${currentExercise.weight}kg`;
    }
  

    exit.click();
});

//usuwanie seri
setEditPanelDeleteBtn.addEventListener("click" , ()=>{
    if (allSets.indexOf(currentSet) != -1){
        allSets.splice(allSets.indexOf(currentSet), 1);
        if (allOnLeftSets.indexOf(currentSet) != -1){
            allOnLeftSets.splice(allOnLeftSets.indexOf(currentSet), 1);
            currentSet.div.remove();
        }
        currentSet.div.remove();
    }
 
    exit.click();
});
//usuwanie ćwiczenia
exerciseEditPanelDeleteBtn.addEventListener("click" , ()=>{
    if (allExercise.indexOf(currentExercise) != -1){
        allExercise.splice(allExercise.indexOf(currentExercise), 1);
        if (allOnLeftExercise.indexOf(currentExercise) != -1){
            allOnLeftExercise.splice(allOnLeftExercise.indexOf(currentExercise), 1);
            currentExercise.div.remove();
        }
        currentExercise.div.remove();
    }
    exit.click();
});

// dodawanie cwiczenia
exerciseAddBtn.addEventListener("click" , () =>{
    let title =exerciseAddPanel.querySelector("input").value;
    let description =exerciseAddPanel.querySelector("textarea").value;
    let weight =exerciseAddPanel.querySelector(".exercise-add-panel__weight input").value;
    let repetitions =exerciseAddPanel.querySelector(".exercise-add-panel__repetitions input").value;
    if(title){
        const el = selectElementTemp.content.firstElementChild.cloneNode(true);
        el.querySelector(".select-container__element--name").textContent = title;
        creatingPanelSelectContainer.appendChild(el);

        let newElement = new exercise(title,el,description,weight,repetitions );
        allOnLeftExercise.push(newElement);
        exit.click();
        exerciseAddPanel.querySelector("input").value ="";
        exerciseAddPanel.querySelector("textarea").value ="";
        exerciseAddPanel.querySelector(".exercise-add-panel__weight input").value ="";
        exerciseAddPanel.querySelector(".exercise-add-panel__repetitions input").value ="";
    }else{
        errorMessage("dodaj nazwę ćwiczenia");
    }
});

/////////////  klasa ćwiczenia  \\\\\\\\\\\\\\

class exercise{
    constructor(title , div, description ="",weight =0,repetitions =0,set = false){
        this.title = title;
        this.description = description;
        this.weight = weight;
        this.repetitions = repetitions;
        this.div = div;
        this.parent = set ? setEditSelectContainer :creatingPanelSelectContainer ;
        this.set = set
        this.eventListener();
        if(!set){
            allExercise.push(this);
            // console.log("dodaje" , this);
        }
    }
    changeDesign(){
    
        if (currentParent ==planContainer || currentParent ==setEditPanelContainer){

            this.div.remove();
            let newElement = exerciseTemp.content.firstElementChild.cloneNode(true);
            newElement.querySelector(".plan__exercise--name").textContent =this.title;
            newElement.querySelector(".plan__exercise--repat").textContent = this.repetitions == "" ? '0razy' :`${this.repetitions}razy`;
            newElement.querySelector(".plan__exercise--weight").textContent =this.weight == "" ? '0kg' :`${this.weight}kg`;
            if (afterElement.element  == null){

                if(currentParent ==planContainer){
                    planContainer.appendChild(newElement);
                }else{
                    setEditPanelContainer.appendChild(newElement);
                }
               
            }else{
                if(currentParent ==planContainer){
                    planContainer.insertBefore(newElement,afterElement.element);
                }else{
                    setEditPanelContainer.insertBefore(newElement,afterElement.element);
                }
            }
            this.div = newElement;
            this.eventListener();
            console.log(newElement);
        }
      
    };
    eventListener(){
        this.div.addEventListener("click" , ()=>{
            ///dodaj this.parent żeby dodać do do tworzenia ez
            switchDisplay(exerciseEditPanel,"grid");
            currentExercise= this;
            this.editExercise();
            console.log(this);
            console.log("dodaje");
        });

        this.div.addEventListener("dragstart", () => {
            this.div.classList.add("dragging");
            recentParent = this.div.parentElement;
        });

        this.div.addEventListener("dragend", () => {
            this.div.classList.remove("dragging");
            if (recentParent == creatingPanelSelectContainer && currentParent ==planContainer){
                let cloneDiv = this.div.cloneNode(true);
                let clone = new exercise (this.title,cloneDiv,this.description,this.weight,this.repetitions);
                this.parent = planContainer;
                appendNewElement(clone);
            }

            if (recentParent == setEditSelectContainer && currentParent ==setEditPanelContainer){
                let cloneDiv = this.div.cloneNode(true);
                let clone = new exercise (this.title,cloneDiv,this.description,this.weight,this.repetitions);
                this.parent = setEditPanelContainer;
                appendNewElement(clone,true);
            }
            if(currentParent!=recentParent){
                this.changeDesign();
      
            }
            
        });
    };
   
    editExercise(){
        exerciseEditPanel.querySelector("input").value =this.title;
        exerciseEditPanel.querySelector("textarea").value =this.description;
        exerciseEditPanel.querySelector(".exercise-edit-panel__weight input").value =this.weight;
        exerciseEditPanel.querySelector(".exercise-edit-panel__repetitions input").value = this.repetitions;
      
    };
    
    
  
};
class set{
    constructor(title , elements , div,DB=false){
        this.title = title;
        this.elements = elements;
        this.div = div;
        this.DB = DB;
        this.parent = creatingPanelSelectContainer;
        allSets.push(this);
        this.eventListener()
    }
    eventListener(){
        this.div.addEventListener("click" , ()=>{
            this.editSet();
            switchDisplay(setEditPanel,"grid");
            currentSet= this;
           saveOrAdd = "save";
        });

        this.div.addEventListener("dragstart", () => {
            this.div.classList.add("dragging");
            recentParent = this.div.parentElement;
        });

        this.div.addEventListener("dragend", () => {
            this.div.classList.remove("dragging");
            if (recentParent == creatingPanelSelectContainer && currentParent ==planContainer){
                let cloneDiv = this.div.cloneNode(true);
                let clone = new set (this.title,this.elements ,cloneDiv);
                this.parent = planContainer;
                appendNewElement(clone);
            }

            if(currentParent!=recentParent){
                this.changeDesign();
          
            }
            
        });
    };
    editSet(){

        setEditPanel.querySelector("input").value =this.title;
        setEditPanelContainer.innerHTML = "";
        allOnLeftExercise.forEach(e =>{
            setEditSelectContainer.appendChild(e.div);
            e.parent = setEditSelectContainer;
        });

        this.elements.forEach(el => {
            setEditPanelContainer.appendChild(el.div);
        });
    };

    changeDesign(){
        
        if (currentParent ==planContainer || currentParent ==setEditPanelContainer){

            this.div.remove();
            let newElement =  setTemp.content.firstElementChild.cloneNode(true);
            newElement.querySelector(".plan__set--name").textContent =this.title;

            if (afterElement.element  == null){

                if(currentParent ==planContainer){
                    planContainer.appendChild(newElement);
                }else{
                    setEditPanelContainer.appendChild(newElement);
                }
               
            }else{
                if(currentParent ==planContainer){
                    planContainer.insertBefore(newElement,afterElement.element);
                }else{
                    setEditPanelContainer.insertBefore(newElement,afterElement.element);
                }
            }
            this.div = newElement;
            this.eventListener();
        }
      
    };

};
/////////////    \\\\\\\\\\\\\\
// mainStartTrainingBtn.click();
// CratePlanBtn.click();