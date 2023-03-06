import {
	Application,
	Container,
	Graphics,
	// Rectangle,
	// Sprite,
	// Texture,
} from 'pixi.js'

abstract class Element {
	abstract loop(delta: number): void
}
class App {
	app: Application
	constructor() {
		this.app = new Application({
			view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
			backgroundColor: 0x6495ed,
			width: window.screen.width,
			height: window.screen.height,
			autoStart: true,
		})
	}

	start() {
		const game = new Game(this.app)
		game.loop()
	}
}

class Game extends Element {
	app: Application
	player?: Player
	args: any
	level?: Level
	constructor(_app: Application) {
		super()
		this.app = _app
		this.app.ticker.add(this.loop)
		this.init()
	}

	init() {
		this.player = new Player(this)
		this.player.init()
		this.level = new Level(this)
	}

	loop(...args: any) {
		this.args = args
	}

	addTicker(ticker: (delta: number) => void) {
		this.app.ticker.add(ticker)
	}
	addElement(element: Container) {
		this.app.stage.addChild(element)
	}
}

class Level {
	game: Game
	pillars: Pillar[] = []
	constructor(game: Game) {
		this.game = game
		this.game.addTicker(this.loop.bind(this))
		this.init()
	}

	init() {
		this.pillars.push(new Pillar(this.game))
	}

	loop() {
		// this.pillars.push(new Pillar(this.game))
	}
}

class Pillar {
	game: Game
	bottomGraphics: Graphics = new Graphics()
	topGraphics: Graphics = new Graphics()
	constructor(game: Game) {
		this.game = game
		this.game.addTicker(this.loop.bind(this))
		this.init()
	}

	init() {
		this.bottomGraphics = this.initRect()
		this.topGraphics = this.initRect()
		this.bottomGraphics.x = window.innerWidth
		this.topGraphics.x = window.innerWidth

		this.bottomGraphics.y = window.innerHeight - this.bottomGraphics.height
		this.topGraphics.y = -200

		this.game.addElement(this.bottomGraphics)
		this.game.addElement(this.topGraphics)
	}

	initRect() {
		return new Graphics()
			.beginFill(0x000000)
			.drawRect(0, 0, 100, window.innerHeight / 2)
			.endFill()
	}

	loop() {
		this.bottomGraphics.x -= 1
		this.topGraphics.x -= 1
	}
}

class Player extends Element {
	game: Game
	graphics = new Graphics()
	velocity = 0
	constructor(game: Game) {
		super()
		this.game = game
	}

	init() {
		this.graphics = new Graphics()
		this.graphics.beginFill(0x000000)
		this.graphics.drawCircle(0, 0, 20)
		this.graphics.endFill()
		this.graphics.y = 100
		this.graphics.x = 100
		this.game.addElement(this.graphics)
		this.game.addTicker(this.loop)
		window.addEventListener('click', this.jump)
	}

	loop = (delta: number): void => {
		this.gravity(delta)
	}

	gravity(delta: number) {
		this.velocity += 0.18
		this.graphics.y += this.velocity * delta
	}

	jump = () => {
		this.velocity = -8
	}
}

const app = new App()

app.start()
