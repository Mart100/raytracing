import { Color } from "./color"
import { Hittable } from "./hittable"
import { world } from "./main"
import { Vec3 } from "./vec3"

export interface rayBallIntersect {
	hittable:Hittable
	rayLength:number
	intersectPos:Vec3
	ray:Ray
}

export class Ray {

	pos:Vec3
	vel:Vec3
	bounce:number
	
	constructor(pos:Vec3, vel:Vec3) {
		this.pos = pos
		this.vel = vel.setMagnitude(1)
		this.bounce = 0

		world.raysCreated += 1
	}

	getRayIntersects() : Array<rayBallIntersect> {
		let intersects = []
		let ray = this

		for(let hittable of world.hittables) {
			let eye_to_centerBall = hittable.pos.clone().subtract(ray.pos)
			let rayLength = eye_to_centerBall.dotProduct(ray.vel)
			let rayClosestToBall = ray.pos.clone().plus(ray.vel.clone().setMagnitude(rayLength))
			let rayDistanceToBall = rayClosestToBall.clone().subtract(hittable.pos).getMagnitude()
			if(rayDistanceToBall < hittable.size/2 && rayLength > 0) {
				let dist1 = rayLength-Math.sqrt((hittable.size/2)**2 - rayDistanceToBall**2)
				let intersectPos = ray.pos.clone().plus(ray.vel.clone().setMagnitude(dist1))
				let intersect:rayBallIntersect = {
					rayLength,
					hittable,
					intersectPos,
					ray
				}
				intersects.push(intersect)
			}
		}
		let intersectsOrdered = intersects.sort((a:rayBallIntersect, b:rayBallIntersect) => a.rayLength - b.rayLength)
		if(!intersectsOrdered[0]) return []
		return intersects
	}

	getColor() : Color {
		return new Color().random()
	}
}