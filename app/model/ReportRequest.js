Ext.define('DEMO.model.ReportRequest', {
    config:{
        data:'',
        sums:[],
        averages:[],
        levels: [],
        headers: [],
        fields: []
    },
    constructor:function (config) {
        this.initConfig(config);
    },
    statics:{
        getData:function () {
            return this.data;
        },
        getSums:function () {
            return this.sums;
        },
        getAverages:function () {
            return this.averages;
        },
        getLevels:function () {
            return this.levels;
        },
        getHeaders:function () {
            return this.headers;
        },
        getFields:function () {
            return this.fields;
        },
    }

});

