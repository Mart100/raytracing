import { Vec3 } from "./vec3"

// https://en.wikipedia.org/wiki/Euler_angles

export class Camera {

	pos: Vec3
	fov: number
	rot: Vec3
	speed: number
	lastMovement:number = Date.now()

	constructor(pos:Vec3, fov:number, rot:Vec3, speed:number) {
		this.pos = pos
		this.fov = fov
		this.rot = rot
		this.speed = speed
	}
}