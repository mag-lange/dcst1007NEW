import {bank_services} from './OOP2_service';

class BankAccount {
    constructor ( clientNumber, clientName, amount ) {
        this.clientNumber = clientNumber;
        this.clientName = clientName
        this.amount  = parseInt(amount)
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
class Bank_accounts {
    accounts = []
}
console.log(bank_services.getAccounts())



let simulate = document.getElementById("simulate")
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
