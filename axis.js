/**
 * Created by apple on 14-6-2.
 */
var data = Array.apply(0, Array(31)).map(function(item, i) {
    // 产生31条数据
    i++;
    return {date: '2013-12-' + (i < 10 ? '0' + i : i), pv: parseInt(Math.random() * 100)}
});
var data = [{"date":"2012-03-20","total":3},{"date":"2012-03-21","total":8},{"date":"2012-03-22","total":2},{"date":"2012-03-23","total":10},{"date":"2012-03-24","total":3},{"date":"2012-03-25","total":20},{"date":"2012-03-26","total":12}];
var margin = {top: 100, right: 100, bottom: 100, left: 100};
width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

var x = d3.scale.identity()
    .domain([0, width]);

x = d3.time.scale()
    .domain([new Date(data[0].date), d3.time.day.offset(new Date(data[data.length - 1].date), 1)])
    .rangeRound([0, width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .tickValues([30, 80])
    .orient("bottom");

xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(d3.time.days, 1)
    .tickFormat(d3.time.format('%a %d'))
    .tickSize(0)
    .tickPadding(8);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .call(xAxis);

var chooseStructure = function(){

}

var eventCircle = svg.selectAll("g.tick").append("g").attr("class", "eventCircle");
eventCircle.append("svg:circle").attr("r", 5).style("fill", "#000")
    .on('click', function(d){console.log(d)});
var width = 800, height = 600;



