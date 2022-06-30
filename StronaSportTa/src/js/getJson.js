//pobieranie informacji z serwera
const getJson  = (type) =>{
    return new Promise((resolve , reject)=>{
        const xhr = new XMLHttpRequest();
        if(type == "plans"){
            xhr.open("POST" , "php/get/getPlans.php");
        }else if (type == "measurement"){
            xhr.open("POST" , "php/get/getMeasurement.php");
        }else if (type == "exercise"){
            xhr.open("POST" , "php/get/getExercise.php");
        }else if (type == "history"){
            xhr.open("POST" , "php/get/getHistory.php");
        }
        xhr.onload = function(){
            let obj =  this.response;
            obj = JSON.parse(obj);
            console.log(obj);
            resolve(obj);
        }
        xhr.onerror = function(){
            reject(new Error("Internetu nie ma jak cos"));
        }
        xhr.send();
    });
  
};