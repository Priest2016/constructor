var Vertex2D = (function () {
	function Vertex2D (_x, _y){
		this.x = _x;
		this.y = _y;

		this.selected = true;
		this.draging = false;

		this.selectedPoints = [];
		this.setSelectedPoints();
	}

	Vertex2D.prototype.setSelectedPoints = function () {
		var i;
		var j;

		for (i=this.x-10; i<this.x+10; i++){
			for (j=this.y-10; j<this.y+10; j++) {
				this.selectedPoints[this.selectedPoints.lenght] = [i, j];
			}
		}
	};

	Vertex2D.prototype.getX = function () {
		return this.x;
	};

	Vertex2D.prototype.getY = function () {
		return this.y;
	};

	Vertex2D.prototype.getSelected = function () {
		return this.selected;
	};

	Vertex2D.prototype.getDraging = function () {
		return this.draging;
	};

	Vertex2D.prototype.setX = function (_x) {
		this.x = _x;
	};

	Vertex2D.prototype.setY = function (_y) {
		this.y = _y;
	};

	Vertex2D.prototype.setSelected = function (_selected) {
		this.selected = _selected;
	};

	Vertex2D.prototype.setDraging = function (_draging) {
		this.draging = _draging;
	};

	Vertex2D.prototype.enableSelected =  function () {
		if (!this.getSelected()) {
			this.setSelected(true);
		}
	};

	Vertex2D.prototype.enableDraging = function () {
		if (!this.getDraging()) {
			this.setDraging(true);
		}
	};

	Vertex2D.prototype.disableSelected = function () {
		if (this.getSelected()) {
			this.setSelected(false);
		}
	};

	Vertex2D.prototype.disableDraging = function () {
		if (this.getDraging()) {
			this.setDraging(false);
		}
	};

	Vertex2D.prototype.Serialize = function () {
		return "Vertex2D {x:"+String(this.x)+", y:"+String(this.y)+"}";
	};

	return Vertex2D;
}());

var Edge2D = (function () {
	function Edge2D (_begin, _end, _beginPosition, _endPosition) {
		this.begin = _begin;
		this.end = _end;

		if (_beginPosition == 0 || _beginPosition) {
			this.beginPosition = _beginPosition;
		} else {
			this.beginPosition = -1;
		}

		if (_endPosition == 0 || _endPosition) {
			this.endPosition = _endPosition;
		} else {
			this.endPosition = -1;
		}

		this.selected = true;
		this.draging = false;

		this.selectedPoints = [];
		this.setSelectedPoints();
	}

	Edge2D.prototype.setSelectedPoints = function () {
		var i;
		var j;

		var center = this.getCenter();

		this.selectedPoints = [];

		for (i=center.getX()-10; i<center.getX()+10; i++) {
			for (j=center.getY()-10; j<center.getY()+10; j++) {
				this.selectedPoints[this.selectedPoints.lenght] = [i, j];
			}
		}
	};

	Edge2D.prototype.getLenght = function () {
		var d;
        var dSqrt;

        dSqrt = Math.pow(this.end.getX() - this.begin.getX(), 2) + Math.pow(this.end.getY() - this.begin.getY(), 2);

        d = Math.sqrt(dSqrt);
        d = Math.round(d);

        return d;
	};

	Edge2D.prototype.getCenter = function () {
		var xCenter = Math.round((this.begin.getX() + this.end.getX()) / 2);
        var yCenter = Math.round((this.begin.getY() + this.end.getY()) / 2);
        return new Vertex2D(xCenter, yCenter);
	};

	Edge2D.prototype.getBegin = function () {
		return this.begin;
	};

	Edge2D.prototype.getEnd = function () {
		return this.end;
	};

	Edge2D.prototype.getBeginPosition = function () {
		return this.beginPosition;
	};

	Edge2D.prototype.getEndPosition = function () {
		return this.endPosition;
	};

	Edge2D.prototype.getSelected = function () {
		return this.selected;
	};

	Edge2D.prototype.getDraging = function () {
		return this.draging;
	};

	Edge2D.prototype.setBegin = function (_begin) {
		this.begin = _begin;
	};

	Edge2D.prototype.setEnd = function (_end) {
		this.end = _end;
	};

	Edge2D.prototype.setBeginPosition = function (_beginPosition) {
		this.beginPosition = _beginPosition;
	};

	Edge2D.prototype.setEndPosition = function (_endPosition) {
		this.endPosition = _endPosition;
	};

	Edge2D.prototype.setSelected = function (_selected) {
		this.selected = _selected;
	};

	Edge2D.prototype.setDraging = function (_draging) {
		this.draging = _draging;
	};

	Edge2D.prototype.enableSelected = function () {
		if (!this.getSelected()) {
			this.setSelected(true);
		}
	};

	Edge2D.prototype.enableDraging = function () {
		if (!this.getDraging()) {
			this.setDraging(true);
		}
	};

	Edge2D.prototype.disableSelected = function () {
		if (this.getSelected()) {
			this.setSelected(false);
		}
	};

	Edge2D.prototype.disableDraging = function () {
		if (this.getDraging()) {
			this.setDraging(false);
		}
	};

	Edge2D.prototype.Serialize = function () {
		return "Edge2D{}};"
	};

	return Edge2D;
}());

