Ext.define('DEMO.model.ReportRequest', {
    config:{
        type: '',
        data:'',
        sums:[],
        averages:[],
        levels: [],
        headers: [],
        fields: [],
        title: ''
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
        getTitle:function () {
            return this.title;
        },
        getType:function () {
            return this.type;
        },
    }

});

