(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    var Grid = root.Grid;
    var Cell = root.Cell;


    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
     */
    function solution(maze, x, y) {

      /**
       * Path backtrace.
       *
       * @param {Cell} cell The end cell.
       * @returns {[number, number][]} Path according with the parent
       *    referencies in the given cell.
       */
      function backtrace(cell) {
        var path = [[cell.x, cell.y]];
        while (cell.parent) {
          cell = cell.parent;
          path.push([cell.x, cell.y]);
        }
        return path.reverse();
      }


      function BreadthFirstSearch(maze, x, y) {
        console.time('Breadth-First-Search');

        var i, l, cell, neigbours, neigbour,
            queue = [],
            grid = new Grid(maze);

        Cell.prototype._grid = grid;

        cell = grid.getCell(x, y);
        queue.push(cell);
        cell.opened = true;

        while (queue.length) {
          cell = queue.shift();
          cell.closed = true;

          if (cell.y === grid.height - 1) {
            console.timeEnd('Breadth-First-Search');

            // Expose solution and path to ensure it can be easily
            // animated later.
            root.maze.solution._grid = grid;
            root.maze.solution._grid._path = backtrace(cell);

            return root.maze.solution._grid._path;
          }

          neigbours = grid.getNeighbors(cell);
          for (i = 0, l = neigbours.length; i < l; ++i) {
            neigbour = neigbours[i];

            if (neigbour.closed || neigbour.opened) {
              continue;
            }

            queue.push(neigbour);
            neigbour.opened = true;
            neigbour.parent = cell;
          }
        };

        return [];
      };

      return BreadthFirstSearch(maze, x, y);
    }

    root.maze.solution = solution;

})(this);
