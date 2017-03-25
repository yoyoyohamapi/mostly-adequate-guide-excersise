var _ = require('ramda');


// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function.

words = _.split(' ');


// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

var sentences = _.map(words);


// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions.

// var filterQs = function (xs) {
//     return _.filter(function (x) {
//         return match(/q/i, x);
//     }, xs);
// };

var match = _.curry(function (regex, str) {
    return str.match(regex);
});

var filterQs = _.filter(match(/q/i));

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any
// arguments.

// LEAVE BE:
var _keepHighest = function (x, y) {
    return x >= y ? x : y;
};

// REFACTOR THIS ONE:
var max = _.reduce(_keepHighest, -Infinity);

// Bonus 1:
// ============
// Wrap array's slice to be functional and curried.
// //[1, 2, 3].slice(0, 2)
var slice = _.curry(function(start, end, arr) {
    return arr.slice(start, end);
});


// Bonus 2:
// ============
// Use slice to define a function "take" that takes n elements from the beginning of the string. Make it curried.
// // Result for "Something" with n=4 should be "Some"
var take = slice(0)

module.exports = {
    words: words,
    sentences: sentences,
    filterQs: filterQs,
    max: max,
    slice: slice,
    take: take
};
