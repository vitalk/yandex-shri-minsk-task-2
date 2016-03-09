(function(root) {

  /**
   * A grid point.
   *
   * @constructor
   * @param {number} x The x axis value.
   * @param {number} y The y axis value.
   * @param {number} value The point value.
   */
  function Point(x, y, value) {
    if (!(this instanceof Point)) {
      return new Point(x, y, value);
    }

    this.x = x;
    this.y = y;
    this.value = value;
  };

  root.Point = Point;

})(this);
