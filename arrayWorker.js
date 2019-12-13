class ArrayWorker {
    // generate a matrix with specified dimensions and random entries
    static randM(nRows,nCols) {
        let result = [];
        for(let r=0; r < nRows; r++) {
            let temp = [];
            for(let c=0; c < nCols; c++) {
                temp.push(Math.random());
            }
            result.push(temp);
        }
        return result;
    }

    static dimensions(a) {
        return [a.length,a[0].length];
    }
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
    
    static rEqual(r1,r2) {
        if(r1.length != r2.length) {
            return false;
        }
        else {
            for(let i=0; i < r1.length; i++) {
                if(r1[i] != r2[i]) {
                    return false;
                }
            }
            return true;
        }
    }
    static equal(a,b) {
        if(!this.sameDim(a,b)) {
            return false;
        }
        else {
            for(let r=0; r < a.length; r++) {
                if(!this.rEqual(a[r],b[r])) {
                    return false;
                }
            }
            return true;
        }
    }
    static isSquare(a) {
        return this.dimensions(a)[0] == this.dimensions(a)[1];
    }
    static sameDim(a,b) {
        return this.rEqual(this.dimensions(a), this.dimensions(b));
    }
    static isHorizontal(a) {
        return this.nAxes(a) == 1;
    }
    static isVertical(a) {
        for(let r of a) {
            if(this.nAxes(r) != 1 || r.length != 1) {
                return false;
            }
        }
        return true;
    }

    static transpose(a) {
        if(this.isHorizontal(a)) {
            let result = [];
            for(let val of a) {
                result.push([val]);
            }
            return result;
        }
        else if(this.isVertical(a)) {
            let result = [];
            for(let val of a) {
                result.push(val[0]);
            }
            return result;
        }
        else {
            console.log("only 1xN and Nx1 arrays accepted");
            return undefined;
        }
    }

    /*static insert(a,index,value) {
        let result = [...a];
        if(this.isHorizontal(a)) {
            return result.splice(index,0,value);
        }
        else if(this.isVertical(a)) {
            return result.splice(index,0,[value]);
        } 
        else {
            console.log('insert not implemented for non 1-D arrays');
            return undefined;
        }
    }*/

    static add(a,b) {
        if(!this.sameDim(a,b)) {
            console.log("not same dimensions");
            return undefined;
        }
        else {
            let result = [...a];
            for(let r=0; r < result.length; r++) {
                for(let c=0; c < result[r].length; c++) {
                    result[r][c] += b[r][c];
                }
            }
            return result;
        }
    }
    
    static subtract(a,b) {
        if(!this.sameDim(a,b)) {
            console.log("not same dimensions");
            return undefined;
        }
        else {
            let result = [...a];
            for(let r=0; r < result.length; r++) {
                for(let c=0; c < result[r].length; c++) {
                    result[r][c] -= b[r][c];
                }
            }
            return result;
        }
    }
    
    static constMult(a,k) {
        return a.map(row => row.map(val => val*k));
    }
    
    static hadamard(a,b) {
        if(!this.sameDim(a,b) || this.nAxes(a) != this.nAxes(b)) {
            console.log("not same dimensions");
            return undefined;
        }
        else {
            if(this.nAxes(a) == 1) {
                let result = [...a];
                for(let i=0; i < result.length; i++) {
                    result[i] *= b[i];
                }
                return result;
            }
            else if(this.nAxes(a) == 2) {
                let result = [...a];
                for(let r=0; r < result.length; r++) {
                    for(let c=0; c < result[r].length; c++) {
                        result[r][c] *= b[r][c];
                    }
                }
                return result;
            }
            else {
                console.log("hadamard product not implemented for higher dimensions");
                return undefined;
            }
        }
    }
    
    static sum(a) {
        if(this.nAxes(a) == 1) {
            return a.reduce(((x,y) => x+y),0);
        }
        else if(this.nAxes(a) == 2) {
            return a.reduce(((a,b) => a+b.reduce((x,y) => x+y)),0);
        }
        else {
            console.log("higher dimension summing not implemented");
            return undefined;
        }
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
                    temp.push(this.dot(this.getRow(a,i),this.getCol(b,j)));
                }
                result.push(temp);
            }
            return result;
        }
    }
}

module.exports = ArrayWorker;