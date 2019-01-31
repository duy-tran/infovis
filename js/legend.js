function legend(){
	// var range = [0,1785];
	// var cType = 'collisions';
	var range, cType;
	var containerID;

	var colorRange = {
		collisions : ["#ffffd8","#c0e6b5","#46b4c2","#225fa9","#091d59"],
		injured: ["#ffffcc","#fed677","#fd883c","e11e20","#840a25"],
		killed: ["#f7f3f9","#d4b9da","#d85eae","#c2005d","#660621"]
	};

	var width = 300;
    var height = 20;
    var margin = 20;
    var shift = 75;

    var svg, svg_color;
    var object = {};

    object.render = function(){
    	svg = d3.select(containerID).append("svg")
    				.attr("width", width)
      				.attr("height", height+1)
      				.attr("id","legend")
    				.attr("transform", "translate(-40, -" + shift +")");
	    var x = d3.scaleLinear().domain(range).range([margin, width-margin-1]);  
	    svg.append("g")
	    	.attr("id", "legend-axis")
	    	.attr("class", "axis")
	    	.attr("transform", "translate(0, " + margin + ")")
	    	.call(d3.axisTop(x).ticks(5));

	    svg_color = d3.select(containerID).append("svg")
	    				.attr("width", width)
	      				.attr("height", height+1)
	      				.attr("id","chartColor")
	      				.attr("transform", "translate(-20, -" + (shift+5) +")");
	    var defs = svg_color.append("defs");
	    var linearGradient = defs.append("linearGradient")
	    	.attr("id", "linear-gradient");
	    linearGradient
	    	.attr("x1", "0%").attr("y1", "0%")
	    	.attr("x2", "100%").attr("y2", "0%");
	    var colorScale = d3.scaleLinear()
	    	.range(colorRange[cType]);
		linearGradient.selectAll("stop")
		    .data( colorScale.range() )
		    .enter().append("stop")
		    .attr("offset", function(d,i) { return i/(colorScale.range().length-1); })
		    .attr("stop-color", function(d) { return d; });
	    svg_color.append("rect")
	    	.attr("width", width - height*2)
	    	.attr("height", height)
	    	.style("fill", "url(#linear-gradient)");
	    return object;
    };

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
		// if (!arguments.length) return containerID;
	    containerID = value;
	    return object;
	};

    return object;
};