/*
The alpha value remains the same across pages and is calculated on load.
Alpha describes numerically how intense the sun is depending on the 
time of day. Using SunCalc to get today's solar calendar, alpha is highest at
solar noon and lowest at nadir.
*/

/*
Key times that are extremes and have set hex values and can be used as stops in the color gradient.
DAWN morning nautical twilight ends, morning civil twilight starts
SUNRISE top edge of the sun appears on the horizon
SUNRISE END bottom edge of the sun touches the horizon
GOLDEN HOUR END morning golden hour (soft light, best time for photography)
SOLAR NOON sun is in the highest position
GOLDEN HOUR evening golden hour starts
SUNSET START bottom edge of the sun touches the horizon
SUNSET sun disappears below the horizon, evening civil twilight starts
DUSK evening nautical twilight starts
NAUTICAL DUSK evening astronomical twilight starts
NIGHT dark enough for astronomical observations
NADIR darkest moment of the night, sun is in the lowest position
*/

function getAlphaFromTime(now, solar){
    var alpha = 0;
    if (now <= solar.dawn){
        alpha = 0;
    } else if (now > solar.dawn && now <= solar.solarNoon){
        alpha = (now  - solar.dawn) / (solar.solarNoon - solar.dawn);
    }else if (now > solar.solarNoon && now < solar.dusk){
        alpha = 1 - ((now - solar.solarNoon) / (solar.dusk - solar.solarNoon));
    } else {
        alpha = 0;
    }
    return alpha
}

function getBodyFromMode(mode, solar){
    var body = 0;
    if (mode <= solar.dawn){
        body = 0;
    } else if (mode > solar.dawn && mode <= solar.solarNoon){
        body = (mode  - solar.dawn) / (solar.solarNoon - solar.dawn);
    }else if (mode > solar.solarNoon && mode < solar.dusk){
        body = 1 - ((mode - solar.solarNoon) / (solar.dusk - solar.solarNoon));
    } else {
        body = 0;
    }
    return body
}

function getSolarColor(mode, solar, startOfDay, endOfDay){

    var solar_stops = [
        {time: startOfDay, hex: '#003'},
        {time: solar.dawn, hex: '#006'},
        {time: solar.sunrise, hex: '#F06'},
        {time: solar.goldenHourEnd, hex: '#FC0'},
        {time: solar.solarNoon, hex: '#FFC'},
        {time: solar.goldenHour, hex: '#FC0'},
        {time: solar.sunset, hex: '#F60'},
        {time: solar.dusk, hex: '#006'},
        {time: endOfDay, hex: '#003'},
    ]

    let colorAlpha = null;
    var i = 0;

    while (colorAlpha == null){
        if (solar_stops[i].time <= mode && mode <= solar_stops[i+1].time){
            var total = solar_stops[i+1].time - solar_stops[i].time;
            currDuration = mode - solar_stops[i].time;
            colorAlpha = currDuration / total;
            c1 = new Color(solar_stops[i].hex);
            c2 = new Color(solar_stops[i+1].hex);

            var rgbComponents = [
                (1 - colorAlpha) * c1.red + colorAlpha * c2.red, 
                (1 - colorAlpha) * c1.green + colorAlpha * c2.green, 
                (1 - colorAlpha) * c1.blue + colorAlpha * c2.blue
            ];
            var solarColor = new Color(rgbComponents);

        }
        i++;
    }

    
    return solarColor;
}