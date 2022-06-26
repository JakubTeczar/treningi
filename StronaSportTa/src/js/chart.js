let ctx = document.getElementById("myChart").getContext('2d');


let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["10.05.2022",	"24.05.2022",	"27.06.2022",	"2.07.2022",	"24.07.2022",	"01.08.2022"],
        datasets: [{
            label: 'Series 1', // Name the series
            data: [32,	32.4,	33,	34,	34.5,	36], // Specify the data values array
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