const aw = require('./ArrayWorkerWV.js');
const Network = require('./Network.js')
var a1 = [[1,2,3],[4,5,6],[7,8,9]];
var a2 = [[9,8,7],[6,5,4],[3,2,1]];

var s1 = [[1,2],[3,4]];
var s2 = [[1,0],[2,1]];


let net = new Network(3,[2,3,10]);
console.log('l',net.nLayers);
console.log('w',net.weights);
console.log('b',net.biases);
console.log('\n\n');
//console.log(net.feedForward([1,1],store=true));
let x = [1,1];
let d = net.feedForward(x,true);
console.log('do',d.output);
console.log('da',d.activs);
console.log('dout',d.outs);
console.log('x',x);
console.log('\n\n');
//let inputs = [[[1],[1]],[[1],[2]]];
let inputs = [[1,1],[1,2]];
let outputs = [2,3];
net.backprop(inputs,outputs,0.1);




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

//let d = [[1,2],[2,4],[3,6],[4,8]];
//console.log(error(2,0,d));