(function (root) {

    var Cell = root.Cell;

    /**
     * Grid. Used as persistent storage for cells and their states.
     *
     * @constructor
     * @param {[number, number][]} values The values to create a grid.
     */
    function Grid(values) {
        this.height = values.length;
        this.width = values[0].length;

        // Persistent storage for cells and their states.
        this._cells = this._build(values);

        // The list of operations which has been used to find a solution (Used to
        // animate the solution a bit later).
        this._operations = [];

        // The path which has been found.
        this._path = null;
    }

    Grid.prototype._build = function(values) {
        var i, j, cell,
        rows = new Array(this.height);

        for (i = 0; i < this.height; ++i) {
            rows[i] = new Array(this.width)
            for (j = 0; j < this.width; ++j) {
                rows[i][j] = Cell(j, i, values[i][j]);
            }
        };

        return rows;
    };

    Grid.prototype.getCell = function(x, y) {
        return this._cells[y][x];
    };

    Grid.prototype.getNeighbors = function(cell) {
        var neigbours = [];

        if (this.isWalkable(cell.x, cell.y - 1)) {
            neigbours.push(this.getCell(cell.x, cell.y - 1));
        };

        if (this.isWalkable(cell.x + 1, cell.y)) {
            neigbours.push(this.getCell(cell.x + 1, cell.y));
        };

        if (this.isWalkable(cell.x, cell.y + 1)) {
            neigbours.push(this.getCell(cell.x, cell.y + 1));
        };

        if (this.isWalkable(cell.x - 1, cell.y)) {
            neigbours.push(this.getCell(cell.x - 1, cell.y));
        };

        return neigbours;
    };

    Grid.prototype.isInside = function(x, y) {
        return ((x >= 0 && x < this.width) &&
                (y >= 0 && y < this.height));
    };

    Grid.prototype.isWalkable = function(x, y) {
        return (this.isInside(x, y) &&
                (this.getCell(x, y).value !== root.maze.WALL));
    };

    root.Grid = Grid;

})(this);
