Ext.define('DEMO.view.grid.GridPanel', {
    extend: 'Ext.container.Container',
    alias : 'widget.gridPanel',
    items:[
    {
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                id: 'expand',
                xtype : 'button',
                text: 'Expand All',
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
    },
    {
        xtype: 'summaryGrid'
    },]
});