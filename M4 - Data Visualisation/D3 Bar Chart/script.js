const container = d3.select(".container");

// -----   D3.JSON FETCH, all the script is in the argument function
d3.json(
'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json',
function (e, myJson) {// myJson is the parsed data

  const w = 1000;
  const h = 300;
  const padding = 60;

  // ----- SCALES -----

  const minDate = new Date(myJson.data[0][0]),
  maxDate = new Date(myJson.data[myJson.data.length - 1][0]);

  //define width of bar
  const barWidth = w / myJson.data.length;

  //Define ranges for x and y axes
  const xScale = d3.scaleTime().
  domain([minDate, maxDate]).
  range([padding, w - padding]);

  const yScale = d3.scaleLinear().
  domain([0, d3.max(myJson.data, d => d[1])])
  //  .range([h - padding, padding]);
  .range([h - padding, padding]);

  // ----- TITLE -----
  d3.select("body").
  append("h2").
  text("US GDP DATA").
  attr("id", "title").
  style("font-size", "35px");

  // ----- SVG -----
  const svg = d3.select("body") // creates svg canvas
  .append("svg").
  attr("width", w).
  attr("height", h);

  // ----- BARS -----
  svg.selectAll("rect").
  data(myJson.data).
  enter().
  append("rect").
  attr("x", (d, i) => xScale(new Date(d[0]))) // convert to date so we can scale it
  .attr("y", (d, i) => yScale(d[1])).
  attr("width", barWidth).
  attr("height", (d, i) => d[1] / 100).
  attr("fill", "navy") // sets color
  .attr("class", "bar") // class styled in style, change color when hover
  .attr("data-date", (d, i) => d[0]).
  attr("data-gdp", (d, i) => d[1]).
  on("mouseover", function (d, i) {// mouseover function
    d3.select(this).
    style("fill", "green").
    attr("width", barWidth);

    tooltip.style("opacity", 0.8).
    style('left', d3.event.pageX - 70 + 'px').
    style('top', '100px').
    attr("id", "tooltip").
    attr("data-date", d[0]).
    attr("data-gdp", d[1]).
    html(d[0] + "<br>" + d[1] + " billions $");
  }).

  on("mouseout", function (d, i) {// mouseout function
    d3.select(this).
    style("fill", "navy").
    attr("width", barWidth);
    tooltip.style("opacity", 0);
  });
  //Add tooltip
  const tooltip = d3.select("body").
  append("div").
  attr("id", "tooltip").
  style("opacity", 0);

  const xAxis = d3.axisBottom(xScale); // creates axis

  const yAxis = d3.axisLeft(yScale);

  svg.append("g") // creates g element for xAxis
  .attr("transform", "translate(0," + (h - padding) + ")") // translates it
  .attr("id", "x-axis").
  call(xAxis); // call it

  svg.append("g").
  attr("transform", "translate(" + padding + ", 0)").
  attr("id", "y-axis").
  call(yAxis);

}); //d3.json