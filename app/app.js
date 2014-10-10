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

    models : ['ChartRequest'],

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
            type: 'bar',
            data:featureData,
            headers: ['Jurisdiction', 'Functional Class', 'Length', 'Lane Miles'],
            fields: ['Jurisdiction', 'FunctionalClass', 'Length', 'LaneMiles'],
            levels: ['Jurisdiction', 'FunctionalClass'],
            sums: ['Length', 'LaneMiles'],
            averages: [],
            title: 'Routes'
        });
        var reportRequests = [];
        reportRequests.push(reportRequest);
        var bridgeData = queryData['BridgeFeatureResults'];

        var bridgesRequest = Ext.create('DEMO.model.ReportRequest', {
            type: 'bar',
            data:bridgeData,
            headers: ['Jurisdiction', 'Functional Class', 'Length', 'Lane Miles'],
            fields: ['Jurisdiction', 'FunctionalClass', 'Length', 'LaneMiles'],
            levels: ['Jurisdiction', 'FunctionalClass'],
            sums: ['Length', 'LaneMiles'],
            averages: [],
            title: 'Bridges'
        });

        reportRequests.push(bridgesRequest);
        this.fireEvent('chartRequest', reportRequests);

    }
});


