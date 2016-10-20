var map;
	require([
		"esri/Color",
		"esri/map",
		
		"esri/dijit/editing/Editor",
		"esri/dijit/Popup",
		"esri/dijit/PopupTemplate",
		"esri/dijit/Search",

		"esri/layers/FeatureLayer",

		"esri/symbols/SimpleMarkerSymbol",

		"dojo/parser",

		"dojo/dom-construct",
		"dojo/domReady"], function (Color, Map, Editor, Popup, PopupTemplate, Search, FeatureLayer, 
									SimpleMarkerSymbol, parser, domConstruct) {

		parser.parse();


		var popupOptions = {
			markerSymbol: new SimpleMarkerSymbol("circle", 22, null, new Color([0, 0, 0, 0.25])),
			marginLeft: "20",
			marginRight: "20"
		};

		var popup = new Popup(popupOptions, domConstruct.create("div"));

		//Creates the map with some properties
		map = new Map("mainMap", {
			center: [-2.683333, 42.85],
			zoom: 10,
			basemap: "dark-gray",
			infoWindow: popup
		});

		var jsonPopup = {
			title: "Censo de vertidos autorizados",
			fieldInfos: [
				{
					fieldName:"NUMEXP_VERT",
					label: "Número expediente vertido",
					visible: true
				},
				{
					fieldName:"NUMEXP",
					label: "Número expediente autorización",
					visible: true
				},
				{
					fieldName:"Cuenca",
					label: "Cuenca",
					visible: true
				},
				{
					fieldName:"VOLUMEN_MAX_A_NUAL",
					label: "Volumen vertido anual",
					visible: true
				},
				{
					fieldName:"CNAE_CNAE",
					label: "CNAE",
					visible: true
				},
				{
					fieldName:"NATUR_VERTIDO",
					label: "Naturaleza del vertido",
					visible: true
				},
				{
					fieldName:"CATEG",
					label: "Categoría del medio receptro",
					visible: true
				},
				{
					fieldName:"CLASE_VERTIDO",
					label:"Clase del vertido",
					visible: true
				},
				{
					fieldName:"TITULAR",
					label:"Titular",
					visible: true
				}
				 
			],
			showAttachments: true
		};

		var popupTemplate = new PopupTemplate(jsonPopup);

		//Adds widget Search and creates and event to collapse de widget when you click the map
		var geoCoder = new Search({
			map: map,
			allPlaceholder: "Escribe una dirección",
			enableButtonMode: true
		}, document.getElementById("search"));
		map.on("click", function(){
			geoCoder.collapse();
		});

		// var paramSettings = {
		// 	map: map,
		// 	enableUndoRedo: true,
		// 	maxUndoRedoOperations: 20,
		// 	toolbarVisible: true,
		// 	layerInfos: vertidosAut
		// };

		// var parameterEditor = {
		// 	settings: paramSettings
		// };

		// var editorWidget = new Editor (parameterEditor, "editorDiv");
		// editorWidget.startup();

		
		//Adds the FeatureLayer of myContent in AGOL.
		var vertidosAut = new FeatureLayer("http://services6.arcgis.com/2ELH198D4qlt3VYt/arcgis/rest/services/Censo_Autorizados/FeatureServer/0",
		{
			mode: FeatureLayer.MODE_ONDEMAND,
			infoTemplate: popupTemplate,
			outFields: ["*"],
			displayOnPan: true
		});
		map.addLayer(vertidosAut);

	});