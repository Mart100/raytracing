import { Hittable, HittableOptions, Shape } from "./hittable";
import { Vec3 } from "./vec3";

interface PolyOptions extends HittableOptions {
	points: [Vec3, Vec3, Vec3] //Array<Vec3>
}

export class Poly extends Hittable {
	points: Array<Vec3>

	constructor(options:PolyOptions) {
		
		options.shape = Shape.poly
		options.pos = options.points[0]
		super(options)
		this.points = options.points
		
		
	}

	getSurfaceNormal() { // https://www.khronos.org/opengl/wiki/Calculating_a_Surface_Normal
		let U:Vec3 = this.points[2].subtract(this.points[1])
		let V:Vec3 = this.points[3].subtract(this.points[1])

		let normalX = U.y*V.z - U.z*V.y
		let normalY = U.z*V.x - U.x*V.z
		let normalZ = U.x*V.y - U.y*V.x

		let normal = new Vec3(normalX, normalY, normalZ)

		return normal
	}
}