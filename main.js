const aw = require('./arrayWorker.js');
const Network = require('./network.js')
var a1 = [[1,2,3],[4,5,6],[7,8,9]];
var a2 = [[9,8,7],[6,5,4],[3,2,1]];

var s1 = [[1,2],[3,4]];
var s2 = [[1,0],[2,1]];


let net = new Network(3,[2,3,1]);
console.log(net.nLayers);
console.log(net.weights);
console.log(aw.transpose([[1],[2],[3]]));
console.log(net.feedForward(aw.transpose([1,1])));





/* error for linear regression
    * a is slope 
    * b is y-intercept
    * data is set of points (x,y) of data
*/
function mean(x) {
    return x.reduce((a,b) => a+b)/(x.length+0.0)
}
function square(n) {
    return n*n;
}
function error(a,b,data) {
    let line = x => a*x+b;
    return 0.5*mean(data.map(p => square(line(p[0]))-square(p[1])));
}

let d = [[1,2],[2,4],[3,6],[4,8]];
//console.log(error(2,0,d));