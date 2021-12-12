
var colors = Array.from({length: 3}, () => "hsl(" + Math.random() * 360 + ",60%,45%)");


// Configuration
var width = 500;
var height = 500;

// SVG element for aura
var svgContainer = d3.select(".aura").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

// Defining array of 3 randomized values for ring size
var scores = Array.from({length: 3}, () => Math.floor(Math.random() * 100));
console.log(scores);


//Define arcs
var arc = d3.arc()
    .innerRadius(function(d, i) {
        console.log(i)
        console.log(scores[i])
        console.log(width/2 - width/7 * i + scores[i]/5)
        return width/2 - width/4 * i + scores[i]/5
    })
    .outerRadius(function(d, i) {
        console.log(width/2 - width/10 * i - scores[i]/2)
        return width/2 - width/10 * i - scores[i]/3
    })
    .startAngle(100)
    .endAngle(2 * 180);


// Container for blur
var defs = svgContainer.append("defs");

// Blur filter
var filter = defs.append("filter")
    .attr("id","glow");
filter.append("feGaussianBlur")
    .attr("stdDeviation","10");

// var filtergrain = defs.append("filter")
//     .attr("id","grain");
// filtergrain.append('feTurbulence')
//     .attr('type', 'fractalNoise')
//     .attr('baseFrequency', '0.65')
//     .attr('numOctaves', '3');

var filtergrain = defs.append("filter")
    .attr("id","displacementFilter");
filtergrain.append('feTurbulence')
    .attr('type', 'noise')
    .attr('baseFrequency', '0.01')
    .attr('numOctaves', '2');
filtergrain.append('feDisplacementMap')
    .attr('in2', 'noise')
    .attr('in', 'SourceGraphic')
    .attr('scale', '30')
    .attr('xChannelSelector', 'R')
    .attr('yChannelSelector', 'R');
    //
    // <filter id="displacementFilter">
    //     <feTurbulence type="turbulence" baseFrequency="0.05"
    //         numOctaves="2" result="turbulence"/>
    //     <feDisplacementMap in2="turbulence" in="SourceGraphic"
    //         scale="50" xChannelSelector="R" yChannelSelector="G"/>
    //   </filter>

// clip path

svgContainer.append("clipPath")       // define a clip path
  .attr("id", "ellipse-clip") // give the clipPath an ID
  .append("ellipse")          // shape it as an ellipse
  .attr("cx", 0)            // position the x-centre
  .attr("cy", 0)            // position the y-centre
  .attr("rx", 220)            // set the x radius
  .attr("ry", 220);           // set the y radius


//Adding all colors arc
var path = svgContainer.selectAll("g.arc")
    .data(colors)
    .enter().append("g")
    .attr("class", "arc")
    .style("filter", "url(#displacementFilter)")
    .style("opacity", function(d, i) {
      // return scores[i]/130.0;
      return .75;
    })
    // .style("filter", "url(#glow)")
    // .style("filter", "url(#grain)")
    ;

//Adding to path
path.append("path")
    .attr("fill", function(d, i) {
        return d;
    })
    .attr("d", arc);

svgContainer
  .style("filter", "url(#glow)")
  .attr("clip-path","url(#ellipse-clip)");

  // <filter id="displacementFilter">
  //     <feTurbulence type="turbulence" baseFrequency="0.05"
  //         numOctaves="2" result="turbulence"/>
  //     <feDisplacementMap in2="turbulence" in="SourceGraphic"
  //         scale="50" xChannelSelector="R" yChannelSelector="G"/>
  //   </filter>

  // bubble stuff

  var dataset = [],
      i = 0;

  for(i=0; i<5; i++){
      dataset.push(Math.round(Math.random()*100));
  }

  console.log(dataset)

  svgContainer.selectAll("circle")
      .data(dataset)
      .enter().append("circle")
      .style("stroke", "gray")
      .style("fill", "orange")
      .attr("r", function(d, i) {
        return Math.random() * 30 + 5;
      })
      .attr("cx", function(d, i) {
        return Math.random() * 400 - 200;
      })
      .attr("cy", function(d, i) {
        return Math.random() * 400 - 200 ;
      });
