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

            'viewport > panel' : {
                render : this.onPanelRendered
            },
            'reportPanel button[id=hideShow]' : {
                toggle : this.onSummaryToggle
            },
            'reportPanel button[id=grouping]' : {
                toggle : this.onSummaryDisable
            },
            'reportPanel button[id=collapse]' : {
                toggle : this.onGroupCollapse
            }

        });
    },

    selectGrid: function () {
        this.getReportPanel().removeAll();
        var gridInstance = Ext.widget("gridPanel");
        this.getReportPanel().add(gridInstance);
    },

    onPanelRendered : function() {
        //just a console log to show when the panel si rendered
        console.log('The panel was rendered');
    },

    onSummaryToggle : function(button, pressed) {
        console.log('Sumary toggle button was pressed: ' + pressed);
        var buttonText = pressed ? 'Hide Summary' : 'Show Summary';
        button.setText(buttonText);
        var view = this.getReportPanel().down('summaryGrid').getView();
        view.getFeature('groupSummary').toggleSummaryRow(pressed);
        view.refresh();
    },

    onSummaryDisable : function(button, pressed) {
        console.log('Sumary enable/disable button was pressed: ' + pressed);
        var view = this.getReportPanel().down('summaryGrid').getView();
        if(pressed){
            button.setText('Disable Grouping');
            view.getFeature('groupSummary').enable();
        }
        else {
            button.setText('Enable Grouping');
            view.getFeature('groupSummary').disable();
        }
    },

    onGroupCollapse : function(button, pressed) {
        console.log('Sumary enable/disable button was pressed: ' + pressed);
        var view = this.getReportPanel().down('summaryGrid').getView();
        var groupFeature = view.getFeature('groupSummary');
        if(pressed){
            button.setText('Collapse All');
            view.getEl().query('.x-grid-group-hd').forEach(function (group) {
                var groupBody = Ext.fly(group.nextSibling, '_grouping');
                groupFeature.expand(groupBody);
            });
        }
        else {
            button.setText('Expand All');
            view.getEl().query('.x-grid-group-hd').forEach(function (group) {
                var groupBody = Ext.fly(group.nextSibling, '_grouping');
                groupFeature.collapse(groupBody);
            });
        }
    }

});