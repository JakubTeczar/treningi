const data = document.querySelector(".data");
let dataInputs = data.querySelectorAll(".measurement__input-box--input");
let dataInputsText = data.querySelectorAll(".measurement__input-box--text");
const dataInputBtnContainerBody = data.querySelector(".data__input__btn-container--body");
const dataInputBtnContainerWeight = data.querySelector(".data__input__btn-container--weight");
let bodyLabel = ["Klatka piersiowa" , "Biceps" ,"Przedramię" ,"Nadgarstek" , "Kark" , "Talia" , "Biodra" , "Uda" ,"Łydka"];
let weigthLabel = ["Wyciskanie na klatę" ,"Przysiad ze sztangą","Wyciskanie żołnierskie" , "Martwy ciąg", "Biceps hantlami","Podciąganie na drążku" , "Pompki" ,"Przysiady" ,"Brzuszki"];
let mode = "body";

dataInputBtnContainerBody.addEventListener("click" , () =>{
    mode ="body";
    dataInputBtnContainerBody.classList.add("chosen");
    dataInputBtnContainerWeight.classList.remove("chosen");
    changeMeasure();
    fillDataInputs();
});

dataInputBtnContainerWeight.addEventListener("click" , () =>{
    mode ="weight";
    dataInputBtnContainerWeight.classList.add("chosen");
    dataInputBtnContainerBody.classList.remove("chosen");
    changeMeasure();
    fillDataInputs();
});

dataInputs.forEach(el =>{
    el.addEventListener("change" , ()=>{
        changeMeasure();
    });
});

const changeMeasure = () =>{
    let couter = 0;
    dataInputs.forEach(el =>{
        if(mode == "body"){
            let text ="";
            for (let i = 0; i < el.value.length; i++) {
                if(Number(el.value[i]) || Number(el.value[i])==0){
                    text += String(el.value[i]);
                }
              }
            el.value =text+'cm';
        }else{
            let text ="";
            for (let i = 0; i < el.value.length; i++) {
                if(Number(el.value[i]) || Number(el.value[i])==0){
                    text += String(el.value[i]);
                }
              }
            if(couter > 4){
                el.value =text+'razy';
            }else{
                el.value =text+'kg';
            }
       
        
        }
        couter+=1;
    });
};

const fillDataInputs = ()=>{
    let label ;
    if(mode == "body"){
        label= bodyLabel;
    }else{
        label= weigthLabel;
    }
    let couter = 0;
    label.forEach(title =>{
        dataInputsText[couter].textContent = title;
        console.log(title , dataInputsText[couter].textContent);
        couter+=1;  
    });
   
}