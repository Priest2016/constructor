var Scene2D = (function () {
	function Scene2D(_id, _width, _height) {
		this.width = _width;
		this.height = _height;
		this.stage = new Konva.Stage({
			container: _id,
			width: _width,
			height: _height
		});

		this.gridLayer = new Konva.Layer();
		this.vertexesLayer = new Konva.Layer();
		this.edgesLayer = new Konva.Layer();
		this.polygonsLayer = new Konva.Layer();

		this.stage.add(this.gridLayer);
		this.stage.add(this.polygonsLayer);
		this.stage.add(this.edgesLayer);
		this.stage.add(this.vertexesLayer);

		this.vertexesCount = 0;
		this.edgesCount = 0;
		this.polygonsCount = 0;
		this.drawGrid();
	}

	Scene2D.prototype.drawGrid = function () {
		var dist = 10;

		for (var i=0; i<this.width; i=i+dist) {
			var line = new Konva.Line({
				strokeWidth: 1,
				stroke: 'black',
				lineCap: 'round',
				opacity: 1.0,
				points: [0, i, this.height, i]
			});

			this.gridLayer.add(line);
		}

		for (var j=0; j<this.height; j=j+dist) {
			var line = new Konva.Line({
				strokeWidth: 1,
				stroke: 'black',
				lineCap: 'round',
				opacity: 1.0,
				points: [j, 0, j, this.width]
			});

			this.gridLayer.add(line);
		}

		this.gridLayer.draw();
	};

	Scene2D.prototype.buildVertex = function (_x, _y) {
		var vertex = new Konva.Circle({
			x: _x,
			y: _y,
			radius: 5,
			stroke: '#999',
			strokeWidth: 2,
			fill: '#222',
			draggable: true,
			vertexPosition: this.vertexesCount
		});

		this.vertexesCount+=1;

		vertex.on('mouseover', function () {
			this.setStroke('#222');
			this.setFill('#999');
			s.vertexesLayer.draw();
		});

		vertex.on('mouseout', function () {
			this.setStroke('#999');
			this.setFill('#222');
			s.vertexesLayer.draw();
		});

		vertex.on('dragend', function () {
			s.redrawEdges();
			s.redrawPolygons();
		});

		this.vertexesLayer.add(vertex);
		this.vertexesLayer.draw();

		return vertex;
	};

	Scene2D.prototype.buildEdge = function (_begin, _end) {
		var beginVertex = this.buildVertex(_begin[0], _begin[1]);
		var endVertex = this.buildVertex(_end[0], _end[1]);

		var edge = new Konva.Line({
			strokeWidth: 3,
		    stroke: 'black',
		    lineCap: 'round',
		    opacity: 1.0,
		    points: [0, 0],
		    beginVertexPosition: beginVertex.attrs.vertexPosition,
		    endVertexPosition: endVertex.attrs.vertexPosition
		});

		var points = [beginVertex.attrs.x, beginVertex.attrs.y, endVertex.attrs.x, endVertex.attrs.y];
		edge.setPoints(points);

		this.edgesLayer.add(edge);
		this.edgesLayer.draw();
	};

	Scene2D.prototype.buildPoygon = function (_points) {
		var vertexesStart = this.vertexesLayer.children.length;

		var forSet = [];

		for (var i=0; i<_points.length; i++) {
			this.buildVertex(_points[i][0], _points[i][1]);
			forSet[forSet.length] = _points[i][0];
			forSet[forSet.length] = _points[i][1];
		}

		var vertexesEnd = this.vertexesLayer.children.length-1;

		var polygon = new Konva.Line({
			strokeWidth: 3,
		    stroke: 'black',
		    lineCap: 'round',
		    opacity: 1.0,
		    points: [0, 0],
		    closed: true,
		    startVertexPosition: vertexesStart,
		    endVertexPosition: vertexesEnd
		});

		polygon.setPoints(forSet);

		this.polygonsLayer.add(polygon);
		this.polygonsLayer.draw();
	};

	Scene2D.prototype.redrawEdges = function () {
		for (var i=0; i<this.edgesLayer.children.length; i++) {
			var bp = this.edgesLayer.children[i].attrs.beginVertexPosition;
			var ep = this.edgesLayer.children[i].attrs.endVertexPosition;

			var points = [this.vertexesLayer.children[bp].attrs.x,
						  this.vertexesLayer.children[bp].attrs.y,
						  this.vertexesLayer.children[ep].attrs.x,
						  this.vertexesLayer.children[ep].attrs.y];
			this.edgesLayer.children[i].setPoints(points);
			this.edgesLayer.draw();
		}
	};

	Scene2D.prototype.redrawPolygons = function () {
		for (var i=0; i<this.polygonsLayer.children.length; i++) {
			var vs = this.polygonsLayer.children[i].attrs.startVertexPosition;
			var ve = this.polygonsLayer.children[i].attrs.endVertexPosition;

			var positions = [];

			for (var j=vs; j<ve+1; j++) {
				positions[positions.length] = this.vertexesLayer.children[j].attrs.x;
				positions[positions.length] = this.vertexesLayer.children[j].attrs.y;
			}

			this.polygonsLayer.children[i].setPoints(positions);
			this.polygonsLayer.draw();
		}
	};

	return Scene2D;
}());

var s = new Scene2D('canvas', 800, 800);
// s.buildVertex(10, 10);
// s.buildVertex(20, 20);
// s.buildEdge([30, 30], [40, 40]);

s.buildPoygon([[10, 10], [10, 100], [100, 100], [250, 200]]);
