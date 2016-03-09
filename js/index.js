(function (root) {
    var map = root.maze.MAZE_Y;
    var path = root.maze.solution(map, 1, 0);
    var grid = root.maze.solution._grid;

    document.querySelector('.outer').appendChild(
        root.maze.render(map, path)
    );

    root.maze.animate(grid);

})(this);
