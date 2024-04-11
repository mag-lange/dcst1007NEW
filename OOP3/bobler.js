class Boble {
    constructor(x,y,r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.farge = this.random_farge()
    }
    flytt() {
      this.x = this.x + (Math.random() * 10 -5); //Removing the Math.floor() means that they move equally to the left and right
      this.y = this.y + (Math.random() * 10 -5); //I don't care about having only integers sicne it does not matter here
    }
    random_farge() {
        let red = Math.floor(Math.random()*255);
        let green = Math.floor(Math.random()*255);
        let blue = Math.floor(Math.random()*255);
        return "RGB(" + red + "," + green + "," + blue + ")"
    }
    vis() {
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
      ctx.fillStyle = this.farge;
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.stroke();
    }
    inneholder(musx,musy) {
      let a = musx - this.x;
      let b = musy - this.y;
      let d = Math.sqrt(a*a + b*b);

      if (d < this.r) {
        return true;
      } else {
        return false;
      }
    }
    kant_sjekk() {
        if (this.x >= canvas.width) {this.x -= 20}
        else if (this.y >= canvas.height) {this.y -= 20}
        else if (this.x <= 0) {this.x += 20} 
        else if (this.y <= 0) {this.y += 20}
        else {return}
        //I orginially did this with two sentences and || operator, but I found the adjusting movement to be janky
    }
  }

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.addEventListener("mousedown",musklikk,false);

  var bobler = []; //in this array all the elements are stored

  for(let i = 0; i < 10; i++) {
    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);
    let r = Math.floor(Math.random() * 40 + 10);
    bobler[i] = new Boble(x,y,r);
  }

  setInterval(tegn,100);
  setInterval(ny_boble, 1000); //Choosing a different interval to keep it from clustering


  function ny_boble() {
    if (bobler.length > 200) { //As a safety mechanism so my webpage does not overload
        return
    }
    bobler.push(new Boble(Math.floor(Math.random() * canvas.width),Math.floor(Math.random() * canvas.height),Math.floor(Math.random() * 40 + 10)))
  } //Could maybe have done this more elegant by making a separate method, but since I am only doing this twice in the code it is okay I think

  function tegn() {
    reset();
    for(let i = 0; i < bobler.length; i++) {
      bobler[i].flytt();
      bobler[i].vis();
      bobler[i].kant_sjekk(); //This makes sure the bubbles do not escape
    }
  }

  function reset() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }

  function musklikk(event) {
    var fikkvalgtenboble = false;

    for(let i = 0; i < bobler.length; i++) {
      if(bobler[i].inneholder(event.x,event.y)) {
        bobler.splice(i,1);
        fikkvalgtenboble = true;
      }
    }

    if(fikkvalgtenboble == false) {
      let r = Math.floor(Math.random() * 40 + 10);
      let b = new Boble(event.x,event.y,r);
      bobler.push(b);
    }
  }
