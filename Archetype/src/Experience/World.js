import * as THREE from 'three'
import Experience from './Experience.js'
import Box from './Box.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setBox()
            }
        })
    }

    setBox()
    {
        this.box = new Box()
    }

    resize()
    {
    }

    update()
    {
    }

    destroy()
    {
    }
}