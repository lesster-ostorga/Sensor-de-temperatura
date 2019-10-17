
(function(){

  // Inicia o firebase Firebase
  var config = {
    apiKey: "AIzaSyCOUk_w4n4o9_Ll7sUYg_BqJZ9nfiC_Oj4",
    authDomain: "sensor-44a00.firebaseapp.com",
    databaseURL: "https://sensor-44a00.firebaseio.com",
    projectId: "sensor-44a00",
    storageBucket: "sensor-44a00.appspot.com",
    messagingSenderId: "613280316239",
    appId: "1:613280316239:web:63888cfe16ae714b90633a",
    measurementId: "G-YFGQZJXPRY"
  };
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  var db = firebase.database();

// Crear escuchas de datos en firebase
  var tempRef = db.ref('Temperatura');
  var umidRef = db.ref('Humedad');
  var tempLRef = db.ref('TemperaturaLiquidos');



// Registra funciones que actualizan los gráficos y datos de telemetría actuales
  tempRef.on('value', onNewData('currentTemp', 'tempLineChart' , 'Temperatura', 'C°'));
  umidRef.on('value', onNewData('currentUmid', 'umidLineChart' , 'Umidade', '%'));
  tempLRef.on('value', onNewData('currentLTemp', 'tempLLineChart' , 'TemperaturaL', 'C°'));


// Devuelve una función que de acuerdo con los cambios de datos
// Actualiza el valor actual del elemento con la métrica pasada (currentValueEl y metric)
// y ensamblar el gráfico con los datos y la descripción del tipo de datos (chartEl, etiqueta)
function onNewData(currentValueEl, chartEl, label, metric){
  return function(snapshot){
    var readings = snapshot.val();
    if(readings){
        var currentValue;
        var data = [];
        for(var key in readings){
          currentValue = readings[key]
          data.push(currentValue);
        }

        document.getElementById(currentValueEl).innerText = currentValue + ' ' + metric;
        buildLineChart(chartEl, label, data);
    }
  }
}

// Construya un gráfico de líneas en el elemento (el) con la descripción (etiqueta) y el
// datos pasados ​​(fecha)
function buildLineChart(el, label, data){
  var elNode = document.getElementById(el);
  new Chart(elNode, {
    type: 'line',
    data: {
        labels: new Array(data.length).fill(""),
        datasets: [{
            label: label,
            data: data,
            borderWidth: 1,
            fill: false,
            spanGaps: false,
            lineTension: 0.1,
            backgroundColor: "#F9A825",
            borderColor: "#F9A825"
        }]
    }
  });
}
