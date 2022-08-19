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
    // keep track of longest word found
    let longest = "";
    // iterate over words
    for (let i = 0; i < words.length; i++) {
        // if current word is longer...
        if (words[i].length > longest.length) {
            // ... replace longest kept track of
            longest = words[i];
        }
    }
    return longest;
}
// console.log(js6("I like eggs"));
// console.log(js6("I will eliminate the middle class"));
// console.log(js6("Web Development Tutorial"));

// JS7:  Write a JavaScript function that accepts a string as a parameter and counts the number of vowels within the string. 
function js7(input) {
    const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
    vowel_count = 0;
    // checks ever character to see if it's a vowel or not
    for (i = 0; i < input.length; i++){
        // increases vowel_count by one each time it is indeed a vowel.
        if (vowels.includes(input[i])) {
            vowel_count++;
        }
    }
    return vowel_count;
}
// console.log(js7("aeiouAEIOU"));
// console.log(js7("lol k"));
// console.log(js7("The quick brown fox"));

// JS8: Write a JavaScript function that accepts a number as a parameter and check the number is prime or not. 
// returns true if prime, returns false if not.
function js8(input) {
    // take care of obvious cases first
    if (input < 2) {
        return false;
    } else if (input === 2){
        return true;
    } else {
        // iterates over every number lesser than input, seeing if it can divide evenly with it...
        for (let i = 2; i < input; i++) {
            if ((input % i) === 0) {
              // ... and is confirmed not to be prime if it can
              return false;
            }
        }
        // After all that, all possibilites are exhausted, ergo input must be prime.
        return true;
    }
}
// console.log(js8(2));
// console.log(js8(4));
// console.log(js8(7));
// console.log(js8(97));

// JS9: Write a JavaScript function which accepts an argument and returns the type. 
function js9(input) {
    // this isn't even really writing a function, it's kinda just proving I know typeof exists
    return (typeof input);
}
// console.log(js9({egg:'chicken'}));
// console.log(js9("egg"));
// console.log(js9(399));
// console.log(js9());
// console.log(js9(function(){}));
// console.log(js9(false));

// JS10: Write a JavaScript function which returns the n rows by n columns identity matrix. 
function js10(n) {
    // makes a 2d matrix of dimension n...
    var matrix = []
    for (let i = 0; i < n; i += 1) {
        // ...I said TWOd...
        matrix[i] = [];
        for (let j = 0; j < n; j += 1) {
            // ... and fills all entries with 0s!
            matrix[i][j] = 0;
            if (i === j) {
                // except for these ones, that make sqaures lol. they're 1s.
                matrix[i][j] = 1;
            }
        }
    }
    return matrix;
}
// console.log(js10(3));
// console.log(js10(6));

// JS11: Write a JavaScript function which will take an array of numbers stored and find the second lowest and second greatest numbers, respectively. 
// I'm just going to assume we're given an (only number containing) array with at least two numbers
function js11(numbers) {
    // accounting for obvious only two numbers case
    if (numbers.length == 2) {
        if (numbers[0] > numbers[1]) {
            return [numbers[0], numbers[1]];
        } else {
            return [numbers[1], numbers[0]];
        }
    } else {
        // otherwise, sort the numbers and return the second from the left & right
        numbers.sort();
        greatest2nd_index = numbers.length - 2;
        return [numbers[1], numbers[greatest2nd_index]];
    }
}
// console.log(js11([1, 9]));
// console.log(js11([9, 1]));
// console.log(js11([1,3,2]));
// console.log(js11([1,2,3,4,5]))
// console.log(js11([9,1,2,4,8]));

// JS12: Write a JavaScript function which says whether a number is perfect.
// returns true if perfect, false if not.
function js12(input) {
    let sum = 0;
    for (let i = 1; i < input; i++) {
        // check for every divisor, add each to sum
        if (input % i == 0) {
            sum += i;
        }
    }
    // confirm if sum is equal or not.
    return (sum === input);
}
// console.log(js12(6));
// console.log(js12(69));
// console.log(js12(28));

// JS13: Write a JavaScript function to compute the factors of a positive integer. 
function js13(input) {
    let factors = []
    // check numbers between 1 and itself (inclusive)
    for (let i = 1; i <= input; i++) {
        // check for every divisor, add factors to the list
        if (input % i == 0) {
            factors.push(i);
        }
    }
    return factors;
}
console.log(js13(12));
console.log(js13(1));
console.log(js13(97));




