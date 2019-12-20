var aw = require('./ArrayWorkerWV.js');

class Network {

    static sigmoid(z) {
        return 1.0/(1+Math.exp(-z));
    }
    static sigmoidDerivative(z) {
        return this.sigmoid(z)*(1-this.sigmoid(z));
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
        this.biases = [];
        for(let layer=1; layer < nLayers; layer++) {
            this.weights.push(aw.randM(nodes[layer],nodes[layer-1]+1));
            this.biases.push(aw.getCol(this.weights[layer-1],0));
        }
    }
    
    /* feedforward a vector through the network
        * inputs is a normal list (1-D array)
        * the output is a normal list (1-D array)
        * store is a boolean. 
            * If false, feedforward inputs normally and return output
            * If true, feedforward inputs and store the intermediate values (activs and outs) and return
              those as well as the output
    */
    feedForward(inputs,store=false) {
        if(store) {var activs = []; var outs = [];}
        let inp = aw.transpose([...inputs],true);
        inp.unshift([1]);
        //console.log('inp',inp);
        for(let i=0; i < this.nLayers-1; i++) {
            inp = aw.mult(this.weights[i],inp);
            if(store) activs.push(aw.transpose(inp,true,true));
            inp = inp.map(val => [Network.sigmoid(val[0])]);
            if(store) outs.push(aw.transpose(inp,true,true));
            inp.unshift([1]);
            //console.log('inp'+i,inp);
        }
        inp.shift();
        let output = aw.transpose(inp,true,true);
        //console.log(aw.transpose(inp,true,true));
        return (store) ? {output:output,activs:activs,outs:outs} : output;
    }

    /* run backpropogation using the Mean Squared Error function as the loss function
        * inputs is the set of inputs
        * desired is the set of outputs corresponding to the given inputs
            * Namely, feedForward(inputs[i]) should return desired[i]
        * learningRate is the learning rate used
    */
    backprop(inputs,desired,learningRate) {
        let inp = [...inputs];
        let des = [...desired];
        if(inp.length != des.length) {console.log("inputs, desired not same length",inp.length,des.length); return undefined;}
        for(let d=0; d < inp.length; d++) {
            // feedforward the current input value and store the results
            let ff = this.feedForward(inp[d],true);
            let activs = ff.activs;
            let outs = ff.outs;
            let output = ff.output;
            console.log('activs',activs);
            console.log('outs',outs);
            console.log('output',output);

            // calculate the error for the final layer
            let finErr = [];
            let finLayer = activs.length-1;
            for(let i=0; i < output.length; i++) {
                console.log('1',finLayer);
                console.log('1.3',typeof activs);
                console.log('1.5',activs[finLayer]);
                console.log('2',activs[finLayer][i]);
                console.log('3',output[i]);
                console.log(des[d]);
                finErr.push(Network.sigmoidDerivative(activs[finLayer][i])*(output[i]-des[d][i]));
            }
            console.log(finErr);
        }
    }



    /* the mean square error function
        * comp is the computed output(s)
        * des is the desired output(s)
    */
   static error(comp, des) {
        if(aw.nAxes(comp) != aw.nAxes(des)) {
            console.log('comp and des not same nAxes',aw.nAxes(comp),aw.nAxes(des))
            return undefined;
        }
        else if (!aw.sameDim(comp,des)) {
            console.log('comp and des not same dimensions',aw.dimensions(comp),aw.dimensions(des))
            return undefined;
        }
        else if(aw.nAxes(comp) == 1) {
            let result = 0;
            for(let i=0; i < comp.length; i++) {
                result += 0.5*(comp[i]-des[i])*(comp[i]-des[i]);
            }
            return result / (comp.length+0.0);
        }
    }
    
}

module.exports = Network;