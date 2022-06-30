let recentTitle ;
let recentElement ;
let afterInParentElement;
let currentParent ;
let CopyElement;
let afterElement;
let insideValue;
let recentParent = creatingPanelSelectContainer;
[creatingPanelSelectContainer , planContainer].forEach(el =>{
    el.addEventListener("dragover", e =>{
        currentParent = el;
        e.preventDefault();

        if (recentParent.className ==creatingPanelSelectContainer.className && currentParent.className == "plan__container"){
            CopyElement = document.querySelector(".dragging").cloneNode(true);
        }
        
        const dragedElement = document.querySelector(".dragging");  
        recentElement= dragedElement;

        afterElement = changePosition( el , e.clientY);
        recentTitle = dragedElement.querySelector(".select-container__element--name") || dragedElement.querySelector(".plan__exercise--name");
        
        if(recentParent.className != "plan__container" || recentParent.className == "plan__container" && el.className == "plan__container"){
            if (afterElement.element  == null){
                el.appendChild(dragedElement);
                
            }else{
                el.insertBefore(dragedElement,afterElement.element);
            }
            
        }
        if (currentParent == recentParent && currentParent.className ==creatingPanelSelectContainer.className){
            afterInParentElement= afterElement;
        }
    });
});
const changePosition = (container , y) =>{
    let draggAbleEl;
    if(container.className == "plan__container"){
        draggAbleEl = [...planContainer.querySelectorAll(".plan__exercise:not(.dragging)")];
    }else{
        draggAbleEl = [...container.querySelectorAll(".select-container__element:not(.dragging)")];
    }
    
    return draggAbleEl.reduce((closest , child ) =>{
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset){
            return {offset: offset , element :child}
        } else {
            return closest
        }
    },{offset: Number.NEGATIVE_INFINITY} );
    // console.log(container,y);
};

planContainer.addEventListener("dragend" , ()=>{
    if(recentParent.className ==creatingPanelSelectContainer.className){
        if (afterInParentElement.element  == null){
            
            creatingPanelSelectContainer.appendChild(CopyElement);
        }else{
            creatingPanelSelectContainer.insertBefore(CopyElement,afterInParentElement.element);
        }
        CopyElement.classList.remove("dragging");
        appendNewElement(creatingPanelSelectContainer,".select-container__element");
    }
    recentElement.remove();
    newElement = exerciseTemp.content.cloneNode(true);
    newElement.querySelector(".plan__exercise--name").textContent =recentTitle.textContent;
    if (currentParent ==creatingPanelSelectContainer && recentParent==planContainer){

    }else{
        if (afterElement.element  == null){
            planContainer.appendChild(newElement);
            
        }else{
            planContainer.insertBefore(newElement,afterElement.element);
        }
        
    }
   
    appendNewElement(planContainer,".plan__exercise");
    
});

const appendNewElement = (container, className) =>{
    const elements = container.querySelectorAll(className);
        elements.forEach(el => {
            el.addEventListener("dragstart", () => {
                el.classList.add("dragging");
                recentParent = container;
            });
            el.addEventListener("click" , ()=>{
                switchDisplay(exerciseEditPanel,"grid");
                console.log(insideValue);
            });
        
            el.addEventListener("dragend", () => {
                el.classList.remove("dragging");
                insideValue = this;
            });
        });
};

// zrob zeby mozna było przeciagnać z jednego do drugiego ale na odwrót juz nie
// 

creatingPanelSelectContainer.addEventListener("dragend" , ()=>{
    if(recentParent.className != planContainer.className){
        recentElement.remove();
        newElement = selectElementTemp.content.cloneNode(true);
        newElement.querySelector(".select-container__element--name").textContent = recentTitle.textContent;
      
        if (afterElement.element  == null){
            creatingPanelSelectContainer.appendChild(newElement);
            
        }else{
            creatingPanelSelectContainer.insertBefore(newElement,afterElement.element);
        }
        appendNewElement(creatingPanelSelectContainer,".select-container__element");
    }
});