/* 
    * a class for working with vectors (1-d arrays aka lists)
*/
class Vector {

    static randV(len) {
        return this.range(0,len,1).map(_ => Math.random());
    }
    /*
        * makes a list of [start, start+step, start+2*step, ... , end-step]
        * step must be positive
        * if end < start, range returns [start]
        * used as a helper to make other functions neater
    */
    static range(start,end,step) {
        let result = [start];
        let i=0;
        while(result[i] + step < end) {
            result.push(result[i]+step);
            i++;
        }
        return result;
    }

    static transpose(a,column=false) {
        if(column) {
            return a.reduce((x,y) => [...x,y[0]]);
        }
        else {
            return a.reduce((x,y) => [...x,[y]],[]);
        }
    }

    static magnitude(v) {
        return this.sum(a)*this.sum(a);
    }
    static sum(a) {
        return a.reduce((x,y) => x+y);
    }

    static equal(a,b) {
        return this.range(0,a.length,1).reduce((acc,i) => acc && a[i]==b[i],true);
    }
    
    static add(a,b) {
        if(a.length != b.length) {
            console.log("lengths unequal",a.length,b.length);
            return undefined;
        }
        else {
            return this.range(0,a.length,1).map(index => a[index]+b[index]);
        }
    }
    static subtract(a,b) {
        if(a.length != b.length) {
            console.log("lengths unequal",a.length,b.length);
            return undefined;
        }
        else {
            return this.range(0,a.length,1).map(index => a[index]-b[index]);
        }
    }
    static constMult(a,k) {
        return a.map(val => val*k);
    }
    static hadamard(a,b) {
        if(a.length != b.length) {
            console.log("lengths unequal",a.length,b.length);
            return undefined;
        }
        else {
            return this.range(0,a.length,1).map(index => a[index]*b[index]);
        }
    }
    static dot(a,b) {
        return this.sum(this.hadamard(a,b));
    }
}

module.exports = Vector;

