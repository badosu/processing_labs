(function() {
  var Ball, coffee_draw;
  $(document).ready(function() {
    var canvas, processing;
    canvas = document.getElementById("processing");
    return processing = new Processing(canvas, coffee_draw);
  });
  coffee_draw = function(p5) {
    p5.setup = function() {
      p5.size(window.innerWidth, window.innerHeight);
      p5.life = 300;
      p5.iter = 0;
      p5.fpb = 9;
      p5.balls = [];
      return p5.frameRate(30);
    };
    p5.draw = function() {
      var ball, deadBalls, idx, isntLeft, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
      p5.background(255);
      deadBalls = [];
      if (p5.__mousePressed) {
        isntLeft = p5.mouseButton !== p5.LEFT;
        if (isntLeft) {
          _ref = p5.balls;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ball = _ref[_i];
            if (ball.pressed === true) {
              ball.stepR += 0.6;
            }
          }
        }
        if ((isntLeft && ((_ref2 = p5.iter) === 0 || _ref2 === p5.floor(p5.fpb / 2))) || p5.iter === 0) {
          new Ball(p5, {
            pressed: isntLeft
          });
        }
      }
      _ref3 = p5.balls;
      for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
        ball = _ref3[_j];
        if (ball.life > 0) {
          ball.draw();
        } else {
          deadBalls.push(p5.balls.indexOf(ball));
        }
      }
      for (_k = 0, _len3 = deadBalls.length; _k < _len3; _k++) {
        idx = deadBalls[_k];
        p5.balls.splice(idx, idx);
      }
      return p5.iter = p5.iter === p5.fpb ? 0 : p5.iter + 1;
    };
    p5.mouseReleased = function() {
      var ball, _i, _len, _ref, _results;
      _ref = p5.balls;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ball = _ref[_i];
        _results.push(ball.pressed = false);
      }
      return _results;
    };
    return p5.mouseClicked = function() {
      return new Ball(p5, {
        pressed: p5.mouseButton !== p5.LEFT
      });
    };
  };
  Ball = (function() {
    function Ball(p5, params) {
      var _ref;
      this.p5 = p5;
      this.r = params.r != null ? params.r + this.p5.random(-3, 3) : this.p5.random(7, 12);
      this.rref = this.r;
      this.life = this.p5.life;
      this.x = this.p5.mouseX;
      this.y = this.p5.mouseY;
      this.stepR = 1;
      this.pressed = (_ref = params.pressed) != null ? _ref : false;
      this.p5.balls.push(this);
    }
    Ball.prototype.draw = function() {
      this.r += this.stepR;
      this.rref += 1 + this.r * 0.003;
      this.stepR += (this.rref - this.r) / this.r;
      this.life -= 1;
      this.p5.noFill();
      this.p5.stroke(this.life > this.p5.life / 2 ? this.p5.map(this.life, this.p5.life / 2, this.p5.life, 140, 200) : this.p5.map(this.life, this.p5.life / 2, 0, 140, 255));
      return this.p5.ellipse(this.x, this.y, this.r, this.r);
    };
    return Ball;
  })();
}).call(this);
