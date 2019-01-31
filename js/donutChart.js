function donut(category){  
  // Default settings
  var $el = d3.select("body")  
  var data = {};
  var statType = category;

  var radiusScale = {
    injured: 2,
    killed: 2.5
  }

  // var showTitle = true;
  var width = 160,
      height = 160,
      radius = width / radiusScale[statType];

  var currentVal;

  // var color = d3.scale.category20();
  var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.value; });

  var svg, g, arc; 

  var object = {};

  var typeColor = {
        pedestrian : '#BA4F15',
        cyclist : '#1F8A70',
        motorist: '#004358'
      };

  object.render = function(){
    if(!svg){
      arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius - (radius/2));

      svg = $el.append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      g = svg.selectAll(".arc")
        .data(pie(d3.entries(data)))
      .enter().append("g")
      .attr("class", "arc");

      var sum = 0;
      for (var key in data) {
          sum += data[key];
      } 

      g.append("path")
        // Attach current value to g so that we can use it for animation
        .each(function(d) { this._current = d; })
        .attr("d", arc)
        .style("fill", function(d) { return typeColor[d.data.key]; });
      g.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("font-size", "14px")
          .attr("fill","white")
          .style("text-anchor", "middle");
      g.select("text").text(function(d) { if (d.data.value) {return d.data.value}; });

      svg.append("text")
          .datum(data)
          .attr("x", 0 )
          .attr("y", -5 + radius/10 )
          .attr("class", "text-tooltip");

      svg.append("text")
          .datum(data)
          .attr("x", 0 )
          .attr("y", 10 + radius/10 )
          .attr("class", "title")  
          .style("text-anchor", "middle")
          .style("font-size", "14px")
          .text(statType);    

      svg.select("text.text-tooltip")
        .style("text-anchor", "middle")
        .attr("font-weight", "bold")
        .style("font-size", radius/4 + "px")
        .text(sum);

    }else{
      g.data(pie(d3.entries(data))).exit().remove();

      g.select("path")
      .transition().duration(900)
      .attrTween("d", function(a){
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
            return arc(i(t));
        };
      })

      var sum = 0;
      for (var key in data) {
          sum += data[key];
      } 
      g.select("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d)[0] + "," + arc.centroid(d)[1] + ")"; })
      .text(function(d) { if (d.data.value) {return d.data.value;} }).transition().duration(900);
      svg.select("text.text-tooltip").text(sum+'');
    }      
    return object;
  };

  // Getter and setter methods
  object.data = function(value){
    if (!arguments.length) return data;
    data = value[statType];
    return object;
  };

  object.$el = function(value){
    if (!arguments.length) return $el;
    $el = value;
    return object;
  };

  object.width = function(value){
    if (!arguments.length) return width;
    width = value;
    radius = Math.min(width, height) / 2;
    return object;
  };

  object.height = function(value){
    if (!arguments.length) return height;
    height = value;
    radius = Math.min(width, height) / 2;
    return object;
  };
  return object;
};