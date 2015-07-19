var socket = io.connect('http://localhost:3000');

var votos = [];
var colors = ["#FF0F00",
        "#FF6600",
        "#FF9E01",
        "#FCD202",
        "#F8FF01",
        "#B0DE09",
        "#04D215",
        "#0D8ECF",
        "#0D52D1",
        "#2A0CD0",
        "#8A0CCF",
        "#CD0D74",
        "#754DEB",
        "#DDDDDD",
        "#999999",
        "#333333",
        "#000000"];

socket.on('connected', function() {

});

socket.on('partidos', function(data) {
	for (var i = 0; i < data.length; i++) {
		var fila = {
			"partido": "",
			"total" : 0,
			"color" : colors[i]
		};
		fila.partido = data[i].partido;
		votos.push(fila);
	};

	App();
});


socket.on('data', function(data) {
    $('#registros').html(" ");
    for (var j = 0; j < votos.length; j++) {
    	votos[j].total = 0;
	};
    for (var i = 0; i < data.length; i++) {
        $('#registros').append('<tr><td>' + (i + 1) + '<td>' + data[i].celular + '</td><td>' + data[i].curp + '</td><td>' + data[i].partido + ' </td></tr>');

        for (var j = 0; j < votos.length; j++) {

			if (votos[j].partido === data[i].partido) {
	        	votos[j].total++;
	        }
		};
   		
        
        
    };
    App();
});



var App = function() {
    AmCharts.makeChart("chartdiv", {
        "type": "serial",
        "categoryField": "partido",
        "startDuration": 0,
        "fontSize": 14,
        "categoryAxis": {
            "gridPosition": "start"
        },
        "chartCursor": {},
        "chartScrollbar": {},
        "trendLines": [],
        "graphs": [{
            "balloonText": "[[value]] votos ",
            "fillAlphas": 1,
            "gapPeriod": 2,
            "colorField": "color",
            "id": "AmGraph-1",
            "title": "PARTIDO",
            "fillAlphas": 0.70,
            "lineAlpha": 0.1,
            "type": "column",
            "fontSize": 20,
            "valueField": "total"
        }],
        "guides": [],
        "valueAxes": [{
            "id": "ValueAxis-1",
            "title": "VOTOS",
            "fontSize": 20
        }],
        "allLabels": [],
        "balloon": {},
        "export": {
            "enabled": false
        },
        "legend": {},
        "titles": [{
            "id": "Title-1",
            "size": 22,
            "text": "PARTIDOS POLÍTICOS"
        }],
        "dataProvider": votos
    });
};
