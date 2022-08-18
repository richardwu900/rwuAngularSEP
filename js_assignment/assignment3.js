// JS1: Write a JavaScript function that reverse a number. 
function js1(to_reverse) {
    // returns the number form of a number turned into a string turned to an array, reversed, then joined back together.
    return Number(to_reverse.toString().split("").reverse().join(""));
}
// console.log(32243);
// console.log(js1(32243));
// console.log(1);
// console.log(js1(1));
// console.log(0);
// console.log(js1(0));
// console.log(69420);
// console.log(js1(69420));

// JS2: Write a JavaScript function that checks whether a passed string is palindrome or not? 
function js2(potential_palindrome) {
    potential_palindrome = potential_palindrome.replace(/\s/g, ''); //remove spaces
    // console.log(potential_palindrome);
    qotential_qalindrome = potential_palindrome.split("").reverse().join(""); //reverse string
    return (potential_palindrome === qotential_qalindrome);
}
console.log(js2("nurses run"));
console.log(js2("egg"));
console.log(js2("taco cat"));