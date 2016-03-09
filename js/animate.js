(function(root) {
    var OPENED = root.maze.OPENED;
    var CLOSED = root.maze.CLOSED;


    // Animate solution step by step.
    function animate(grid) {

        var op, cell,
            width = grid.width,
            operations = grid._operations;
            operationsPerSecond = 200,
            interval = 1000 / operationsPerSecond,
            cells = document.querySelectorAll('.maze__cell');

        // Render the whole path at once.
        function renderPath(path) {
            if (path && path.length) {
                var point, i,
                    cells = document.querySelectorAll('.maze__cell');

                for (i = 0; i < path.length; ++i) {
                    point = path[i];
                    cell = cells[point[1] * width + point[0]];
                    cell.classList.add(
                        (i === (path.length - 1))
                            ? 'maze__cell_current'
                            : 'maze__cell_path'
                    );
                }
            }
        };

        // Animate a single operation and schedule the next animation as well.
        (function animateStep() {
            if (operations.length) {
                op = operations.shift();
            } else {
                renderPath(grid._path);
                return;
            }

            cell = cells[op.y * width + op.x];

            switch (op.state) {
                case OPENED:
                    cell.classList.remove('maze__cell_closed');
                    cell.classList.add('maze__cell_opened');
                    break;

                case CLOSED:
                    cell.classList.remove('maze__cell_opened');
                    cell.classList.add('maze__cell_closed');
                    break;
            };

            setTimeout(animateStep, interval);
        })();

    };

    root.maze.animate = animate;

})(this);
