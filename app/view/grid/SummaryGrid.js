Ext.define('DEMO.view.grid.SummaryGrid' ,{
    alias : 'widget.summaryGrid',
    title : 'List of Countries Grouped by Continent and Region',
    store : 'Countries',
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
        },
        {
            xtype: 'templatecolumn',
            text: 'GNP',
            flex: 1,
            sortable: true,
            dataIndex: 'gnp',
            tpl: Ext.create('Ext.XTemplate', '{gnp:this.format}', {
                format: function (val) {
                    if(val == 0)
                        return 'N/A'
                    val = Math.round(val);
                    return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                }
            })
        },
        {
            xtype: 'templatecolumn',
            text: 'Average Life Expectancy',
            flex: 1,
            sortable: true,
            dataIndex: 'lifeExpectancy',
            tpl: Ext.create('Ext.XTemplate', '{lifeExpectancy:this.format}', {
                format: function (val) {
                    if(val == 0)
                        return 'N/A'
                    return Math.round(val);
                }
            })
        }

    ],
     listeners: {
         load: function (tree, node, records) {
             console.log('After loading a node: ' + node);
         }
     }
});