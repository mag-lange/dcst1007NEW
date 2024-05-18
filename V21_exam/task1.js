class Kjoretoy {
    constructor(makshastighet, kjorelengde) {
        this.makshastighet = makshastighet
        this. kjorelengde = kjorelengde
        this.farge = 'White' //This extends to busses as well
    }
}

class Buss extends Kjoretoy {
    constructor(makshastighet, kjorelengde, makspassasjerer) {
        super() //Enough to call this super, there is no need to specify parameters
        this.makspassasjerer = makspassasjerer
        
    }

    sjekkAntall(antallpassasjerer) {
        if (antallpassasjerer > this.makspassasjerer) {
            console.log('Warning, number of passangers to great')
            return false
        }
        else if (antallpassasjerer <= this.makspassasjerer) {
            console.log('Number of passengers okay')
            return true
        }
        else {
            console.log('Check your entry data, something unexpected happened')
            return false
        }
    }

    totalPris() {
        let total_pris = ((this.makspassasjerer * 100) * 1.25)
        return total_pris
    }
}

let kjoretoy1 = new Kjoretoy(100, 10000)
let kjoretoy2 = new Kjoretoy(70, 15000)
let buss1 = new Buss(50, 5000, 70)
let buss2 = new Buss(50, 5000, 40)
let buss3 = new Buss(50, 5000, 'apple')


console.log('Kjoretoy1:', kjoretoy1, 'Kjoretoy2:', kjoretoy2)
console.log('Buss1:', buss1.sjekkAntall(50))
console.log('Buss2:', buss2.sjekkAntall(50))
console.log('Buss3:', buss3.sjekkAntall(50))
console.log('Buss2 farge:', buss2.farge)
console.log('kjoretoy1 farge:', kjoretoy1.farge)
console.log('Buss2 pris:', buss2.totalPris())

