(function () {
    //创建一个变量装Game这个对象
    var that = null;

    function Game(map, inputs) {
        //获取food  snake对象
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        this.inputs = inputs;
        that = this;
    }

    //开始游戏原型函数
    Game.prototype.start = function () {
        this.food.render(this.map);
        this.snake.render(this.map);
        //调用私有函数
        Game.flag = false;
        Game.pace = 140;
        var txt = document.createElement('span');
        txt.innerText = '当前难度为：简单';
        txt.style.color = '#fff';
        map.appendChild(txt);
        this.inputs[0].onclick = function () {
            Game.flag = true;
            runSnake(this.food, this.map);
            bindKey();
        };
        this.inputs[1].onclick = function () {
            Game.flag = false;
            runSnake(this.food, this.map);
        };
        this.inputs[2].onclick = function () {
            window.history.go(0);
        };
        this.inputs[3].onclick = function () {
            Game.pace = 140;
            txt.innerText = '当前难度为：简单';
        };
        this.inputs[4].onclick = function () {
            Game.pace = 100;
            txt.innerText = '当前难度为：中等';
        };
        this.inputs[5].onclick = function () {
            Game.pace = 70;
            txt.innerText = '当前难度为：困难';
        };
        this.inputs[6].onclick = function () {
            Game.pace -= 20;
            txt.innerText = '当前难度为：' + (140 - Game.pace);
        };
        //控制蛇的移动

    };
    //snake自动移动的私有函数
    function runSnake() {
        //创建一个定时器
        if (Game.flag) {
            clearInterval(Game.timerId);
            Game.timerId = setInterval(function () {
                //获取移动后的属性
                this.snake.move(this.food, this.map);
                //渲染到map上  在渲染之前有删除前面的box
                this.snake.render(this.map);
                //判断是否撞墙  撞墙停止定时器 弹窗
                var snakebody = this.snake.body;
                var maxX = this.map.offsetWidth / this.snake.width;
                var maxY = this.map.offsetHeight / this.snake.height;

                var headX = snakebody[0].x;
                var headY = snakebody[0].y;
                //遍历蛇身从1开始因为前面的蛇身不可能和蛇头重合   判断是否穿过蛇身
                // for (var i = 1; i < snakebody.length; i++) {
                //     //循环遍历内部
                //     if (snakebody[i].x === snakebody[0].x && snakebody[i].y === snakebody[0].y) {
                //         clearInterval(Game.timerId);
                //         Game.flag = false;
                //         alert('Game Over');
                //         window.history.go(0);
                //         this.snake.direction = 'right';
                //     }
                // }
                //穿墙术
                // if (headX === maxX) {
                //     snakebody[0].x = 0;
                // }
                // if (!headX) {
                //     snakebody[0].x = maxX;
                // }
                // if (headY === maxY) {
                //     snakebody[0].y = 0;
                // }
                // if (!headY) {
                //     snakebody[0].y = maxY;
                // }
                //不穿墙
                if (headX === maxX || headX < 0) {
                    clearInterval(Game.timerId);
                    Game.flag = false;
                    alert('Game Over');
                    window.history.go(0);
                    this.snake.direction = 'right';
                }
                if (headY === maxY || headY < 0) {
                    clearInterval(Game.timerId);
                    Game.flag = false;
                    alert('Game Over');
                    window.history.go(0);
                    this.snake.direction = 'right';
                }

            }.bind(that), Game.pace);
        } else {
            clearInterval(Game.timerId);
        }
    }
    var arr = [];
    //监听按键信息，传入对应的direction
    function bindKey() {
        document.addEventListener('keydown', function (e) {
            //设置一个变量来装snake的当前方向
            var snakedir = this.snake.direction;
            if (snakedir !== 'right' && e.keyCode === 37) {
                this.snake.direction = 'left';
            }

            if (snakedir !== 'bottom' && e.keyCode === 38) {
                this.snake.direction = 'top';
            }

            if (snakedir !== 'left' && e.keyCode === 39) {
                this.snake.direction = 'right';
            }

            if (snakedir !== 'top' && e.keyCode === 40) {
                this.snake.direction = 'bottom';
            }
        }.bind(that), false);
    }

    window.Game = Game;
}());