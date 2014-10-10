Ext.define('DEMO.view.chart.PieChart' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.pieChart',
    id: 'pieChart',
    
    height: 500,
    width: 800,
    animate: true,
    shadow: true,
    store : '',
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
