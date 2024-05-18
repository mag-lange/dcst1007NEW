class Car {
  model: string;
  car_number: number;
  speed: number;
  car_name: string;

  constructor(model: string, car_name: string, number: number, speed: number) {
    (this.model = model),
      (this.car_name = car_name),
      (this.car_number = number),
      (this.speed = speed);
  }

  accelerate() {
    return this.speed + 10;
  }
}

export let car = new Car(model, car_name, car_number, speed);
