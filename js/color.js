function getAlpha(SunCalc, time, coordinates){
    /*-- SOLAR POSITION- get solar position on page load based on time value--*/
    var solarPosition = SunCalc.getPosition(time[1], coordinates[0], coordinates[1]).altitude

    /*-- SOLAR NOON POSITION - get position of the sun at solar noon based on time --*/
    var noonPosition = SunCalc.getPosition(SunCalc.getTimes(time[1], coordinates[0], coordinates[1]).solarNoon, coordinates[0], coordinates[1]).altitude
    // if solarPosition is less than zero this sun is is below the horizon
    if (solarPosition < 0){
        alpha = 0
    } else {
        alpha = solarPosition / noonPosition
    }
    return 1-alpha
}

function updateThreads(threads, alpha){
    var mixed = {}
    for (var v in threads){
        var thread = []
        for (var k = 0; k < threads[v].length; k++){
            //rgb mix the two colors
            thread.push(rgbMix(threads[v][k], alpha))
        }
        mixed[v] = thread
    }
    return mixed
}

function rgbMix(colors, alpha){
    //there will always be 3 for rgb
    var mixed = []
    for (var i = 0; i < colors[0].length; i++){
        mixed.push(Math.round((1 - alpha) * colors[0][i] + alpha * colors[1][i]))
    }
    return mixed
    
}

function getTemperature(SunCalc, time, coordinates, threads){
    var solar = SunCalc.getTimes(time[1], coordinates[0], coordinates[1])
    var startOfDay = time[0]
    var endOfDay = time[2]

    var solar_stops = [
        {time: startOfDay, rgb: [0, 0, 128]},
        {time: solar.dawn, rgb: [255, 20, 147]},
        {time: solar.sunrise, rgb: [255, 69, 0]},
        {time: solar.goldenHourEnd, rgb: [255, 255, 0]},
        {time: solar.solarNoon, rgb: [255, 255, 255]},
        {time: solar.goldenHour, rgb: [255, 69, 0]},
        {time: solar.sunset, rgb: [255, 20, 147]},
        {time: solar.dusk, rgb: [255, 20, 147]},
        {time: endOfDay, rgb: [0, 0, 128]},
    ]

    let colorAlpha = null;
    var i = 0;
    while (!colorAlpha){
        if (solar_stops[i].time <= time[1] && time[1] <= solar_stops[i+1].time){
            var total = solar_stops[i+1].time - solar_stops[i].time;
            currDuration = time[1] - solar_stops[i].time;
            colorAlpha = currDuration / total;
            color = rgbMix([solar_stops[i].rgb, solar_stops[i+1].rgb], colorAlpha)
        }
        i++;
    }
    var mixed = {}

    for (var v in threads){
        var thread = crtify(color)
        mixed[v] = thread
    }
    return mixed
}