var CsvModel = Backbone.Model.extend({});

var CsvCollection = Backbone.Collection.extend({
    defaults: {
        data: [],
        dimension: {}
    },
    loadAll: function(){
        // _.times(8, day => {
        //     _.times(15, hour => {
        //         this.url = `data/predictions/day${day}_hour${hour + 6}.csv`;
        //         this.fetch({remove: false});
        //     })
        // })
        for(k=1; k <=1; k ++){
            for(i = 6; i <= 6; i++){
                this.url = "data/predictions/day"+ k +"_hour" + i + ".csv";
                this.fetch({remove: false});
            }
        }
    },
    model: CsvModel,
    parse: function(response){
        var data =  d3.csv.parse(response, function(d){
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
        // var cf = new crossfilter(data);
        // var dimensions = this.get('dimension');
        // dimension.hour = cf.dimension(function(d){ return d.hour});
        // // console.log(data);
        // this.set({data:data})  //Unsure if this is a better way to return? 
        return data;
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

// function main(){
//     var collection = new CsvCollection();
//     // var view = new CsvView({el: document.getElementById('models'), model: collection});
//     collection.loadAll();
// }

var collection = new CsvCollection();
collection.loadAll();

// var cf = new crossfilter([collection.models]);
// targetDim= cf.dimension(function(d) { return d.target; });
// $(document).ready(main);


