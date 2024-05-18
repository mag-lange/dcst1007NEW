class Bank_services {

    getAccounts(success) {
        pool.query('SELECT * FROM BankAccounts', (error, results) => {
            if (error) return console.error(error);
            success(results)
        })
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
export let bank_services = new Bank_services();