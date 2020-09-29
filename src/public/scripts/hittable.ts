import { Color } from "./color"
import { Vec3 } from "./vec3"
import { world } from "./main"

export class Hittable {
	pos: Vec3
	color: Color
	reflection: number
	diffusion: number
	lightIntensity: number
	shape: string
	size: number

	constructor() {
		this.pos = new Vec3(0, 0, 0)
		this.color = new Color(255, 255, 255, 255)
		this.reflection = 0.1
		this.diffusion = 0.2
		this.shape = 'ball'
		this.size = 5
	}
	load() {
		world.addHittable(this)
	}
	remove() {
		let idx = world.hittables.indexOf(this)
		if(idx != -1) world.hittables.splice(idx, 1)
	}
}