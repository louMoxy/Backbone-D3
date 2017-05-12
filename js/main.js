charts = {};
charts.bar = function() {
  // basic data
  var margin = {top: 10, bottom: 30, left: 80, right: 0},
      width = 900,
      height = 500,
      // accessors
      xValue = function(d) { return d.x; },
      yValue = function(d) { return d.y; },
      // chart underpinnings
      xAxis = d3.svg.axis().orient('bottom'),
      yAxis = d3.svg.axis().orient('left'),
      x = d3.scale.ordinal(),
      y = d3.scale.linear(),
      // chart enhancements
      elastic = {
        margin: true,
        x: true,
        y: true
      },
      convertData = true,
      duration = 500,
      formatNumber = d3.format(',d');

  function render(selection) {
    selection.each(function(data) {
      // setup the basics
    //   if (elastic.margin) margin.left = formatNumber(d3.max(data, function(d) { return d.y; })).length * 13;
      var w = width - margin.left - margin.right,
          h = height - margin.top - margin.bottom;

      // if needed convert the data
      if (convertData) {
        data = data.map(function(d, i) {
          return {
            x: xValue.call(data, d, i),
            y: yValue.call(data, d, i)
          };
        });
      }

      // set scales
      if (elastic.x) x.domain(data.map(function(d) { return d.x; }));
      if (elastic.y) y.domain([0, d3.max(data, function(d) { return d.y; })]);
      x.rangeRoundBands([0, w], .1);
      y.range([h, 0]);

      // reset axes
      xAxis.scale(x);
      yAxis.scale(y);

      var svg = selection.selectAll('svg').data([data]),
          chartEnter = svg.enter().append('svg')
                                    .append('g')
                                    .attr('width', w)
                                    .attr('height', h)
                                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                                    .classed('chart', true),
          chart = svg.select('.chart');

      chartEnter.append('g')
                .classed('x axis', true)
                .attr('transform', 'translate(' + 0 + ',' + h + ')');
      chartEnter.append('g')
                .classed('y axis', true)
      chartEnter.append('g').classed('barGroup', true);
      
      chart.selectAll('.selected').classed('selected', false);

      bars = chart.select('.barGroup').selectAll('.bar').data(data);

      bars.enter()
            .append('rect')
              .classed('bar', true)
              .attr('x', w) // start here for object constancy
              .attr('width', x.rangeBand())
              .attr('y', function(d, i) { return y(d.y); })
              .attr('height', function(d, i) { return h - y(d.y); });

      bars.transition()
            .duration(duration)
              .style('opacity', 1) // quick fix for exit problem
              .attr('width', x.rangeBand())
              .attr('x', function(d, i) { return x(d.x); })
              .attr('y', function(d, i) { return y(d.y); })
              .attr('height', function(d, i) { return h - y(d.y); });

      bars.exit()
            .transition()
                .duration(duration)
                    .style('opacity', 0)
                    .remove();

      chart.select('.x.axis')
            .transition()
                .duration(duration)
                  .call(xAxis);
      chart.select('.y.axis')
            .transition()
                .duration(duration)
                  .call(yAxis);  
    });
  }
  // basic data
  render.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return render;
  };
  render.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return render;
  };
  render.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return render;
  };

  // accessors
  render.xValue = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return render;
  };
  render.yValue = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return render;
  };

  // chart underpinnings
  render.xAxis = function(_) {
    if (!arguments.length) return xAxis;
    xAxis = _;
    return render;
  };
  render.yAxis = function(_) {
    if (!arguments.length) return yAxis;
    yAxis = _;
    return render;
  };
  render.x = function(_) {
    if (!arguments.length) return x;
    x = _;
    return render;
  };
  render.y = function(_) {
    if (!arguments.length) return y;
    y = _;
    return render;
  };
  
  // chart enhancements
  render.elastic = function(_) {
    if (!arguments.length) return elastic;
    elastic = _;
    return render;
  };
  render.convertData = function(_) {
    if (!arguments.length) return convertData;
    convertData = _;
    return render;
  };
  render.duration = function(_) {
    if (!arguments.length) return duration;
    duration = _;
    return render;
  };
  render.formatNumber = function(_) {
    if (!arguments.length) return formatNumber;
    formatNumber = _;
    return render;
  };
  return d3.rebind(render, 'on');
};

var CsvModel = Backbone.Model.extend({});

var CsvCollection = Backbone.Collection.extend({
    loadAll: function(){
        for(k=1; k <=1; k ++){
            for(i = 6; i <= 6; i++){
                this.url = "data/predictions/day"+k+"_hour" + i + ".csv";
                this.fetch({remove: false});
            }
        }
    },
    model: CsvModel,
    parse: function(response){
        return data =  d3.csv.parse(response, function(d){
            return {
                day: d.day,
                direction: +d.direction, 
                hour: +d.hour, 
                prediction: +d['prediction (km/h)'],
                source: +d.source,
                target: +d.target,
                src_id : d.src_id 
            };
        });
    },
    fetch: function(options){
        options = options || {};
        options.dataType = 'text';
        return Backbone.Collection.prototype.fetch.call(this, options);
    }
});

var CsvView = Backbone.View.extend({
    initialize: function(options){
        this.listenTo(options.model, 'sync', this.render);
    },
    render: function(){
        this.$el.text(JSON.stringify(this.model.toJSON()));
    }
});

// var PredicitonModel = Backbone.Model.extend();

// var LargeCollection = Backbone.Collection.extend({
//     url: 'data/itn_geom_epsg4326.json',
//     initialize: function(){
//         this.fetch();
//     }
// })
// var DataCollection = Backbone.Collection.extend({
//     loadAll: function(){
//         for(i = 6; i <= 6; i++){
//             this.url = "data/predictions/day1_hour0" + i + ".json";
//             this.fetch();
//         }
//         // this.url = 'data/itn_geom_epsg4326.json';
//         // this.fetch({add: true})
//     },
//     parse: function(d){
//         return d;
//     },
//     initialize: function(){
//         this.loadAll();
//     },
//     model: PredicitonModel
// })

var BarChart = Backbone.View.extend({
  el: "#chart",
  other: {},

  initialize: function(options) {
    this.other = options.other;
    this.collection.on("change reset add remove", this.render, this);
    // this.listenTo(collection, "change reset add remove", this.render, this);
    var bar = charts.bar();
    bar.xValue(function(d) { return d.get('source'); });
    bar.yValue(function(d) { return d.get('prediction (km/h)'); });
    this.bar = bar;
    this.render();
  },
  render: function() {
    d3.select(this.el) 
        .datum(this.collection.models)
        .call(this.bar);
  }
});

// var dataCollection = new DataCollection();
// var largeCollection = new LargeCollection();
// var dataCollection = new CsvCollection();
// var barView = new BarChart({ collection: dataCollection });



































