// initTile takes in a boundingBox, pattern, and threads, resolution, direction and returns a tile

// array containing all cells in a tile. This is then saved in order to allow future updates
function initTile(punch, frame, threads, resolution, direction){

	// column and row amount based on resolution
	var	columns = Math.round(1 / (1-resolution[0]))
	var	rows = Math.round(1 / (1-resolution[1]))

	var size = new Size(Math.round(frame.width / columns), Math.round(frame.height / rows))
	var data = []

	if(direction == "NS"){
		for(var c = 0; c < columns; c++){
			col = []
			for(var h = 0; h < rows; h++){
				var stops = threads[punch[h % punch.length]]
				var cell = makeCell(frame, size, stops, punch, c, h, punch[h % punch.length])
				col.push(cell)
				
			}
			data.push(col);
			punch.push(punch.shift())	

		}
	} else {
		punch = rotatePunch(punch)
		threads = rotateThreads(threads)
		for(var j = 0; j < rows; j++){
			row = []
			for(var k = 0; k < columns; k++){
				var stops = threads[punch[k % punch.length]]
				var cell = makeCell(frame, size, stops, punch, k, j, punch[k % punch.length])
				row.push(cell)
			}
			data.push(row);
			punch.push(punch.shift())
		}
	}
	return data;

}

function rotateThreads(threads){
	var new_threads = {}
	var direction
	for (var v in threads){
		direction = v
    	if (direction == "NW"){ //NW
    	    direction = "NE"
    	} else if (direction == "SE"){ //SE
    	    direction = "SW"
    	} else if (direction == "SN"){ //SN
    	    direction = "EW"
    	} else if (direction == "NS"){ //NS
    	    direction = "EW"
    	} else if (direction == "NE"){ //NE
    	    direction = "NW"
    	} else if (direction == "SW"){ //SW
    	    direction = "SE"
    	} else if (direction == "WE"){ //WE
    	    direction = "N"
    	} else if (direction == "EW"){ //EW
    	    direction = "NS"
    	}
		new_threads[direction] = threads[v]
	}
	return new_threads
}

function rotatePunch(punch){
	var new_punch = []
	var direction
	for (var c = 0; c < punch.length; c++){
		direction = punch[c]
    	if (direction == "NW"){ //NW
    	    direction = "NE"
    	} else if (direction == "SE"){ //SE
    	    direction = "SW"
    	} else if (direction == "SN"){ //SN
    	    direction = "EW"
    	} else if (direction == "NS"){ //NS
    	    direction = "EW"
    	} else if (direction == "NE"){ //NE
    	    direction = "NW"
    	} else if (direction == "SW"){ //SW
    	    direction = "SE"
    	} else if (direction == "WE"){ //WE
    	    direction = "NS"
    	} else if (direction == "EW"){ //EW
    	    direction = "NS"
    	}
		new_punch.push(direction)
	}
	return new_punch
}

function updateRaster(textAlpha){
                
	if (textAlpha){
		var rasterSource = 'img/picker_large_light.png'
	} else {
		var rasterSource = 'img/picker_large_dark.png'
	}
	return rasterSource
}

function makeCell(frame, size, stops, punch, c, h, direction){
	var topLeft = new Point(frame.x + (c * size.width), frame.y + (h * size.height))
	var rect = new Rectangle(topLeft, size)
	var path = new Path.Rectangle(rect)
	path.fillColor = 'red'
	var [origin, destination] = gradientCoors(direction, rect)
	path.fillColor = gradientFill(stops, origin, destination)
	cell = new Cell(punch[h % punch.length], path, rect)
	return cell
}