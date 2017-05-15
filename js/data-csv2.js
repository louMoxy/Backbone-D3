var fileNames = [];
_.times(2, day => {
    _.times(2, hour => {
        fileNames.push(`data/predictions/day${day+1}_hour${hour + 6}.csv`);
    })
})
function combine(error, big_data_1, big_data_2, big_data_3){
    if (error) {
        console.log(error);
    }
    return lrgData = (d3.merge([big_data_1, big_data_2, big_data_3]));
}
function innerJoin(a, b, select) {
    var m = a.length, n = b.length, c = [];

    for (var i = 0; i < m; i++) {
        var x = a[i];

        for (var j = 0; j < n; j++) { 
            var y = select(x, b[j]);  // filter out the rows and columns you want
            if (y) c.push(y);         // if a row is returned add it to the table
        }
    }
    return c;
}

var lrgData = [];
// var mainData = [];
var allData = [];

d3.csv('data/itn_geom_epsg4326.csv', function(md) {
   return  {
       direction: +md.direction,
       geom_points: md.geom_points,
       os_speed: +md.os_speed,
       src_id: md.src_id
   }
}, function(mainData){
    fileNames.forEach(function(filename) {
    q.defer(d3.csv, filename, function(d){
        os_speed = +mainData.os_speed
                return {
                    day: d.day,
                    direction: +d.direction, 
                    hour: +d.hour, 
                    prediction: +(+d['prediction (km/h)']).toFixed(2),
                    source: +d.source,
                    target: +d.target,
                    src_id : d.src_id,
                    os_speed: os_speed,
                    geom_points: mainData.geom_points
                };
            })
    });
    q.await(combine, addingElements);
});

var q = d3.queue();

function addingElements() {
    var tr = d3.select("#chart")
    .append("table")
    .selectAll("tr")
    .data([3,4])
    .enter().append("tr");

    var td = tr.selectAll("td")
    .data(function(d) { return d; })
    .enter().append("td")
    .text(function(d) { return d; });
    return console.log('ok')
}



