import { Ball } from "./ball"
import { Color } from "./color"
import { Hittable } from "./hittable"
import { renderer, world } from "./main"
import { Ray } from "./ray"
import { sleep } from "./utils"
import { Vec3 } from "./vec3"

export class World {
	hittables:Array<Hittable>
	lights:Array<Hittable>
	raysCreated:number

	constructor() {

		this.hittables = []
		this.lights = []
		this.raysCreated = 0
		
	}
	addHittable(hittable:Hittable) {
		this.hittables.push(hittable)
		if(hittable.lightIntensity > 0) this.lights.push(hittable)
	}
}