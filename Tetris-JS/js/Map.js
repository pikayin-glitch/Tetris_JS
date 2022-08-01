(function () {
  window.Map = function () {
    // 地图矩阵
    this.mapCode = [
      //给数组末尾加一行，并不会渲染出来，但是会做支撑，避免方块到达最底部时+1报错
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    ];
  };

  Map.prototype.render = function (mapGame) {
    for (var i = 0; i < mapGame.row; i++) {
      for (var j = 0; j < mapGame.col; j++) {
        if (this.mapCode[i][j] != 0) {
          game.setColor(i, j, this.mapCode[i][j]);
        }
      }
    }
  };
  Map.prototype.checkRemove = function () {
    // 判断当前的mapCode是否该消行
    // 消行规则：当前的 mapCode数组的每一项如果都不是0了，就说明该消行了
    for (var i = 0; i < 20; i++) {
      //   如果某一行没有0，则删除这一行
      if (this.mapCode[i].indexOf(0) == -1) {
        // splice()方法第一个参数，表示从哪一个开始删，第二个表示删除数量
        this.mapCode.splice(i, 1);
        //   删除一行补一行，unshift会在数组头部插入指定的参数
        this.mapCode.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        // 分数增加，根据不同的速度决定加多少分数
        if (game.during <= 30 && game.during >= 20) {
          game.score += 10;
        } else if (game.during < 20 && game.during >= 10) {
          game.score += 20;
        } else {
          game.score += 30;
        }
        // 渲染分数
        document.getElementById("score").innerHTML = "分数：" + game.score;
        if (game.score % 100 == 0) {
          game.during -= 5;
          if (game.during <= 0) {
            game.during = 1;
          }
        }
      }
    }
  };
})();
