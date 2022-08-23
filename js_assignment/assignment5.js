// Create a function that every time you invoke it, it will print out the message “Congrats you earn the chance!“,
// however it can only print out the message with the first 5 invokes. all the rest invokes will print out the message
// “Sorry you missed the chance” (run function once count as 1 invoke)
function chance() {
    let count = 1;
    return function() {
        if (count <= 5) {
            console.log("Congrats you earn the chance!");
        } else {
            console.log("Sorry you missed the chance");
        }
        count++;
    }
}
const closure = chance();

// for(let i = 0; i < 5; i++){
//     closure();
// }
// for(let i = 0; i < 12; i++){
//     closure();
// }


// Implement the callback function "longerThan" for : Array.filter(longerThan(minimumLength)) 
function longerThan(length){
    return (element) => {
        return (element.length > length)
    }
}
// console.log(["I", "as", 'egg', "kind", "hatch", "chicks"].filter(longerThan(0)));
// console.log(["I", "as", 'egg', "kind", "hatch", "chicks"].filter(longerThan(1)));
// console.log(["I", "as", 'egg', "kind", "hatch", "chicks"].filter(longerThan(2)));
// console.log(["I", "as", 'egg', "kind", "hatch", "chicks"].filter(longerThan(3)));
// console.log(["I", "as", 'egg', "kind", "hatch", "chicks"].filter(longerThan(4)));