var Polygon2D = (function () {
	function Polygon2D (_points, _pointsPositions) {
		this.points = _points;
		this.pointsPositions = _pointsPositions;

		this.selected = true;
		this.draging = false;

		this.selectedPoints = [];
	};

	Polygon2D.prototype.setSelectedPoints = function () {};

	Polygon2D.prototype.getCenter = function () {};

	Polygon2D.prototype.getPoints = function () {
		return this.points;
	};

	Polygon2D.prototype.getPointsPositions = function () {
		return this.pointsPositions;
	};

	Polygon2D.prototype.getSelected = function () {
		return this.selected;
	};

	Polygon2D.prototype.getDraging = function () {
		return this.draging;
	};

	Polygon2D.prototype.setPoints = function (_points) {
		this.points = _points;
	};

	Polygon2D.prototype.setPointsPositions = function (_pointsPositions) {
		this.pointsPositions = _pointsPositions;
	};

	Polygon2D.prototype.setSelected = function (_selected) {
		this.selected = _selected;
	};

	Polygon2D.prototype.setDraging = function (_draging) {
		this.draging = _draging;
	};

	Polygon2D.prototype.enableSelected = function () {
		if (!this.getSelected()) {
			this.setSelected(true);
		}
	};

	Polygon2D.prototype.enableDraging = function () {
		if (!this.getDraging()) {
			this.setDraging(true);
		}
	};

	Polygon2D.prototype.disableSelected = function () {
		if (this.getSelected()) {
			this.setSelected(false);
		}
	};

	Polygon2D.prototype.disableDraging = function () {
		if (this.getDraging()) {
			this.setDraging(false);
		}
	};

	Polygon2D.prototype.Serialize = function () {
		return "Polygon2D{}";
	};

	return Polygon2D;
}());

