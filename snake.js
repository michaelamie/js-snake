(function(window, document) {

    var SIZE = 30,
        DELTA = SIZE,
        CLOCK = 60,
        body,
        canvas,
        context,
        snake,
        food,
        direction;

    function drawObject(object) {
        context.fillStyle = "rgb(255, 255, 255)";
        for (var i = 0; i < object.length; ++i) {
            context.fillRect(object[i].x, object[i].y, SIZE, SIZE);
        }
    }

    function clearObject(object) {
        for (var i = 0; i < object.length; ++i) {
            context.clearRect(object[i].x, object[i].y, SIZE, SIZE);
        }
    }

    function createFood() {
        food = [{
            x: Math.floor(Math.random() * (canvas.width - SIZE)),
            y: Math.floor(Math.random() * (canvas.height - SIZE)),
        }];
        drawObject(food);
    }

    function foodCollisionTest() {
        return ((Math.abs(snake[0].x - food[0].x) <= SIZE) && 
            (Math.abs(snake[0].y - food[0].y) <= SIZE));
    }

    function snakeCollisionTest() {
        for (var i = 1; i < snake.length; ++i) {
            if (snake[0].x === snake[i].x && 
                snake[0].y === snake[i].y) {
                return true;
            }
        }
        return false;
    }

    function eat() {
        clearObject(food);
        food = [{}];
        switch (direction) {
            case 'l':
                snake.push({
                    x: snake[snake.length-1] + SIZE,
                    y: snake[snake.length-1]
                });
                break;
            case 'u':
                snake.push({
                    x: snake[snake.length-1],
                    y: snake[snake.length-1] - SIZE
                });
                break;
            case 'r':
                snake.push({
                    x: snake[snake.length-1] - SIZE,
                    y: snake[snake.length-1]
                });
                break;
            case 'd':
                snake.push({
                    x: snake[snake.length-1],
                    y: snake[snake.length-1] + SIZE
                });
                break;
        }
        setTimeout(createFood, 1000);
    }

    function moveSnake() {
        clearObject(snake);
        for (var i = snake.length - 1; i > 0; --i) {
            snake[i].x = snake[i-1].x;
            snake[i].y = snake[i-1].y;
        }
        switch (direction) {
            case 'l':
                snake[0].x = ((snake[0].x - DELTA) + canvas.width) % canvas.width;
                break;
            case 'u':
                snake[0].y = ((snake[0].y - DELTA) + canvas.height) % canvas.height;
                break;
            case 'r':
                snake[0].x = (snake[0].x + DELTA) % canvas.width;
                break;
            case 'd':
                snake[0].y = (snake[0].y + DELTA) % canvas.height;
                break;
        }
        if (foodCollisionTest())
            eat();
        if (snakeCollisionTest()) {
            alert("You suck at this!");
            window.clearInterval(1);
        }
        drawObject(snake);
    }

    function directionFromKey() {
        switch (window.event.keyCode) {
            case 37:
                if (direction != 'r')
                    direction = 'l';
                break;
            case 38:
                if (direction != 'd')
                    direction = 'u';
                break;
            case 39:
                if (direction != 'l')
                    direction = 'r';
                break;
            case 40:
                if (direction != 'u')
                    direction = 'd';
                break;
        }
    }

    function setCanvasToViewportSize() {
        canvas.width = window.innerWidth - 5;
        canvas.height = window.innerHeight - 5;
        drawObject(food);
        drawObject(snake);
    }

    function setupCanvas() {
        body = this.document.getElementsByTagName('body')[0];
        canvas = this.document.getElementsByTagName('canvas')[0];
        context = canvas.getContext('2d');
        body.style.margin = '0';
        body.style.background = 'black';
        canvas.width = window.innerWidth - 5;
        canvas.height = window.innerHeight - 5;
    }

    function setupGame() {
        snake = [{
            x: Math.floor(canvas.width / 2),
            y: Math.floor(canvas.height / 2)
        }];
        direction = false;
        drawObject(snake);
        createFood();
    }

    function setupEvents() {
        window.addEventListener('resize', setCanvasToViewportSize);
        window.setInterval(moveSnake, CLOCK);
        document.onkeydown = directionFromKey;
    }
    
    setupCanvas();
    setupGame();
    setupEvents();
    
})(window, document);