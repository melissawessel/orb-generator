// Configuration
var width = Math.min(window.innerWidth, window.innerHeight);
var height = Math.min(window.innerWidth, window.innerHeight);
var bgcolor = '#E5E5E5'

console.log(fxhash);
console.log(fxrand());

// color randomizer
function getColor() {
  var hueval = fxrand() * 360;
  if (hueval >= 220 && hueval <= 360) {
    return "hsl(" + hueval + ",95%,65%)"
  }
  else {
    return "hsl(" + hueval + ",75%,45%)"
  }
}

// generate random number between 2 values
function getRandomNum(min, max) {
  return fxrand() * (max - min) + min;
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

var numBlobs = getRandomNum(2,5)
// var numBlobs = 1;

var dataset = Array.from({length: numBlobs}, () => getColor());

console.log(dataset)

var circles = svgContainer.selectAll("circle")
    .data(dataset)
    .enter().append("circle")
    .attr("id", function(d,i) {
      return "circle" + i
    })
    .attr("r", function(d, i) {
      return getRandomNum(width/3,width/2);
    })
    .attr("cx", function(d, i) {
      return getRandomNum(width/-12,width/12);
    })
    .attr("cy", function(d, i) {
      return getRandomNum(width/-12,width/12);
    })
    .style("opacity",.75);



for (i=0; i<numBlobs; i++) {
console.log("entering blob iteration " + i);
  var gradientName = "gradient" + i;
  var orbColor = getColor();
  console.log(orbColor);
  // create radial gradient element
  var gradient = defs.append("radialGradient")
    .attr("id",gradientName)
  gradient.append("stop")
    .attr("offset","20%")
    .attr("stop-color",orbColor)
  gradient.append("stop")
    .attr("offset","35%")
    .attr("stop-color",orbColor)
  gradient.append("stop")
    .attr("offset","100%")
    .attr("stop-color",bgcolor)
    .attr("stop-opacity","0")


  svgContainer.select("#circle" + i)
    .style("fill","url(#gradient" + i + ")")
}
