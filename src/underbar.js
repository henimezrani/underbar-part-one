(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    /* START SOLUTION */
    return val;
    /* END SOLUTION */
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
  	if (n==undefined){
  		return array[0]
  	}
  	if (Array.isArray(array)){
  		if ( typeof n == "number" ){
	  		if (n==0){
	  			return undefined;
	  		} else {
	  			if (n>array.length){
	  				return array;
	  			} else {
	  				return array.slice(0,n);
	  			}
	  		}
  		}
  	} else {
  		return [];
  	}

  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    /* START SOLUTION */

	if (n==undefined){
  		return array[array.length-1]
  	}
  	if (Array.isArray(array)){
  		if ( typeof n == "number" ){
	  		if (n==0){
	  			return undefined;
	  		} else {
	  			if (n>array.length){
	  				return array;
	  			} else {
	  				return array.slice(array.length-n,array.length);
	  			}
	  		}
  		}
  	} else {
  		return [];
  	}


    /* END SOLUTION */
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
	/* START SOLUTION */
	
	if (Array.isArray(collection)){
		for (var i = 0; i < collection.length; i++){
			iterator(collection[i], i, collection);
		}
		
	}else if (typeof collection == "object"){
		for (var key in collection){
			iterator(collection[key], key, collection);
		}
	}
	


    /* END SOLUTION */
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    /* START SOLUTION */
    if (array.isSorted){ 
		var middle= array.length/2;
    	if (typeof arguments[2] == "boolean"){ 
    		var MiddleIfArg = (array.length-arguments[2]/2)+arguments[2];
	    	if (target>array[MiddleIfArg]){
		    	for (var i=MiddleIfArg; i<array.length; i++){
		    		if (array[i]===target){
		    			return i;
		    		}
		    	}
		    }else{
		    	for (var i=arguments[2]; i<MiddleIfArg; i++){
		    		if (array[i]===target){
		    			return i;
		    		}
		    	}
		    } 
		    return -1;
	    }else{
	    	if (target>array[middle]){
		    	for (var i=middle; i<array.length; i++){
		    		if (array[i]===target){
		    			return i;
		    		}
		    	}
		    }else{
		    	for (var i=0; i<middle; i++){
		    		if (array[i]===target){
		    			return i;
		    		}
		    	}
		    }
		} 
	}else {
    	if (typeof arguments[2] ==="number"){
	    	for (var i=arguments[2]; i<array.length; i++){
	    		if (array[i]===target){
	    			return i;
	    		}
	    	}
	    }else{
		    for (var i=0; i<array.length; i++){
		    	if (array[i]===target){
		    		return i;
		    	}
		    }
		}
	}
    return -1;
    /* END SOLUTION */
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    /* START SOLUTION */
    var arr=[];
    for (var i=0 ; i<collection.length ; i++){
  		if (test(collection[i])==true) {
  			arr.push(collection[i]);
  		}
  	}
  	return arr;
    /* END SOLUTION */
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    /* START SOLUTION */
    var arr=[];
    for (var i=0 ; i<collection.length ; i++){
  		if (test(collection[i])==false) {
  			arr.push(collection[i]);
  		}
  	}
  	return arr;
    /* END SOLUTION */
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {


   	if (array.length===0){
   		return [];
   	}
	var arr=[];
    if (!arguments[2]){
		for (var i = array.length-1 ; i>=0 ; i--){
			var check=false
			for (var j=i-1 ; j>=0 ; j--){
				if (array[j]==array[i]){
					check=true;
					break;
				}
			}
			if (check==false){
				arr.unshift(array[i]);
			}
		}
		return arr;		
	}else{
		var newArr=[];
		for (var i =0 ; i<array.length; i++){
			newArr.push(iterator(array[i]))
		}
		var boo = newArr[0];
		arr.push(array[0]);
		for (var i=1; i<newArr.length; i++){
			if (newArr[i]!==boo){
				arr.push(array[i]);
				return arr;
			}
		}
	}
  };

  // Return the results of applying an iterator to each element.
	_.map = function(collection, iterator) {
    /* START SOLUTION */
		var arr=[];
		if (Array.isArray(collection)){
			for (var i=0;i<collection.length;i++){
    			arr.push(iterator(collection[i], i , collection));
    		}
    		return arr;
		}else if (typeof collection == "object"){
			for (var i in collection){
    			arr.push(iterator(collection[i], i , collection));
			}
			return arr;
		}
    	
    /* END SOLUTION */
	};

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    /* START SOLUTION */

	var arr=[];
	
	if (Array.isArray(collection)){
		var boo=true;
		for (var i=0 ; i<collection.length ; i++){
			if (typeof collection[i] != "object"){
				boo=false;
				break;
			}
		}

		if (boo){
			for (var i=0 ; i<collection.length ; i++){
				if (collection[i].hasOwnProperty(key)){
					arr.push(collection[i][key]);
				} else{
					arr.push(undefined);
				}
			   
			}
		}
		return arr;
	}


    /* END SOLUTION */
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  _.reduce = function(collection, iterator, accumulator) {
	/* START SOLUTION */
	
	var acc=0;

	if ( arguments[2] == undefined){
		acc=collection[0];
	} else{
		acc=arguments[2];
		acc=iterator(acc, collection[0]);
	}

	for (var i=1 ; i<collection.length ; i++){
		acc = iterator(acc, collection[i]);
	}
	return acc;


    /* END SOLUTION */
  };

  _.range = function(length){
  	var arr=[];
  	for (var i=0; i<length ; i++){
  		arr.push(Math.floor(Math.random() * Math.floor(200000)));
  	}
  	return arr;
  };

  _.findIndex = function(array, test){
  	if (arguments[1]==undefined){
  		return array;
  	}

  	for (var i=0 ; i<array.length ; i++){
  		if (test(array[i])==true) {
  			return i;
  		}
  	}
  	return -1;
  };

}());
