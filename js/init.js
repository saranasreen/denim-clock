function updateTwill(frame_top_left, frame_size, resolution, alpha){
	var curr_rate = 0;
	var warp_generations = Math.round(1 / (1-resolution[0]));
	//var warp_generations = 1;
	var weft_generations = Math.round(1 / (1-resolution[1]));
	var cell_size = new Size(Math.round(frame_size.width / warp_generations), Math.round(frame_size.height / weft_generations));

	var main_twill_punch = [0,1,1];
	var row = [];
	var data = [];
	var traffic = false;

	for(c = 0; c < warp_generations; c++){
		col = [];
		
		for(h = 0; h < weft_generations; h++){
			var twill_punch = main_twill_punch;
			var top_left = new Point(frame_top_left.x + (c * cell_size.width), frame_top_left.y + (h * cell_size.height));
			var rect = new Rectangle(top_left, cell_size);
				//console.log(rect);
			var path = new Path.Rectangle(rect);
			var type;
			
			if(twill_punch[c % 3]){
				path.fillColor = set_weft_gradient(top_left, cell_size, alpha, curr_rate);
                //path.fillColor = "black"
				var type = "weft";
			} else {
			    path.fillColor = set_warp_gradient(top_left, cell_size, alpha, curr_rate);
                //path.fillColor = "black"
				var type = "warp";
			}
			var color = 'white';
			var cell = new Cell(top_left, type, path, cell_size, traffic, color);
			col.push(cell);
			twill_punch.push(twill_punch.shift());
		}
		data.push(col);
		main_twill_punch.push(main_twill_punch.shift());
	}

	this.data = data;
	return this;
}


function updateBgGradient(color){
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

function updateSolar(color){
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