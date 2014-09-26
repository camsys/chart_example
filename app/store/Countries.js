Ext.define('DEMO.store.Countries', {
    extend: 'Ext.data.Store',
    model: 'DEMO.model.Country',
    autoLoad: true,
    groupField: 'myGroup',

    proxy: {
        type: 'ajax',
        url: 'country.json',
        reader: {
            type: 'json',
            totalProperty: 'totalCount',
            root: 'countries',
            successProperty: 'success'
        }
    }
});