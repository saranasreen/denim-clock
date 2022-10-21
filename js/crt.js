function crtify(color){
    //take in array of length 3 and return rgb color as 3 separate arrays
    var rgb  = [
        [color[0], 0, 0],
        [color[0], 0, 0],
        [0, color[1], 0],
        [0, 0, color[2]],
        [0, 0, color[2]]
    ]
    return rgb

}