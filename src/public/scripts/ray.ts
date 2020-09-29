import { world } from "./main"
import { Vec3 } from "./vec3"

export class Ray {

	pos:Vec3
	vel:Vec3
	bounce:number
	
	constructor(pos, vel) {
		this.pos = pos
		this.vel = vel.setMagnitude(1)
		this.bounce = 0

		world.raysCreated += 1
	}
}