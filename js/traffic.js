function plotTraffic(tile, threads, density){
	// column and row amount based on resolution
	var	columns = tile.length
	var	rows = tile[0].length

	var amountofCars = Math.floor(columns * density);
	dawdleProbability = .4;
    maxSpeed = 5;

	var cars = [];
	var data = [];

	//init cars array
	for(var i = 0; i < amountofCars; i++){
		var car = new Car(i, Generator.getRandomSpeed(maxSpeed), Math.round(columns * i / amountofCars), Generator.getRandomColor());
        cars.push(car);
	}

	for (var j = 0; j < rows; j++) {

        cars = Generator.accelerate(cars, maxSpeed);
        cars = Generator.brake(cars, amountofCars, columns);
        cars = Generator.dawdle(cars, dawdleProbability);
        cars = Generator.move(cars, columns);

        for(var c = 0; c < amountofCars; c++){
			//var stops = threads[punch[c % punch.length]]
			var [origin, destination] = gradientCoors(rotatePunch([tile[cars[c].position][j].direction]), tile[cars[c].position][j].rectangle)
			tile[cars[c].position][j].path.fillColor = gradientFill(threads[tile[cars[c].position][j].direction], origin, destination)
 
        }
    }

    return tile;
}
