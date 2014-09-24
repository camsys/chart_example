Ext.define('DEMO.view.chart.CityColumnChart' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.cityColumnChart',
    id: 'cityColumnChart',
    
    height: 600,
    width: 1000,
    animate: true,
    shadow: true,
    store : 'Cities',
    theme: 'Base',
    legend: {
        position: 'float',
        x: 800,
        y: 0
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
        type: 'column',
        axis: 'left',
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
            orientation: 'vertical',
            color: '#333',
          'text-anchor': 'middle'
        },
        xField: 'name',
        yField: ['population','lastYearPopulation'],
        title: ['Current Year', 'Last Year']
    }]
    
});