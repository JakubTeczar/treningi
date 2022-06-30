const data = document.querySelector(".data");
let dataInputs = data.querySelectorAll(".measurement__input-box--input");
let dataInputsText = data.querySelectorAll(".measurement__input-box--text");
const dataInputBtnContainerBody = data.querySelector(".data__input__btn-container--body");
const dataInputBtnContainerWeight = data.querySelector(".data__input__btn-container--weight");
const dataSaveBtn = data.querySelector(".data__save-btn");

let currentDataInput ={
    label: [],
    value :[]
};
currentDataInupTitle ="";

let bodyLabel = ["Klatka piersiowa" , "Biceps" ,"Przedramię" ,"Nadgarstek" , "Kark" , "Talia" , "Biodra" , "Uda" ,"Łydka"];
let weigthLabel = ["Wyciskanie na klatę" ,"Przysiad ze sztangą","Wyciskanie żołnierskie" , "Martwy ciąg", "Biceps hantlami","Podciąganie na drążku" , "Pompki" ,"Przysiady" ,"Brzuszki"];
let mode = "body";

let measurement ={};
let measurementOld;

// getJson("measurement").then((valueFromDB)=>{
//     measurement = Object.assign({}, valueFromDB);
//     measurementOld = Object.assign({}, valueFromDB);
// }).then(()=>{
//     if(measurement.bodyValue){
//     fillDataInputs();
//     }else{
//         measurement.bodyValue =[];
//         measurement.weigthValue =[];
//         measurementOld.bodyValue =[];
//         measurementOld.weigthValue =[];
//         measurement.history = [];
//     }
//     changeMeasure();
//     dataInputsText[0].click();
// });

//zapisywanie pomiarów ciała
dataSaveBtn.addEventListener("click" , () =>{
    saveValueInputs();
    if (JSON.stringify(measurement) != JSON.stringify(measurementOld)){
        let now = new Date();
        let date = now.getDate() +"."+(Number(now.getMonth())+1)+"."+now.getFullYear();
        if(measurement.history){
            measurement.history.push([date,measurement.bodyValue ,measurement.weigthValue]);
        }else{
            measurement.history = [[date,measurement.bodyValue ,measurement.weigthValue]];
        }
        console.log(measurement);
        // sendJson(measurement, "measurement");
                            
        measurementOld = Object.assign({}, measurement);
    }
   

});

//zpisywanie pomiarów ciała
dataInputBtnContainerBody.addEventListener("click" , () =>{
    dataInputBtnContainerBody.classList.add("chosen");
    dataInputBtnContainerWeight.classList.remove("chosen");
    
    saveValueInputs();
    mode ="body";
    fillDataInputs();
    changeMeasure();
    changeLabels();
   
});

//zpisywanie maxów 
dataInputBtnContainerWeight.addEventListener("click" , () =>{
    dataInputBtnContainerWeight.classList.add("chosen");
    dataInputBtnContainerBody.classList.remove("chosen");
    
    saveValueInputs();
    mode ="weight";
    fillDataInputs();
    changeMeasure();
    changeLabels();   
  
});

dataInputs.forEach(el =>{
    el.addEventListener("change" , ()=>{
        changeMeasure();
    });
});

dataInputsText.forEach((el , index) =>{
  
    el.addEventListener("click",()=>{
        console.log(index);
        currentDataInput.label =[];
        currentDataInput.value =[];
        for (let i = 0; i < measurement.history.length; i++) {
        
            if(mode == "body"){
                currentDataInput.label.push(measurement.history[i][0] );
                currentDataInput.value.push(measurement.history[i][1][index] );

            }else{
                currentDataInput.label.push(measurement.history[i][0] );
                currentDataInput.value.push(measurement.history[i][2][index] );
            }
            
        }
        if(myChart){
            myChart.destroy();
        }
        currentDataInupTitle = el.textContent;
        drawChart();
        console.log(currentDataInput ,currentDataInupTitle);
    });

});

//zmiana jednostki na odpowidnią np kg na cm 
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

//wypełnianie inputów od pomiaru
const fillDataInputs = ()=>{
    let couter= 0;
    dataInputs.forEach(el =>{
        if(mode == "body"){
            el.value = measurement.bodyValue[couter];
        }else{
            el.value = measurement.weigthValue[couter];
        }
        couter+=1;
    });
   
}
//zmiana na odpowiednie nagłówki
const changeLabels = ()=>{
    let label ;
    if(mode == "body"){
        label= bodyLabel;
    }else{
        label= weigthLabel;
    }
    let couter = 0;
    label.forEach(title =>{
        dataInputsText[couter].textContent = title;
        couter+=1;  
    });
   
}

//zapisywanie pomiarów
const saveValueInputs = ()=>{
    let newBodyValue = [];
    let newWeightValue = [];
    dataInputs.forEach(el =>{
        if(mode == "body"){
            let text ="";
            for (let i = 0; i < el.value.length; i++) {
                if(Number(el.value[i]) || Number(el.value[i])==0){
                    text += String(el.value[i]);
                }
              }
            newBodyValue.push(text);
        }else{
            let text ="";
            for (let i = 0; i < el.value.length; i++) {
                if(Number(el.value[i]) || Number(el.value[i])==0){
                    text += String(el.value[i]);
                }
              }

            newWeightValue.push(text);
        }
    });
    if(mode == "body"){
        measurement.bodyValue = newBodyValue;
    }else{
        measurement.weigthValue = newWeightValue;
    }
   
   
}
