(function(root) {
    var OPENED = root.maze.OPENED;
    var CLOSED = root.maze.CLOSED;

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

    Cell.prototype = {

        _log: function(state) {
            this._grid._operations.push({
                x: this.x,
                y: this.y,
                value: this.value,
                state: state
            });
        },

        get opened() {
            this._log(OPENED);
            return this._opened;
        },

        set opened(val) {
            this._log(OPENED);
            this._opened = val;
        },

        get closed() {
            this._log(CLOSED);
            return this._closed;
        },

        set closed(val) {
            this._log(CLOSED);
            this._closed = val;
        }
    };


    root.Cell = Cell;

})(this);
