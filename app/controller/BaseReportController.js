Ext.define('DEMO.controller.BaseReportController', {
    extend : 'Ext.app.Controller',

    buildHierarchy: function (records, reportRequest) {

            records = this.processTree(records, 0, reportRequest.levels, reportRequest.sums, reportRequest.averages);
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