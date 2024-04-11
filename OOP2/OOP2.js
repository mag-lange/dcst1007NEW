//Script for the tasks to be delivered in week 4


class BankAccount {
    constructor ( clientNumber, clientName, amount ) {
        this.clientNumber = clientNumber;
        this.clientName = clientName
        this.amount  = parseInt(amount) //Feature that means you can write in 200 or "200"
    }
    amountNow() {
        this.accountInfo()
        return this.amount
    }
    withdraw(withdrawAmount) {
        this.withdrawAmount = withdrawAmount
        if (this.amount < this.withdrawAmount) {
                return console.log(this.clientName + " does not have enough money to withdraw this amount")
        }
        else {
            this.amount = (this.amount - withdrawAmount)
        
        this.accountInfo()
        return console.log("Withdrawal of " + withdrawAmount + "$ from " + this.clientName + " successful. New amount: " + this.amountNow() + "$")
        }
    }
    deposit(depositAmount) {
        this.depositAmount = depositAmount
        this.amount = (this.amount + depositAmount)
        this.accountInfo()
        return console.log("Money on its way! " + this.clientName + " has received " + depositAmount + "$, New amount: " + this.amountNow() + "$") 
    }
    accountInfo() {
        console.log(this.clientName + " with client number " + this.clientNumber + " has " + this.amount + "$ available")

        return document.getElementById(this.clientNumber.toString()).innerHTML = this.amount + "$"
    }
}
class ChildAccount extends BankAccount {
    constructor ( clientNumber, clientName, age) {
        super( clientNumber, clientName)
        this.age = age
        this.amount = 200        
        this.age = age

        if (age > 3) {
            console.log("error, cannot get child bonus, age to high")
            this.amount = 0
        }
    }
}

let lise_jensen = new ChildAccount(9294, "Lise Jensen", 2)
let kari_hansen = new BankAccount(1234, "Kari Hansen", 895)
let petter_olsen = new BankAccount(3311, "Petter Olsen", 0)
let simulate = document.getElementById("simulate")
lise_jensen.accountInfo()
kari_hansen.accountInfo()
petter_olsen.accountInfo()

simulate.onclick = () => {
    
    let time_now = new Date();
    time_now.setHours(7, 0, 0, 0);
    let time_html = document.getElementById("time")
    let form_time
    
    let bank_simulation = setInterval(() => {
        time_now.setTime(time_now.getTime() + 60000);
        form_time = `${time_now.getHours().toString().padStart(2, '0')}:${time_now.getMinutes().toString().padStart(2, '0')}` 
        //padstart function from chatGPT
        time_html.innerText = "The time is - " + form_time;

        switch(form_time.toString()) {
                case "10:30":
                    kari_hansen.withdraw(300)
                    break;
                case "11:00":
                    lise_jensen.deposit(4000)
                    petter_olsen.deposit(3000)
                    break
                case "12:15":
                    kari_hansen.withdraw(250)
                    petter_olsen.deposit(250)
                    break
                case "17:30":
                    kari_hansen.withdraw(800)
                    break
                case "23:00":
                    console.log("Bank is closing now, goodnight")
                    clearInterval(bank_simulation)
                    return
                default:
                    break
        }
    }, 1);
    }
