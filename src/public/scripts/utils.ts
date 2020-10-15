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

export function randomRange(start:number, end:number) : number {
	return start+Math.random()*(end-start)
}