Ext.define('DEMO.controller.GridController', {
    extend : 'DEMO.controller.BaseReportController',

    refs:[
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
            reportRequest: this.selectReport,
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

    selectReport: function (reportRequests) {
        for (i = 0; i < this.getReportPanel().items.getCount(); ++i) {
            this.getReportPanel().items.get(i).destroy()
        }
        Ext.each(reportRequests, function (reportRequest) {
            var reportPanel = Ext.widget("panel");
            reportPanel.title = reportRequest.getTitle();

            var summaryGrid = {
                cells: [],
                add: function (cell) {
                    this.cells.push(cell);
                }
            }

            var featureData = reportRequest.getData();

            Ext.each(featureData, function (feature) {
                if(feature['Length'] && feature['NumberOfLanes']){
                    feature.LaneMiles  = feature['Length'] * feature['NumberOfLanes']
                }else{
                    feature.LaneMiles = 0;
                }
            });

            var tree = this.buildHierarchy(featureData, reportRequest);  //create the tree based on the levels defined in request
            this.buildTable(tree, summaryGrid, reportRequest);  //add the data to the table

            //now add a summary section below that aggregates by the second dimension
            var topLevel = reportRequest.getLevels().shift();
            tree = this.buildHierarchy(featureData, reportRequest);
            var summaryRoot = {};
            summaryRoot.level = topLevel;
            summaryRoot.text = "All " + topLevel + "s";
            summaryRoot.children = tree;

            reportRequest.getLevels().unshift(topLevel);  //put the level back in so the column offsets are correct
            Ext.each(reportRequest.getSums(), function (sum) {
                Ext.each(summaryRoot.children, function (child) {
                    if(!summaryRoot[sum]){
                        summaryRoot[sum] = 0;
                    }
                    summaryRoot[sum] = summaryRoot[sum] + child[sum];
                });
            }, this);

            this.buildTable(summaryRoot, summaryGrid, reportRequest);

            var columnCount = reportRequest.getHeaders().length;

            var table = '<table><tbody><tr>'
            var rowcount = 0;

            Ext.each(summaryGrid.cells, function (cell) {
                table = table.concat('<td'
                    + (cell.cellCls ? ' class='+ cell.cellCls : '')
                    + (cell.colspan ? ' colspan='+ cell.colspan : '') + '>'
                    + cell.html.toString() +
                    '</td>');
                rowcount = rowcount + (cell.colspan ? cell.colspan: 1);
                if(rowcount % columnCount == 0){
                    table = table.concat('</tr><tr>');
                    rowcount = 0;
                }
            }, this);

            table.concat('</tr></tbody></table>');
            reportPanel.add({
                html: table.toString()
            });

            this.getReportPanel().add(reportPanel);
        }, this);
    },

    buildTable: function (tree, table, reportRequest) {

        Ext.each(tree, function (node) {
            var levelIndex = reportRequest.getLevels().indexOf(node.level);

            //pad the left level columns with empty cells
            for(i = 0; i < levelIndex; i++){
                table.add({
                    html: "&nbsp;"
                });
            }

            if(levelIndex < reportRequest.getLevels().length -1){
                //add a level header row
                table.add({
                    html: node.text,
                    cellCls: 'highlight',
                    colspan: reportRequest.getFields().length - levelIndex
                });
            }else{
                //bottom level
                table.add({
                    html: node.text
                });

                Ext.each(reportRequest.getFields(), function (field) {
                    if(reportRequest.getLevels().indexOf(field) == -1){

                        var value = node[field] == null ? "&nbsp;" : node[field];
                        if(typeof value == 'number'){
                            value = Math.round(value);
                        }
                        table.add({
                            html: value.toString()
                        });
                    }

                }, this);
            }

            if(node.level && reportRequest.getLevels().indexOf(node.level) < reportRequest.getLevels().length - 1){
                if (reportRequest.getLevels().indexOf(node.level) == reportRequest.getLevels().length - 2) {
                    //add subheader above detail rows
                    for (i = 0; i < levelIndex + 1; i++) {
                        table.add({
                            html: "&nbsp;"
                        });
                    }
                    table.add({
                        html: reportRequest.getHeaders()[levelIndex + 1],
                        colspan: reportRequest.getLevels().length - levelIndex - 1
                    });
                    for (i = reportRequest.getLevels().length; i < reportRequest.getHeaders().length; i++) {
                        table.add({
                            html: reportRequest.getHeaders()[i]
                        });
                    }

                    this.buildTable(node.children, table, reportRequest);

                    var parentText = node.text;
                    var parent = node.parent;
                    while(parent != null){
                        parentText = parent.text;
                        parent = parent.parent;
                    }

                    //add subtotal row
                    for (i = 0; i < levelIndex + 1; i++) {
                        table.add({
                            html: "&nbsp;"
                        });
                    }
                    table.add({
                        html: parentText.indexOf('All') == 0 ? "Total" : "Subtotal"
                    });
                    Ext.each(reportRequest.getFields(), function (field) {
                        if(reportRequest.getLevels().indexOf(field) == -1){

                            var value = node[field] == null ? "&nbsp;" : node[field];
                            if(typeof value == 'number'){
                                value = Math.round(value);
                            }
                            table.add({
                                html: value.toString()
                            });
                        }
                    }, this);
                }else{
                    this.buildTable(node.children, table, reportRequest);
                }
            }
        }, this);
    },

});