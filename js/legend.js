function legend(){
	var max = 2000;
	var width = 300;
    var height = 50;
    var margin = 20;
    var svg = d3.select("#range-legend").append("svg")
    				.attr("width", width)
      				.attr("height", margin+1)
    				// .style("position", "fixed")
    				.attr("transform", "translate(0, 5)")
    				.style("top", 0)
      				.style("left", 0)
      				.style("margin-top","0px");
	var canvas = d3.select("#range-legend").append("canvas")
                    .attr("width", width)
                    .attr("height", height);                  
    var ctx = canvas.node().getContext("2d");
    ctx.translate(0,0);
    var x = d3.scaleLinear().domain([0, 1]).range([margin, width-margin]);  
    var y = d3.scaleLinear().domain([0, max]).range([margin+1, width-margin-1]);  
    svg.append("g")
    	.attr("id", "legend-axis")
    	.attr("class", "axis")
    	.attr("transform", "translate(0, 20)")
    	.call(d3.axisTop(y).ticks(5));
    var color_sequential = d3.scaleSequential(d3.interpolateYlGnBu).domain([0,1]);                
    d3.range(0, 1, 0.001)
        .forEach(function (d) {
		    ctx.beginPath();
		    ctx.strokeStyle = color_sequential(d);
		    ctx.moveTo(x(d), 0);
		    ctx.lineTo(x(d), 20);      
		    ctx.stroke();
    	});
}  