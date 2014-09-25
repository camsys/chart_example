Ext.define('DEMO.controller.DisplayChart', {

    extend : 'Ext.app.Controller',

    //define the stores
    stores : ['ChartDatapoints'],
    //define the models
    models : ['ChartDatapoint'],
    //define the views
    views : ['chart.BarChart','chart.ColumnChart','chart.PieChart','chart.LineChart'],

    refs:[
        {
            ref: 'chartPanel',
            selector: 'chartPanel'
        }
    ],

    init : function() {
        this.application.on({
            chartRequest: this.selectChart,
            scope: this
        });
    },


    selectChart: function(chartRequest) {

        this.getChartPanel().remove(this.getChartPanel().down('chart'), true);
        var chartType = chartRequest.getType();
        var chartInstance;

        if(chartType === 'bar'){
            chartInstance = this.onBarTypeChart();
            chartInstance.axes.get(0).title = chartRequest.getYtitle();
            chartInstance.axes.get(0).fields = [chartRequest.getXfield()];
            chartInstance.axes.get(1).title = chartRequest.getXtitle();
            chartInstance.axes.get(1).fields = [chartRequest.getYfield()];
            chartInstance.series.get(0).label.field = [chartRequest.getXfield()];
            chartInstance.series.get(0).title = chartRequest.getSeriesTitle();
            chartInstance.series.get(0).xField = chartRequest.getXfield();
            chartInstance.series.get(0).yField = [chartRequest.getXfield()];
            chartInstance.series.get(0).tips.renderer = function(storeItem, item) {
                this.setTitle('Item: ' + storeItem.get(chartRequest.getYfield()) + '<br/>Measurement is ' + storeItem.get(chartRequest.getXfield()));
            }
        }
        if(chartType === 'column'){
            chartInstance = this.onColumnTypeChart();
            chartInstance.axes.get(0).title = chartRequest.getYtitle();
            chartInstance.axes.get(0).fields = [chartRequest.getXfield()];
            chartInstance.axes.get(1).title = chartRequest.getXtitle();
            chartInstance.axes.get(1).fields = [chartRequest.getYfield()];
            chartInstance.series.get(0).label.field = [chartRequest.getXfield()];
            chartInstance.series.get(0).title = chartRequest.getSeriesTitle();
            chartInstance.series.get(0).xField = chartRequest.getXfield();
            chartInstance.series.get(0).yField = [chartRequest.getXfield()];
            chartInstance.series.get(0).tips.renderer = function(storeItem, item) {
                this.setTitle('Item: ' + storeItem.get(chartRequest.getYfield()) + '<br/>Measurement is ' + storeItem.get(chartRequest.getXfield()));
            }
        }
        if(chartType === 'pie'){
            chartInstance = this.onPieTypeChart();
            chartInstance.series.get(0).xField = chartRequest.getYfield();
            chartInstance.series.get(0).yField = [chartRequest.getXfield()];
            chartInstance.series.get(0).label.field = [chartRequest.getYfield()];
            chartInstance.series.get(0).tips.renderer = function(storeItem, item) {
                this.setTitle('Item: ' + storeItem.get(chartRequest.getYfield()) + '<br/>Measurement is ' + storeItem.get(chartRequest.getXfield()));
            }
        }
        if(chartType === 'line'){
            chartInstance = this.onLineTypeChart();
            chartInstance.axes.get(0).title = chartRequest.getYtitle();
            chartInstance.axes.get(0).fields = [chartRequest.getXfield()];
            chartInstance.axes.get(1).title = chartRequest.getXtitle();
            chartInstance.axes.get(1).fields = [chartRequest.getYfield()];
            chartInstance.series.get(0).title = chartRequest.getSeriesTitle();
            chartInstance.series.get(0).xField = chartRequest.getXfield();
            chartInstance.series.get(0).yField = [chartRequest.getXfield()];
            chartInstance.series.get(0).tips.renderer = function(storeItem, item) {
                this.setTitle('Item: ' + storeItem.get(chartRequest.getXfield()) + '<br/>Measurement is ' + storeItem.get(chartRequest.getXfield()));
            }
        }




        this.getChartPanel().add(chartInstance);
    },

    onBarTypeChart: function() {
        return Ext.widget("barChart");
    },

    onColumnTypeChart: function() {
        return Ext.widget("columnChart");
    },

    onPieTypeChart: function() {
        return Ext.widget("pieChart");
    },

    onLineTypeChart: function() {
        return Ext.widget("lineChart");
    },

});