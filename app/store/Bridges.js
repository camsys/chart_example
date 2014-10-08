Ext.define('DEMO.store.Bridges', {
    extend: 'Ext.data.Store',
    model: 'DEMO.model.Bridge',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'features.json',

        reader: {
            type: 'json',
            root: 'BridgeFeatureResults',
        }
    }
});