Ext.define('DEMO.view.chart.CityPieChart' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.cityPieChart',
    id: 'cityPieChart',
    
    height: 500,
    width: 800,
    animate: true,
    shadow: true,
    store : 'Cities',
    theme: 'Base:gradients',
    legend: {
        position: 'right'
    },
    insetPadding: 25,
    
    series: [{
        type: 'pie',
        field: 'population',
        highlight: true,
        showInLegend: true,
        tips: {
          trackMouse: true,
          width: 200,
          height: 40,
          renderer: function(storeItem, item) {
        	    this.setTitle(storeItem.get('name') + ' current Year<br/>Population is ' + storeItem.get('population'));
        	}
        },
        label: {
            display: 'rotate',
            field: 'name',
            font: '18px Arial',
            contrast: true	
        },
        highlight: {
          segment: {
            margin: 20
          }
        },
    }]
    
});