let recentParent = creatingPanelSelectContainer;
let currentParent ,afterInParentElement;
currentParent = creatingPanelSelectContainer;
let afterElement ;
//wszystkie kontenery w których jest drag&drop
[creatingPanelSelectContainer , planContainer ,setEditPanelContainer, setEditSelectContainer].forEach(el =>{
    el.addEventListener("dragover", e =>{
        currentParent = el;
        e.preventDefault();
        const dragedElement = document.querySelector(".dragging");
        if(dragedElement){
            if (currentParent == creatingPanelSelectContainer && recentParent ==planContainer || currentParent == setEditSelectContainer && recentParent == setEditPanelContainer){
            }else{
                afterElement = changePosition( el , e.clientY);
                if (afterElement.element  == null){
                    el.appendChild(dragedElement);
                }else{
                    el.insertBefore(dragedElement,afterElement.element);
                }
                if (currentParent == recentParent && currentParent==creatingPanelSelectContainer ||currentParent==setEditSelectContainer){
                    afterInParentElement= afterElement;
                }
            }
        }
        
    });
});

//wykrywanie elementu nad myszką
const changePosition = (container , y) =>{
    let draggAbleEl;
    if(container ===planContainer || container === setEditPanelContainer){
        draggAbleEl = [...container.querySelectorAll(".plan__exercise:not(.dragging)"),...container.querySelectorAll(".plan__set:not(.dragging)")];
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
//dodawanie elementu w odpowienim miejscu
const appendNewElement = (that,set) =>{
    if(set){
        if (afterInParentElement.element  == null){
            setEditSelectContainer.appendChild(that.div);
        }else{
            console.log(setEditSelectContainer.insertBefore(that.div,afterInParentElement.element));
        }
    }else{
        if (afterInParentElement.element  == null){
            creatingPanelSelectContainer.appendChild(that.div);
        }else{
            console.log(creatingPanelSelectContainer.insertBefore(that.div,afterInParentElement.element));
        }
    }
    let newLeftList = [];
    if(that.elements){
        console.log("duppaa");
        allSets.forEach(el =>{
            if(el.parent == creatingPanelSelectContainer && el.div.className == "select-container__element"){
                newLeftList.push(el);
            }
        });
        allOnLeftSets = newLeftList;
    }else{
        allExercise.forEach(el =>{
            if(el.parent == creatingPanelSelectContainer){
                newLeftList.push(el);
            }
        });
        allOnLeftExercise = newLeftList;
    }
  

    
    // console.log(that.div,allExercise[allExercise.indexOf(that)].div);
};