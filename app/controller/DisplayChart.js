Ext.define('DEMO.controller.DisplayChart', {

    extend : 'DEMO.controller.BaseReportController',

    views : ['chart.BarChart','chart.ColumnChart','chart.PieChart','chart.LineChart'],

    refs:[
        {
            ref: 'reportPanel',
            selector: 'reportPanel'
        }
    ],

    init : function() {
        this.application.on({
            chartRequest: this.selectChart,
            scope: this
        });
    },



    selectChart: function(chartRequests) {

        for (i=0; i < this.getReportPanel().items.getCount(); ++i) {
            this.getReportPanel().items.get(i).destroy()
        }

        Ext.each(chartRequests, function (chartRequest) {
            if(chartRequest.getLevels().length > 2){
                Ext.Error.raise({
                    msg: 'Invalid chart configuration',
                    option: chartRequest,
                });
            }

            var featureData = chartRequest.getData();

            Ext.each(featureData, function (feature) {
                if(feature['Length'] && feature['NumberOfLanes']){
                    feature.LaneMiles  = feature['Length'] * feature['NumberOfLanes']
                }else{
                    feature.LaneMiles = 0;
                }
            });

            var tree = this.buildHierarchy(featureData, chartRequest);  //create the tree based on the levels defined in request
            if(chartRequest.getType() === 'bar'){

                var chartArray = [];

                Ext.each(tree, function (root) {
                    var datapoints = [];
                    Ext.each(root.children, function (child) {
                        var datapoint = {
                            name: child.text,
                            metric: child.Length.toString()
                        }
                        datapoints.push(datapoint);
                    }, this);

                    var levels = chartRequest.getLevels();


                    var chartInstance = this.onColumnTypeChart();

                    var model = {
                        extend: 'Ext.data.Model',
                        fields: [
                            {name: 'name', type: 'string'},
                            {name: 'metric', type: 'string'}
                        ]
                    };

                    Ext.define('DEMO.store.Datapoint', model);

                    var store = new Ext.data.Store({
                        model: 'DEMO.store.Datapoint',
                        proxy: {
                            type: 'memory',
                            reader: {
                                type: 'json',
                            }
                        }
                    });

                    chartInstance.store = store;
                    chartInstance.store.loadRawData(datapoints, false);

                    var nestedPanel = Ext.widget("panel");
                    nestedPanel.add(chartInstance);
                    chartArray.push(nestedPanel);


                    fakechartRequest = Ext.create('DEMO.model.ChartRequest', {
                        type: 'line',
                        xtitle: 'U.S. Cities',
                        ytitle: 'Population',
                        xfield: 'metric',
                        yfield: 'name',
                        seriesTitle: 'Current Year 2014'
                    });

                    chartInstance.axes.get(0).title = 'Length';
                    chartInstance.axes.get(0).fields = [fakechartRequest.getXfield()];
                    //chartInstance.axes.get(1).title = 'Length';
                    chartInstance.axes.get(1).fields = [fakechartRequest.getYfield()];
                    chartInstance.series.get(0).label.field = [fakechartRequest.getXfield()];
                    chartInstance.series.get(0).title = fakechartRequest.getSeriesTitle();
                    chartInstance.series.get(0).xField = fakechartRequest.getXfield();
                    chartInstance.series.get(0).yField = [fakechartRequest.getXfield()];
                    chartInstance.series.get(0).tips.renderer = function(storeItem, item) {
                        this.setTitle('Item: ' + storeItem.get(fakechartRequest.getYfield()) + '<br/>Measurement is ' + storeItem.get(fakechartRequest.getXfield()));
                    }

                }, this);

                var chartTabPanel = Ext.widget("panel");
                chartTabPanel.title = chartRequest.getTitle();
                chartTabPanel.height = 500;
                chartTabPanel.autoScroll = true;
                chartTabPanel.add(chartArray);
                console.log(chartTabPanel.items.length);
                this.getReportPanel().add(chartTabPanel);
            }
        }, this);
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