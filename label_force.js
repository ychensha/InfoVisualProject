var width = 800, height = 600;

var labelDistance = 0;

var vis = d3.select("#chart").append("svg:svg").attr("width", width).attr("height", height);

var nodes = [];
var labelAnchors = [];
var labelAnchorLinks = [];
var links = [];
var color = d3.scale.category20();

vis.dataSet = "pok_structure";

//force layout should be global
var force = d3.layout.force().size([width, height]).nodes(nodes).links(links).gravity(1).linkDistance(50).charge(-1200).linkStrength(function(x) {
    return x.weight * 10
});
var force2 = d3.layout.force().gravity(0).linkDistance(0).linkStrength(8).charge(-100).size([width, height]);


//init the data
d3.json("data/" + vis.dataSet + ".json", function(json) {
    for(var i = 0; i < json.nodes.length; i++){
        var org = {
            label : json.nodes[i].name,
            shape : 3
        }
        nodes.push(org);
        labelAnchors.push({
            node : org
        });
        labelAnchors.push({
            node : org
        });
        //console.log(json.nodes[i]);
        for(var j = 0; j < json.nodes[i].members.length; j++){
            //console.log(json.nodes[i].members[j].name);
            var person = {
                label : json.nodes[i].members[j].name,
                shape : 0
            }
            nodes.push(person);
            labelAnchors.push({
                node : person
            });
            labelAnchors.push({
                node : person
            });
        }
    }

    for(var i = 0; i < json.links.length; i++){
        json.links[i].weight = Math.random();
        links.push(json.links[i])
    }
    for(var i = 0; i < nodes.length; i++){
        labelAnchorLinks.push({
            source : i*2,
            target : i*2+1,
            weight : 1
        });
    }


    force.start();

    force2.nodes(labelAnchors).links(labelAnchorLinks);
    force2.start();

    var link = vis.selectAll("line.link").data(links).enter().append("svg:line").attr("class", "link").style("stroke", "#CCC");

    var node = vis.selectAll("path")
        .data(force.nodes())
        .enter().append("path")
        .attr("transform", function(d){return "translate(" + d.x + "," + d.y + ")";})
        .attr("d", d3.svg.symbol().type(function(d){return d3.svg.symbolTypes[d.shape]}).size(function(d){return 250}))
        .style("fill", function(d){
            return color(Math.random()*20);
        })
        .style("stroke", "#FFF").style("stroke-width", 3)
        .call(force.drag);

    var anchorLink = vis.selectAll("line.anchorLink").data(labelAnchorLinks)//.enter().append("svg:line").attr("class", "anchorLink").style("stroke", "#999");

    var anchorNode = vis.selectAll("g.anchorNode").data(force2.nodes()).enter().append("svg:g").attr("class", "anchorNode");
    anchorNode.append("svg:circle").attr("r", 0).style("fill", "#FFF");
    anchorNode.append("svg:text").text(function(d, i) {
        return i % 2 == 0 ? "" : d.node.label
    }).style("fill", "#555").style("font-family", "Arial").style("font-size", 12);

    var updateLink = function() {
        this.attr("x1", function(d) {
            return d.source.x;
        }).attr("y1", function(d) {
            return d.source.y;
        }).attr("x2", function(d) {
            return d.target.x;
        }).attr("y2", function(d) {
            return d.target.y;
        });

    }

    var updateNode = function() {
        this.attr("transform", function(d) {
            //console.log(d);
            return "translate(" + d.x + "," + d.y + ")";
        });
    }

    force.on("tick", function() {

        force2.start();

        node.call(updateNode);

        anchorNode.each(function(d, i) {
            if(i % 2 == 0) {
                d.x = d.node.x;
                d.y = d.node.y;
            } else {
                var b = this.childNodes[1].getBBox();

                var diffX = d.x - d.node.x;
                var diffY = d.y - d.node.y;

                var dist = Math.sqrt(diffX * diffX + diffY * diffY);

                var shiftX = b.width * (diffX - dist) / (dist * 2);
                shiftX = Math.max(-b.width, Math.min(0, shiftX));
                var shiftY = 5;
                this.childNodes[1].setAttribute("transform", "translate(" + shiftX + "," + shiftY + ")");
            }
        });


        anchorNode.call(updateNode);

        link.call(updateLink);
        anchorLink.call(updateLink);

    });
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
    console.log('hello');
}

var eventCircle = svg.selectAll("g.tick").append("g").attr("class", "eventCircle");
eventCircle.append("svg:circle").attr("r", 5).style("fill", "#000")
    .on('click', function(d){

        nodes.push({
            label : 'insert',
            shape : 0
        });
        links.push({
            source : nodes.length - 1,
            target : 0,
            weight : Math.random()
        });
        var link = vis.selectAll("line.link").data(links).enter().append("svg:line").attr("class", "link").style("stroke", "#CCC");

        var node = vis.selectAll("path")
            .data(force.nodes())
            .enter().append("path")
            .attr("transform", function(d){if(d.label == 'insert')console.log(d); return "translate(" + d.x + "," + d.y + ")";})
            .attr("d", d3.svg.symbol().type(function(d){return d3.svg.symbolTypes[d.shape]}).size(function(d){return 250}))
            .style("fill", function(d){
                return color(Math.random()*20);
            })
            .style("stroke", "#FFF").style("stroke-width", 3)
            .call(force.drag);
        force.start();
        var updateLink = function() {
            this.attr("x1", function(d) {
                return d.source.x;
            }).attr("y1", function(d) {
                return d.source.y;
            }).attr("x2", function(d) {
                return d.target.x;
            }).attr("y2", function(d) {
                return d.target.y;
            });

        }

        var updateNode = function() {
            this.attr("transform", function(d) {
                //console.log(d);
                return "translate(" + d.x + "," + d.y + ")";
            });
        }
        force.on('tick', function(){
            link.call(updateLink);
            node.call(updateNode);
        });
        //console.log(force.nodes());
    });

function updateLayout(layout){
    var updateLink = function() {
        this.attr("x1", function(d) {
            return d.source.x;
        }).attr("y1", function(d) {
            return d.source.y;
        }).attr("x2", function(d) {
            return d.target.x;
        }).attr("y2", function(d) {
            return d.target.y;
        });

    }

    var updateNode = function() {
        this.attr("transform", function(d) {
            //console.log(d);
            return "translate(" + d.x + "," + d.y + ")";
        });
    }
}
