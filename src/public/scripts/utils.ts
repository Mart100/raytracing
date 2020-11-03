export async function sleep(ms:number) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, ms)
	})
}

export function dgr_to_rad(degrees:number) : number {
  let pi = Math.PI
  return degrees * (pi/180)
}

export function rad_to_dgr(radians:number) : number {
  let pi = Math.PI
  return radians * (180/pi)
}

export function randomRange(start:number, end:number) : number {
	return start+Math.random()*(end-start)
}