Ext.define('DEMO.store.ChartDatapoints', {
    extend: 'Ext.data.Store',
    model: 'DEMO.model.ChartDatapoint',
    autoLoad: true,
    pageSize: 10,
    
    proxy: {
        type: 'ajax',
        url: 'data.json',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalCount',
            successProperty: 'success'
        }
	 }
});