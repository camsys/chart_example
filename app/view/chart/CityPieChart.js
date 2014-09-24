Ext.define('DEMO.view.chart.CityPieChart' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.cityPieChart',
    id: 'cityPieChart',
    
    height: 500,
    width: 800,
    animate: true,
    shadow: true,
    store : 'ChartDatapoints',
    theme: 'Base:gradients',
    legend: {
        position: 'right'
    },
    insetPadding: 25,
    
    series: [{
        type: 'pie',
        field: 'metric',
        highlight: true,
        showInLegend: true,
        tips: {
          trackMouse: true,
          width: 200,
          height: 40,
            renderer: function(storeItem, item) {
                this.setTitle('Item: ' + storeItem.get('name') + '<br/>Measurement is ' + storeItem.get('metric'));
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