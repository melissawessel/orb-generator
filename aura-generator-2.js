// Configuration
var width = 500;
var height = 500;

// color randomizer
function getColor() {
  return "hsl(" + Math.random() * 360 + ",60%,45%)";
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
   .attr("id","glow");
filter.append("feGaussianBlur")
   .attr("stdDeviation","6");

// heavy blur
var filter2 = defs.append("filter")
  .attr("id","glow-big");
filter2.append("feGaussianBlur")
  .attr("stdDeviation","25");


// distortion filter for clipped orb
var filtergrain = defs.append("filter")
    .attr("id","displacementFilter");
filtergrain.append('feTurbulence')
    // .attr('type', 'noise')
    .attr('baseFrequency', getRandomNum(0.001,.03))
    .attr('numOctaves', '2');
filtergrain.append('feDisplacementMap')
    // .attr('in2', 'noise')
    .attr('in', 'SourceGraphic')
    .attr('scale', '10')
    .attr('xChannelSelector', 'R')
    .attr('yChannelSelector', 'R');

// distortion filter for core
var filtergrain2 = defs.append("filter")
    .attr("id","displacementFilter-core");
filtergrain2.append('feTurbulence')
    // .attr('type', 'noise')
    .attr('baseFrequency', getRandomNum(0,.03))
    .attr('numOctaves', '2');
filtergrain2.append('feDisplacementMap')
    // .attr('in2', 'noise')
    .attr('in', 'SourceGraphic')
    .attr('scale', '15')
    .attr('xChannelSelector', 'R')
    .attr('yChannelSelector', 'R');

// clip into orb
svgContainer.append("clipPath")       // define a clip path
  .attr("id", "ellipse-clip") // give the clipPath an ID
  .append("ellipse")          // shape it as an ellipse
  .attr("cx", 0)            // position the x-centre
  .attr("cy", 0)            // position the y-centre
  .attr("rx", 220)            // set the x radius
  .attr("ry", 220);           // set the y radius

// add blur to everything
svgContainer
  .style("filter", "url(#glow)");


// core circles

coreRadii = [20, 10]

var cores = svgContainer.selectAll("circle")
                          .data(coreRadii)
                          .enter()
                          .append("circle")

var coreAttributes = cores
   // .attr("cx", 0)
   // .attr("cy", 0)
   .attr("r", function (d) {
     var returnRadius;
     if (d === 20) { returnRadius = getRandomNum(30,75);
     } else if (d === 10) { returnRadius = getRandomNum(0,30); }
     return returnRadius;
   })
   .style("fill", function(d) {
     var returnColor;
     if (d === 20) { returnColor = getColor();
     } else if (d === 10) { returnColor = getColor(); }
     return returnColor;
   })
    .style("filter", "url(#displacementFilter-core)");


// mantle
svgContainer.append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', getRandomNum(100,200))
    .style("opacity",.3)
    .attr('fill', getColor())
    .style("filter","url(#glow-big)");

var numorbs = 8
var crustr = 225
var crustinner = 210
var o = .5

// 2 options - orb with clip or ring
if (Math.random() < .7) {
  svgContainer
    .attr("clip-path","url(#ellipse-clip)");
  crustr = 250
  crustinner = 210
  o = .3

  // if clipped orb add fringe blobs
  var dataset = Array.from({length: numorbs}, () => getColor());

// set x values at random, calculate pythagorean y values with r = 250
  var xvalues = Array.from({length: numorbs}, () => getRandomNum(-275,275));
  var yvalues = xvalues.map(x => ((Math.round(Math.random()) * 2 - 1) * Math.sqrt((275*275)-(x*x))));

  console.log(xvalues);
  console.log(yvalues);

  svgContainer.selectAll("circle")
      .data(dataset)
      .enter().append("circle")
      .style("fill", function(d, i) {
        return dataset[i];
      })
      .attr("r", function(d, i) {
        return getRandomNum(50,100);
      })
      .attr("cx", function(d, i) {
        return xvalues[i];
      })
      .attr("cy", function(d, i) {
        return yvalues[i];
      })
      .style("opacity",.5)
      .style("filter","url(#glow-big)");
}
// crust
var arc = d3.arc()
    .innerRadius(crustinner)
    .outerRadius(crustr)
    .startAngle(100)
    .endAngle(2 * 180);

svgContainer.append("path")
  .attr("d", arc)
  .style("filter", "url(#displacementFilter)")
  .style("fill",getColor())
  .style("opacity", o);



// blobbies

if (Math.random() < .2) {
  var dataset = [],
      i = 0;

  for(i=0; i<5; i++){
      dataset.push(Math.round(Math.random()*100));
  }

  console.log(dataset)

  svgContainer.selectAll("circle")
      .data(dataset)
      .enter().append("circle")
      .style("fill", getColor())
      .attr("r", function(d, i) {
        return getRandomNum(5,30);
      })
      .attr("cx", function(d, i) {
        return getRandomNum(-150,150);
      })
      .attr("cy", function(d, i) {
        return getRandomNum(-150,150);
      })
      .style("opacity",.5);
}
