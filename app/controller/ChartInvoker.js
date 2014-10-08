Ext.define('DEMO.controller.ChartInvoker', {

    extend : 'Ext.app.Controller',

    //define the stores
    stores : ['ChartDatapoints'],
    //define the models
    models : ['ChartDatapoint', 'ChartRequest'],
    //define the views
    views : ['chart.BarChart','chart.ColumnChart','chart.PieChart','chart.LineChart'],

    refs:[
        {
            ref: 'reportPanel',
            selector: 'reportPanel'
        }
    ],

    init : function() {
        this.control({
            'container button[action=showBarChart]' : {
                click : this.onBarTypeChart
            },
            'container button[action=showColumnChart]' : {
                click : this.onColumnTypeChart
            },
            'container button[action=showPieChart]' : {
                click : this.onPieTypeChart
            },
            'container button[action=showLineChart]' : {
                click : this.onLineTypeChart
            },
            'container button[action=showGrid]' : {
                click : this.onGrid
            }
        });
    },


    onBarTypeChart: function() {
        var chartEvent = Ext.create('DEMO.model.ChartRequest', {
            type: 'bar',
            xtitle: 'U.S. Cities',
            ytitle: 'Population',
            xfield: 'metric',
            yfield: 'name',
            seriesTitle: 'Current Year 2014'
        });
        this.application.fireEvent('chartRequest', chartEvent);
    },

    onColumnTypeChart: function() {
        var chartEvent = Ext.create('DEMO.model.ChartRequest', {
            type: 'column',
            xtitle: 'U.S. Cities',
            ytitle: 'Population',
            xfield: 'metric',
            yfield: 'name',
            seriesTitle: 'Current Year 2014'
        });
        this.application.fireEvent('chartRequest', chartEvent);
    },

    onPieTypeChart: function() {
        var chartEvent = Ext.create('DEMO.model.ChartRequest', {
            type: 'pie',
            xtitle: 'U.S. Cities',
            ytitle: 'Population',
            xfield: 'metric',
            yfield: 'name',
            seriesTitle: 'Current Year 2014'
        });
        this.application.fireEvent('chartRequest', chartEvent);
    },

    onLineTypeChart: function() {
        var chartEvent = Ext.create('DEMO.model.ChartRequest', {
            type: 'line',
            xtitle: 'U.S. Cities',
            ytitle: 'Population',
            xfield: 'metric',
            yfield: 'name',
            seriesTitle: 'Current Year 2014'
        });
        this.application.fireEvent('chartRequest', chartEvent);
    },

    onGrid: function() {
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
            //levels: ['Jurisdiction', 'FunctionalClass', 'RouteName'],
            //headers: ['Jurisdiction', 'Functional Class', 'Route Name', 'Length', 'Lane Miles'],
            //fields: ['Jurisdiction', 'FunctionalClass', 'RouteName', 'Length', 'LaneMiles'],
            levels: ['Jurisdiction', 'FunctionalClass'],
            sums: ['Length', 'LaneMiles'],
            averages: [],
            headers: ['Jurisdiction', 'Functional Class', 'Length', 'Lane Miles'],
            fields: ['Jurisdiction', 'FunctionalClass', 'Length', 'LaneMiles'],
        });
        this.application.fireEvent('reportRequest', reportRequest);
    },

});