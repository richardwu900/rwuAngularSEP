// myMap
Array.prototype.myMap = function(mapper, argument){
    let result = [];
    // bread and butter of mapping.
    for(let i = 0; i < this.length; i++){
        result.push(mapper.apply(argument, [this[i], i, this]));
    }
    return result
}

// myReduce
Array.prototype.myReduce = function(reducer, init) {
    let initial_value = init;
    // check if init value was given
    if (typeof init === "undefined") {
        // throw error if no initial value is given & empty array.
        if (this.length === 0) {
            throw new TypeError('Reduce of empty array with no initial value')
        } else if (this.length === 1){
            // return only element if it's only that element that exists.
            return this[0];
        } else {
            // otherwise, start with the 1st item effectively as the innit
            initial_value = this[0];
            // bread and butter of reduce
            for (let i = 0; i < this.length; i ++) {
                initial_value = reducer(initial_value, this[i]);
            }
        }
        // return initial value if array length is 0
    } else if (this.length === 0) {
        return initial_value;
    } else {
        // bread and butter of reduce
        for (let i = 0; i < this.length; i ++) {
            initial_value = reducer(initial_value, this[i]);
        }
    }
    return initial_value;
};