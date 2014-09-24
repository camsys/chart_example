Ext.define('DEMO.controller.DisplayChart', {
			
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
                this.application.on({
                    event_ChartEvent_updateChart: this.selectChart,
                    scope: this
                });
			},


            selectChart: function(chartEvent) {
                this.getChartPanel().remove(this.getChartPanel().down('chart'), true);
                var chartType = chartEvent.data.type;
                if(chartType === 'bar'){
                    this.onBarTypeChart();
                }
                if(chartType === 'column'){
                    this.onColumnTypeChart();
                }
                if(chartType === 'pie'){
                    this.onPieTypeChart();
                }
                if(chartType === 'line'){
                    this.onLineTypeChart();
                }
            },

			onBarTypeChart: function() {
                this.getChartPanel().add(Ext.widget("cityBarChart"));
			},

			onColumnTypeChart: function() {
                this.getChartPanel().add(Ext.widget("cityColumnChart"));
			},

			onPieTypeChart: function() {
                this.getChartPanel().add(Ext.widget("cityPieChart"));
			},

			onLineTypeChart: function() {
                this.getChartPanel().add(Ext.widget("cityLineChart"));
			},

});