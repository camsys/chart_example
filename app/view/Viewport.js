Ext.define('DEMO.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'DEMO.view.ReportPanel'
    ],

    layout: {
        type: 'border'
    },

    items: [{
        region: 'west',
        xtype: 'panel',
        title: 'west',
        width: 150,
        items:[{
                xtype: 'label',
                html: '<b>Select Chart</b><br/>'
            },
            {
                xtype: 'button',
                text: 'Switch to Bar Chart',
                action: 'showBarChart',
            },
            {
                xtype: 'button',
                text: 'Switch to Column Chart',
                action: 'showColumnChart',
            },
            {
                xtype: 'button',
                text: 'Switch to Pie Chart',
                action: 'showPieChart',
            },
            {
                xtype: 'button',
                text: 'Switch to Line Chart',
                action: 'showLineChart',
            },
            {
                xtype: 'button',
                text: 'showGrid',
                action: 'showGrid',
            },]
    },{
        region: 'center',
        xtype: 'container',
        items:[{
            title: 'Center Tab 1',
            xtype: 'reportPanel'
        }]
    }]
});