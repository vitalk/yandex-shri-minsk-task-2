(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    var Grid = root.Grid;
    var Point = root.Point;


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
       * @param {Point} point The end point.
       * @returns {[number, number][]} Path according with the parent
       *    referencies in the given point.
       */
      function backtrace(point) {
        var path = [[point.x, point.y]];
        while (point.parent) {
          point = point.parent;
          path.push([point.x, point.y]);
        }
        return path.reverse();
      }


      function BreadthFirstSearch(maze, x, y) {
        console.time('Breadth-First-Search');

        var i, l, point, neigbours, neigbour,
            queue = [],
            grid = new Grid(maze);

        Point.prototype._grid = grid;

        point = grid.getPoint(x, y);
        queue.push(point);
        point.opened = true;

        while (queue.length) {
          point = queue.shift();
          point.closed = true;

          if (point.y === grid.height - 1) {
            console.timeEnd('Breadth-First-Search');
            return backtrace(point);
          }

          neigbours = grid.getNeighbors(point);
          for (i = 0, l = neigbours.length; i < l; ++i) {
            neigbour = neigbours[i];

            if (neigbour.closed || neigbour.opened) {
              continue;
            }

            queue.push(neigbour);
            neigbour.opened = true;
            neigbour.parent = point;
          }
        };

        return [];
      };

      return BreadthFirstSearch(maze, x, y);
    }

    root.maze.solution = solution;

})(this);
