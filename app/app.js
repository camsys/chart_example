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

    autoCreateViewport: true,

    launch: function() {
        var chartEvent = Ext.create('DEMO.model.ChartEvent', {
            type: 'bar'
        });
        this.fireEvent(DEMO.model.ChartEvent.UPDATE_CHART, chartEvent);
    }
});
