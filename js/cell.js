(function(root) {

  /**
   * A grid cell.
   *
   * @constructor
   * @param {number} x The x axis value.
   * @param {number} y The y axis value.
   * @param {number} value The cell value.
   */
  function Cell(x, y, value) {
    if (!(this instanceof Cell)) {
      return new Cell(x, y, value);
    }

    this.x = x;
    this.y = y;
    this.value = value;
  };

  root.Cell = Cell;

})(this);
