Ext.define('DEMO.controller.DisplayChart', {
			
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
                }
                if(chartType === 'column'){
                    chartInstance = this.onColumnTypeChart();
                }
                if(chartType === 'pie'){
                    chartInstance = this.onPieTypeChart();
                }
                if(chartType === 'line'){
                    chartInstance = this.onLineTypeChart();
                }

                if(chartInstance.series.get(0).type != 'pie'){

                    chartInstance.axes.get(0).title = chartRequest.getXtitle();
                    chartInstance.axes.get(0).fields = [];
                    chartInstance.axes.get(0).fields.push(chartRequest.getXfield());

                    chartInstance.axes.get(1).title = chartRequest.getYtitle();
                    chartInstance.axes.get(1).fields = [];
                    chartInstance.axes.get(1).fields.push(chartRequest.getYfield());

                }

                chartInstance.series.get(0).title = chartRequest.getSeriesTitle();

                this.getChartPanel().add(chartInstance);
            },

			onBarTypeChart: function() {
                return Ext.widget("cityBarChart");
			},

			onColumnTypeChart: function() {
                return Ext.widget("cityColumnChart");
			},

			onPieTypeChart: function() {
                return Ext.widget("cityPieChart");
			},

			onLineTypeChart: function() {
                return Ext.widget("cityLineChart");
			},

});