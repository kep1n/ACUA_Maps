var map;
	require([
		"esri/map",

		"esri/layers/FeatureLayer",

		"dojo/domReady"], function (Map, FeatureLayer) {

		map = new Map("mainMap",{
			center: [-2.683333, 42.85],
			zoom: 10,
			basemap: "dark-gray"
		});

		var vertidosAut = new FeatureLayer("http://kepin-pc:6080/arcgis/rest/services/TFM_Editables/Censo_Autorizados/FeatureServer/0",{
			mode: FeatureLayer.MODE_ONDEMAND,
			displayOnPan: true
		});
		map.addLayer(vertidosAut);

	});