
	// set the stage
	var margin = {t:30, r:20, b:20, l:40 },
		w = 1000 - margin.l - margin.r,
		h = 500 - margin.t - margin.b,
		x = d3.scaleLinear().range([0, w]),
		y = d3.scaleLinear().range([h - 60, 0]),
		//colors that will reflect geographical regions
		color = {

			"Bug": "#4E79A7",
		
			"Dark": "#A0CBE8",
		
			"Electric": "#F28E2B",
		
			"Fairy": "#FFBE7D",
		
			"Fighting": "#59A14F",
		
			"Fire": "#8CD17D",
		
			"Ghost": "#B6992D",
		
			"Grass": "#499894",
		
			"Ground": "#86BCB6",
		
			"Ice": "#FABFD2",
		
			"Normal": "#E15759",
		
			"Poison": "#FF9D9A",
		
			"Psychic": "#79706E",
		
			"Steel": "#BAB0AC",
		
			"Water": "#D37295"
		
		}

	var svg = d3.select("#chart").append("svg")
		.attr("width", w + margin.l + margin.r)
		.attr("height", h + margin.t + margin.b);

	// set axes, as well as details on their ticks
	var xAxis = d3.axisBottom().scale(x);
		// .scale(x)
		// .ticks(20)
		// .tickSubdivide(true)
		// .tickSize(6, 3, 0)
	

	var yAxis = d3.axisLeft().scale(y);
		// .scale(y)
		// .ticks(20)
		// .tickSubdivide(true)
		// .tickSize(6, 3, 0)


	// group that will contain all of the plots
	var groups = svg.append("g").attr("transform", "translate(" + margin.l + "," + margin.t + ")");

	// array of the regions, used for the legend
	var types = ["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"]


