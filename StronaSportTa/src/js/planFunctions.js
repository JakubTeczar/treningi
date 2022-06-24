const creatingPanelSaveBtn = document.querySelector(".creating-panel__save-plan-btn");
const creatingPanelTitle= creatingPanel.querySelector(".creating-panel__title input");
const creatingPanelCheckbox= creatingPanel.querySelector(".creating-panel__public-plan--checkbox");
const creatingPanelDescription= creatingPanel.querySelector("textarea");

const myPlansCardContainer= document.querySelector(".my-plans__card-container");


let allPlans = [];



creatingPanelSaveBtn.addEventListener("click" , ()=>{
    let title =creatingPanelTitle.value;

    if(title !=""){
        let public =creatingPanelCheckbox.checked
        let description =creatingPanelDescription.value;
        div = cardTemp.content.firstElementChild.cloneNode(true);
    
        
        let newEl = new plan (title,description,div,public ,takeOrder(planContainer , "all"));
        myPlansCardContainer.appendChild(newEl.div);
        exit.click();
        exit.click();
    }else{
        errorMessage("dodaj nazwe planu");
    }
});

class plan {
        constructor(title , description , div , publicPlan , elements)
        {
            this.title = title;
            this.description = description;
            this.div = div;
            this.public = publicPlan;
            this.elements = elements;
            allPlans.push(this);
            this.eventListener()
        }
        eventListener(){
            this.div.querySelector(".card__action--select-plan").addEventListener("click" , ()=>{
                console.log("zaczynamy trening");
            });
            this.div.querySelector(".card__action--show-details").addEventListener("click" , ()=>{
                console.log("pokaż detale");
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

