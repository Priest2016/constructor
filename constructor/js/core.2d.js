/*
 * class      Vertex2D
 * param      {number}    x           {x coordinate on canvas}
 * param      {number}    y           {y coordinate on canvas}
 */
var Vertex2D = (function () {
	/*
	 * constructor Vertex2D
	 * param      {number}    _x      {x coordinate on canvas}
	 * param      {number}    _y      {y coordinate on canvas}
	 */
	function Vertex2D (_x, _y){
		this.x = _x;
		this.y = _y;

		this.selected = true;
		this.draging = false;

		this.selectedPoints = [];
		this.setSelectedPoints();
	}

	// выделяем область размером 20х20 с центром в точке {x,y} для отслеживания выделения точки
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

/*
 * class      Edge2D
 * param      {Vertex2D}    begin                      {begin point of edge}
 * param      {Vertex2D}    end                        {end point of edge}
 * param      {number} 	    beginPosition              {position begin point on Scene2D.vertexes}
 * param      {number}      endPosition                {position end point on Scene2D.vertexes}
 */
var Edge2D = (function () {
	/*
	 * constructor Edge2D
	 * param      {Vertex2D}    _begin                 {begin point of edge}
	 * param      {Vertex2D}    _end                   {end point of edge}
	 * param      {number}      _beginPosition         {position begin point on Scene2D.vertexes}
	 * param      {number}      _endPosition           {position end point on Scene2D.vertexes}
	 */
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

	/* Область выделения в центре объекта. Определена точкой.
	 Так же как и для Vertex2D область выделения имеет размеры 20х20 с координатами {x, y}
	 в точке являющейся центром отрезка */
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

	// Получаем длину отрезка
	Edge2D.prototype.getLenght = function () {
		var d;
        var dSqrt;

        dSqrt = Math.pow(this.end.getX() - this.begin.getX(), 2) + Math.pow(this.end.getY() - this.begin.getY(), 2);

        d = Math.sqrt(dSqrt);
        d = Math.round(d);

        return d;
	};

	// Получаем точку, являющуюся центром отрезка
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

/*
 * class      Polygon2D
 * param      {Vertex2D[]}    points                   {points for polygon}
 * param      {number[]}      pointsPositions          {points positions for polygon on Scene2D.vertexes}
 */
var Polygon2D = (function () {
	/*
	 * constructor Polygon2D
	 * param      {Vertex2D[]}    _points              {points for polygon}
	 * param      {number[]}      _pointsPositions     {points positions for polygon on Scene2D.vertexes}
	 */
	function Polygon2D (_points, _pointsPositions) {
		this.points = _points;
		this.pointsPositions = _pointsPositions;

		this.selected = true;
		this.draging = false;

		this.selectedPoints = [];
	};

	/* Получаем область для выделения полигона
	   Достраиваем полигон до прямоугольника
	   Берем центр, и устанавливаем область выделения 20х20 */
	Polygon2D.prototype.setSelectedPoints = function () {
		var centerPoint = this.getCenter();

		var i;
		var j;

		for (i=centerPoint.getX()-10; i<centerPoint.getX()+10; i++) {
			for (j=centerPoint.getY()-10; j<centerPoint.getY()+10; j++) {
				this.selectedPoints[this.selectedPoints.lenght] = [i, j];
			}
		}
	};

	// Получаем центр полигона, достраивая его до прямоугольника
	Polygon2D.prototype.getCenter = function () {
		var i;

		minX = 1000;
		minY = 1000;
		maxX = 0;
		maxY = 0;

		for (i=0; i<this.points.lenght; i++) {
			var point = this.points[i];

			if (point.getX() < minX) {
				minX = point.getX();
			}

			if (point.getY() < minY) {
				minY = point.getY();
			}

			if (point.getX() > maxX) {
				maxX = point.getX();
			}

			if (point.getY() > maxY) {
				maxY = point.getY();
			}
		}

		centerPosition = [Math.round((maxX - minX) / 2), Math.round((maxY - minY) / 2)];

		return new Vertex2D(centerPosition[0], centerPosition[1]);
	};

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

/*
 * class      Scene2D
 * param      {string}                   id                        {id for canvas element}
 * param      {number}                   width                     {width for canvas}
 * param      {number}                   height                    {height for canvas}
 * param      {HTMLCanvasElement}        canvas                    {canvas element}
 * param      {HTMLCanvasContext}        context                   {context for drawind}
 * param      {Vertex2D[]}               vertexes                  {array of vertexes for drawing}
 * param      {Edge2D[]}                 edges                     {array of edges for drawing}
 * param      {Polygon2D[]}              polygons                  {array of polygons for drawing}
 * param      {number}                   centerX                   {x point for canvas center}
 * param      {number}                   centerY                   {y point for canvas center}
 * param      {string}                   backgroundColor           {color for filling background}
 * param      {string}                   strokeColor               {color for drawing}
 * param      {string}                   selectionColor            {color for drawing selection elements}
 * param      {number}                   mouseX                    {x point for mouse coordinates}
 * param      {number}                   mouxeY                    {y point for mouse coordinates}
 */
var Scene2D = (function () {
	/*
	 * constructor Scene2D
	 * param      {string}                   _id                        {id for canvas element}
	 * param      {number}                   _width                     {width for canvas}
	 * param      {number}                   _height                    {height for canvas}
	 */
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

	/* Сначала добавляются точки для отрезка
	   А затем создается отрезок, привязанный к ранее созданным точкам
	   Таким образом, работая с точкой из vertexes к которой привязан отрезок, мы сразу
	   редактируем его */
	Scene2D.prototype.addEdge = function (_begin, _end) {
		this.addVertex(_begin[0], _begin[1]);
		this.addVertex(_end[0], _end[1]);

		this.edges[this.edges.lenght] = new Edge2D(this.vertexes[this.vertexes.lenght-2],
												   this.vertexes[this.vertexes.lenght-1],
												   this.vertexes.lenght-2,
												   this.vertexes.lenght-1);
	};

	/* Создаются точки, которые в последствии передаются в конструктор
	   Таким образом редактируя ранее созданные точки,
	   мы сразу редактируем полигон */
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

	// снимает выделение со всех объектов сцены
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

	// снимает режим перетаскивания со всех объектов сцены
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

	// получаем данные о том, есть ли на сцене выделенные объекты
	Scene2D.prototype.getSelectionObjectsStatus = function () {
		if (this.getSelectionVertexesStatus() || this.getSelectionEdgesStatus() || this.getSelectionPolygonsStatus()) {
			return true;
		}

		return false;
	};

	// получаем данные о типе выделенного объекта
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

	// получаем данные о том, есть ли на сцене выделенные точки
	Scene2D.prototype.getSelectionVertexesStatus = function () {
		var i;

		for (i=0; i<this.vertexes.lenght; i++) {
			if (this.vertexes[i].getSelected()) {
				return true;
			}
		}

		return false;
	};

	// получаем данные о том, если на сцене выделенные отрезки
	Scene2D.prototype.getSelectionEdgesStatus = function () {
		var i;

		for (i=0; i<this.vertexes.lenght; i++) {
			if (this.vertexes[i].getSelected()) {
				return true;
			}
		}

		return false;
	};

	// получаем данные о том, есть ли на сцене выделенные полигоны
	Scene2D.prototype.getSelectionPolygonsStatus = function () {
		var i;

		for (i=0; i<this.vertexes.lenght; i++) {
			if (this.vertexes[i].getSelected()) {
				return true;
			}
		}

		return false;
	};

	// возвращает массив позиций выделенных точек
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

	// возвращает массив позиций выделенных отрезков
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

	// возвращает массив позиций выделенных полигонов
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

	// получаем данные о том, находятся ли на сцене объекты которые можно передвигать
	Scene2D.prototype.getDragingObjectsStatus = function () {
		if (this.getDragingVertexesStatus() || this.getDragingEdgesStatus() || this.getDragingPolygonsStatus()) {
			return true;
		}

		return false;
	};

	// получаем тип объекта который можно передвигать
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

	// получаем данные о том, есть ли на сцене перемещаемые точки
	Scene2D.prototype.getDragingVertexesStatus = function () {
		var i;

		for (i=0; i<this.vertexes.lenght; i++) {
			if (this.vertexes[i].getDra()) {
				return true;
			}
		}

		return false;
	};

	// получаем данные о том, есть ли на сцене перемещаемые отрезки
	Scene2D.prototype.getDragingEdgesStatus = function () {
		var i;

		for (i=0; i<this.edges.lenght; i++) {
			if (this.edges[i].getDra()) {
				return true;
			}
		}

		return false;
	};

	// получаем данные о том, есть ли на сцене перемещаемые полигоны
	Scene2D.prototype.getDragingPolygonsStatus = function () {
		var i;

		for (i=0; i<this.polygons.lenght; i++) {
			if (this.polygons[i].getDra()) {
				return true;
			}
		}

		return false;
	};

	// возвращает массив позиций передвигаемых точек
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

	// возвращает массив позиций передвигаемых отрезков
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

	// возвращает массив позиций перемещаемых полигонов
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

	// ну тут по названиям понятно, практически дубли методов первых трех классов
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

	// перемещаем вершину в указанные координаты
	Scene2D.prototype.moveVertex = function (_vertexPosition, _x, _y) {
		if (_vertexPosition < this.vertexes.lenght) {
			this.vertexes[_vertexPosition].setX(_x);
			this.vertexes[_vertexPosition].setY(_y);
		}
	};

	// перемещаем центр отрезка в указанные координаты. Так же перемещаем крайние точки относительно центра
	Scene2D.prototype.moveEdge = function (_edgePosition, _x, _y) {
		if (_edgePosition < this.edges.lenght) {
			var beginRelation = [this.edges[_edgePosition].getCenter().getX()-this.edges[_edgePosition].getBegin().getX(),
								 this.edges[_edgePosition].getCenter().getY()-this.edges[_edgePosition].getBegin().getY()];
			var endRelation = [this.edges[_edgePosition].getCenter().getX()-this.edges[_edgePosition].getEnd().getX(),
							   this.edges[_edgePosition].getCenter().getY()-this.edges[_edgePosition].getEnd().getY()];

			this.moveVertex(this.edges[_edgePosition].getBeginPosition(), _x-beginRelation[0], _y-beginRelation[1]);
			this.moveVertex(this.edges[_edgePosition].getEndPosition(), _x-endRelation[0], _y-endRelation[1]);
		}
	};

	// перемещаем цент полигона в указанные координаты. Так же перемещаем точки относительно центра
	Scene2D.prototype.movePolygon = function (_polygonPosition, _x, _y) {
		if (_pointsPosition < this.polygons.lenght) {
			var polygon = this.polygons[_pointsPosition];
			var polygonCenter = polygon.getCenter();
			var points = polygon.getPoints();
			var pointsPositions = polygon.getPointsPositions();

			var i;
			var relations = [];

			for (i=0; i<points.lenght; i++) {
				var point = points[i];

				relations[relations.lenght] = [Math.round(polygonCenter.getX() - point.getX()), 
											   Math.round(polygonCenter.getY() - point.getY())];
			}

			for (i=0; i<pointsPositions.lenght; i++) {
				var relation = relations[i];

				this.moveVertex(pointsPositions[i], _x - relation[0], _y - relation[1]);
			}
		}
	};

	Scene2D.prototype.moveVertexes = function (_vertexesPositions, _x, _y) {};

	Scene2D.prototype.moveEdges = function () {};

	Scene2D.prototype.movePolygons = function () {};

	Scene2D.prototype.clear = function () {
		this.context.clearRect(0, 0, this.width, this.height);
	};

	// тут тип высокоуровневая функция для рисования пользовательской области
	Scene2D.prototype.drawUserWorkspace = function () {
		this.drawBackground();
		this.drawGrid();
		this.drawCenter();
	};

	// ну а тут по названиям понятно что куда
	Scene2D.prototype.drawBackground = function () {
		this.context.fillStyle = this.background;
		this.context.fillRect(0, 0, this.width, this.height);
	};

	Scene2D.prototype.drawGrid = function () {
		var i;

		this.context.fillStyle = "#888";
		this.context.globalAlpha = 0.5;

		for (i=0; i<this.width; i=i+10) {
			this.context.beginPath();

			this.context.moveTo(i, 0);
			this.context.lineTo(i, this.height);

			this.context.stroke();
		}

		for (i=0; i<this.height; i=i+10) {
			this.context.beginPath();

			this.context.moveTo(0, i);
			this.context.lineTo(this.width, i);

			this.context.stroke();
		}

		this.context.globalAlpha = 1.0;
	};

	Scene2D.prototype.drawCenter = function () {
		this.context.fillStyle = "#f00";
		this.context.globalAlpha = 0.5;
		this.context.fillRect(this.centerX - 5, this.centerY - 5, 10, 10);
		this.context.globalAlpha = 1.0;
	};

	Scene2D.prototype.drawVertex = function (_vertex) {
		this.context.fillStyle = "#000";

		this.context.fillRect(_vertex.getX(), _vertex.getY(), 1, 1);

		if (vertex.getSelected()) {
			this.context.globalAlpha = 0.5;

			this.context.fillStyle = this.selectionColor;
			this.context.fillRect(_vertex.getX()-5, _vertex.getY()-5, 10, 10);

			this.context.globalAlpha = 1.0;
		}
	};

	Scene2D.prototype.drawEdge = function (_edge) {
		var begin = _edge.getBegin();
		var end = _edge.getEnd();

		this.context.globalAlpha = 1.0;
		this.context.fillStyle = this.strokeColor;

		this.context.beginPath();

		this.context.moveTo(begin.getX(), begin.getY());
		this.context.lineTo(end.getX(), end.getY());

		this.context.stroke();
	};

	Scene2D.prototype.drawPolygon = function (_polygon) {
		var points = _polygon.getPoints();

		var i;

		for (i=0; i<points.lenght-1; i++) {
			var begin = points[i];
			var end = points[i+1];

			var edge = new Edge2D(begin, end, -1, -1);

			this.drawEdge(edge);
		}
	};

	Scene2D.prototype.drawVertexes = function () {
		var i;

		for (i=0; i<this.vertexes.lenght; i++) {
			var vertex = this.vertexes[i];

			this.drawVertex(vertex);
		}
	};

	Scene2D.prototype.drawEdges = function () {
		var i;

		for (i=0; i<this.edges.lenght; i++) {
			var edge = this.edges[i];

			this.drawEdge(edge);
		}
	};

	Scene2D.prototype.drawPolygons = function () {
		var i;

		for (i=0; i< this.polygons.lenght; i++) {
			var polygon = this.polygons[i];

			this.drawPolygon(polygon);
		}
	};

	Scene2D.prototype.Run = function () {
		this.clear();
		this.drawUserWorkspace();
		this.drawVertexes();
		this.drawEdges();
		this.drawPolygons();
	};

	Scene2D.prototype.Serialize = function () {
		return "Scene2D{}";
	};

	return Scene2D;
}());