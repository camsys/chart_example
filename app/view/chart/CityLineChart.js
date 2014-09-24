Ext.define('DEMO.view.chart.CityLineChart' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.cityLineChart',
    id: 'cityLineChart',
    
    height: 600,
    width: 1000,
    animate: true,
    shadow: true,
    store : 'ChartDatapoints',
    theme: 'Base',
    legend: {
        position: 'bottom'
    },
    
    axes: [{
        type: 'Numeric',
        position: 'left',
        fields: ['metric','metric2'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: 'metric',
        grid: true,
        minimum: 100000,
        majorTickSteps: 15
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['name'],
        title: 'US Cities'
    }],
    series: [{
        type: 'line',
        axis: 'left',
        highlight: true,
        tips: {
          trackMouse: true,
          width: 200,
          height: 40,
          renderer: function(storeItem, item) {
        	    this.setTitle(storeItem.get('name') + ' current Year<br/>metric is ' + storeItem.get('metric'));
          }
        },
        xField: 'name',
        yField: ['metric'],
        title: ['Current Year']
    },
    {
        type: 'line',
        axis: 'left',
        highlight: true,
        tips: {
          trackMouse: true,
          width: 200,
          height: 40,
          renderer: function(storeItem, item) {
        	    this.setTitle(storeItem.get('name') + ' last Year<br/>metric is ' + storeItem.get('metric2'));
          }
        },
        xField: 'name',
        yField: ['metric2'],
        title: ['Last Year']
    }]
    
});