Ext.define('DEMO.controller.ChartInvoker', {

    extend : 'Ext.app.Controller',

    //define the stores
    stores : ['ChartDatapoints'],
    //define the models
    models : ['ChartDatapoint'],
    //define the views
    views : ['chart.CityBarChart','chart.CityColumnChart','chart.CityPieChart','chart.CityLineChart'],

    refs:[
        {
            ref: 'chartPanel',
            selector: 'chartPanel'
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


});