Ext.define('DEMO.controller.ChartInvoker', {

    extend : 'Ext.app.Controller',

    //define the stores
    stores : ['Cities'],
    //define the models
    models : ['City'],
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
        var chartEvent = Ext.create('DEMO.model.ChartEvent', {
            type: 'bar'
        });
        this.application.fireEvent(DEMO.model.ChartEvent.UPDATE_CHART, chartEvent);
    },

    onColumnTypeChart: function() {
        var chartEvent = Ext.create('DEMO.model.ChartEvent', {
            type: 'column'
        });
        this.application.fireEvent(DEMO.model.ChartEvent.UPDATE_CHART, chartEvent);
    },

    onPieTypeChart: function() {
        var chartEvent = Ext.create('DEMO.model.ChartEvent', {
            type: 'pie'
        });
        this.application.fireEvent(DEMO.model.ChartEvent.UPDATE_CHART, chartEvent);
    },

    onLineTypeChart: function() {
        var chartEvent = Ext.create('DEMO.model.ChartEvent', {
            type: 'line'
        });
        this.application.fireEvent(DEMO.model.ChartEvent.UPDATE_CHART, chartEvent);
    },


});