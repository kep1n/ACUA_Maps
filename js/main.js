var map;
	require([
		"esri/map",

		"esri/layers/FeatureLayer",

		"esri/dijit/Search",

		"dojo/domReady"], function (Map, FeatureLayer, Search) {

		//Creates the map with some properties
		map = new Map("mainMap",{
			center: [-2.683333, 42.85],
			zoom: 10,
			basemap: "dark-gray"
		});

		//Adds widget Search and creates and event to collapse de widget when you click the map
		var geoCoder = new Search({
			map: map,
			allPlaceholder: "Escribe una dirección",
			enableButtonMode: true
		}, document.getElementById("search"));
		map.on("click", function(){
			geoCoder.collapse();
		});

		//Adds the FeatureLayer of myContent in AGOL. It needs an authorisation token.
		var vertidosAut = new FeatureLayer("http://services6.arcgis.com/2ELH198D4qlt3VYt/arcgis/rest/services/Censo_Autorizados/FeatureServer/0",{
			mode: FeatureLayer.MODE_ONDEMAND,
			displayOnPan: true
		});
		map.addLayer(vertidosAut);

	});