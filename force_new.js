//var width = 800, height = 600;
//
//var color = d3.scale.category20();
//
//var svg = d3.select("#chart").append("svg").attr("width", width).attr("height",
//		height);
//svg.edgeThicknessSelectionId = "edgeThickness";
//svg.nodeShapeSelectionId = "nodeShape";
//svg.nodeFillColorSelectionId = "nodeFillColor";
//svg.nodeHoverTitleSelectionId = "nodeHoverTitle";
//svg.nodeSizeSelectionId = "nodeSize";
//
//svg.edgeThicknessDim = "value";
//svg.nodeShapeSVG = "circle";
//svg.nodeFillColorDim = "";
//svg.nodeHoverTitleDims = [];
//svg.nodeSize = 5;
//
//svg.dataSet = "socialnet_count";
//
//var current_network_data = null;
//var currentNodeShape = "circle";
//
//d3.json("data/" + svg.dataSet + ".json", function(json) {
//
//    current_network_data = json;
//    currentNodeShape =  svg.nodeShapeSVG;
//
//    //initNetworkSetting(json);
//
//    //var force = d3.layout.force().charge(-120).linkDistance(30).size(
//    //    [ width, height ]);
//
//
//    var force = d3.layout.force().size([width, height]).gravity(1).linkDistance(50).charge(-800);
//    force.nodes(json.nodes).links(json.edges).start();
//
//    var labelAnchors = [];
//    var labelAnchorLinks = [];
//    for(var i = 0; i < json.nodes.length; i++){
//        //console.log(json.nodes[i]);
//        labelAnchors.push(json.nodes[i]);
//        labelAnchors.push(json.nodes[i]);
//    }
//    for(var i = 0; i < json.nodes.length; i++){
//        labelAnchorLinks.push({
//            source : i * 2,
//            target : i * 2 + 1,
//            weight : 1
//        });
//    }
//    var force2 = d3.layout
//        .force()
//        .nodes(labelAnchors)
//        .links(labelAnchorLinks)
//        .gravity(0)
//        .linkDistance(0)
//        .linkStrength(8).charge(-100)
//        .size([width, height]);
//
//    force2.start();
//    var edge = svg.selectAll("line.edge").data(json.edges).enter().append(
//        "line").attr("class", "edge").style("stroke-width", function(d) {
//            return Math.sqrt(d[svg.edgeThicknessDim]?d[svg.edgeThicknessDim]:1);
//        });
//
//    var node = svg.selectAll(svg.nodeShapeSVG+".node").data(json.nodes).enter().append(
//        svg.nodeShapeSVG).attr("class", "node").style("fill",
//        function(d) {
//            return color(d[svg.nodeFillColorDim]);
//        }).call(force.drag);
//
//    var anchorLink = svg.selectAll("line.anchorLink").data(labelAnchorLinks)//.enter().append("svg:line").attr("class", "anchorLink").style("stroke", "#999");
//
//    var anchorNode = svg.selectAll("g.anchorNode").data(force2.nodes()).enter().append("svg:g").attr("class", "anchorNode");
//    anchorNode.append("svg:circle").attr("r", 0).style("fill", "#FFF");
//    anchorNode.append("svg:text").text(function(d, i) {
//        return i % 2 == 0 ? "" : d.name
//    }).style("fill", "#555").style("font-family", "Arial").style("font-size", 12);
//
//    var updateLink = function() {
//        this.attr("x1", function(d) {
//            return d.source.x;
//        }).attr("y1", function(d) {
//            return d.source.y;
//        }).attr("x2", function(d) {
//            return d.target.x;
//        }).attr("y2", function(d) {
//            return d.target.y;
//        });
//
//    }
//
//    var updateNode = function() {
//        this.attr("transform", function(d) {
//            return "translate(" + d.x + "," + d.y + ")";
//        });
//
//    }
//
//    force.on("tick", function() {
//
//        force2.start();
//
//        node.call(updateNode);
//
//        anchorNode.each(function(d, i) {
//            //console.log(this);
//            if(i % 2 == 0) {
//                d.x = d.x;
//                d.y = d.y;
//            } else {
//                var b = this.childNodes[1].getBBox();
//
//                var diffX = d.x - d.x;
//                var diffY = d.y - d.y;
//
//                var dist = Math.sqrt(diffX * diffX + diffY * diffY);
//
//                var shiftX = b.width * (diffX - dist) / (dist * 2);
//                shiftX = Math.max(-b.width, Math.min(0, shiftX));
//                var shiftY = 5;
//                this.childNodes[1].setAttribute("transform", "translate(" + shiftX + "," + shiftY + ")");
//            }
//        });
//
//        anchorNode.call(updateNode);
//
//        edge.call(updateLink);
//        anchorLink.call(updateLink);
//
//    });
//});
//
//function initNetworkSetting(json){
//    var edgeSchemas = json._schemas.edges;
//    var nodeSchemas = json._schemas.nodes;
//    var selectList = document.getElementById(svg.edgeThicknessSelectionId);
//
//    for (var key in edgeSchemas){
//        var schema = edgeSchemas[key];
//        if(schema.name != "source" && schema.name != "target" && (schema.type == "int" || schema.type == "float" || schema.type == "double" ||  schema.type == "long")) {
//            var newOption = document.createElement("option");
//            newOption.appendChild(document.createTextNode(schema.name));
//            newOption.setAttribute("value", schema.name);
//            selectList.appendChild(newOption);
//        }
//    }
//
//    selectList = document.getElementById(svg.nodeFillColorSelectionId);
//
//    for (var key in nodeSchemas){
//        var schema = nodeSchemas[key];
//        if(schema.type == "int" || schema.type == "float" || schema.type == "double" ||  schema.type == "long"||  schema.type == "string") {
//            var newOption = document.createElement("option");
//            newOption.appendChild(document.createTextNode(schema.name));
//            newOption.setAttribute("value", schema.name);
//            selectList.appendChild(newOption);
//        }
//    }
//
//    selectList = document.getElementById(svg.nodeHoverTitleSelectionId);
//
//    for (var key in nodeSchemas){
//        var schema = nodeSchemas[key];
//        if(schema.type == "int" || schema.type == "float" || schema.type == "double" ||  schema.type == "long"||  schema.type == "string") {
//            var newOption = document.createElement("option");
//            newOption.appendChild(document.createTextNode(schema.name));
//            newOption.setAttribute("value", schema.name);
//            selectList.appendChild(newOption);
//        }
//    }
//
//    refreshNetworkSettings();
//}
//
//function refreshNetworkSettings(){
//    var selectList = document.getElementById(svg.edgeThicknessSelectionId);
//    var selectedValue = selectList.options[selectList.selectedIndex].getAttribute("value");
//
//    svg.edgeThicknessDim =  selectedValue;
//
//    selectList = document.getElementById(svg.nodeShapeSelectionId);
//    selectedValue = selectList.options[selectList.selectedIndex].getAttribute("value");
//
//    svg.nodeShapeSVG =  selectedValue;
//
//    selectList = document.getElementById(svg.nodeSizeSelectionId);
//    selectedValue = selectList.options[selectList.selectedIndex].getAttribute("value");
//
//    svg.nodeSize =  selectedValue;
//
//    selectList = document.getElementById(svg.nodeFillColorSelectionId);
//    selectedValue = selectList.options[selectList.selectedIndex].getAttribute("value");
//
//    svg.nodeFillColorDim =  selectedValue;
//
//    selectList = document.getElementById(svg.nodeHoverTitleSelectionId);
//    selectedValue = selectList.options[selectList.selectedIndex].getAttribute("value");
//
//    svg.nodeHoverTitleDims = [];
//    svg.nodeHoverTitleDims.push(selectedValue);
//}
//
//function reloadNetwork(){
//
//    var json = current_network_data;
//    var edge = svg.selectAll("line.edge").style("stroke-width", function(d) {
//            return Math.sqrt(d[svg.edgeThicknessDim]?d[svg.edgeThicknessDim]:1);
//        });
//
//    var node = svg.selectAll(".node");
//    if(currentNodeShape != svg.nodeShapeSVG){
//
//        currentNodeShape =  svg.nodeShapeSVG;
////        var newnode = svg.append(
////            svg.nodeShapeSVG).attr("class", "node");
////
////        newnode.style("fill",
////            function() {
////                return color(node[svg.nodeFillColorDim]);
////            }).call(force.drag);
////
////        newnode.append("title").text(function() {
////            var title = "";
////            if(svg.nodeHoverTitleDims.length > 0){
////                title = node[svg.nodeHoverTitleDims[0]];
////            }
////
////            for (var i = 1; i < svg.nodeHoverTitleDims.length; i++ ){
////                title+= ","+ node[svg.nodeHoverTitleDims[i]];
////            }
////            return title;
////        });
////
////        if(svg.nodeShapeSVG == "circle"){
////            newnode.attr("r", svg.nodeSize);
////            force.on("tick", function() {
////                newnode.attr("cx", function() {
////                    return node.x;
////                }).attr("cy", function() {
////                        return node.y;
////                    });
////            });
////        }
////        else if(svg.nodeShapeSVG == "rect"){
////
////            newnode.attr("width", svg.nodeSize).attr("height", svg.nodeSize);
////            force.on("tick", function() {
////                newnode.attr("x", function() {
////                    return node.x - svg.nodeSize/2;
////                }).attr("y", function() {
////                        return node.y - svg.nodeSize/2;
////                    });
////
////            });
////        }
////
////        node.remove();
//
//    }
//    else{
//        node.style("fill",
//            function(d) {
//                return color(d[svg.nodeFillColorDim]);
//            });
//
//        node.selectAll("title").text(function(d) {
//            var title = "";
//            if(svg.nodeHoverTitleDims.length > 0){
//                title = d[svg.nodeHoverTitleDims[0]];
//            }
//
//            for (var i = 1; i < svg.nodeHoverTitleDims.length; i++ ){
//                title+= ","+ d[svg.nodeHoverTitleDims[i]];
//            }
//            return title;
//        });
//
//        if(svg.nodeShapeSVG == "circle"){
//            node.attr("r", svg.nodeSize);
//            force.on("tick", function() {
//
//                edge.attr("x1", function(d) {
//                    return d.source.x;
//                }).attr("y1", function(d) {
//                        return d.source.y;
//                    }).attr("x2", function(d) {
//                        return d.target.x;
//                    }).attr("y2", function(d) {
//                        return d.target.y;
//                    });
//
//                node.attr("cx", function(d) {
//                    return d.x;
//                }).attr("cy", function(d) {
//                        return d.y;
//                    });
//            });
//        }
//        else if(svg.nodeShapeSVG == "rect"){
//
//            node.attr("width", svg.nodeSize).attr("height", svg.nodeSize);
//            force.on("tick", function() {
//
//                edge.attr("x1", function(d) {
//                    return d.source.x;
//                }).attr("y1", function(d) {
//                        return d.source.y;
//                    }).attr("x2", function(d) {
//                        return d.target.x;
//                    }).attr("y2", function(d) {
//                        return d.target.y;
//                    });
//
//                node.attr("x", function(d) {
//                    return d.x - svg.nodeSize/2;
//                }).attr("y", function(d) {
//                        return d.y - svg.nodeSize/2;
//                    });
//
//            });
//        }
//    }
//
//}
