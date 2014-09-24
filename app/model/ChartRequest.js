Ext.define('DEMO.model.ChartRequest', {

    config:{
        type:'',
        xtitle:'',
        ytitle:'',
        xfield: '',
        yfield: '',
        seriesTitle: ''
    },
    constructor:function (config) {
        this.initConfig(config);

    },
    statics:{
        getType:function () {
            return this.type;
        },
        getXtitle:function () {
            return this.xtitle;
        },
        getXfield:function () {
            return this.xfield;
        },
        getYtitle:function () {
            return this.ytitle;
        },
        getYfield:function () {
            return this.yfield;
        },
        getSeriesTitle:function () {
            return this.seriesTitle;
        },
    }

});

