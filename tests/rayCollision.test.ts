import $ from 'jquery';
import { Vec3 } from '../src/public/scripts/vec3'
import { Ray } from '../src/public/scripts/ray'
import { Ball } from '../src/public/scripts/ball'
import { Color } from '../src/public/scripts/color'
import { World } from '../src/public/scripts/world';




test('rayBallCollision-count', () => {
	let world = new World()
	let ray = new Ray(new Vec3(0,0,0), new Vec3(0, 1, 0), world)
	let amount = Math.floor(Math.random()*100)+100
	for(let i=0;i<amount;i++) {
		let ball = new Ball({
			pos: new Vec3(0, 100 + i*100, 0),
			color: new Color(0,0,0),
			reflection:0,
			diffusion:0,
			size:5,
		})
		world.addHittable(ball)
	}


	expect(ray.getRayIntersects().length).toBe(amount)
})