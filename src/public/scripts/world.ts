import { Ball } from "./ball"
import { Color } from "./color"
import { Hittable, HittableOptions } from "./hittable"
import { renderer, world } from "./main"
import { Ray } from "./ray"
import { randomRange, sleep } from "./utils"
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
	spawnRandomHittables(amount:number) {
		for(let i=0;i<amount;i++) {
			let randomHittableConfig:HittableOptions = {
				size: randomRange(2, 20),
				color: new Color().random(),
				reflection: Math.random(),
				diffusion: Math.random(),
				lightIntensity: 0,
				pos: new Vec3().randomizeInCube(200)
			}

			let newHittable = new Ball(randomHittableConfig)

			this.addHittable(newHittable)
		}
	}
}