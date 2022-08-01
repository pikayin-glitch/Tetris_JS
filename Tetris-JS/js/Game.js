(function () {
    window.Game = function () {
      this.row = 20;
      this.col = 12;
      // 初始化
      this.init();
      //   实例方块
      this.block = new Block();
      //   实例下一个方块
      this.nextBlock = new Block();
      //   实例地图
      this.map = new Map(this);
      //   启动定时器
      this.start();
      //   事件监听
      this.bindEvent();
      //   分数
      this.score = 0;
      //   速度
      this.during = 30;
    };
    Game.prototype.init = function () {
      // 初始化大表格
      //生成table元素，内含row个tr,每个tr内含col个td
        var table=document.createElement("table");
        for(let i=0;i<this.row;i++){
            var tr=document.createElement('tr');
            table.appendChild(tr);
            for(let j=0;j<this.col;j++){
                var td=document.createElement("td");
                tr.appendChild(td);
            }
        }
      // 初始化预览窗口
      var table2=document.createElement("table");
      for (var i = 0; i < 4; i++) {
        var tr2=document.createElement("tr");
        table2.appendChild(tr2);
        for (var j = 0; j < 4; j++) {
          var td2=document.createElement("td");
          tr2.appendChild(td2);
        }
      }
      var body=document.getElementsByTagName("body")[0];
      body.appendChild(table);
      body.appendChild(table2);
    };
    Game.prototype.setColor = function (row, col, num) {
      //   给对应的有颜色的方块添加类名
      table=document.getElementsByTagName("table")[0];
      var tr1=table.getElementsByTagName("tr")[row];
      if(tr1){
      var td1=tr1.getElementsByTagName("td")[col];
      td1.className="c"+num;
      }
    };
    Game.prototype.setNextColor = function (row, col, num) {
      // 给对应的有颜色的方块添加类名
      table2=document.getElementsByTagName("table")[1];
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
          if (this.nextBlock.code[i][j] != 0) {
            var tr2=table2.getElementsByTagName("tr")[i];
            if(tr2){
            var td2=tr2.getElementsByTagName("td")[j];
            td2.className="c" + this.nextBlock.code[i][j];
            }
        }
        }
      }
    };
    // 清屏功能
    Game.prototype.clear = function () {
      for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
        var tr=document.getElementsByTagName("table")[0].getElementsByTagName("tr")[i];
        if(tr)
        tr.getElementsByTagName("td")[j].className='';
        }
      }
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
         var tr=document.getElementsByTagName("table")[1].getElementsByTagName("tr")[i];
         if(tr)
         tr.getElementsByTagName("td")[j].className='';
        }
      }
    };
    Game.prototype.bindEvent = function () {
      // 备份
      var self = this;
  
      window.onkeydown=function (event) {
        console.log(event.keyCode);
        // console.log(event.keydown);
        if (event.keyCode == 37) {
          //判断时候有向左移动的能力
          self.block.checkLeft();
        } else if (event.keyCode == 39) {
          //判断时候有右左移动的能力
          self.block.checkRight();
        } else if (event.keyCode == 32) {
          // 一键到底，空格到底
          self.block.checkBlockEnd();
        } else if (event.keyCode == 38) {
          // 键盘上用来切换方向
          self.block.checkRot();
        }
      };
    };
    Game.prototype.start = function () {
      var self = this;
      // 设置帧编号
      this.f = 0;
      this.timer = setInterval(() => {
        self.f++;
        // 清屏
        self.clear();
        // 渲染方块
        self.block.render();
        // 渲染预览方块
        self.setNextColor();
        //   渲染地图
        self.map.render(self);
        // 下落，通过帧编号%步长控制下落的速度
        self.f % this.during == 0 && self.block.checkDown();
      }, 20);
    };
  })();
  