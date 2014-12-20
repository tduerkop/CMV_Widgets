define([
    'esri/units',
    'esri/geometry/Extent',
    'esri/config',
    'esri/tasks/GeometryService',
    'esri/layers/ImageParameters'
], function (units, Extent, esriConfig, GeometryService, ImageParameters) {

    // url to your proxy page, must be on same machine hosting you app. See proxy folder for readme.
    esriConfig.defaults.io.proxyUrl = 'proxy/proxy.ashx';
    esriConfig.defaults.io.alwaysUseProxy = false;
    // url to your geometry server.
    esriConfig.defaults.geometryService = new GeometryService('http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer');

    //image parameters for dynamic services, set to png32 for higher quality exports.
    var imageParameters = new ImageParameters();
    imageParameters.format = 'png32';

    return {
        // used for debugging your app
        isDebug: false,
        //default mapClick mode, mapClickMode lets widgets know what mode the map is in to avoid multipult map click actions from taking place (ie identify while drawing).
        defaultMapClickMode: 'identify',
        // map options, passed to map constructor. see: https://developers.arcgis.com/javascript/jsapi/map-amd.html#map1
        mapOptions: {
            basemap: 'dark-gray',
            center: [-96.59179687497497, 39.09596293629694],
            zoom: 5,
            sliderStyle: 'small'
        },
        panes: {
            bottom: {
                id: 'sidebarBottom',
                placeAt: 'outer',
                splitter: true,
                collapsible: true,
                region: 'bottom'
            },
            top: {
                id: 'sidebarTop',
                placeAt: 'outer',
                splitter: true,
                collapsible: true,
                region: 'top'
            },
            left: {
                id: 'sidebarLeft',
                placeAt: 'outer',
                splitter: true,
                collapsible: true,
                region: 'left'
            }
        },
        collapseButtonsPane: 'center', //center or outer

        // operationalLayers: Array of Layers to load on top of the basemap: valid 'type' options: 'dynamic', 'tiled', 'feature'.
        // The 'options' object is passed as the layers options for constructor. Title will be used in the legend only. id's must be unique and have no spaces.
        // 3 'mode' options: MODE_SNAPSHOT = 0, MODE_ONDEMAND = 1, MODE_SELECTION = 2
        operationalLayers: [{
                type: 'feature',
                url: 'http://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Beverly%20Hills%20Trees%20By%20Block/FeatureServer/0',
                title: 'Trees',
                options: {
                    id: 'trees',
                    minScale: 0,
                    maxScale: 0,
                    opacity: 1.0,
                    visible: true,
                    outFields: ['*'],
                    mode: 0
                },
                editorLayerInfos: {
                    disableGeometryUpdate: false
                }
            }, {
                type: 'feature',
                url: 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/SanFrancisco/311Incidents/FeatureServer/0',
                title: 'San Francisco 311 Incidents',
                options: {
                    minScale: 0,
                    maxScale: 0,
                    id: 'sf311Incidents',
                    opacity: 1.0,
                    visible: true,
                    outFields: ['req_type', 'req_date', 'req_time', 'address', 'district'],
                    mode: 0
                }
            }, {
                type: 'feature',
                url: 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Petroleum/KSPetro/MapServer/0',
                title: 'Wells',
                options: {
                    minScale: 0,
                    maxScale: 0,
                    id: 'wels',
                    opacity: 1.0,
                    visible: true,
                    outFields: ['req_type', 'req_date', 'req_time', 'address', 'district'],
                    mode: 0
                }
            }],
        // set include:true to load. For titlePane type set position the the desired order in the sidebar
        widgets: {
            identify: {
                include: true,
                id: 'identify',
                type: 'titlePane',
                path: 'gis/dijit/Identify',
                title: 'Identify',
                open: false,
                position: 3,
                options: 'config/identify'
            },
            layerControl: {
                include: true,
                id: 'layerControl',
                type: 'titlePane',
                path: 'gis/dijit/LayerControl',
                title: 'Layers',
                open: false,
                position: 0,
                options: {
                    map: true,
                    layerControlLayerInfos: true,
                    separated: true,
                    vectorReorder: true,
                    overlayReorder: true
                }
            },
            legend: {
                include: true,
                id: 'legend',
                type: 'titlePane',
                path: 'esri/dijit/Legend',
                title: 'Legend',
                open: false,
                position: 1,
                options: {
                    map: true,
                    legendLayerInfos: true
                }
            },
            help: {
                include: true,
                id: 'help',
                type: 'floating',
                path: 'gis/dijit/Help',
                title: 'Help',
                options: {}
            },
            relatedRecords: {
                include: true,
                id: 'relatedRecords',
                position: 0,
                canFloat: true,
                open: true,
                type: 'contentPane',
                placeAt: 'bottom',
                path: 'gis/dijit/RelatedRecordTable',
                title: 'Related Records',
                options: {
                    layerControlLayerInfos: true
                }
            },
            settings: {
                include: true,
                id: 'settings',
                position: 1,
                type: 'titlePane',
                path: 'gis/dijit/AppSettings',
                title: 'Save/Share Current Map',
                options: {
                    //required:
                    map: true,
                    layerControlLayerInfos: true,
                    //optional: 
                    mapRightClickMenu: true,
                    address: 'email@email.com',
                    subject: 'Share Map',
                    body: 'Check out this map! <br /> '
                            //optional domnode id to place a share map button
                            //domNode: 'shareNode'

                }
            }

        }
    };
});