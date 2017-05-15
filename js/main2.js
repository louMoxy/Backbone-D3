
var Point = Backbone.Model.extend({
  defaults: {
      x: 0,
      y: 0
  },
  type: "point",
});

var Sum = Backbone.Model.extend({
  defaults: {
    sum: 0
  }
});

// Collections
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
    fetch: function(options){
        options = options || {};
        options.dataType = 'text';
        return Backbone.Collection.prototype.fetch.call(this, options);
    }
});

// Views
var BarChart = Backbone.View.extend({
  el: "#chart",
  initialize: function() {
    this.collection.on("change reset add remove", this.render, this);
    var bar = charts.bar();
    var collection = this.collection;
    bar.xValue(function(d) { return d.get('x'); });
    bar.yValue(function(d) { return d.get('y'); });
    this.bar = bar;
    this.render();
  },
  render: function() {
    d3.select(this.el) 
        .datum(this.collection.models)
        .call(this.bar);
  }
});

// var HelperView = Backbone.View.extend({
//   el: "#helper",
//   events: {
//     "click #update": "update",
//   },
//   update: function() {
//     this.collection.fetch();
//   }
// });

var SumView = Backbone.View.extend({
  el: "#sum",
  initialize: function() {
    // _.bindAll(this);
    this.model.bind('change', this.render);
    this.render();
  },
  render: function() {
    d3.select(this.$el.selector)
        .text('TOTAL: ' + this.model.get('sum'));
  }
});

// Main
var dataArr = new CsvCollection();
// var barView = new BarChart({ collection: dataArr });
// var helper = new HelperView({ collection: dataArr });
// var sum = new SumView({ model: dataArr.sum });