// var fileNames = [];
// _.times(4, day => {
//     _.times(1, hour => { // 15hrs 7 days
//         fileNames.push(`data/predictions/day${day+1}_hour${hour + 6}.csv`);
//     })
// })
// function combine(error, ...data){
//     if (error) {
//         console.log(error);
//     }
//     return lrgData = (d3.merge(data));
// }
// // function innerJoin(a, b, select) {
// //     var m = a.length, n = b.length, c = [];

// //     for (var i = 0; i < m; i++) {
// //         var x = a[i];

// //         for (var j = 0; j < n; j++) { 
// //             var y = select(x, b[j]);  // filter out the rows and columns you want
// //             if (y) c.push(y);         // if a row is returned add it to the table
// //         }
// //     }
// //     return c;
// // }

// var lrgData = [];

// var q = d3.queue();

// function sortData() {
//     d3.csv('data/itn_geom_epsg4326.csv', function(md) {
//         return  {
//             direction: +md.direction,
//             geom_points: md.geom_points,
//             os_speed: +md.os_speed,
//             src_id: md.src_id
//         }
//         }, function(mainData){
//             fileNames.forEach(function(filename) {
//                 q.defer(d3.csv, filename, function(d){
//                     return lrgData = {
//                         day: d.day,
//                         direction: +d.direction, 
//                         hour: +d.hour, 
//                         prediction: +(+d['prediction (km/h)']).toFixed(2),
//                         source: +d.source,
//                         target: +d.target,
//                         src_id : d.src_id
//                     };
//                 })
//             });
//             q.await(combine, filterData(lrgData));
//         });
// }


// function filterData(lrgData) {
//     console.log(lrgData);
//     // var ndxOverview = crossfilter(data);
//     // var dayDim = ndxOverview.dimension(m => m.day);
//     // console.log(dayDim.top(20));
// }


// function main(){
//     sortData();
// }
// $(document).ready(main);