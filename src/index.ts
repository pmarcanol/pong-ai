import { Application, Graphics } from 'pixi.js'

const app = new Application({
	view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480,
})

const sprite = new Graphics()
	.beginFill(0xffff00)
	.lineStyle(5, 0xff0000)
	.drawCircle(100, 100, 10)

app.stage.addChild(sprite)

let elapsed = 0.0
function gameLoop(delta: number) {
	elapsed += delta
	gravity(sprite)
	handleKeys(elapsed)
	if (moving) {
		sprite.y -= movementSize * 3
	}
}

let moving = false
let movementEnd = 0
let movementDuration = 5
function handleKeys(elapsed: number) {
	if (elapsed > movementEnd) {
		moving = false
	}
	if (keys['ArrowUp']) {
		moving = true
		movementEnd = elapsed + movementDuration
	}
}

const movementSize = 1
let keys: Record<string, boolean> = {}

function keyEventListener(e: KeyboardEvent) {
	e.type == 'keydown'
	keys[e.key] = e.type == 'keydown'
}

function gravity(sprite: Graphics) {
	sprite.y += movementSize
}

document.addEventListener('keydown', keyEventListener)
document.addEventListener('keyup', keyEventListener)

app.ticker.add(gameLoop)

// app.ticker.
