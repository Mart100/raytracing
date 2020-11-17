import { Color } from "./color"
import { Hittable, Shape } from "./hittable"
import { world } from "./main"
import { Poly } from "./poly"
import { Vec3 } from "./vec3"
import { World } from "./world"

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
	world:World
	
	constructor(pos:Vec3, vel:Vec3, worldOverwrite?:World) {
		this.pos = pos
		this.vel = vel.setMagnitude(1)
		this.bounce = 3
		this.world = worldOverwrite || world

		this.world.raysCreated += 1
	}

	getRayIntersects() : Array<rayBallIntersect> {
		let intersects = []
		let ray = this
		let hittables = this.world.hittables

		for(let hittable of hittables) {

			// Ball shape
			if(hittable.shape == Shape.ball) {
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

			// Poly shape
			if(hittable.shape == Shape.poly) {
				let poly = hittable as Poly

				// Check at what point the ray intersects the poly as a plane
				let planeNormal = poly.getSurfaceNormal()
				let diff:Vec3 = ray.pos.subtract(poly.points[0])
        let prod1:number = diff.dotProduct(planeNormal)
        let prod2:number = ray.vel.dotProduct(planeNormal)
        let prod3:number = prod1 / prod2
        let hitPoisition = ray.pos.subtract(ray.vel.multiply(new Vec3(prod3, prod3, prod3)))
			}
		}
		let intersectsOrdered = intersects.sort((a:rayBallIntersect, b:rayBallIntersect) => a.rayLength - b.rayLength)
		if(!intersectsOrdered[0]) return []
		return intersects
	}

	getColor() : Color {
		
		let intersects = this.getRayIntersects()
		let firstIntersect = intersects[0]

		if(firstIntersect == undefined) return new Color(0,0,0,0)
		let finalColor:Color = firstIntersect.hittable.color

		// reflection
		if(this.bounce > 0) {
			let hittable = firstIntersect.hittable
			let intersectPos = firstIntersect.intersectPos
			let reflection = hittable.reflection
			let diffusion = hittable.diffusion

			let objIntersectVec = hittable.pos.clone().subtract(intersectPos).setMagnitude(1)


			let bounceRayPos = firstIntersect.intersectPos.clone().plus(objIntersectVec.clone().setMagnitude(5))
			let bounceRayVecLength = -2 * objIntersectVec.clone().setMagnitude(1).dotProduct(this.vel)
			let bounceRayVec = objIntersectVec.clone().multiply(new Vec3(bounceRayVecLength,bounceRayVecLength)).plus(this.vel).plus(new Vec3().randomizeInBall(diffusion))
			
			let bounceRay = new Ray(bounceRayPos, bounceRayVec)
			bounceRay.bounce = this.bounce-1
			let bouncedRayColor = bounceRay.getColor()

			finalColor = finalColor.blend(bouncedRayColor, reflection)
		}

		return finalColor
		return new Color().random()
	}
}