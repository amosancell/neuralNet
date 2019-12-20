const vect = require('./Vector.js');
class ArrayWorker {
    // generate a matrix with specified dimensions and random entries
    static randM(nRows,nCols) {
        return vect.range(0,nRows,1).map(rowNum => vect.randV(nCols));
    }

    // calculate the dimesnions of a 2-D array and return: [# rows, # cols]
    static dimensions(a) {
        return [a.length,a[0].length];
    }
    /* calculate the number of axes (aka 2-D array, 3-D array, etc)
        * note non lists (scalars, strings, etc) return 0
        * returns 1 for lists i.e ArrayWorker.nAxes([1,2,3]) ---> 1
    */
    static nAxes(a) {
        let pure = [...a];
        let n = 0;
        if(!Array.isArray(pure)) {
            return n;
        }
        n = 1;
        while(Array.isArray(pure[0])) {
            n++;
            pure = pure[0];
        }
        return n;
    }
    
    static getRow(a,r) {
        return a[r];
    }
    
    static getCol(a,c) {
        return a.map(r=>r[c]);
    }

    static equal(a,b) {
        return vect.range(0,a.length,1).reduce((acc,row) => acc && vect.equal(a[row],b[row]),true);
    }
    static isSquare(a) {
        return this.dimensions(a)[0] == this.dimensions(a)[1];
    }
    static sameDim(a,b) {
        return vect.equal(this.dimensions(a), this.dimensions(b));
    }
    static isHorizontal(a) {
        return this.nAxes(a) == 1;
    }
    static isVertical(a) {
        return this.isHorizontal(a) ? false : a.reduce((acc,r) => acc && this.nAxes(r) == 1 && r.length == 1,true);
    }

    static transpose(a,vector=false,column=false) {
        if(vector) {
            return vect.transpose(a,column); 
        }
        else {
            //return vect.range(0,a.length,1).reduce((acc,r) => acc.push(this.getCol(a,r)),[]);
            return vect.range(0,a.length,1).reduce((acc,r) => [...acc,this.getCol(a,r)],[]);
        }
    }

    static add(a,b) {
        if(!this.sameDim(a,b)) {
            console.log("not same dimensions");
            return undefined;
        }
        else {
            return vect.range(0,a.length,1).map(row => vect.add(a[row],b[row]));
        }
    }
    static subtract(a,b) {
        if(!this.sameDim(a,b)) {
            console.log("not same dimensions");
            return undefined;
        }
        else {
            return vect.range(0,a.length,1).map(row => vect.subtract(a[row],b[row]));
        }
    }
    static constMult(a,k) {
        return a.map(row => row.map(val => val*k));
    }
    static hadamard(a,b) {
        if(!this.sameDim(a,b)) {
            console.log("not same dimensions");
            return undefined;
        }
        else {
            return vect.range(0,a.length,1).map(row => vect.hadamard(a[row],b[row]));
        }
    }

    static sum(a) {
        return a.reduce((acc,row) => acc+vect.sum(row),0);
    }
    static dot(a,b) {
        return this.sum(this.hadamard(a,b));
    }
    
    static mult(a,b) {
        if(this.dimensions(a)[1] != this.dimensions(b)[0]) {
            console.log("dimensions don't work");
            return undefined;
        }
        else {
            //console.log('hi',this.getRow(a,0),this.getCol(b,0));
            let result = [];
            for(let i=0; i < this.dimensions(a)[0]; i++) {
                let temp = [];
                for(let j=0; j < this.dimensions(b)[1]; j++) {
                    //console.log(i,j,this.getRow(a,i),this.getCol(b,j),this.hadamard(this.getRow(a,i),this.getCol(b,j)));
                    temp.push(vect.dot(this.getRow(a,i),this.getCol(b,j)));
                }
                result.push(temp);
            }
            return result;
        }
    }
}

module.exports = ArrayWorker;

let a = [[1,2],[3,4]];
let b = [[1,2],[3,4]];
let c = [[1,2],[3,5]];
let d = [[1],[5,6,7]];
let e = [[1,2,3],[6,5]];
let f = [];
let g = [];
/*console.log(vect.range(0,0,1));
console.log(ArrayWorker.equal(a,a)); // true
console.log(ArrayWorker.equal(a,b)); // true
console.log(ArrayWorker.equal(a,c)); // false
console.log(ArrayWorker.equal(a,d)); // false
console.log(ArrayWorker.equal(c,d)); // false
console.log(ArrayWorker.equal(c,e)); // false
console.log(vect.equal(f,g)); // true*/

let v1 = [[1],[2],[3]];
let v2 = [1,2];
let v3 = [[1,2]];
/*console.log(ArrayWorker.isVertical(v1));
console.log(ArrayWorker.nAxes(v2));
console.log(ArrayWorker.isVertical(v2));
console.log(ArrayWorker.isVertical(v3));
console.log(ArrayWorker.transpose(a));
console.log(ArrayWorker.transpose(c));
console.log(ArrayWorker.transpose(v1));
console.log(ArrayWorker.transpose(v3));
console.log(ArrayWorker.hadamard(a,b));
console.log(ArrayWorker.hadamard(b,c));
console.log(ArrayWorker.hadamard(b,d));
console.log(ArrayWorker.sum(a));
console.log(ArrayWorker.sum(b));
console.log(ArrayWorker.sum(v1));
console.log(ArrayWorker.transpose(v1,true,true));
console.log(ArrayWorker.mult(a,b));
console.log(ArrayWorker.nAxes(v2));*/