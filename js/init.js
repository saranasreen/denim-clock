function update_bg_gradient(color){
    var column = new Color(119/255, 136/255, 153/255,1)
    var body = new Color(color)

    // background size and position
    var frame_size = new Size(view.bounds.width, view.bounds.height)
    var frame_top_left = new Point(view.bounds.x, view.bounds.y)
    var rect = new Rectangle(frame_top_left, frame_size);
    var path = new Path.Rectangle(rect);

    var origin = new Point(view.bounds.x, view.center.y);
    var destination = new Point(view.bounds.width, view.center.y);

    path.fillColor = {
        gradient: {
            stops: [[column, 0], [body, 0.1], [body, 0.9], [column, 1]],
        },
        origin: origin,
        destination: destination
    };
}

function update_solar(color){
    // solar size and position
    var frame_size = new Size(view.bounds.width/2, view.bounds.height/2)
    var frame_top_left = new Point(view.center.x, view.center.y)
    var rect = new Rectangle(frame_top_left, frame_size);
    var path = new Path.Rectangle(rect);
    path.fillColor = color
}