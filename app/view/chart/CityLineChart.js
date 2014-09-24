Ext.define('DEMO.view.chart.CityLineChart' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.cityLineChart',
    id: 'cityLineChart',
    
    height: 600,
    width: 1000,
    animate: true,
    shadow: true,
    store : 'Cities',
    theme: 'Base',
    legend: {
        position: 'bottom'
    },
    
    axes: [{
        type: 'Numeric',
        position: 'left',
        fields: ['population','lastYearPopulation'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: 'Population',
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
        	    this.setTitle(storeItem.get('name') + ' current Year<br/>Population is ' + storeItem.get('population'));
          }
        },
        xField: 'name',
        yField: ['population'],
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
        	    this.setTitle(storeItem.get('name') + ' last Year<br/>Population is ' + storeItem.get('lastYearPopulation'));
          }
        },
        xField: 'name',
        yField: ['lastYearPopulation'],
        title: ['Last Year']
    }]
    
});