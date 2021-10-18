const w = 960;
const h = 600;
const padding = 60;

function pickColor(degree) {
  if (degree < 10) {
    return "rgb(235, 52, 52)";
  } else if (degree < 20) {
    return "rgb(235, 107, 52)";
  } else if (degree < 30) {
    return "rgb(235, 156, 52)";
  } else if (degree < 40) {
    return "rgb(235, 186, 52)";
  } else if (degree < 50) {
    return "rgb(232, 235, 52)";
  } else if (degree < 60) {
    return "rgb(168, 235, 52)";
  } else if (degree < 70) {
    return "rgb(95, 235, 52)";
  } else if (degree < 80) {
    return "rgb(52, 235, 162)";
  } else if (degree < 90) {
    return "rgb(52, 235, 235)";
  } else {return "rgb(52, 131, 235)";}
}

// ----- TITLE -----
d3.select("body").
append("h2").
text("Choropleth Map").
attr("id", "title").
style("font-size", "35px");
//style("margin-left", "350px");

// ----- DESCRIPTION -----
d3.select("body").
append("h3").
text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)").
attr("id", "description").
style("font-size", "20px").
style("margin-left", "120px");

// ----- FETCH -----
const EDUCATION_FILE =
'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json';
const COUNTY_FILE =
'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';

d3.queue().
defer(d3.json, COUNTY_FILE).
defer(d3.json, EDUCATION_FILE).
await(ready); // called when tasks completed

function ready(error, us, education) {
  if (error) {
    throw error;
  }

  // ----- SVG CANVAS -----
  const svg = d3.select("body").
  append("svg").
  attr("width", w).
  attr("height", h);

  // ----- AREAS -----
  svg.
  append('g').
  attr('class', 'counties').
  selectAll('path').
  data(topojson.feature(us, us.objects.counties).features).
  enter().
  append('path').
  attr('class', 'county').
  attr('data-fips', d => d.id).
  attr('data-education', function (d) {
    var result = education.filter(function (obj) {
      return obj.fips === d.id; // if matchig fips id, return array with the eduction data for this one
    });
    if (result[0]) {
      return result[0].bachelorsOrHigher; // then take education percentage
    } else {return 0;}
  }).
  attr('fill', function (d) {
    var result = education.filter(function (obj) {
      return obj.fips === d.id;
    });
    if (result[0]) {
      return pickColor(result[0].bachelorsOrHigher);
    } else {return pickColor(0);}
  }).
  attr('d', d3.geoPath())

  // -----   MOUSE FUNCTIONS    -----
  .on("mouseover", function (d, i) {// mouseover function
    d3.select(this);

    tooltip.style("opacity", 0.8).
    style('left', d3.event.pageX - 160 + 'px').
    style('top', d3.event.pageY - 160 + 'px').
    attr("id", "tooltip").
    attr('data-education', function () {
      var result = education.filter(function (obj) {
        return obj.fips === d.id;
      });
      if (result[0]) {
        return result[0].bachelorsOrHigher;
      } else {return 0;}
    }) // data-education
    .html(function () {
      var result = education.filter(function (obj) {
        return obj.fips === d.id;
      });
      if (result[0]) {
        return (
          result[0]['area_name'] +
          '<br>' +
          result[0]['state'] +
          '<br>' +
          result[0].bachelorsOrHigher +
          '%');

      } else {return 0;}
    }).
    style("background", function () {
      var result = education.filter(function (obj) {
        return obj.fips === d.id;
      });
      if (result[0]) {
        return pickColor(result[0].bachelorsOrHigher);
      } else {return pickColor(0);}
    }); // background color
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

  // ----- LEGEND -----
  const legendArray = [0, 10, 20, 30, 40, 50, 60];
  const xScaleLegend = d3.scaleLinear().
  domain([0, 70]).
  range([(w)-80, (w)+80]);

  const legend = d3.select("body").
  append("svg").
  attr("width", "160x").
  attr("id", "legend").
  attr("height", "60px");

  legend.selectAll("rect").
  data(legendArray).
  enter().
  append("rect").
  attr("x", (d, i) => xScaleLegend(d)).
  attr("y", "15px").
  attr("width", "24px").
  attr("height", "16px").
  attr("fill", d => pickColor(d)).
  attr("transform", "translate(50, 0)"); // translates it;  

  const xAxisLegend = d3.axisBottom(xScaleLegend).ticks(7).
  tickFormat(d => d + "%");

  legend.append("g") // creates g element for xAxis
  .attr("transform", "translate(50, 30)") // translates it
  .attr("id", "x-axis-legend").
  call(xAxisLegend); // call it

}; // ready function