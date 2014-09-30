Ext.define('DEMO.view.grid.GridPanel', {
    extend: 'Ext.container.Container',
    alias : 'widget.gridPanel',
    items:[
    /*{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                id: 'hideShow',
                xtype : 'button',
                text: 'Hide Summary',
                pressed: true,
                enableToggle: true
            },
            {
                xtype: 'tbseparator'
            },
            {
                id: 'grouping',
                xtype : 'button',
                text: 'Disable Grouping',
                pressed: true,
                enableToggle: true
            },
            {
                xtype: 'tbseparator'
            },
            {
                id: 'collapse',
                xtype : 'button',
                text: 'Collapse All',
                pressed: true,
                enableToggle: true
            },
        ]
    },*/
    {
        xtype: 'summaryGrid'
    },]
});