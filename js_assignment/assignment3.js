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
// console.log(js2("nurses run"));
// console.log(js2("egg"));
// console.log(js2("taco cat"));

// JS3: Write a JavaScript function that generates all combinations of a string. 
function js3(input) {
    let combos = [];
    // giving each character its chance to be the first in the combo
    for (let i = 0; i < input.length; i++) {
        // doing all possible combos with said character being first.
        for (let j = i + 1; j <= input.length; j++) {
            combos.push(input.slice(i, j));
        }
    }
    return combos;
}
// console.log(js3("a"));
// console.log(js3("dog"));
// console.log(js3("kitten"));

// JS4:  Write a JavaScript function that returns a passed string with letters in alphabetical order. 
function js4(to_sort) {
    // just like reversing a string, but using sort() instead of reverse()
    return to_sort.split("").sort().join("");
}
// console.log(js4("webmaster"));
// console.log(js4("THEQUICKBROWNFOXJUMPSOVERTHELAZYDOGthequickbrownfoxjumpsoverthelazydog"));

// JS5:  Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word of the string in upper case.  
function js5(to_capitalize) {
    return to_capitalize.toLowerCase()
    .split(" ")
    // Splits and rejoins by space, and in between replaces each 1st character word in the array
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
}
// console.log(js5("the quick brown fox jumped over the lazy dog."));

// JS6: Write a JavaScript function that accepts a string as a parameter and find the longest word within the string. 
// (if multiple words exist of the same longest length, returns the first one.)
function js6(input) {
    // make words array of the input divided by spaces
    let words = input.split(" ");
    // let length = 0;
    let longest = "";
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > longest.length) {
            longest = words[i];
        }
    }
    return longest;
}
// console.log(js6("I like eggs"));
// console.log(js6("I will eliminate the middle class"));