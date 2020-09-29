export class Vec2 {
	x: number
	y: number

  constructor(x:number, y:number) {
    this.x = x
    this.y = y

    if(this.x == undefined) this.x = 0
		if(this.y == undefined) this.y = 0
		
	}
  multiply(vec1:Vec2) : Vec2 {
		this.x *= vec1.x
		this.y *= vec1.y
		return this
  }
  plus(vec1:Vec2) : Vec2 {
		this.x += vec1.x
		this.y += vec1.y
		return this
  }
  minus(vec1:Vec2) : Vec2 {
		this.x -= vec1.x
		this.y -= vec1.y
		return this
  }
  divide(vec1:Vec2) : Vec2 {
		this.x /= vec1.x
		this.y /= vec1.y
		return this
  }
  rotate(angle:number) : Vec2 {
    let x1 = Math.cos(angle) * this.x - Math.sin(angle) * this.y
    let y1 = Math.sin(angle) * this.x + Math.cos(angle) * this.y

    this.x = x1
    this.y = y1
    
    return this
  }
  string() : String { 
    return this.x+' - '+this.y
  }
  getAngle() : number {
    let angle = Math.atan2(this.y, this.x)
    let degrees = 180*angle/Math.PI  //degrees
    return (360+Math.round(degrees))%360 //round number, avoid decimal fragments
  }
  setMagnitude(to:number) : Vec2 {
    let magnitude = this.getMagnitude()

    if(magnitude == 0) return this

    let x = (this.x/magnitude)*to
    let y = (this.y/magnitude)*to

    this.x = x
    this.y = y

    return this
  }
  getMagnitude() : number {
    if(this.x == 0 && this.y == 0) return 0
    let magnitude = Math.sqrt(this.x*this.x + this.y*this.y)
    return magnitude
  }
  clone() : Vec2 {
    return new Vec2(this.x, this.y)
  }
}