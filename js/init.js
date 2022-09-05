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
    var frame_size = new Size(view.bounds.width/4, view.bounds.height/4)
    var frame_top_left = new Point(view.center.x, view.center.y)
    var rect = new Rectangle(frame_top_left, frame_size);
    var path = new Path.Rectangle(rect);

    var origin = new Point(view.center.x, view.center.y + view.bounds.height/8);
    var destination = new Point(view.center.x+view.bounds.width/4, view.center.y + view.bounds.height/8);

	path.fillColor = {
		gradient: {
			stops: [[new Color(color.red,0,0), 0], [new Color(color.red,0,0), 0.15], [new Color(0,color.green,0), 0.45], [new Color(0,0,color.blue), 0.8], [new Color(0,0,color.blue), 1]],
		},
		origin: origin,
		destination: destination
		};
}