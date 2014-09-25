Ext.define('DEMO.view.chart.PieChart' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.pieChart',
    id: 'pieChart',
    
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

/*

enableToggle: true,
    pressed: false,
    text: 'Donut',
    toggleHandler: function(btn, pressed) {
    var chart = Ext.getCmp('chartCmp');
    chart.series.first().donut = pressed ? 35 : false;
    chart.refresh();
}
}],
items: {
    xtype: 'chart',
        id: 'chartCmp',
        animate: true,
        store: store1,
        shadow: true,
        legend: {
        position: 'right'
    },
    insetPadding: 60,
        theme: 'Base:gradients',
        series: [{
        type: 'pie',
        field: 'data1',
        showInLegend: true,
        donut: donut,
        tips: {
            trackMouse: true,
            width: 140,
            height: 28,
            renderer: function(storeItem, item) {
                //calculate percentage.
                var total = 0;
                store1.each(function(rec) {
                    total += rec.get('data1');
                });
                this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
            }
        },
        highlight: {
            segment: {
                margin: 20
            }
        },
        label: {
            field: 'name',
            display: 'rotate',
            contrast: true,
            font: '18px Arial'
        }
    }]
}
});
});

*/
