(function () {
    //创建Food构造函数，设置各个属性的默认值
    function Food(x, y, width, height, bgcolor) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 20;
        this.height = height || 20;
        this.bgcolor = bgcolor || 'green';
    }

    var Elements = [];
    //创建Food的原型函数 传入map
    Food.prototype.render = function (map) {
        //开始渲染之前先移除原来的box
        remove();
        //获取随机位置
        this.x = parseInt(Math.random() * map.offsetWidth / this.width) * this.width;
        this.y = parseInt(Math.random() * map.offsetHeight / this.height) * this.height;
        //判断食物的位置是否在蛇身里面  在蛇身里面就重新渲染  （自调用）
        for (var i = 1; i < map.children.length; i++) {
            //循环遍历内部
            if (map.children[i].offsetLeft === this.x && map.children[i].offsetTop === this.y) {
                this.x = parseInt(Math.random() * map.offsetWidth / this.width) * this.width;
                this.y = parseInt(Math.random() * map.offsetHeight / this.height) * this.height;
            }
        }
        //获取随机颜色
        var color1 = parseInt(Math.random() * 100 + 155);
        var color2 = parseInt(Math.random() * 100 + 155);
        var color3 = parseInt(Math.random() * 100 + 155);
        this.bgcolor = 'rgb(' + color1 + ',' + color2 + ',' + color3 + ')';
        var box = document.createElement('div');
        box.style.width = this.width + 'px';
        box.style.height = this.height + 'px';
        box.style.backgroundColor = this.bgcolor;
        box.style.position = 'absolute';
        box.style.left = this.x + 'px';
        box.style.top = this.y + 'px';
        map.appendChild(box);
        Elements.push(box);
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

    window.Food = Food;
}());