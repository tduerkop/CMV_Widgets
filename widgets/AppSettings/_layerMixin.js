define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/topic',
    'dojo/ready'
], function (declare, lang, array, topic, ready) {
    return declare(null, {
        postCreate: function () {
            this.inherited(arguments);
            if (!this.layerInfos) {
                topic.publish('viewer/handleError', {
                    source: 'AppSettings',
                    error: 'layerInfos are required'
                });
                return;
            }
            this._defaultAppSettings.layerVisibility = {
                save: false,
                value: {},
                checkbox: true,
                label: 'Save Layer Visibility',
                urlLoad: false
            };
        },
        init: function () {
            this.inherited(arguments);
            if(!this._appSettings.layerVisibility){
                return;
            }
            if (this._appSettings.layerVisibility.save ||
                    this._appSettings.layerVisibility.urlLoad) {
                //needs to be ready so other widgets can update layers
                //accordingly
                ready(3, this, '_loadSavedLayers');
            }
            //needs to come after the loadSavedLayers function
            //so also needs to be ready
            ready(4, this, '_setLayerVisibilityHandles');
        },
        /**
         * sets the visibility of the loaded layers if save or urlLoad is true
         */
        _loadSavedLayers: function () {
            var layers = this._appSettings.layerVisibility.value;
            //load visible layers
            array.forEach(this.layerInfos, lang.hitch(this, function (layer) {
                if (layers.hasOwnProperty(layer.layer.id)) {
                    if (layers[layer.layer.id].visibleLayers &&
                      layer.layer.setVisibleLayers) {
                        layer.layer.setVisibleLayers(layers[layer.layer.id].visibleLayers);
                        topic.publish('layerControl/setVisibleLayers', {
                            id: layer.layer.id,
                            visibleLayers: layers[layer.layer.id]
                                    .visibleLayers
                        });
                    }
                    if (layers[layer.layer.id].visible !== null) {
                        layer.layer.setVisibility(layers[layer.layer.id].visible);
                    }
                }
            }));
            //reset url flag
            this._appSettings.layerVisibility.urlLoad = false;
        },
        _setLayerVisibilityHandles: function () {
            var setting = this._appSettings.layerVisibility;
            setting.value = {};
            //since the javascript api visibleLayers property starts
            //with a different set of layers than what is actually turned
            //on, we need to iterate through, find the parent layers,
            array.forEach(this.layerInfos, lang.hitch(this, function (layer) {
                var id = layer.layer.id;
                var visibleLayers;
                if (layer.layer.hasOwnProperty('visibleLayers')) {
                    visibleLayers = [];
                    array.forEach(layer.layer.visibleLayers, function (subLayerId) {
                        if (subLayerId !== -1 &&
                                layer.layer.hasOwnProperty('layerInfos') &&
                                layer.layer.layerInfos[subLayerId].subLayerIds === null) {
                            visibleLayers.push(subLayerId);
                        }
                    });
                    if (visibleLayers.length === 0) {
                        visibleLayers.push(-1);
                    }
                }
                setting.value[id] = {
                    visible: layer.layer.visible,
                    visibleLayers: visibleLayers
                };
            }));
            this.own(topic.subscribe('layerControl/setVisibleLayers', lang.hitch(this, function (layer) {
                setting.value[layer.id].visibleLayers = layer.visibleLayers;
                this._saveAppSettings();
            })));
            this.own(topic.subscribe('layerControl/layerToggle', lang.hitch(this, function (layer) {
                setting.value[layer.id].visible = layer.visible;
                this._saveAppSettings();
            })));
        }
    });
});