// bring in the data, and do everything that is data-driven
	d3.csv("pokemon.csv").then(function(data) {

		// var x0 = Math.max(-d3.min(data, function(d) { return d.trust; }), d3.max(data, function(d) { return d.trust; }));
	x.domain([10, 250]);
	y.domain([100, 850])

	// let gen = Array.from(new Set(data.Generation));
	// let a = [data.generation];
	// let a = 
	
	// let unique = a.filter((item, i, ar) => ar.indexOf(item) === i);
	// console.log(a);


	let filtered_gendata = data.map( function(d){
		return d['Generation'];})
		const distinct_gen = [...new Set(filtered_gendata)];
		

	var dropDownChange= function(){
		var newGen = d3.select(this).property('value'),
		newData = data[newGen];
		mouseOn(newData);
	}	
	var dropDown = d3.select("#filter").append("select")
	.selectAll('option')
	.data(distinct_gen)
    .enter()
    .append("option")
    .text(function(d){return d;})
	.attr("value",function(d){return d;})
	.on("change", dropDownChange);

	

	// style the circles, set their locations based on data
	var circles =
	groups.selectAll("circle")
		.data(data)
	  .enter().append("circle")
	  .attr("class", "circles")
	//   .attr({
	//     cx: function(d) { return x(+d.SpDef); },
	//     cy: function(d) { return y(+d.Total); },
	//     r: 8,
	//     id: function(d) { return d.Type_1; }
	//   })
		.attr('cx',  function(d) { return x(+d.SpDef); })
		.attr('cy',  function(d) { return y(+d.Total); })
		.attr('r', 8)
		.style("fill", function(d) { 
			return color[d.Type_1];
		 })
		.on("mouseover", function(d) {		
			div.transition()
            .duration(200)
            .style("opacity", .9);
          div.html(d.Name + "<br/>" + d.Type_1 + "<br/>" + d.Type_2)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");

			})	
		  
var options = dropDown.selectAll("option")
           .data(data)
         .enter()
		   .append("option");
		///checkbox
	// 	   var svgContainer = d3.select("#vis").append("svgContainer").attr("width", 500).attr("height", 300),
	// 	   checkBox1 = new d3CheckBox(),
	// 	   checkBox2 = new d3CheckBox(),
	// 	   checkBox3 = new d3CheckBox();
   
   
	//    //Setting up each check box
	//    checkBox1.size(40).x(10).y(10).markStrokeWidth(10).boxStrokeWidth(4).checked(true).clickEvent(update);
	//    checkBox2.size(30).x(70).y(20).rx(5).ry(5).markStrokeWidth(3).boxStrokeWidth(4).checked(true).clickEvent(update);
	//    checkBox3.x(120).y(30).checked(false).clickEvent(update);
   
	//    svgContainer.call(checkBox1);
	//    svgContainer.call(checkBox2);
	//    svgCOntainer.call(checkBox3);

// options.text(function (d) { return d.Type_1; })
//        .attr("value", function (d) { return d.Type_1; });
       
	// what to do when we mouse over a bubble
	var mouseOn = function() { 
		var circle = d3.select(this);

	// transition to increase size/opacity of bubble
		circle.transition()
		.duration(800).style("opacity", 1)
		.attr("r", 16).ease("elastic");

		// append lines to bubbles that will be used to show the precise data points.
		// translate their location based on margins
		svg.append("g")
			.attr("class", "guide")
		.append("line")
			.attr("x1", circle.attr("cx"))
			.attr("x2", circle.attr("cx"))
			.attr("y1", +circle.attr("cy") + 26)
			.attr("y2", h - margin.t - margin.b)
			.attr("transform", "translate(40,20)")
			.style("stroke", circle.style("fill"))
			.transition().delay(200).duration(400).styleTween("opacity", 
						function() { return d3.interpolate(0, .5); })

		svg.append("g")
			.attr("class", "guide")
		.append("line")
			.attr("x1", +circle.attr("cx") - 16)
			.attr("x2", 0)
			.attr("y1", circle.attr("cy"))
			.attr("y2", circle.attr("cy"))
			.attr("transform", "translate(40,30)")
			.style("stroke", circle.style("fill"))
			.transition().delay(200).duration(400).styleTween("opacity", 
						function() { return d3.interpolate(0, .5); });

	// function to move mouseover item to front of SVG stage, in case
	// another bubble overlaps it
		d3.selection.prototype.moveToFront = function() { 
		  return this.each(function() { 
			this.parentNode.appendChild(this); 
		  }); 
		};

	// skip this functionality for IE9, which doesn't like it
		// if (!$.browser.msie) {
		// 	circle.moveToFront();	
		// 	}
	};
	// what happens when we leave a bubble?
	var mouseOff = function() {
		var circle = d3.select(this);

		// go back to original size and opacity
		circle.transition()
		.duration(800).style("opacity", .5)
		.attr("r", 8).ease("elastic");

		// fade out guide lines, then remove them
		d3.selectAll(".guide").transition().duration(100).styleTween("opacity", 
						function() { return d3.interpolate(.5, 0); })
			.remove()
	};

	// run the mouseon/out functions
	// circles.on("mouseover", mouseOn);
	// circles.on("mouseout", mouseOff);


    //tooltips
    var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0)

    
    // const circles = svgContainer.selectAll(".circle")
    // .data(data)
    // .enter()
    // .append('circle')
    //     .attr('cx', SpDef)
    //     .attr('cy', Total)
    //     .attr('r', 3)
    //     .attr('fill', "#4286f4")

    // .on("mouseout", function(d) {		
    //     div.transition()		
    //         .duration(500)		
    //         .style("opacity", 0);	
    // });


	// the legend color guide
    var legend = svg.selectAll("rect")
			.data(types)
		.enter().append("rect")
		// .attr({
		//   x: function(d, i) { return (40 + i*50); },
		//   y: h,
		//   width: 10,
		//   height: 12
		.attr('x', function(d, i) { return (40 + i*50);})
		.attr('y', h)
		.attr('width', 10)
		.attr('height', 12)
		.style("fill", function(d,i) { 
			return color[types[i]];
		 });

	// legend labels	
        svg.selectAll("text")
			.data(types)
        .enter().append("text")
		// .attr({
		// x: function(d, i) { return (40 + i*50); },
		// y: h + 24,
		// })
		// .text(function(d) { return d; });
		.attr('x', function(d, i) { return (40 + i*50);})
		.attr('y', h + 24)

		.style("fill", function(d,i) { 
			return d;});
		

	// draw axes and axis labels
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(" + margin.l + "," + (h - 60 + margin.t) + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + margin.l + "," + margin.t + ")")
		.call(yAxis);

	svg.append("text")
		.attr("class", "x label")
		.attr("text-anchor", "end")
		.attr("x", w + 50)
		.attr("y", h - margin.t - 5)
		.text("Special Defense");

	svg.append("text")
		.attr("class", "y label")
		.attr("text-anchor", "end")
		.attr("x", -20)
		.attr("y", 45)
		.attr("dy", ".75em")
		.attr("transform", "rotate(-90)")
		.text("Total");
		
		
	dropDown.on("change", function() {
      var selected = this.value;
      displayOthers = this.checked ? "inline" : "none";
      display = this.checked ? "none" : "inline";


      svg.selectAll(".circles")
          .filter(function(d) {return selected != d.country;})
          .attr("display", displayOthers);
          
      svg.selectAll(".circles")
          .filter(function(d) {return selected == d.country;})
          .attr("display", display);
      });

});
	// sort data alphabetically by region, so that the colors match with legend
	// data(function(a) { return d3.ascending(a.Type_1); })//might need to put b.type_1 back in
	// console.log(data)


