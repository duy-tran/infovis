function legend(range, colorType){
	var range = [0,2000];
	var width = 300;
    var height = 20;
    var margin = 20;
    var shift = 75;
    var svg = d3.select("#range-legend").append("svg")
    				.attr("width", width)
      				.attr("height", height+1)
      				.attr("id","legend")
    				// .style("position", "fixed")
    				.attr("transform", "translate(-40, -" + shift +")");
    var x = d3.scaleLinear().domain(range).range([margin, width-margin-1]);  
    svg.append("g")
    	.attr("id", "legend-axis")
    	.attr("class", "axis")
    	.attr("transform", "translate(0, 20)")
    	.call(d3.axisTop(x).ticks(5));
    var svg_color = d3.select("#range-legend").append("svg")
    				.attr("width", width)
      				.attr("height", height+1)
      				.attr("transform", "translate(-20, -" + (shift+5) +")");
    var defs = svg_color.append("defs");
    var linearGradient = defs.append("linearGradient")
    	.attr("id", "linear-gradient");
    linearGradient
    	.attr("x1", "0%").attr("y1", "0%")
    	.attr("x2", "100%").attr("y2", "0%");
	linearGradient.selectAll("stop")
    .data([
        {offset: "0%", color: "#2c7bb6"},
        {offset: "12.5%", color: "#00a6ca"},
        {offset: "25%", color: "#00ccbc"},
        {offset: "37.5%", color: "#90eb9d"},
        {offset: "50%", color: "#ffff8c"},
        {offset: "62.5%", color: "#f9d057"},
        {offset: "75%", color: "#f29e2e"},
        {offset: "87.5%", color: "#e76818"},
        {offset: "100%", color: "#d7191c"}
      ])
    .enter().append("stop")
    .attr("offset", function(d) { return d.offset; })
    .attr("stop-color", function(d) { return d.color; });
    svg_color.append("rect")
    	.attr("width", width - height*2)
    	.attr("height", height)
    	.style("fill", "url(#linear-gradient)");
}  