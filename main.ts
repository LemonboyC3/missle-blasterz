input.onButtonPressed(Button.A, function () {
    missle = game.createSprite(ship.get(LedSpriteProperty.X), ship.get(LedSpriteProperty.Y))
    for (let index = 0; index < 5; index++) {
        basic.pause(50)
        missle.change(LedSpriteProperty.Y, -1)
        if (missle.isTouching(aliens)) {
            game.addScore(1)
            aliens.delete()
            bomb.delete()
            annoy.delete()
            aliens = game.createSprite(randint(0, 4), 0)
            annoy = game.createSprite(randint(0, 4), 1)
            speed += -10
            delay += -50
        }
        if (missle.isTouching(annoy)) {
            annoy.delete()
            missle.delete()
        }
        if (missle.isTouching(bomb)) {
            bomb.delete()
            missle.delete()
        }
    }
    missle.delete()
})
let bomb: game.LedSprite = null
let missle: game.LedSprite = null
let annoy: game.LedSprite = null
let aliens: game.LedSprite = null
let ship: game.LedSprite = null
let delay = 0
let speed = 200
ship = game.createSprite(2, 4)
aliens = game.createSprite(0, 0)
annoy = game.createSprite(2, 1)
ship.set(LedSpriteProperty.Brightness, 150)
basic.forever(function () {
    ship.set(LedSpriteProperty.X, input.rotation(Rotation.Roll) / 10 + 3)
})
basic.forever(function () {
    basic.pause(speed)
    aliens.move(1)
    aliens.ifOnEdgeBounce()
    annoy.move(1)
    annoy.ifOnEdgeBounce()
})
loops.everyInterval(randint(2500 - delay, 3000 - delay), function () {
    bomb = game.createSprite(aliens.get(LedSpriteProperty.X), aliens.get(LedSpriteProperty.Y))
    bomb.set(LedSpriteProperty.Blink, 100)
    for (let index = 0; index < 5; index++) {
        basic.pause(300)
        bomb.change(LedSpriteProperty.Y, 1)
        if (bomb.isTouching(ship)) {
            bomb.delete()
            game.gameOver()
        }
    }
    bomb.delete()
})
