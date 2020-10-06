import { Renderer } from './renderer'
import { World } from './world'


export let renderer:Renderer
export let world:World

$(() => {
	world = new World()
})