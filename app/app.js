Ext.Loader.setConfig({ 
	enabled: true,
    disableCaching: false
});

Ext.override(Ext.view.Table, { enableTextSelection: true }); // Treepanels

Ext.override(Ext.grid.View,  { enableTextSelection: true }); // Grids

Ext.application({
    name: 'DEMO',

    controllers: [
        'DisplayChart',
        'ChartInvoker',
        'GridController'
    ],

    views: [
        'ChartPanel'
    ],

    models : ['ChartDatapoint', 'ChartRequest'],

    autoCreateViewport: true,

    launch: function() {
        this.fireEvent('gridRequest');
        /*var chartRequest = Ext.create('DEMO.model.ChartRequest', {
                type: 'bar',
                xtitle: 'U.S. Cities',
                ytitle: 'Population',
                xfield: 'metric',
                yfield: 'name',
                seriesTitle: 'Current Year 2014'
        });
        this.fireEvent('chartRequest', chartRequest);*/
    }
});


