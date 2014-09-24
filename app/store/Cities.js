Ext.define('DEMO.store.Cities', {
    extend: 'Ext.data.Store',
    model: 'DEMO.model.City',
    autoLoad: true,
    pageSize: 10,
    
    proxy: {
        type: 'ajax',
        url: '/chart_example/data.json',
        reader: {
            type: 'json',
            root: 'cityList',
            totalProperty: 'totalCount',
            successProperty: 'success'
        },
	 }
});