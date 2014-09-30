Ext.define('DEMO.controller.GridController', {
    extend : 'Ext.app.Controller',

    //define the stores
    stores : ['Countries'],
    //define the models
    models : ['Country'],
    //define the views
    views : ['grid.SummaryGrid', 'grid.GridPanel', 'ReportPanel'],
    //define refs
    refs:[
        {
            ref: 'summaryGrid',
            selector: 'summaryGrid'
        },
        {
            ref: 'reportPanel',
            selector: 'reportPanel'
        },
        {
            ref: 'gridPanel',
            selector: 'gridPanel'
        },
    ],

    init : function() {

        this.application.on({
            gridRequest: this.selectGrid,
            scope: this
        });

        this.control({

            'reportPanel button[id=expand]' : {
                toggle : this.onExpand
            },
            'reportPanel button[id=collapse]' : {
                toggle : this.onCollapse
            }
        });
    },

    selectGrid: function () {
        for (i = 0; i < this.getReportPanel().items.getCount(); ++i) {
            this.getReportPanel().items.get(i).destroy()
        }
        var gridInstance = Ext.widget("gridPanel");
        this.getReportPanel().add(gridInstance);
    },

    onExpand : function(button, pressed) {
        this.getSummaryGrid().expandAll();
    },

    onCollapse : function(button, pressed) {
        this.getSummaryGrid().collapseAll();
    },

});