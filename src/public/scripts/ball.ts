import { Hittable } from "./hittable";

export class Ball extends Hittable {
	constructor() {
		super()
		this.shape = 'ball'
	}
}