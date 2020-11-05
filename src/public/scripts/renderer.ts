import { Camera } from "./camera"
import { Color } from "./color"
import { world } from "./main"
import { Ray } from "./ray"
import { dgr_to_rad } from "./utils"
import { Vec2 } from "./vec2"
import { Vec3 } from "./vec3"


interface getRaytracingViewOptions {
	fill?:boolean
	offset?:Vec2
	update?:boolean
}

enum View {
	raytracing,
	simple
}

export class Renderer {

	view:View
	frameCount:number
	canvas:any
	ctx:any
	imgData:any
	size:Vec2
	camera:Camera
		
	constructor() {

		this.view = View.raytracing
		this.frameCount = 0

		this.canvas = $('#canvas')[0]
		this.ctx = this.canvas.getContext('2d')

		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		
		this.imgData = this.ctx.createImageData(this.canvas.width, this.canvas.height)
		this.size = new Vec2(this.canvas.width, this.canvas.height)

		this.frame()
		this.camera = new Camera(new Vec3(0, 0, 200), dgr_to_rad(90), new Vec3(0, 0, 0), 40)

	}
	changeView(to:View) : void {
		this.view = to
	}
	setCanvasPixel(pos:Vec2, color:Color) : void {
		let idx = (pos.y*this.canvas.width*4) + (pos.x*4)
	
		this.imgData.data[idx] = color.r
		this.imgData.data[idx+1] = color.g
		this.imgData.data[idx+2] = color.b
		this.imgData.data[idx+3] = color.a
	}
	startRaytracingProcess() : void {
		let fov = this.camera.fov
		let width = this.canvas.width
		let height = this.canvas.height

		for(let x=0;x<width;x+=1) {
			let angleA = (((x/width)*fov)-(fov/2))/(height/width)
			for(let y=0;y<height;y+=1) {
				//let currentPix = this.getCanvasPixel(new Vec2(x, y))
				//if(currentPix.a == 255) continue 
				let angleB = ((y/height)*fov)-(fov/2)
				let vec = new Vec3(Math.sin(angleA), Math.sin(angleB), -1)
				let rayVec = vec.clone().rotateFull(this.camera.rot)
				//if(Math.random() > 0.99999) console.log(x, y, angleA, angleB, rayVec)
				let color = this.sendPixelRay(new Vec2(x, y), rayVec)
				this.setCanvasPixel(new Vec2(x, y), color)
			}
		}
	}
	sendPixelRay(pos:Vec2, rayVec:Vec3) : Color {
		let rayPos = this.camera.pos.clone()
		let ray = new Ray(rayPos, rayVec)
		let color = ray.getColor()
		return color
	}
	getCanvasPixel(pos:Vec2) : Color {

		// get a specific pixel on the imgage data
		let idx = (pos.y*this.canvas.width*4) + (pos.x*4)

    let r = this.imgData.data[idx]
    let g = this.imgData.data[idx+1]
    let b = this.imgData.data[idx+2]
		let a = this.imgData.data[idx+3]

		let color = new Color(r, g, b, a)

		return color
  }
	updateCanvas() : void {

		// update canvas with image Data
    this.ctx.imageSmoothingEnabled = false
		this.ctx.putImageData(this.imgData, 0, 0)
	}
	clearCanvas() : void {

		// clear screen
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.imgData = this.ctx.createImageData(this.canvas.width, this.canvas.height)
	}
	frame() : void {
		this.frameCount++

		let ctx = this.ctx

		// rerun frame
		window.requestAnimationFrame(() => { this.frame() })

		this.updateCanvas()
	}
}