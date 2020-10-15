import { Hittable, HittableOptions, Shape } from "./hittable";

export class Ball extends Hittable {

	constructor(options?:HittableOptions) {
		if(!options) options = {}
		options.shape = Shape.ball
		super(options)
	}
}