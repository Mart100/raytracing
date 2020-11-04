import { Hittable, HittableOptions, Shape } from "./hittable";
import { world } from "./main";
import { Ray } from "./ray";
import { Vec3 } from "./vec3";


interface rayBallIntersect {
	hittable:Hittable
	rayLength:number
	intersectPos:Vec3
	ray:Ray
}
export class Ball extends Hittable {

	constructor(options?:HittableOptions) {
		if(!options) options = {}
		options.shape = Shape.ball
		super(options)
	}


	getRayIntersects(ray:Ray) : Array<rayBallIntersect> {
		let intersects = []
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
}