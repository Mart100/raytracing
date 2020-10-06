export class Color {
	r: number = 255
	g: number = 255
	b: number = 255
	a: number = 255
	constructor(r?:number, b?:number, g?:number, a?:number) {
		this.r = r || 255
		this.g = g || 255
		this.b = b || 255
		this.a = a || 255
	}

	random() : Color {

		this.r = Math.floor(Math.random()*255)
		this.g = Math.floor(Math.random()*255)
		this.b = Math.floor(Math.random()*255)
		this.a = 255

		return this
	}
}