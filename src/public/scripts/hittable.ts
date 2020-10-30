import { Color } from "./color"
import { Vec3 } from "./vec3"
import { world } from "./main"




export enum Shape {
	ball,
	cube,
	surface,
	none,
	poly
}

export interface HittableOptions {
	pos?: Vec3
	color?: Color
	reflection?:number
	diffusion?:number
	size?:number
	lightIntensity?:number
	shape?: Shape
}
export class Hittable {
	pos: Vec3
	color: Color
	reflection: number
	diffusion: number
	lightIntensity: number
	size: number
	shape: Shape

	constructor(options?:HittableOptions) {

		// default options if no argument is passed trough constructor.
		let defaultOptions = {
			pos: new Vec3(0,0,0), // middle
			color: new Color(255, 255, 255, 255), // white
			reflection: 0.1, // 1=mirror 0=no reflections
			diffusion: 0.1,
			size: 5,
			lightIntensity: 0,
			shape: Shape.none
		}

		if(!options) options = defaultOptions

		this.pos = options.pos || defaultOptions.pos
		this.color = options.color || defaultOptions.color
		this.reflection = options.reflection || defaultOptions.reflection
		this.diffusion = options.diffusion || defaultOptions.diffusion
		this.size = options.size || defaultOptions.size
		this.lightIntensity = options.lightIntensity || defaultOptions.lightIntensity
		this.shape = options.shape || defaultOptions.shape
	}
	load() {
		world.addHittable(this)
	}
	remove() {
		let idx = world.hittables.indexOf(this)
		if(idx != -1) world.hittables.splice(idx, 1)
	}
}