Ext.define('DEMO.view.grid.SummaryGrid' ,{
        extend: 'Ext.panel.Panel',
        alias: 'widget.summaryGrid',
    title: 'Table Layout',
    autoScroll: true,
    height: 600,
    layout: {
        type: 'table',
        // The total column count must be specified here
        //columns: 10
    },
    defaults: {
        // applied to each contained panel
        bodyStyle: 'padding:20px'
    },

});