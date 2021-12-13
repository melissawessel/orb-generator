// Configuration
var width = 500;
var height = 500;

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
   .attr("stdDeviation","18");

// drop shadows for circles
var shadowfilter = defs.append("filter")
  .attr("id","shadow")
  .attr("x","-50%")
  .attr("y","-50%")
  .attr("width","300%")
  .attr("height","300%");
shadowfilter.append("feGaussianBlur")
   .attr("stdDeviation","30")
   .attr("result","offset-blur")
shadowfilter.append("feBlend")
  .attr("in","SourceGraphic")
  .attr("in2","blurOut")
  .attr("mode","normal")
  .attr("width","1000%")
  .attr("height","1000%");;

var spotlightfilter = defs.append("filter")
  .attr("id","spotlight");
pointlight = spotlightfilter.append("feSpecularLighting")
   .attr("result","spotlight")
   .attr("specularConstant",".5")
   .attr("specularExponent","80")
   .attr("lighting-color",getColor())
pointlight.append("fePointLight")
  .attr("dx",0)
  .attr("dy",0)
  .attr("z",220)
spotlightfilter.append("feComposite")
  .attr("in","SourceGraphic")
  .attr("in2","specOut")
  .attr("operator","arithmetic")
  .attr("k1","0")
  .attr("k2","1")
  .attr("k3","1")
  .attr("k4","0")
// spotlightfilter.append("feBlend")
//   .attr("in","SourceGraphic")
//   .attr("in2","blurOut")
//   .attr("mode","normal");


// add blur
svgContainer
 .style("filter", "url(#glow)");

// blobs

var dataset = Array.from({length: getRandomNum(2,4)}, () => getColor());

console.log(dataset)

var circles = svgContainer.selectAll("circle")
    .data(dataset)
    .enter().append("circle")
    .style("fill", function(d, i) {
      return dataset[i];
    })
    .attr("r", function(d, i) {
      return getRandomNum(100,150);
    })
    .attr("cx", function(d, i) {
      return getRandomNum(-30,30);
    })
    .attr("cy", function(d, i) {
      return getRandomNum(-30,30);
    })
    .style("opacity",getRandomNum(.8));

circles
.style("filter","url(#shadow)");
