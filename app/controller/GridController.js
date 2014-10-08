Ext.define('DEMO.controller.GridController', {
    extend : 'Ext.app.Controller',

    views : ['grid.SummaryGrid'],

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

    selectReport: function (reportRequest) {
        for (i = 0; i < this.getReportPanel().items.getCount(); ++i) {
            this.getReportPanel().items.get(i).destroy()
        }
        var summaryGrid = Ext.widget("summaryGrid");
        var columnCount = reportRequest.getHeaders().length;
        summaryGrid.layout.columns = columnCount;

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

        this.getReportPanel().add(summaryGrid);
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

    buildHierarchy: function (records, reportRequest) {

            records = this.processTree(records, 0, reportRequest.levels, reportRequest.sums, reportRequest.averages);

            /*var totalNode = [];
            totalNode.text = 'Total';
            totalNode.leaf = true;

            var averages = reportRequest.averages;
            var sums = reportRequest.sums;

            for (var i in records) {
                var rec = records[i];
                for (var i in sums) {
                    var sum = sums[i];
                    if(!totalNode[sum]){
                        totalNode[sum] = 0;
                    }
                    totalNode[sum] = totalNode[sum] + rec[sum];
                };
                for (var i in averages) {
                    var average = averages[i];
                    if(!totalNode[average]){
                        totalNode[average] = 0;
                    }
                    totalNode[average] = totalNode[average] + rec[average];
                };
            };


            for (var i in averages) {
                var average = averages[i];
                totalNode[average] = totalNode[average] / records.length;
            };
            records.push(totalNode);*/
            return records;
        },


    processTree: function (records, depth, levels, sums, averages) {
        var field = levels[depth];
        var keys = {};
        Ext.each(records, function (rec) {
            key = rec[field];
            keys[key] = key;
        });
        var aggs = [];
        var keys = Object.keys(keys);
        keys.sort();

        Ext.each(keys, function (key) {
            var node = [];
            node.level = field;
            node.text = key;
            node.children = [];
            Ext.each(records, function (rec) {
                if (rec[field] == key) {
                    Ext.each(sums, function (sum) {
                        if(!node[sum]){
                            node[sum] = 0;
                        }
                        node[sum] = node[sum] + rec[sum];
                    });

                    Ext.each(averages, function (average) {
                        if(!node[average]){
                            node[average] = 0;
                        }
                        if(rec[average]){
                            node[average] = node[average] + rec[average];
                        }
                    });
                    node.children.push(rec);
                }
            });
            aggs.push(node);
        });
        Ext.each(aggs, function (agg) {
            for (var fieldName in agg) {
                if(averages.indexOf(fieldName) > -1){
                    agg[fieldName] = agg[fieldName] / agg.children.length;
                }
            }
        });

        Ext.each(aggs, function (agg) {
            if(levels.length > depth + 1){
                agg.children = this.processTree(agg.children, depth + 1, levels, sums, averages);
                Ext.each(agg.children, function (child) {
                    child.parent = agg;
                }, this);
            }
        }, this);

        return aggs;

    }
});