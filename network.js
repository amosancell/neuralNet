var aw = require('./arrayWorker.js');

class Network {

    static sigmoid(z) {
        return 1.0/(1+Math.exp(-z));
    }
    static sigmoidDerivative(z) {
        return this.sigmoid(z)*this.sigmoid(1-z);
    }

    /* enter the number of layers and # nodes per layer
        * nLayers is the number of layers
            * NOTE: nLayers >= 2 because there always is an input and output layer
        * nodes is the # of nodes per layer in an array
            * NOTE: nodes.length == nLayers
        * this.weights in an array of matrices. layer l biases are weights[l].getCol[0]
    */
    constructor(nLayers,nodes) {
        this.nLayers = nLayers;
        this.weights = [];
        for(let layer=1; layer < nLayers; layer++) {
            this.weights.push(aw.randM(nodes[layer],nodes[layer-1]+1));
        }
    }
    
    /* feedforward a vector through the network
        * inputs is a vertical array
    */
    feedForward(inputs) {
        let inp = [...inputs];
        inp.unshift([1]);
        //console.log('inp',inp);
        for(let i=0; i < this.nLayers-1; i++) {
            inp = aw.mult(this.weights[i],inp);
            inp = inp.map(val => [Network.sigmoid(val[0])]);
            inp.unshift([1])
            //console.log('inp',i,inp);
        }
        inp.shift();
        return inp;
    }
}

module.exports = Network;