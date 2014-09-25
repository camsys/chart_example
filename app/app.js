Ext.Loader.setConfig({ 
	enabled: true,
    disableCaching: false
});

Ext.application({
    name: 'DEMO',

    controllers: [
        'DisplayChart',
        'ChartInvoker'
    ],

    views: [
        'ChartPanel'
    ],

    models : ['ChartDatapoint', 'ChartRequest'],

    autoCreateViewport: true,

    launch: function() {
        var chartRequest = Ext.create('DEMO.model.ChartRequest', {
                type: 'bar',
                xtitle: 'U.S. Cities',
                ytitle: 'Population',
                xfield: 'metric',
                yfield: 'name',
                seriesTitle: 'Current Year 2014'
        });
        this.fireEvent('chartRequest', chartRequest);
    }
});


