$(document).ready ->
  canvas = document.getElementById "processing"
  processing = new Processing(canvas, coffee_draw)

coffee_draw = (p5) ->
  p5.setup = ->
    p5.size window.innerWidth, window.innerHeight
    p5.life = 300
    p5.iter = 0
    p5.fpb = 9
    p5.balls = []
    p5.frameRate 30
  p5.draw = ->
    p5.background 255
    deadBalls = []
    if p5.__mousePressed
     isntLeft = p5.mouseButton isnt p5.LEFT
     if isntLeft
       ball.stepR += 0.6 for ball in p5.balls when ball.pressed is on
     new Ball p5, { pressed: isntLeft } if (isntLeft and p5.iter in [0, p5.floor p5.fpb/2]) or p5.iter is 0
    for ball in p5.balls
      if ball.life>0 then ball.draw() else deadBalls.push p5.balls.indexOf(ball)
    p5.balls.splice idx, idx for idx in deadBalls
    p5.iter = if p5.iter is p5.fpb then 0 else p5.iter+1
  p5.mouseReleased = -> ball.pressed = off for ball in p5.balls
  p5.mouseClicked = -> new Ball p5, { pressed: p5.mouseButton isnt p5.LEFT }

class Ball
  constructor: (@p5, params) ->
    @r = if params.r? then params.r + @p5.random -3, 3 else @p5.random 7, 12
    @rref = @r
    @life = @p5.life
    @x = @p5.mouseX
    @y = @p5.mouseY
    @stepR = 1
    @pressed = params.pressed ? false
    @p5.balls.push this
  draw: ->
    @r += @stepR
    @rref += 1+@r*0.003
    @stepR += (@rref-@r)/@r
    @life -= 1
    @p5.noFill()
    @p5.stroke if @life > @p5.life/2 then @p5.map(@life, @p5.life/2, @p5.life, 140, 200) else @p5.map(@life, @p5.life/2, 0, 140, 255)
    @p5.ellipse @x, @y, @r, @r
