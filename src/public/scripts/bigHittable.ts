import { Hittable } from "./hittable";
import { Vec3 } from "./vec3";

class bigHittable {
	children: Array<Hittable>
	bounds:Vec3 = new Vec3(0,0,0)
	center:Vec3 = new Vec3(0,0,0)

	constructor(children:Array<Hittable>) {
		this.children = children

		this.calculateBounds()
	}

	addChild(child:Hittable) {
		this.children.push(child)
		this.calculateBounds()
	}
	calculateBounds() {
		let boundsPoints = [ // x y z
			new Vec3(-1, -1,  1), // left bottom front
			new Vec3(-1, -1, -1), // left bottom back
			new Vec3(1,  -1,  1), // right bottom back
			new Vec3(1,  -1,  1), // right bottom front
			new Vec3(-1,  1,  1), // left top front
			new Vec3(-1,  1, -1), // left top back
			new Vec3(1,   1,  1), // right top back
			new Vec3(1,   1,  1), // right top front
		]
	}

}