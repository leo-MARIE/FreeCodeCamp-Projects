const container = d3.select(".container");

d3.json(
'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json',
function (e, myJson) {// myJson is the parsed data

  const w = 1000;
  const h = 300;
  const padding = 60;

  const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function pickColor(temp) {
    if (temp < 3) {
      return "rgb(3, 7, 252)";
    } else if (temp < 4) {
      return "rgb(3, 144, 252)";
    } else if (temp < 5) {
      return "rgb(3, 252, 235)";
    } else if (temp < 6) {
      return "rgb(227, 252, 3)";
    } else if (temp < 7) {
      return "rgb(252, 235, 3)";
    } else if (temp < 8) {
      return "rgb(252, 202, 3)";
    } else if (temp < 9) {
      return "rgb(252, 169, 3)";
    } else if (temp < 10) {
      return "rgb(252, 144, 3)";
    } else if (temp < 11) {
      return "rgb(252, 111, 3)";
    } else if (temp < 12) {
      return "rgb(252, 69, 3)";
    } else {return "rgb(252, 3, 3)";}
  }

  // ----- SCALES -----

  const minYear = new Date(d3.min(myJson.monthlyVariance, d => d.year)),
  maxYear = new Date(d3.max(myJson.monthlyVariance, d => d.year));

  const xScale = d3.scaleLinear().
  domain([minYear - 0.75, maxYear]).
  range([padding, w - padding]);

  const yScale = d3.scaleLinear().
  domain([-0.5, 11.5]).
  range([padding, h - padding]);

  // ----- TITLE -----
  d3.select("body").
  append("h2").
  text("Heat Map").
  attr("id", "title").
  style("font-size", "35px");

  // ----- DESCRIPTION -----
  d3.select("body").
  append("h3").
  text("Earth is burning").
  attr("id", "description").
  style("font-size", "20px");

  // ----- SVG -----
  const svg = d3.select("body").
  append("svg").
  attr("width", w).
  attr("height", h);

  // ----- CELLS -----
  svg.selectAll("rect").
  data(myJson.monthlyVariance).
  enter().
  append("rect").
  attr("x", (d, i) => xScale(d.year) - 2).
  attr("y", (d, i) => yScale(d.month - 1) - 8).
  attr("width", "4px").
  attr("height", "16px").
  attr("fill", d => pickColor(myJson.baseTemperature + d.variance)).
  attr("class", "cell") // class styled in style, change color when hover
  .attr("data-month", d => d.month - 1).
  attr("data-year", d => d.year).
  attr("data-temp", d => d.variance + myJson.baseTemperature)

  // -----   MOUSE FUNCTIONS    -----
  .on("mouseover", function (d, i) {// mouseover function
    d3.select(this);

    tooltip.style("opacity", 0.8).
    style('left', d3.event.pageX - 70 + 'px').
    style('top', '150px').
    attr("id", "tooltip").
    attr("data-year", d.year).
    html(monthArray[d.month - 1] + " " + d.year + "<br>" + (8.66 + d.variance).toFixed(2) + " °C").
    style("background", pickColor(d.variance + myJson.baseTemperature));
  }) // on mouseover
  .
  on("mouseout", function (d, i) {// mouseout function
    d3.select(this);
    tooltip.style("opacity", 0);
  }); // on mouse out

  //   -----   TOOLTIP   -----
  const tooltip = d3.select("body").
  append("div").
  attr("id", "tooltip").
  style("opacity", 0);

  // -----   AXIS   -----
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));

  const yAxis = d3.axisLeft(yScale).tickFormat(d => monthArray[d]);

  svg.append("g") // creates g element for xAxis
  .attr("transform", "translate(0," + (h - padding) + ")") // translates it
  .attr("id", "x-axis").
  call(xAxis); // call it

  svg.append("g").
  attr("transform", "translate(" + padding + ", 0)").
  attr("id", "y-axis").
  call(yAxis);


  // ----- LEGEND -----
  const legendArray = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const xScaleLegend = d3.scaleLinear().
  domain([3, 13]).
  range([300, 460]);

  const legend = d3.select("body").
  append("svg").
  attr("width", "160x").
  attr("id", "legend").
  attr("height", h);

  legend.selectAll("rect").
  data(legendArray).
  enter().
  append("rect").
  attr("x", (d, i) => xScaleLegend(d)).
  attr("y", "15px").
  attr("width", "16px").
  attr("height", "16px").
  attr("fill", d => pickColor(d));

  const xAxisLegend = d3.axisBottom(xScaleLegend);

  legend.append("g") // creates g element for xAxis
  .attr("transform", "translate(0, 30)") // translates it
  .attr("id", "x-axis-legend").
  call(xAxisLegend); // call it


}); //d3.json