﻿var marge = { top: 60, bottom: 60, left: 60, right: 60 }

var svg = d3.select("svg")

var width = svg.attr("width")

var height = svg.attr("height")

var g = svg.append("g")

    .attr("transform", "translate(" + marge.top + "," + marge.left + ")");



//准备数据

var nodes = [

    { name: "region_1" },

    { name: "region_2" },

    { name: "region_3" },

    { name: "region_4" },

    { name: "region_5" },

    { name: "region_6" },

    { name: "region_7" },

    { name: "region_8" },

    { name: "region_9" },
    { name: "region_10" },

    { name: "region_11" },
    { name: "region_12" },

    { name: "region_13" },
    { name: "region_14" },

    { name: "region_15" },
    { name: "region_16" },

    { name: "region_17" },

    { name: "region_18" },
    { name: "region_19" }

];



var edges = [

    //  { source: 0, target: 4, relation: "籍贯", value: 1.3 },
    { source: 0, target: 1, value: 1 },
    { source: 0, target: 4, value: 1 },
    { source: 0, target: 5, value: 1 },
    { source: 1, target: 4, value: 1 },
    { source: 1, target: 2, value: 1 },
    { source: 1, target: 14, value: 1 },
    { source: 2, target: 14, value: 1 },
    { source: 2, target: 13, value: 1 },
    { source: 2, target: 3, value: 1 },
    { source: 3, target: 13, value: 1 },
    { source: 3, target: 17, value: 1 },
    { source: 3, target: 12, value: 1 },
    { source: 4, target: 5, value: 1 },
    { source: 4, target: 15, value: 1 },
    { source: 4, target: 18, value: 1 },
    { source: 5, target: 14, value: 1 },
    { source: 5, target: 15, value: 1 },
    { source: 14, target: 13, value: 1 },
    { source: 15, target: 18, value: 1 },
    { source: 18, target: 17, value: 1 },
    { source: 18, target: 16, value: 1 },
    { source: 17, target: 12, value: 1 },
    { source: 17, target: 16, value: 1 },
    { source: 12, target: 11, value: 1 },
    { source: 12, target: 9, value: 1 },
    { source: 12, target: 8, value: 1 },
    { source: 12, target: 11, value: 1 },
    { source: 11, target: 6, value: 1 },
    { source: 11, target: 10, value: 1 },
    { source: 16, target: 8, value: 1 },
    { source: 8, target: 9, value: 1 },
    { source: 8, target: 7, value: 1 },
    { source: 9, target: 10, value: 1 },
    { source: 10, target: 7, value: 1 },
    { source: 10, target: 6, value: 1 },
    { source: 6, target: 7, value: 1 },
    { source: 1, target: 0, value: 1 },
    { source: 4, target: 0, value: 1 },
    { source: 5, target: 0, value: 1 },
    { source: 4, target: 1, value: 1 },
    { source: 2, target: 1, value: 1 },
    { source: 14, target: 1, value: 1 },
    { source: 14, target: 2, value: 1 },
    { source: 13, target: 2, value: 1 },
    { source: 3, target: 2, value: 1 },
    { source: 13, target: 3, value: 1 },
    { source: 17, target: 3, value: 1 },
    { source: 12, target: 3, value: 1 },
    { source: 5, target: 4, value: 1 },
    { source: 15, target: 4, value: 1 },
    { source: 18, target: 4, value: 1 },
    { source: 14, target: 5, value: 1 },
    { source: 15, target: 5, value: 1 },
    { source: 13, target: 14, value: 1 },
    { source: 18, target: 15, value: 1 },
    { source: 17, target: 18, value: 1 },
    { source: 16, target: 18, value: 1 },
    { source: 12, target: 17, value: 1 },
    { source: 16, target: 17, value: 1 },
    { source: 11, target: 12, value: 1 },
    { source: 9, target: 12, value: 1 },
    { source: 8, target: 12, value: 1 },
    { source: 11, target: 12, value: 1 },
    { source: 6, target: 11, value: 1 },
    { source: 10, target: 11, value: 1 },
    { source: 8, target: 16, value: 1 },
    { source: 9, target: 8, value: 1 },
    { source: 7, target: 8, value: 1 },
    { source: 10, target: 9, value: 1 },
    { source: 7, target: 10, value: 1 },
    { source: 6, target: 10, value: 1 },
    { source: 7, target: 6, value: 1 }
];

//设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色

var colorScale = d3.scaleOrdinal()

    .domain(d3.range(nodes.length))

    .range(d3.schemeCategory10);



//新建一个力导向图

var forceSimulation = d3.forceSimulation()

    .force("link", d3.forceLink())

    .force("charge", d3.forceManyBody())

    .force("center", d3.forceCenter());;



//初始化力导向图，也就是传入数据

//生成节点数据

forceSimulation.nodes(nodes)

    .on("tick", ticked);//这个函数很重要，后面给出具体实现和说明

//生成边数据

forceSimulation.force("link")

    .links(edges)

    .distance(function (d) {//每一边的长度

        return d.value * 100;

    })

//设置图形的中心位置

forceSimulation.force("center")

    .x(width / 2)

    .y(height / 2);

//在浏览器的控制台输出

console.log(nodes);

console.log(edges);



//有了节点和边的数据后，我们开始绘制

//绘制边

var links = g.append("g")

    .selectAll("line")

    .data(edges)

    .enter()

    .append("line")

    .attr("stroke", function (d, i) {

        return colorScale(i);

    })

    .attr("stroke-width", 1);

var linksText = g.append("g")

    .selectAll("text")

    .data(edges)

    .enter()

    .append("text")

    .text(function (d) {

        return d.relation;

    })



//绘制节点

//老规矩，先为节点和节点上的文字分组

var gs = g.selectAll(".circleText")

    .data(nodes)

    .enter()

    .append("g")

    .attr("transform", function (d, i) {

        var cirX = d.x;

        var cirY = d.y;

        return "translate(" + cirX + "," + cirY + ")";

    })

    .call(d3.drag()

        .on("start", started)

        .on("drag", dragged)

        .on("end", ended)

    );



//绘制节点

gs.append("circle")

    .attr("r", 10)

    .attr("fill", function (d, i) {

        return colorScale(i);

    })

//文字

gs.append("text")

    .attr("x", -10)

    .attr("y", -20)

    .attr("dy", 10)

    .text(function (d) {

        return d.name;

    })



function ticked() {

    links

        .attr("x1", function (d) { return d.source.x; })

        .attr("y1", function (d) { return d.source.y; })

        .attr("x2", function (d) { return d.target.x; })

        .attr("y2", function (d) { return d.target.y; });



    linksText

        .attr("x", function (d) {

            return (d.source.x + d.target.x) / 2;

        })

        .attr("y", function (d) {

            return (d.source.y + d.target.y) / 2;

        });



    gs

        .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

}

function started(d) {

    if (!d3.event.active) {

        forceSimulation.alphaTarget(0.8).restart();

    }

    d.fx = d.x;

    d.fy = d.y;

}

function dragged(d) {

    d.fx = d3.event.x;

    d.fy = d3.event.y;

}

function ended(d) {

    if (!d3.event.active) {

        forceSimulation.alphaTarget(0);

    }

    d.fx = null;

    d.fy = null;

}