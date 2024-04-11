//Code for OOP1.html
class Car {
    constructor(registration, brand, yearModel, speed, max_speed) {
        this.registration = registration
        this.brand = brand
        this.yearModel = yearModel
        this.speed = speed
        this.max_speed = max_speed
    }
    accelerate() {
        this.speed = this.speed + 10
        if(this.speed >= this.max_speed) {
            this.speed = this.max_speed
            return this.speed
        }
        return this.speed
    }
    brake() {
        this.speed = this.speed - 10
        if (this.speed < 0) {
            this.speed = 0
            return this.speed
        }
        return this.speed
    }
}

let cars = [
    volvo = new Car("BT8713", "volvo", "2005", 0, 100),
    bmw = new Car("ZZ1234", "BMW", "2020",0, 150),
    toyota = new Car("EB1829", "toyota", "2019", 0, 60),
    ferrari = new Car("BD8938", "ferrari", "2023", 0, 200)
]

let x = 0
let backwards_v = false
let backwards_b = false
let backwards_t = false
let backwards_f = false
let volvo_img = document.getElementById("volvo_car")
let bmw_img = document.getElementById("bmw_car")
let toyota_img = document.getElementById("toyota_car")
let ferrari_img = document.getElementById("ferrari_car")

setInterval(() => { //This interval code is crazy inefficient, and I used several hours trying to get this all into a single function
    x = x%4 //but I had to give up eventually and went to something that hurts my eyes (copying almost identical code 4 times)
    let speed = cars[x].speed
    switch (x) {
        case 0:
            document.getElementById("speed_volvo").innerHTML = speed
            if (speed == 0) {break}
            else if (volvo_img.offsetLeft < 1000 && backwards_v == false) {
                volvo_img.style.left = (volvo_img.offsetLeft + speed) + 'px'
            }
            else {
                backwards_v = true
                volvo_img.style.left = (volvo_img.offsetLeft - speed) + 'px'
                if (volvo_img.offsetLeft < 10) {
                    backwards_v = false
                }
            }
            break;
        case 1:
            document.getElementById("speed_bmw").innerHTML = speed   
            if (speed == 0) {break}
            else if (bmw_img.offsetLeft < 1000 && backwards_b == false) {
                bmw_img.style.left = (bmw_img.offsetLeft + speed) + 'px'
            }
            else {
                backwards_b = true
                bmw_img.style.left = (bmw_img.offsetLeft - speed) + 'px'
                if (bmw_img.offsetLeft < 10) {
                    backwards_b = false
                }
            }  
            break;
        case 2:
            document.getElementById("speed_toyota").innerHTML = speed
            if (speed == 0) {break}
            else if (toyota_img.offsetLeft < 1000 && backwards_t == false) {
                toyota_img.style.left = (toyota_img.offsetLeft + speed) + 'px'
            }
            else {
                backwards_t = true
                toyota_img.style.left = (toyota_img.offsetLeft - speed) + 'px'
                if (toyota_img.offsetLeft < 10) {
                    backwards_t = false
                }
            }  
            break;
        case 3:
            document.getElementById("speed_ferrari").innerHTML = speed
            if (speed == 0) {break}
            else if (ferrari_img.offsetLeft < 1000 && backwards_f == false) {
                ferrari_img.style.left = (ferrari_img.offsetLeft + speed) + 'px'
            }
            else {
                backwards_f = true
                ferrari_img.style.left = (ferrari_img.offsetLeft - speed) + 'px'
                if (ferrari_img.offsetLeft < 10) {
                    backwards_f = false
                }
            }  
            break;
    }
    x++
},1)


let accelerate_button = document.getElementById("accelerate")
accelerate_button.onclick = () => {
    let carSelection = document.getElementById("carSelection")
    let selectedCar = cars[carSelection.value]; // A bit complex, but I did not find any better solution
    selectedCar.accelerate();
}

let brake_button = document.getElementById("brake")
brake_button.onclick = () => {
    let carSelection = document.getElementById("carSelection")
    let selectedCar = cars[carSelection.value]; // A bit complex, but I did not find any better solution
    selectedCar.brake();
}

//To improve 

//Get the images into the objects so no functions are used, only methods 
//Combine the 4 moving functions into one function 
//Make the pictures reverse when they change direction
//In general just cut down time on code, write the same program with fewer lines.






