import { Hittable, HittableOptions, Shape } from "./hittable";
import { Vec3 } from "./vec3";

interface PolyOptions extends HittableOptions {
	points: Array<Vec3>
}

export class Poly extends Hittable {
	points: Array<Vec3>

	constructor(options:PolyOptions) {
		
		options.shape = Shape.poly
		options.pos = options.points[0]
		super(options)
		this.points = options.points
		
		
	}
}