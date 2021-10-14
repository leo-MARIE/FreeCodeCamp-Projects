const w = 1000;
const h = 600;
const padding = 60;

// ----- FETCH -----
const MOVIES =
'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';

d3.queue().
defer(d3.json, MOVIES).
await(ready); // called when tasks completed

function ready(error, moviesdata) {
  if (error) {
    throw error;
  }

  // ----- SVG CANVAS -----
  const svg = d3.select("body").
  append("svg").
  attr("width", w).
  attr("height", h);

  // ----- TREEMAP -----  
  function sumBySize(d) {
    return d.value;
  }

  color = d3.scaleOrdinal(d3.schemeCategory10);

  var treemap = d3.treemap().size([w, h]).paddingInner(1);

  var root = d3.
  hierarchy(moviesdata).
  eachBefore(function (d) {
    d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.name;
  }).
  sum(sumBySize).
  sort(function (a, b) {
    return b.height - a.height || b.value - a.value;
  });

  treemap(root);

  // ----- CELLS -----
  var cell = svg.
  selectAll('g').
  data(root.leaves()).
  enter().
  append('g').
  attr('class', 'group').
  attr('transform', function (d) {
    return 'translate(' + d.x0 + ',' + d.y0 + ')';
  });

  cell.
  append('rect').
  attr('id', function (d) {
    return d.data.id;
  }).
  attr('class', 'tile').
  attr('width', function (d) {
    return d.x1 - d.x0;
  }).
  attr('height', function (d) {
    return d.y1 - d.y0;
  }).
  attr('data-name', function (d) {
    return d.data.name;
  }).
  attr('data-category', function (d) {
    return d.data.category;
  }).
  attr('data-value', function (d) {
    return d.data.value;
  }).
  attr('fill', function (d) {
    return color(d.data.category);
  })

  // -----   MOUSE FUNCTIONS    -----
  .on("mouseover", function (d, i) {// mouseover function
    d3.select(this);

    tooltip.style("opacity", 0.8).
    style('left', d3.event.pageX - 70 + 'px').
    style('top', d3.event.pageY - 70 + 'px').
    attr("id", "tooltip").
    style("background", color(d.data.category)).
    attr("data-value", d.data.value).
    html(
    'Name: ' +
    d.data.name +
    '<br>Category: ' +
    d.data.category +
    '<br>Value: ' +
    d.data.value);

  }) // on mouseover
  .
  on("mouseout", function (d, i) {// mouseout function
    d3.select(this);
    tooltip.style("opacity", 0);
  }); // on mouse out

  cell.
  append('text').
  attr('class', 'tile-text').
  selectAll('tspan').
  data(function (d) {
    return d.data.name.split(/(?=[A-Z][^A-Z])/g); // for each title, we split words in an array
  }).
  enter().
  append('tspan') // tspan act like cells
  .attr('x', 6) // position of each line
  .attr('y', function (d, i) {
    return 20 + i * 15;
  }).
  text(d => d).
  style("font-size", "14px");

  //   -----   TOOLTIP   -----
  const tooltip = d3.select("body").
  append("div").
  attr("id", "tooltip").
  style("opacity", 0);

  // ----- LEGEND -----
  var categories = root.leaves().map(function (nodes) {
    return nodes.data.category;
  });
  categories = categories.filter(function (category, index, self) {
    return self.indexOf(category) === index;
  });
  var legend = d3.select('#legend');
  var legendWidth = +legend.attr('width');
  const LEGEND_OFFSET = 100;
  const LEGEND_RECT_SIZE = 15;
  const LEGEND_H_SPACING = 150;
  const LEGEND_V_SPACING = 10;
  const LEGEND_TEXT_X_OFFSET = 3;
  const LEGEND_TEXT_Y_OFFSET = -2;
  var legendElemsPerRow = Math.floor(legendWidth / LEGEND_H_SPACING);

  var legendElem = legend.
  append('g').
  attr('transform', 'translate(60,' + LEGEND_OFFSET + ')').
  selectAll('g').
  data(categories).
  enter().
  append('g').
  attr('transform', function (d, i) {
    return (
      'translate(' +
      i % legendElemsPerRow * LEGEND_H_SPACING +
      ',' + (
      Math.floor(i / legendElemsPerRow) * LEGEND_RECT_SIZE +
      LEGEND_V_SPACING * Math.floor(i / legendElemsPerRow)) +
      ')');

  });

  legendElem.
  append('rect').
  attr('width', LEGEND_RECT_SIZE).
  attr('height', LEGEND_RECT_SIZE).
  attr('class', 'legend-item').
  attr('fill', function (d) {
    return color(d);
  });

  legendElem.
  append('text').
  attr('x', LEGEND_RECT_SIZE + LEGEND_TEXT_X_OFFSET).
  attr('y', LEGEND_RECT_SIZE + LEGEND_TEXT_Y_OFFSET).
  text(function (d) {
    return d;
  });

}; // ready function