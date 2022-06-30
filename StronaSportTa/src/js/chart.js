//wykres
    let ctx = document.getElementById("myChart").getContext('2d');
let myChart ;
function drawChart(){
        myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["4.04.2022" , "31.04.2022" , "7.05.2022" , "28.06.2022"],
            datasets: [{
                label: "Klatak piersiowa", // Name the series
                data: [99 , 101 , 101 , 102], // Specify the data values array
                fill: false,
                borderColor: '#5C69AF', // Add custom color border (Line)
                backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
                borderWidth: 3 // Specify bar border width
            }]},
        options: {
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: true, // Add to prevent default behaviour of full-width/height 
        }
    });
}
drawChart();