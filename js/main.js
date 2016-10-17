var map;
	require([
		"esri/map",

		"esri/layers/FeatureLayer",

		"esri/dijit/Search",

		"dojo/domReady"], function (Map, FeatureLayer, Search) {

		map = new Map("mainMap",{
			center: [-2.683333, 42.85],
			zoom: 10,
			basemap: "dark-gray"
		});

		var geoCoder = new Search({
			map: map,
			allPlaceholder: "Escribe una dirección",
			enableButtonMode: true
		}, document.getElementById("search"));
		map.on("click", function(){
			geoCoder.collapse();
		});

		

		var vertidosAut = new FeatureLayer("http://services6.arcgis.com/2ELH198D4qlt3VYt/arcgis/rest/services/Censo_Autorizados/FeatureServer/0",{
			mode: FeatureLayer.MODE_ONDEMAND,
			displayOnPan: true
		});
		map.addLayer(vertidosAut);

	});