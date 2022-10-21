// get gradient fill based on color stops array, origin, destination
// returns gradient fill
function gradientFill(colors, origin, destination){
    stops = []
    for (var i = 0; i < colors.length; i++){
        r = colors[i][0]/255
        g = colors[i][1]/255
        b = colors[i][2]/255
        marker = i/(colors.length-1)
        stops.push([new Color(r,g,b), marker])
    }
	var fill = {
		gradient: {
			stops: stops
		},
		origin: origin,
		destination: destination
		};
	return fill;
}

// get the start and stop coordinates of a gradient fill pattern based on direction
function gradientCoors(direction, frame){
    var origin
    var destination
    if (direction == "NW"){ //NW
        origin = frame.bottomRight
        destination = frame.topLeft
    } else if (direction == "SE"){ //SE
        origin = frame.topLeft
        destination = frame.bottomRight
    } else if (direction == "SN"){ //SN
        origin = frame.bottomCenter
        destination = frame.topCenter
    } else if (direction == "NS"){ //NS
        origin =frame.topCenter
        destination = frame.bottomCenter
    } else if (direction == "NE"){ //NE
        origin = frame.bottomLeft
        destination = frame.topRight
    } else if (direction == "SW"){ //SW
        origin = frame.topRight
        destination = frame.bottomLeft
    } else if (direction == "WE"){ //WE
        origin = frame.leftCenter
        destination = frame.rightCenter
    } else if (direction == "EW"){ //EW
        origin = frame.rightCenter
        destination = frame.leftCenter
    }
    return [origin, destination]
}