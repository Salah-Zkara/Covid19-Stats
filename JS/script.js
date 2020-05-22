var ctx = document.getElementById('myChart').getContext('2d');
var dleft=document.getElementById("dleft")
var covid19
var myChart

function fnclk(e) {
    if (window.myChart != undefined ) {
        window.myChart.destroy()
    }
    let req1=new XMLHttpRequest()
    req1.open("GET","https://api.covid19api.com/dayone/country/"+e.target.getAttribute('id'),true)
    req1.onreadystatechange=function () {
        if (req1.readyState==4 && req1.status==200) {
            covid19=JSON.parse(req1.response)
            //console.log(covid19)

            let dlabels=[]
            let C_cov=[]
            let R_cov=[]
            let D_cov=[]
            let A_cov=[]
            //date labels
            for (let i = 0; i < covid19.length; i++) {
                dlabels.push(covid19[i].Date.slice(5,10))
            }

            //active data
            for (let i = 0; i < covid19.length; i++) {
                A_cov.push(covid19[i].Active)
            }
            //console.log(A_cov)

            //confirmed data
            for (let i = 0; i < covid19.length; i++) {
                C_cov.push(covid19[i].Confirmed)
            }
            //death data
            for (let i = 0; i < covid19.length; i++) {
                D_cov.push(covid19[i].Deaths)
            }
            //recovered data
            for (let i = 0; i < covid19.length; i++) {
                R_cov.push(covid19[i].Recovered)
            }

            dlabels.sort()
            window.myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dlabels,
                    datasets: [{
                        label: 'Confirmer',
                        data: C_cov,
                        backgroundColor: 'rgba(0, 0, 255, 0.2)',
                        borderColor: 'rgba(0, 0, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Guéris',
                        data: R_cov,
                        backgroundColor: 'rgba(0, 128, 0, 0.2)',
                        borderColor: 'rgba(0, 128, 0, 1)',
                        borderWidth: 1
                    },
                    
                    {
                        label: 'Décès',
                        data: D_cov,
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        borderColor: 'rgba(255, 0, 0, 1)',
                        borderWidth: 1
                    },
            
                    {
                        label: 'Active',
                        data: A_cov,
                        backgroundColor: 'rgba(255, 255, 0, 0.2)',
                        borderColor: 'rgba(255, 255, 0, 1)',
                        borderWidth: 1
                    },
                
                ]
                },
            
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    }
    req1.send()
}


let req=new XMLHttpRequest()
req.open("GET","https://api.covid19api.com/countries",true)
req.onreadystatechange=function () {
    if (req.readyState==4 && req.status==200) {
        let cov=JSON.parse(req.response)
        cov.forEach(e => {
            let a=document.createElement("div")
            a.setAttribute('id',e.ISO2)
            a.setAttribute('class','countries')
            a.innerHTML=e.Country
            a.addEventListener('click',fnclk)
            dleft.appendChild(a)
        });



    }
}
req.send()

