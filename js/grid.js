(function (root) {

  var Point = root.Point;

  /**
   * Grid. Used as persistent storage for points and their states.
   *
   * @constructor
   * @param {[number, number][]} values The values to create a grid.
   */
  function Grid(values) {
    this.height = values.length;
    this.width = values[0].length;
    this._points = this._build(values);
  }

  Grid.prototype._build = function(values) {
    var i, j, point,
        points = new Array(this.height);

    for (i = 0; i < this.height; ++i) {
      points[i] = new Array(this.width)
      for (j = 0; j < this.width; ++j) {
        points[i][j] = Point(j, i, values[i][j]);
      }
    };

    return points;
  };

  Grid.prototype.getPoint = function(x, y) {
    return this._points[y][x];
  };

  Grid.prototype.getNeighbors = function(point) {
    var neigbours = [];

    if (this.isWalkable(point.x, point.y - 1)) {
      neigbours.push(this.getPoint(point.x, point.y - 1));
    };

    if (this.isWalkable(point.x + 1, point.y)) {
      neigbours.push(this.getPoint(point.x + 1, point.y));
    };

    if (this.isWalkable(point.x, point.y + 1)) {
      neigbours.push(this.getPoint(point.x, point.y + 1));
    };

    if (this.isWalkable(point.x - 1, point.y)) {
      neigbours.push(this.getPoint(point.x - 1, point.y));
    };

    return neigbours;
  };

  Grid.prototype.isInside = function(x, y) {
    return ((x >= 0 && x < this.width) &&
            (y >= 0 && y < this.height));
  };

  Grid.prototype.isWalkable = function(x, y) {
      return (this.isInside(x, y) &&
              (this.getPoint(x, y).value !== root.maze.WALL));
  };

  root.Grid = Grid;

})(this);
