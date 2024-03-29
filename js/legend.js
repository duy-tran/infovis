function legend(){
	var range, cType;
	var containerID;

	var colorRange = {
		collisions : ["#ffffd8","#c0e6b5","#46b4c2","#225fa9","#091d59"],
		injured: ["#ffffcc","#fed677","#fd883c","#e11e20","#840a25"],
		killed: ["#f7f3f9","#d4b9da","#d85eae","#c2005d","#660621"]
	};

	var colorSet = [];
	for (var i = 0; i < colorRange.collisions.length; i++) {
		var temp = {};
		for (var key in colorRange) {
			temp[key] = colorRange[key][i];
		}
		colorSet.push(temp);
	}

	var width = 300;
    var height = 20;
    var margin = 20;
    var shift = 75;
    var ticks = 5;

    var svg, stops;
    var xScale = d3.scaleLinear().range([margin, width-margin-1]);
    var xAxisCall = d3.axisTop().ticks(ticks);
    var object = {};

    object.render = function(){
    	svg = d3.select(containerID).append("svg")
    			.attr("width", width)
      			.attr("height", height+1)
      			.attr("id","legend")
    			.attr("transform", "translate(-40, -" + shift +")"); 
		xScale.domain(range);
		xAxisCall.scale(xScale)
		svg.append("g")
			.attr("id", "legend-axis")
	    	.attr("transform", "translate(0, " + margin + ")")
	    	.call(xAxisCall);

	    svg = d3.select(containerID).append("svg")
	    				.attr("width", width)
	      				.attr("height", height+1)
	      				.attr("id","chartColor")
	     				.attr("transform", "translate(-20, -" + (shift) +")");
	    var gradient = svg.append("defs")
		    .append("linearGradient")
		    .attr("id", "linear-gradient");
		gradient
		    .attr("x1", "0%").attr("y1", "0%")
		    .attr("x2", "100%").attr("y2", "0%");
		stops = gradient.selectAll("stop")
		    .data(colorSet)
		    .enter()
		    .append("stop")
		    .attr("offset",function(d,i) { return i/4; })
		    .attr("stop-color", function(d) { return d.collisions; });
	    svg.append("rect")
	    	.attr("id","color-filler")
	    	.attr("width", width - height*2)
	    	.attr("height", height)
	    	.style("fill", "url(#linear-gradient)");
	    return object;
    };

    object.changeRange = function() {
    	xScale.domain(range);
    	xAxisCall.scale(xScale).ticks(Math.min(range[1], ticks));
    	d3.select("#legend-axis").transition().duration(900).call(xAxisCall);
    	return object;
    }

    object.changeType = function() {
    	stops.transition()
			.attr("stop-color", function(d) { return d[cType]; })
			.duration(900);
		return object;
    }

    object.chartType = function(value){
	    if (!arguments.length) return cType;
	    cType = value;
	    return object;
	};

	object.chartRange = function(value){
		if (!arguments.length) return range;
	    range = value;
	    return object;
	};

	object.container = function(value){
		if (!arguments.length) return containerID;
	    containerID = value;
	    return object;
	};

    return object;
};