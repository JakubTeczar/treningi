
//wysyłanie danych do serwera
const sendJson  = (toSend,type) =>{
    const jsonString = JSON.stringify(toSend);
    const xhr = new XMLHttpRequest();
    if (type =="measurement"){
        console.log(toSend);
        xhr.open("POST" , "php/send/sendMeasurement.php");
    }else if(type=="plans"){
        xhr.open("POST" , "php/send/sendPlans.php");
    }else if(type=="history"){
        xhr.open("POST" , "php/send/sendHistory.php");
    }
    xhr.setRequestHeader("Content-Type" , "application/json");
    xhr.send(jsonString);
};