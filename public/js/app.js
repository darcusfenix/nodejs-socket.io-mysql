var socket = io.connect('http://189.134.53.12:3000');

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

var registros = [
	{
		"partido" : "PRI",
		"total": 0,
		"color": colors[0]
	},
	{
		"partido" : "PAN",
		"total": 0,
		"color": colors[1]
	},
	{
		"partido" : "PRD",
		"total": 0,
		"color": colors[2]
	},
	{
		"partido" : "P_T",
		"total": 0,
		"color": colors[3]
	},
	{
		"partido" : "VDE",
		"total": 0,
		"color": colors[4]
	},
	{
		"partido" : "MVC",
		"total": 0,
		"color": colors[5]
	},
	{
		"partido" : "NVA",
		"total": 0,
		"color": colors[6]
	},
	{
		"partido" : "MOR",
		"total": 0,
		"color": colors[7]
	},
	{
		"partido" : "HUM",
		"total": 0,
		"color": colors[8]
	},
	{
		"partido" : "ENC",
		"total": 0,
		"color": colors[9]
	}
];

socket.on('connected', function() {

});

socket.on('partidos', function(data) {
	if (data.length == 0){
		$("#chartdiv").fadeOut(0);
	}
	else{
		$("#chartdiv").fadeIn(0);
	}
	votos = [];
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
	$("h2").html('Total de votos: <b>' + data.length + '</b>');
	if (data.length == 0){
		$("table").fadeOut(0);
	}else{
		$("table").fadeIn(0);

	}
	
				
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
$("table").fadeOut(0);