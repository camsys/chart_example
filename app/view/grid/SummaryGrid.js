Ext.define('DEMO.view.grid.SummaryGrid' ,{
    alias : 'widget.summaryGrid',
    title : 'List of Segments Grouped by Region and Jurisdiction',
    store : 'Bridges',
    extend: 'Ext.tree.Panel',
    height: 400,
    width: 800,
    padding: '5 5 5 5',
    useArrows: true,
    multiSelect: true,
    singleExpand: false,
    rootVisible: false,
    currentElement: 0,
    columns: [
        {
            xtype: 'treecolumn',
            text: 'Geographic Area',
            flex: 2,
            sortable: true,
            dataIndex: 'text'
        },{
            text: "Bridge",
            dataIndex: "BridgeName"
        },
        {
            xtype: 'templatecolumn',
            text: 'Length',
            flex: 1,
            sortable: true,
            dataIndex: 'Length',
            tpl: Ext.create('Ext.XTemplate', '{Length:this.format}', {
                format: function (val) {
                    if(val == 0)
                        return 'N/A'
                    return Math.round(val * 100) / 100;
                }
            })
        }

    ],
     listeners: {
         load: function (tree, node, records) {
             console.log('After loading a node: ' + node);
         }
     },

    //scrollbar for tree panel is busted in ExtJS 4.2.2, this hack partially fixes it.
    scroll          : false,
    viewConfig      : {
        style           : { overflow: 'auto', overflowX: 'hidden' }
    },
});