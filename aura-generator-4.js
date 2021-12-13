// Configuration
var width = 500;
var height = 500;

var bgcolor = '#E5E5E5'

// color randomizer
function getColor() {
  return "hsl(" + Math.random() * 360 + ",75%,45%)";
}

// generate random number between 2 values
function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

// create Container
var svgContainer = d3.select(".aura").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

// Container for filters
var defs = svgContainer.append("defs");

// light blur
var filter = defs.append("filter")
   .attr("id","glow")
   .attr("x","-50%")
   .attr("y","-50%")
   .attr("width","300%")
   .attr("height","300%");;
filter.append("feGaussianBlur")
   .attr("stdDeviation","20");

// add blur
svgContainer
 .style("filter", "url(#glow)");

// blobs

var numBlobs = getRandomNum(2,4)
// var numBlobs = 1;

var dataset = Array.from({length: numBlobs}, () => getColor());

console.log(dataset)

var circles = svgContainer.selectAll("circle")
    .data(dataset)
    .enter().append("circle")
    .attr("id", function(d,i) {
      return "circle" + i
    })
    // .style("fill", function(d, i) {
    //   return dataset[i];
    // })
    .attr("r", function(d, i) {
      return getRandomNum(200,300);
    })
    .attr("cx", function(d, i) {
      return getRandomNum(-40,40);
    })
    .attr("cy", function(d, i) {
      return getRandomNum(-40,40);
    })
    .style("opacity",.8);



for (i=0; i<numBlobs; i++) {
console.log("entering blob iteration " + i);
  var gradientName = "gradient" + i;
  var orbColor = getColor();
  // create radial gradient element
  var gradient = defs.append("radialGradient")
    .attr("id",gradientName)
  gradient.append("stop")
    .attr("offset","20%")
    .attr("stop-color",orbColor)
  // gradient.append("stop")
    // .attr("offset","90%")
    // .attr("stop-color",orbColor)
    // .attr("stop-opacity","0%")
  gradient.append("stop")
    .attr("offset","35%")
    .attr("stop-color",orbColor)
  gradient.append("stop")
    .attr("offset","100%")
    .attr("stop-color",bgcolor)
    .attr("stop-opacity","0")


  svgContainer.select("#circle" + i)
  // .style("filter","url(#shadow)");
    .style("fill","url(#gradient" + i + ")")
}

//
// circles
// // .style("filter","url(#shadow)");
// .style("fill","url(#gradient" + i + ")")
