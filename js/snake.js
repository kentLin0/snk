(function () {
    //创建Snake构造函数
    function Snake(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        //用一个数字装入这个蛇身体部位的属性
        this.body = [
            {x: 3, y: 2, color: '#f00'},
            {x: 2, y: 2, color: '#f00'},
            {x: 1, y: 2, color: '#f10'},
        ];
        //根据传进的方向属性来决定蛇的移动方向
        this.direction = direction || 'right';
    }

    //创建Snake的原型函数render来渲染Snake
    var Elements = [];
    var flag = true;
    Snake.prototype.render = function (map) {
        flag = false;
        remove();
        for (var i = 0; i < this.body.length; i++) {
            //循环遍历内部
            //遍历body数组获取蛇身体每个部位的属性，并渲染到map上
            var obj = this.body[i];
            var box = document.createElement('div');
            box.style.position = 'absolute';
            box.style.left = obj.x * this.width + 'px';
            box.style.top = obj.y * this.height + 'px';
            box.style.backgroundColor = obj.color;
            box.style.width = this.width + 'px';
            box.style.height = this.height + 'px';
            map.appendChild(box);
            Elements.push(box);
        }
    };

    console.log(flag);
    var score = 0;
    var span = document.createElement('span');
    map.appendChild(span);
    span.innerText = '分数：' + score;
    span.style.color = '#000';
    span.style.position = 'absolute';
    span.style.left = '0px';
    span.style.top = '-22px';
    Snake.num1 = 255;
    Snake.num2 = 0;
    Snake.num3 = 0;
    Snake.f = true;
    //创建Snake的原型函数move来让snake动起来
    Snake.prototype.move = function (food, map) {
        //移动的时候后面的那个box变成前面那个box
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //根据移动的方向来分别处理蛇头的移动方向
        // console.log(this.direction);
        switch (this.direction) {
            case 'right':
                this.body[0].x += 1;
                break;
            case 'left':
                this.body[0].x -= 1;
                break;
            case 'top':
                this.body[0].y -= 1;
                break;
            case 'bottom':
                this.body[0].y += 1;
                break;
        }


        //判断蛇头吃到食物没有  吃到增加一个蛇的身体  并把食物重新刷新
        var bodyX = this.body[0].x * this.width;
        var bodyY = this.body[0].y * this.height;

        if (bodyX === food.x && bodyY === food.y) {
            //复制蛇身的最后一个
            var last = this.body[this.body.length - 1];
            last.color = 'rgb(' + Snake.num1 + ',' + Snake.num2 + ',' + Snake.num3 + ')';
            if (Snake.num2 < 255 && Snake.f) {
                Snake.num2 += 15;
            } else if (Snake.num1 > 0) {
                Snake.num1 -= 15;
            } else if (Snake.num3 < 255) {
                Snake.num3 += 15;
            } else {
                Snake.f = false;
                Snake.num2 -= 15;
            }

            // 添加到蛇身最后一个
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color,
            });
            // last.bgcolor = this.body[1].bgcolor;
            score += 10;
            span.innerText = '分数：' + score;
            food.render(map);
            if (score === 100) {
                alert('恭喜您进入下一关  点击确定继续游戏');
            }

        }

    };

    //移出box
    function remove() {
        for (var i = Elements.length - 1; i >= 0; i--) {
            //循环遍历内部
            //删除map子元素的第一个
            map.removeChild(Elements[i]);
            //并且数组Element也删除第一个  以至索引对应起来
            Elements.splice(i, 1);
        }
    }

    window.Snake = Snake;
}());