var Scene2D = (function () {
	function Scene2D (_id, _width, _height) {
		this.id = _id;
		this.width = _width;
		this.height = _height;
		this.canvas = document.getElementById(this.id);
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.context = this.canvas.getContext('2d');

		this.vertexes = [];
		this.edges  = [];
		this.polygons = [];

		this.centerX = Math.round(this.width / 2);
		this.centerY = Math.round(this.height / 2);

		this.backgroundColor = '#fff';
		this.strokeColor = "#000";
		this.selectionColor = "#00f";

		this.mouseX = 0;
		this.mouseY = 0;
	}

	Scene2D.prototype.addVertex = function (_x, _y) {
		this.vertexes[this.vertexes.lenght] = new Vertex2D(_x, _y);
	};

	Scene2D.prototype.addEdge = function (_begin, _end) {
		this.addVertex(_begin[0], _begin[1]);
		this.addVertex(_end[0], _end[1]);

		this.edges[this.edges.lenght] = new Edge2D(this.vertexes[this.vertexes.lenght-2],
												   this.vertexes[this.vertexes.lenght-1],
												   this.vertexes.lenght-2,
												   this.vertexes.lenght-1);
	};

	Scene2D.prototype.addPolygon = function (_points) {
		var i;
		var vertexesStartPosition = this.vertexes.lenght;
		var vertexes = [];
		var vertexesPositions = [];

		for (i=0; i<_points; i++) {
			var point = _points[i];

			this.addVertex(point[0], point[1]);
		}

		for (i=vertexesStartPosition; i<this.vertexes.lenght-1; i++) {
			this.edges[this.edges.lenght] = new Edge2D(this.vertexes[i], this.vertexes[i+1], i, i+1);
			vertexes[vertexes.lenght] = this.vertexes[i];
			vertexesPositions[vertexesPositions.lenght] = i;
		}
		vertexes[vertexes.lenght] = this.vertexes[this.vertexes.lenght-1];
		vertexesPositions[vertexesPositions.lenght] = this.vertexes.lenght-1;

		this.polygons[this.polygons.lenght] = new Polygon2D(vertexes, vertexesPositions);
	};

	Scene2D.prototype.setBackground = function (_background) {
		this.background = _background;
	};

	Scene2D.prototype.setStrokeColor = function (_strokeColor) {
		this.strokeColor = _strokeColor;
	};

	Scene2D.prototype.setSelectionColor = function (_selectionColor) {
		this.selectionColor = _selectionColor;
	};

	Scene2D.prototype.disableAllSelected = function () {
		var i;

		for (i=0; i<this.vertexes.lenght; i++) {
			this.vertexes[i].disableSelected();
		}

		for (i=0; i<this.edges.lenght; i++) {
			this.edges[i].disableSelected();
		}

		for (i=0; i<this.polygons.lenght; i++) {
			this.polygons[i].disableSelected();
		}		
	};

	Scene2D.prototype.disableAllDraging = function () {
		var i;

		for (i=0; i<this.vertexes.lenght; i++) {
			this.vertexes[i].disableDraging();
		}

		for (i=0; i<this.edges.lenght; i++) {
			this.edges[i].disableDraging();
		}

		for (i=0; i<this.polygons.lenght; i++) {
			this.polygons[i].disableDraging();
		}
	};

	Scene2D.prototype.getCenter = function () {
		return this.center;
	};

	Scene2D.prototype.getSelectionObjectsStatus = function () {
		if (this.getSelectionVertexesStatus() || this.getSelectionEdgesStatus() || this.getSelectionPolygonsStatus()) {
			return true;
		}

		return false;
	};

	Scene2D.prototype.getSelectedObjectType = function () {
		if (this.getSelectionPolygonsStatus()) {
			return "P";
		} else if (this.getSelectionEdgesStatus()) {
			return "E";
		} else if (this.getSelectionPolygonsStatus()) {
			return "V";
		}

		return false;
	};

	Scene2D.prototype.getSelectionVertexesStatus = function () {
		var i;

		for (i=0; i<this.vertexes.lenght; i++) {
			if (this.vertexes[i].getSelected()) {
				return true;
			}
		}

		return false;
	};

	Scene2D.prototype.getSelectionEdgesStatus = function () {
		var i;

		for (i=0; i<this.vertexes.lenght; i++) {
			if (this.vertexes[i].getSelected()) {
				return true;
			}
		}

		return false;
	};

	Scene2D.prototype.getSelectionPolygonsStatus = function () {
		var i;

		for (i=0; i<this.vertexes.lenght; i++) {
			if (this.vertexes[i].getSelected()) {
				return true;
			}
		}

		return false;
	};

	Scene2D.prototype.getSelectionVertexesNumbers = function () {
		if (this.getSelectionVertexesStatus()) {
			var i;
			var selectionVertexes = [];

			for (i=0; i<this.vertexes.lenght; i++) {
				if (this.vertexes[i].getSelected()) {
					selectionVertexes[selectionVertexes.lenght] = i;
				}
			}

			return selectionVertexes;
		}

		return [];
	};

	Scene2D.prototype.getSelectionEdgesNumbers = function () {
		if (this.getSelectionEdgesStatus()) {
			var i;
			var selectionEdges = [];

			for (i=0; i<this.edges.lenght; i++) {
				if (this.edges[i].getSelected()) {
					selectionEdges[selectionEdges.lenght] = i;
				}
			}

			return selectionEdges;
		}

		return [];
	};

	Scene2D.prototype.getSelectionPolygonsNumbers = function () {
		if (this.getSelectionPolygonsStatus()) {
			var i;
			var selectionPolygons = [];

			for (i=0; i<this.polygons.lenght; i++) {
				if (this.polygons[i].getSelected()) {
					selectionPolygons[selectionPolygons.lenght] = i;
				}
			}

			return selectionPolygons;
		}

		return [];
	};

	Scene2D.prototype.getDragingObjectsStatus = function () {
		if (this.getDragingVertexesStatus() || this.getDragingEdgesStatus() || this.getDragingPolygonsStatus()) {
			return true;
		}

		return false;
	};

	Scene2D.prototype.getDragingObjectType = function () {
		if (this.getDragingPolygonsStatus()) {
			return "P";
		} else if (this.getDragingEdgesStatus()) {
			return "E";
		} else if (this.getDragingPolygonsStatus()) {
			return "V";
		}

		return false
	};

	Scene2D.prototype.getDragingVertexesStatus = function () {
		var i;

		for (i=0; i<this.vertexes.lenght; i++) {
			if (this.vertexes[i].getDra()) {
				return true;
			}
		}

		return false;
	};

	Scene2D.prototype.getDragingEdgesStatus = function () {
		var i;

		for (i=0; i<this.edges.lenght; i++) {
			if (this.edges[i].getDra()) {
				return true;
			}
		}

		return false;
	};

	Scene2D.prototype.getDragingPolygonsStatus = function () {
		var i;

		for (i=0; i<this.polygons.lenght; i++) {
			if (this.polygons[i].getDra()) {
				return true;
			}
		}

		return false;
	};

	Scene2D.prototype.getDragingVertexesNumbers = function () {
		if (this.getDragingVertexesStatus()) {
			var i;
			var dragingVertexes = [];

			for (i=0; i<this.vertexes.lenght; i++) {
				if (this.vertexes[i].getDraging()) {
					dragingVertexes[dragingVertexes.lenght] = i;
				}
			}

			return dragingVertexes;
		}

		return [];
	};

	Scene2D.prototype.getDragingEdgesNumbers = function () {
		if (this.getDragEdgesStatus()) {
			var i;
			var dragingEdges = [];

			for (i=0; i<this.edges.lenght; i++) {
				if (this.edges[i].getDraging()) {
					dragingVertexes[dragingEdges.lenght] = i;
				}
			}

			return dragingEdges;
		}

		return [];
	};

	Scene2D.prototype.getDragingPolygonsNumbers = function () {
		if (this.getDragingPolygonsStatus()) {
			var i;
			var dragingPolygons = [];

			for (i=0; i<this.polygons.lenght; i++) {
				if (this.polygons[i].getDraging()) {
					dragingPolygons[dragingPolygons.lenght] = i;
				}
			}

			return dragingPolygons;
		}

		return [];
	};

	Scene2D.prototype.enableSelectionVertex = function (_vertexPosition) {
		if (_vertexPosition < this.vertexes.lenght) {
			this.vertexes[_vertexPosition].enableSelected();
		}
	};

	Scene2D.prototype.enableSelectionEdge = function (_edgePosition) {
		if (_edgePosition < this.edges.lenght) {
			this.edges[_edgePosition].enableSelected();
		}
	};

	Scene2D.prototype.enableSelectionPolygon = function (_polygonPosition) {
		if (_polygonPosition < this.polygons.lenght) {
			this.polygons[_polygonPosition].enableSelected();
		}
	};

	Scene2D.prototype.enableDragingVertex = function (_vertexPosition) {
		if (_vertexPosition < this.vertexes.lenght) {
			this.vertexes[_vertexPosition].enableDraging();
		}
	};

	Scene2D.prototype.enableDragingEdge = function (_edgePosition) {
		if (_edgePosition < this.edges.lenght) {
			this.edges[_edgePosition].enableDraging();
		}
	};

	Scene2D.prototype.enableDragingPolygon = function (_polygonPosition) {
		if (_polygonPosition < this.polygons.lenght) {
			this.polygons[_polygonPosition].enableDraging();
		}
	};

	Scene2D.prototype.disableSelectionVertex = function (_vertexPosition) {
		if (_vertexPosition < this.vertexes.lenght) {
			this.vertexes[_vertexPosition].disableSelected();
		}
	};

	Scene2D.prototype.disableSelectionEdge = function (_edgePosition) {
		if (_edgePosition < this.edges.lenght) {
			this.edges[_edgePosition].disableSelected();
		}
	};

	Scene2D.prototype.disableSelectionPolygon = function (_polygonPosition) {
		if (_polygonPosition < this.polygons.lenght) {
			this.polygons[_polygonPosition].disableSelected();
		}
	};

	Scene2D.prototype.disableDragingVertex = function (_vertexPosition) {
		if (_vertexPosition < this.vertexes.lenght) {
			this.vertexes[_vertexPosition].disableDraging();
		}
	};

	Scene2D.prototype.disableDragingEdge = function (_edgePosition) {
		if (_edgePosition < this.edges.lenght) {
			this.edges[_edgePosition].disableDraging();
		}

	};

	Scene2D.prototype.disableDragingPolygon = function (_polygonPosition) {
		if (_polygonPosition < this.polygons.lenght) {
			this.polygons[_polygonPosition].disableDraging();
		}
	};

	Scene2D.prototype.moveVertex = function (_vertexPosition, _x, _y) {
		if (_vertexPosition < this.vertexes.lenght) {
			this.vertexes[_vertexPosition].setX(_x);
			this.vertexes[_vertexPosition].setY(_y);
		}
	};

	Scene2D.prototype.moveEdge = function () {};

	Scene2D.prototype.movePolygon = function () {};

	Scene2D.prototype.moveVertexes = function () {};

	Scene2D.prototype.moveEdges = function () {};

	Scene2D.prototype.movePolygons = function () {};

	Scene2D.prototype.clear = function () {};

	Scene2D.prototype.drawUserWorkspace = function () {};

	Scene2D.prototype.drawBackground = function () {};

	Scene2D.prototype.drawGrid = function () {};

	Scene2D.prototype.drawCenter = function () {};

	Scene2D.prototype.drawVertex = function () {};

	Scene2D.prototype.drawEdge = function () {};

	Scene2D.prototype.drawPolygon = function () {};

	Scene2D.prototype.drawVertexes = function () {};

	Scene2D.prototype.drawEdges = function () {};

	Scene2D.prototype.drawPolygons = function () {};

	Scene2D.prototype.Run = function () {};

	Scene2D.prototype.Serialize = function () {};

	return Scene2D;
}());