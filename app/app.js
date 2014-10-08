Ext.Loader.setConfig({ 
	enabled: true,
    disableCaching: false
});

Ext.application({
    name: 'DEMO',

    controllers: [
        'DisplayChart',
        'ChartInvoker',
        'GridController'
    ],

    views: [
        'ReportPanel'
    ],

    stores: [
        'Bridges'
    ],

    models : ['ChartDatapoint', 'ChartRequest'],

    autoCreateViewport: true,

    launch: function() {

        var queryData = undefined;
        Ext.Ajax.request({
            url: 'features.json',
            async: false,
            scope: this,
            success: function(response){
                queryData = JSON.parse(response.responseText);
            }
        }, this);

        var featureData = queryData['RouteFeatureResults'];

        var reportRequest = Ext.create('DEMO.model.ReportRequest', {
            data:featureData,
            levels: ['Jurisdiction', 'FunctionalClass', 'RouteName'],
            //levels: ['Jurisdiction', 'FunctionalClass'],
            sums: ['Length', 'LaneMiles'],
            averages: [],
            headers: ['Jurisdiction', 'Functional Class', 'Route Name', 'Length', 'Lane Miles'],
            fields: ['Jurisdiction', 'FunctionalClass', 'RouteName', 'Length', 'LaneMiles'],
        });
        this.fireEvent('reportRequest', reportRequest);

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


