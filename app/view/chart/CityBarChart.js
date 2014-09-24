Ext.define('DEMO.view.chart.CityBarChart' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.cityBarChart',
    id: 'cityBarChart',
    
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
        position: 'bottom',
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
        position: 'left',
        fields: ['name'],
        title: 'US Cities'
    }],
    series: [{
        type: 'bar',
        axis: 'bottom',
        highlight: true,
        tips: {
          trackMouse: true,
          width: 200,
          height: 40,
          renderer: function(storeItem, item) {
        	  var currentYear = true;
        	  for( var i = 0; i < item.series.items.length; i++ ){
                  if( item == item.series.items[i] ){
                	  	itemsPerRec = item.series.items.length / item.storeItem.store.getCount();
                	  	if(item.series.yField[ i % itemsPerRec ] == "metric2"){
                	  		currentYear = false;
                	  	};  
                  }
              }
        	  
        	  if(currentYear){
        		  this.setTitle(storeItem.get('name') + ' current Year<br/>metric is ' + storeItem.get('metric'));
        	  }
        	  else {
        		  this.setTitle(storeItem.get('name') + ' last Year<br/>metric is ' + storeItem.get('metric2'));
              }
        	}
        },
        label: {
            display: 'insideEnd',
            field: ['metric','metric2'],
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#333',
            'text-anchor': 'middle'
        },
        xField: 'name',
        yField: ['metric','metric2'],
        title: ['Current Year', 'Last Year']
    }]
    
});