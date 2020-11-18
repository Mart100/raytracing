import { Renderer } from './renderer'
import { World } from './world'

const globalAny:any = global;

export let renderer:Renderer
export let world:World

$(() => {
	world = new World()
	globalAny.world = world

	renderer = new Renderer()
	globalAny.renderer = renderer

	world.spawnRandomBalls(200)
	world.spawnRandomPolygons(100)

	renderer.startRaytracingProcess()

})