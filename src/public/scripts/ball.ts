import { Hittable, HittableOptions, Shape } from "./hittable";
import { world } from "./main";
import { Ray } from "./ray";
import { Vec3 } from "./vec3";

export class Ball extends Hittable {

	constructor(options?:HittableOptions) {
		if(!options) options = {}
		options.shape = Shape.ball
		super(options)
	}

}