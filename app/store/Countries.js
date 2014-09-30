Ext.define('DEMO.store.Countries', {
    extend: 'Ext.data.TreeStore',
    model: 'DEMO.model.Country',
    proxy: {
        type: 'ajax',
        url: 'country.json',
        reader: {
            type: 'json',
            totalProperty: 'totalCount',
            root: 'countries',
            successProperty: 'success',

            levels: ['region', 'continent'],
            sums: ['gnp'],
            averages: ['lifeExpectancy'],

            filter: null,

            getData: function (data) {
                if (this.filter) {
                    var filterNode = this.filter[0];
                    this.filter.shift();
                    return filterNode.children;
                } else {
                    var records = data[this.root];

                    Ext.each(records, function (rec) {
                        rec.text = rec.name;
                        rec.leaf = true;
                    });

                    for (var i in this.levels) {
                        records = this.processTree(records, this.levels[i], this.levels, this.sums, this.averages);
                    };

                    var totalNode = [];
                    totalNode.text = 'Total';
                    totalNode.leaf = true;

                    var averages = this.averages;
                    var sums = this.sums;

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
                    records .push(totalNode);

                    data[this.root] = records;

                    return data;
                }
            },

            processTree: function (records, field, fields, sums, averages) {

                var keys = {};
                Ext.each(records, function (rec) {
                    key = rec[field];
                    keys[key] = key;
                });
                var aggs = [];
                var keys = Object.keys(keys);

                Ext.each(keys, function (key) {
                    var node = [];
                    node.level = field;
                    node.text = key;
                    node.children = [];
                    Ext.each(records, function (rec) {
                        if (rec[field] == key) {
                            for (var fieldName in rec) {
                                if(fields.indexOf(fieldName) > -1){
                                    node[fieldName] = rec[fieldName];
                                }
                            }

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
                                node[average] = node[average] + rec[average];
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

                return aggs;

            }
        }
    },
    root: {
        text: 'Tree display of Countries',
        id: 'myTree',
        expanded: false
    },
    folderSort: true,
    sorters: [
        {
            property: 'text',
            direction: 'ASC'
        }
    ],
    listeners: {

        beforeload: function (store, operation, options) {
            if (operation.node.data.level) {
                if(!this.proxy.reader.filter)
                    this.proxy.reader.filter = [];
                this.proxy.reader.filter.push(operation.node.data);
            }else{
                this.proxy.reader.filter = null;
            }
        },
    }

});