var Scene2D = (function () {
	function Scene2D(_id, _width, _height) {
		this.width = _width;
		this.height = _height;

		this.center = [this.width / 2, this.height / 2];

		this.stage = new Konva.Stage({
			container: _id,
			width: _width,
			height: _height
		});

		this.gridLayer = new Konva.Layer();
		this.vertexesLayer = new Konva.Layer();
		this.edgesLayer = new Konva.Layer();
		this.polygonsLayer = new Konva.Layer();
		this.polygonsEdgesCentersLayer = new Konva.Layer();
		this.buttonsLayer = new Konva.Layer();

		this.stage.add(this.gridLayer);
		this.stage.add(this.polygonsLayer);
		this.stage.add(this.edgesLayer);
		this.stage.add(this.vertexesLayer);
		this.stage.add(this.polygonsEdgesCentersLayer);
		this.stage.add(this.buttonsLayer);

		this.vertexesCount = 0;
		this.edgesCount = 0;
		this.polygonsCount = 0;
		this.drawGrid();
		this.createButtons();

		this.selectedEdge = -1;
	}

	Scene2D.prototype.createButtons = function () {
		var group = new Konva.Group({
			x: 100,
			y: 100
		});
		
		var Plus = new Konva.Circle({
			x: 50,
			y: 50,
			radius: 20,
			strokeWidth: 2,
			stroke: 'blue',
			fill: 'green',
		});

		var Minus = new Konva.Circle({
			x: 150,
			y: 50,
			radius: 20,
			strokeWidth: 2,
			stroke: 'red',
			fill: 'green',
		});

		var Delete = new Konva.Circle({
			x: 50,
			y: 100,
			radius: 20,
			strokeWidth: 2,
			stroke: 'green',
			fill: 'red',
		});

		var Subdivide = new Konva.Circle({
			x: 150,
			y: 100,
			radius: 20,
			strokeWidth: 2,
			stroke: 'yellow',
			fill: 'red',
		});

		Plus.on('click', function () {
			if (s.selectedEdge != -1) {
				s.edgesLayer.children[s.selectedEdge].setStrokeWidth(s.edgesLayer.children[s.selectedEdge].attrs.strokeWidth+1);
				s.edgesLayer.draw();
			}
		});

		Minus.on('click', function () {
			if (s.selectedEdge != -1) {
				s.edgesLayer.children[s.selectedEdge].setStrokeWidth(s.edgesLayer.children[s.selectedEdge].attrs.strokeWidth-1);
				s.edgesLayer.draw();
			}
		});

		Delete.on('click', function () {
			if (s.selectedEdge != -1) {
				s.deleteCurrentEdge();
				s.selectedEdge = -1;
			}
		});

		Subdivide.on('click', function () {
			if (s.selectedEdge != -1) {
				s.subdivideCurrentEdge();
				s.selectedEdge = -1;
			}
		});

		group.add(Plus);
		group.add(Minus);
		group.add(Delete);
		group.add(Subdivide);

		this.buttonsLayer.add(group);
		this.buttonsLayer.children[0].setX(-1000);
		this.buttonsLayer.children[0].setY(-1000);
		this.buttonsLayer.draw();
	};

	Scene2D.prototype.drawGrid = function () {
		var dist = 10;

		for (var i=0; i<this.width; i=i+dist) {
			var line = new Konva.Line({
				strokeWidth: 1,
				stroke: 'black',
				lineCap: 'round',
				opacity: 1.0,
				points: [i, 0, i, this.height]
			});

			this.gridLayer.add(line);
		}

		for (var j=0; j<this.height; j=j+dist) {
			var line = new Konva.Line({
				strokeWidth: 1,
				stroke: 'black',
				lineCap: 'round',
				opacity: 1.0,
				points: [0, j, this.width, j]
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
		    endVertexPosition: endVertex.attrs.vertexPosition,
		    edgeCount: this.edgesLayer.children.length
		});

		var points = [beginVertex.attrs.x, beginVertex.attrs.y, endVertex.attrs.x, endVertex.attrs.y];
		edge.setPoints(points);

		this.edgesLayer.add(edge);
		this.edgesLayer.draw();
	};

	Scene2D.prototype.buildPolygonEdgesCenters = function (_centers) {
		for (var i=0; i<_centers.length; i++) {
			var edgeCenter = new Konva.Circle({
				x: _centers[i].center[0],
				y: _centers[i].center[1],
				radius: 5,
				stroke: '#222',
				strokeWidth: 2,
				fill: 'red',
				draggable: true,
				currentCount: this.polygonsEdgesCentersLayer.children.length
			});

			edgeCenter.on('click', function () {
				s.buttonsLayer.children[0].setX(this.attrs.x);
				s.buttonsLayer.children[0].setY(this.attrs.y);
				s.buttonsLayer.draw();
				s.selectedEdge = this.attrs.currentCount;
			});

			this.polygonsEdgesCentersLayer.add(edgeCenter);
		}

		this.polygonsEdgesCentersLayer.draw();
	};

	Scene2D.prototype.buildPoygon = function (_points) {
		var vertexesStart = this.vertexesLayer.children.length;

		var edgesStart = this.edgesLayer.children.length;

		//centers code begin
		var polygonsEdgesCenters = [];

		for (var i=0; i<_points.length-1; i++) {
			var begin = _points[i];
			var end = _points[i+1];

			var xCenter = Math.round((begin[0] + end[0]) / 2);
			var yCenter = Math.round((begin[1] + end[1]) / 2);

			var center = {
				center: [xCenter, yCenter],
			};

			polygonsEdgesCenters[polygonsEdgesCenters.length] = center;
		}

		var begin = _points[_points.length-1];
		var end = _points[0];

		var xCenter = Math.round((begin[0] + end[0]) / 2);
		var yCenter = Math.round((begin[1] + end[1]) / 2);

		var center = {
			center: [xCenter, yCenter],
		};

		polygonsEdgesCenters[polygonsEdgesCenters.length] = center;
		//centers code end
		
		// edges code begin
		var PolygonVertexes = [];
		for (var i=0; i<_points.length; i++) {
			var vertex = _points[i];

			PolygonVertexes[PolygonVertexes.length] = this.buildVertex(vertex[0], vertex[1]);
		}

		for (var i=0; i<PolygonVertexes.length-1; i++) {
			var begin = PolygonVertexes[i];
			var end = PolygonVertexes[i+1];

			var edge = new Konva.Line({
				strokeWidth: 3,
				stroke: 'black',
				lineCap: 'round',
				opacity: 1.0,
				points: [0, 0],
				beginVertexPosition: begin.attrs.vertexPosition,
				endVertexPosition: end.attrs.vertexPosition,
				edgeCount: this.edgesLayer.children.length
			});

			var points = [begin.attrs.x, begin.attrs.y, end.attrs.x, end.attrs.y];
			edge.setPoints(points);
			this.edgesLayer.add(edge);
			this.edgesLayer.draw();
		}

		var begin = PolygonVertexes[PolygonVertexes.length-1];
		var end = PolygonVertexes[0];

		var edge = new Konva.Line({
			strokeWidth: 3,
			stroke: 'black',
			lineCap: 'round',
			opacity: 1.0,
			points: [0, 0],
			beginVertexPosition: begin.attrs.vertexPosition,
			endVertexPosition: end.attrs.vertexPosition
		});

		var points = [begin.attrs.x, begin.attrs.y, end.attrs.x, end.attrs.y];
		edge.setPoints(points);
		this.edgesLayer.add(edge);
		this.edgesLayer.draw();

		// edges code end

		this.buildPolygonEdgesCenters(polygonsEdgesCenters);
	};

	Scene2D.prototype.redrawEdges = function () {
		this.polygonsEdgesCentersLayer.destroyChildren();
		this.polygonsEdgesCentersLayer.draw();
		for (var i=0; i<this.edgesLayer.children.length; i++) {
			var bp = this.edgesLayer.children[i].attrs.beginVertexPosition;
			var ep = this.edgesLayer.children[i].attrs.endVertexPosition;

			var points = [this.vertexesLayer.children[bp].attrs.x,
						  this.vertexesLayer.children[bp].attrs.y,
						  this.vertexesLayer.children[ep].attrs.x,
						  this.vertexesLayer.children[ep].attrs.y];
			
			var xCenter = Math.round((this.vertexesLayer.children[bp].attrs.x + this.vertexesLayer.children[ep].attrs.x) / 2);
			var yCenter = Math.round((this.vertexesLayer.children[bp].attrs.y + this.vertexesLayer.children[ep].attrs.y) / 2);

			var center = {
				center: [xCenter, yCenter],
				pointsPositions: [bp, ep]
			};

			this.buildPolygonEdgesCenters([center]);

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

	Scene2D.prototype.deleteCurrentEdge = function () {
		if (this.selectedEdge != -1) {
			var edges = [];

			for (var i=0; i<this.selectedEdge; i++) {
				var e = this.edgesLayer.children[i];
				var edge = {
					strokeWidth: e.attrs.strokeWidth,
					stroke: e.attrs.stroke,
					lineCap: e.attrs.lineCap,
					opacity: e.attrs.opacity,
					points: e.attrs.points,
					beginVertexPosition: e.attrs.beginVertexPosition,
		    		endVertexPosition: e.attrs.endVertexPosition
				}

				edges[edges.length] = edge;
			}

			for (var i=this.selectedEdge+1; i<this.edgesLayer.children.length; i++) {
				var e = this.edgesLayer.children[i];
				var edge = {
					strokeWidth: e.attrs.strokeWidth,
					stroke: e.attrs.stroke,
					lineCap: e.attrs.lineCap,
					opacity: e.attrs.opacity,
					points: e.attrs.points,
					beginVertexPosition: e.attrs.beginVertexPosition,
		    		endVertexPosition: e.attrs.endVertexPosition
				}

				edges[edges.length] = edge;
			}

			console.log(edges.length);

			this.edgesLayer.destroyChildren();

			for (var i=0; i<edges.length; i++) {
				var edge = new Konva.Line({
					strokeWidth: edges[i].strokeWidth,
					stroke: edges[i].stroke,
					lineCap: edges[i].lineCap,
					opacity: edges[i].opacity,
					points: edges[i].points,
					beginVertexPosition: edges[i].beginVertexPosition,
					endVertexPosition: edges[i].endVertexPosition,
					edgeCount: this.edgesLayer.children.length
				});

				this.edgesLayer.add(edge);
			}

			this.buttonsLayer.children[0].setX(-1000);
			this.buttonsLayer.children[0].setY(-1000);
			this.buttonsLayer.draw();

			this.redrawEdges();
		}
	};

	Scene2D.prototype.subdivideCurrentEdge = function () {
		if (this.selectedEdge != -1) {
			var edges = [];

			for (var i=0; i<this.selectedEdge; i++) {
				var e = this.edgesLayer.children[i];
				
				var edge = {
					xBegin: this.vertexesLayer.children[e.attrs.beginVertexPosition].attrs.x,
					yBegin: this.vertexesLayer.children[e.attrs.beginVertexPosition].attrs.y,
					xEnd: this.vertexesLayer.children[e.attrs.endVertexPosition].attrs.x,
					yEnd: this.vertexesLayer.children[e.attrs.endVertexPosition].attrs.y
				};

				edges[edges.length] = edge;
			}

			var e = this.edgesLayer.children[this.selectedEdge];
			var begin = [this.vertexesLayer.children[e.attrs.beginVertexPosition].attrs.x,
						 this.vertexesLayer.children[e.attrs.beginVertexPosition].attrs.y];
			var end = [this.vertexesLayer.children[e.attrs.endVertexPosition].attrs.x,
					   this.vertexesLayer.children[e.attrs.endVertexPosition].attrs.y];

			var xCenter = Math.round((begin[0] + end[0]) / 2);
			var yCenter = Math.round((begin[1] + end[1]) / 2);

			var edge = {
				xBegin: begin[0],
				yBegin: begin[1],
				xEnd: xCenter,
				yEnd: yCenter
			};

			edges[edges.length] = edge;

			var edge = {
				xBegin: xCenter,
				yBegin: yCenter,
				xEnd: end[0],
				yEnd: end[1]
			}

			edges[edges.length] = edge;

			for (var i=this.selectedEdge+1; i<this.edgesLayer.children.length; i++) {
				var e = this.edgesLayer.children[i];

				var edge = {
					xBegin: this.vertexesLayer.children[e.attrs.beginVertexPosition].attrs.x,
					yBegin: this.vertexesLayer.children[e.attrs.beginVertexPosition].attrs.y,
					xEnd: this.vertexesLayer.children[e.attrs.endVertexPosition].attrs.x,
					yEnd: this.vertexesLayer.children[e.attrs.endVertexPosition].attrs.y
				};

				edges[edges.length] = edge;
			}

			this.vertexesLayer.destroyChildren();
			this.edgesLayer.destroyChildren();
			this.polygonsEdgesCentersLayer.destroyChildren();

			var centers = [];

			for (var i=0; i<edges.length; i++) {
				var xCenter = Math.round((edges[i].xBegin + edges[i].xEnd) / 2);
				var yCenter = Math.round((edges[i].yBegin + edges[i].yEnd) / 2);

				var center = {
					center: [xCenter, yCenter]
				};

				centers[centers.length] = center;
			}

			PolygonVertexes = [];

			console.log('vertexes length', this.vertexesLayer.children.length);
			this.vertexesCount = 0;

			for (var i=0; i<edges.length; i++) {
				var e = edges[i];

				PolygonVertexes[PolygonVertexes.length] = this.buildVertex(e.xBegin, e.yBegin);
			}

			for (var i=0; i<PolygonVertexes.length-1; i++) {
				var begin = PolygonVertexes[i];
				var end = PolygonVertexes[i+1];

				console.log(end.attrs.vertexPosition);

				var edge = new Konva.Line({
					strokeWidth: 3,
					stroke: 'black',
					lineCap: 'round',
					opacity: 1.0,
					points: [0, 0],
					beginVertexPosition: begin.attrs.vertexPosition,
					endVertexPosition: end.attrs.vertexPosition,
					edgeCount: this.edgesLayer.children.length
				});

				var points = [begin.attrs.x, begin.attrs.y, end.attrs.x, end.attrs.y];
				edge.setPoints(points);

				this.edgesLayer.add(edge);
			}

			var begin = PolygonVertexes[PolygonVertexes.length-1];
			var end = PolygonVertexes[0];

			var edge = new Konva.Line({
				strokeWidth: 3,
				stroke: 'black',
				lineCap: 'round',
				opacity: 1.0,
				points: [0, 0],
				beginVertexPosition: begin.attrs.vertexPosition,
				endVertexPosition: end.attrs.vertexPosition
			});
			var points = [begin.attrs.x, begin.attrs.y, end.attrs.x, end.attrs.y];
			edge.setPoints(points);

			this.edgesLayer.add(edge);

			this.buildPolygonEdgesCenters(centers);

			this.vertexesLayer.draw();
			this.edgesLayer.draw();
			this.polygonsEdgesCentersLayer.draw();
		}
	};

	return Scene2D;
}());

var s = new Scene2D('canvas', 800, 600);

function addPolygonAsElement(elementNumber) {
	if (elementNumber == 1) {
		s.buildPoygon([[s.center[0]-200, s.center[1]-200], 
					   [s.center[0]+200, s.center[1]-200], 
					   [s.center[0]+200, s.center[1]+200], 
					   [s.center[0]-200, s.center[1]+200]]);
	} else if (elementNumber == 2) {
		s.buildPoygon([[s.center[0]-300, s.center[1]-200], 
					   [s.center[0]+300, s.center[1]-200], 
					   [s.center[0]+300, s.center[1]+200], 
					   [s.center[0]-300, s.center[1]+200]]);
	} else if (elementNumber == 3) {
		s.buildPoygon([[s.center[0], s.center[1]-200], 
					   [s.center[0]+200, s.center[1]-200], 
					   [s.center[0]+200, s.center[1]+200], 
					   [s.center[0]-200, s.center[1]+200], 
					   [s.center[0]-200, s.center[1]], 
					   [s.center[0], s.center[1]]]);
	} else if (elementNumber == 4) {
		s.buildPoygon([[s.center[0], s.center[1]-200], 
					   [s.center[0], s.center[1]], 
					   [s.center[0]+200, s.center[1]], 
					   [s.center[0]+200, s.center[1]+200], 
					   [s.center[0]-200, s.center[1]+200], 
					   [s.center[0]-200, s.center[1]-200]]);
	} else if (elementNumber == 5) {
		s.buildPoygon([[s.center[0], s.center[1]], 
					   [s.center[0]-200, s.center[1]], 
					   [s.center[0]-200, s.center[1]-200], 
					   [s.center[0]+200, s.center[1]-200], 
					   [s.center[0]+200, s.center[1]+200], 
					   [s.center[0], s.center[1]+200]]);
	} else if (elementNumber == 6) {
		s.buildPoygon([[s.center[0], s.center[1]], 
					   [s.center[0], s.center[1]+200], 
					   [s.center[0]-200, s.center[1]+200], 
					   [s.center[0]-200, s.center[1]-200], 
					   [s.center[0]+200, s.center[1]-200], 
					   [s.center[0]+200, s.center[1]]]);
	}
}