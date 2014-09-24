Ext.define('DEMO.view.chart.CityBarChart' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.cityBarChart',
    id: 'cityBarChart',
    
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
        position: 'bottom',
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
                	  	if(item.series.yField[ i % itemsPerRec ] == "lastYearPopulation"){
                	  		currentYear = false;
                	  	};  
                  }
              }
        	  
        	  if(currentYear){
        		  this.setTitle(storeItem.get('name') + ' current Year<br/>Population is ' + storeItem.get('population'));
        	  }
        	  else {
        		  this.setTitle(storeItem.get('name') + ' last Year<br/>Population is ' + storeItem.get('lastYearPopulation'));
              }
        	}
        },
        label: {
            display: 'insideEnd',
            field: ['population','lastYearPopulation'],
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#333',
            'text-anchor': 'middle'
        },
        xField: 'name',
        yField: ['population','lastYearPopulation'],
        title: ['Current Year', 'Last Year']
    }]
    
});