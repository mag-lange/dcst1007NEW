//Script file for promises.html


let btn1 = document.getElementById("btn1")
btn1.onclick = () => {testTall()}

async function testTall() {
    let testNumber = document.getElementById("data1").value
    testNumber = parseInt(testNumber);
    console.log(testNumber)
    let numberPromise = new Promise( 
        (resolve, reject) => {
            if (testNumber > 10) {
                let answer = "I am greater than 10"
                resolve(answer)
            }
            else if (isNaN(testNumber)) {
                let error = new Error("Please provide me with a number")
                reject(error)
            }
            else {
                let error = new Error("Number is not greater than 10, sorry:(")
                reject(error)
            }
        });

    try {
        let result = await numberPromise;
        console.log(result)
    } catch (error) {
        console.error(error)
    }
}

//Oppgave 2

let btn2 = document.getElementById("btn2")
btn2.onclick = () => { lagStoreBokstaver(); }

async function lagStoreBokstaver() {
    let input2 = document.getElementById("letter_input").value

    let arr_out = new Promise(
        (resolve, reject) => {
            let regex = /^[a-zA-Z\s]+$/; //This method is from geeksforgeeks
            if (regex.test(input2)) {
                console.log("completed test split")
                input2 = input2.toUpperCase()
                input2 = input2.split(" ")
                resolve(input2)
            } else {
                let error = new Error("You have entered something else than a letter, try again")
                reject(error)
            }
        });
    try {
        let sorted = await sortArr(arr_out);
        console.log(sorted)
    } catch (error) {
        console.error(error)
    }
}

async function sortArr(arr_out) {
    return new Promise(
        (resolve, reject) => {
            arr_out.then(input2 => {
                    console.log("completed test sorting") //This string did not go into the condition when I used the same test as in arr_out
                    input2 = input2.sort();
                    resolve(input2)
            }).catch(error => reject(error))
        });
}

// Oppgave 3 
let btn3 = document.getElementById("btn3")
btn3.onclick = () => {get_profile()}
async function get_profile() {
    try {
    let username = document.getElementById("username").value
    let profile_API = await fetch('https://api.github.com/users/' + username)
    let image = document.getElementById("profile_picture")
    let data = await profile_API.json();
    if (data.avatar_url == null) {
        console.log("No such user found") 
        return 
    }
    image.src = data.avatar_url
    console.log(data.avatar_url)
    }
    catch ( error ) {
        console.log("Something went wrong: " + error.message)
    }
}

//Task 3 was really fun, I will play some more with API on my own
//I am not sure how to implement TS as JS since my compiler did not want to accept any of it. I will need more research


