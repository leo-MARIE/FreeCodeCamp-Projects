const container = d3.select(".container");

// -----   D3.JSON FETCH, all the script is in the argument function
d3.json(
'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
function (e, myJson) {// myJson is the parsed data

  const w = 1000;
  const h = 300;
  const padding = 60;

  // ----- SCALES -----

  const minDate = new Date(d3.min(myJson, d => d.Year) - 1, 0, 0, 0, 0, 0, 0),
  maxDate = new Date(d3.max(myJson, d => d.Year) + 1, 0, 0, 0, 0, 0, 0);

  const minSeconds = new Date(d3.min(myJson, d => d.Seconds) * 1000),
  maxSeconds = new Date(d3.max(myJson, d => d.Seconds) * 1000);

  //Define ranges for x and y axes
  const xScale = d3.scaleTime().
  domain([minDate, maxDate]).
  range([padding, w - padding]);

  const yScale = d3.scaleTime().
  domain([maxSeconds, minSeconds]).
  range([h - padding, padding]);

  var timeFormat = d3.timeFormat('%M:%S');

  // ----- TITLE -----
  d3.select("body").
  append("h2").
  text("Doping in Professional Bicycle Racing").
  attr("id", "title").
  style("font-size", "35px");

  // ----- SVG -----
  const svg = d3.select("body") // creates svg canvas
  .append("svg").
  attr("width", w).
  attr("height", h);

  // ----- DOTS -----
  svg.selectAll("circle").
  data(myJson).
  enter().
  append("circle").
  attr("cx", (d, i) => xScale(new Date(d.Year, 0, 0, 0, 0, 0, 0))) // convert to date so we can scale it
  .attr("cy", (d, i) => yScale(new Date(d.Seconds * 1000))).
  attr("r", d => 5).
  attr("fill", "var(--color-text-primary)").
  attr("class", "dot") // class styled in style, change color when hover
  .attr("data-xvalue", (d, i) => new Date(d.Year, 0, 0, 0, 0, 0, 0)).
  attr("data-yvalue", (d, i) => new Date(d.Seconds * 1000)).
  on("mouseover", function (d, i) {// mouseover function
    d3.select(this).
    style("fill", "var(--color-text-secondary)").
    attr("r", 5);

    tooltip.style("opacity", 0.8).
    style('left', d3.event.pageX - 70 + 'px').
    style('top', '100px').
    attr("id", "tooltip").
    attr("data-year", new Date(d.Year, 0, 0, 0, 0, 0, 0)).
    html(d.Name + "<br>" + d.Time);
  }) // on mouseover
  .
  on("mouseout", function (d, i) {// mouseout function
    d3.select(this).
    style("fill", "var(--color-text-primary)");
    //         .attr("width", barWidth);  
    tooltip.style("opacity", 0);
  }); // on mouse out
  //Add tooltip
  const tooltip = d3.select("body").
  append("div").
  attr("id", "tooltip").
  style("opacity", 0);
  //   

  const xAxis = d3.axisBottom(xScale); // creates axis

  const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat);

  svg.append("g") // creates g element for xAxis
  .attr("transform", "translate(0," + (h - padding) + ")") // translates it
  .attr("id", "x-axis").
  call(xAxis); // call it

  svg.append("g").
  attr("transform", "translate(" + padding + ", 0)").
  attr("id", "y-axis").
  call(yAxis);

  var legendContainer = svg.append('g').attr('id', 'legend').
  text("legent text");

}); //d3.json