import Verlet from './verlet.js'

export default function scene(){
    Verlet.create({
        pos:{
            x: 1280/2,
            y: 720/2+128
        },
        r: 16,
        count: 16,
        solidStart:true,
        solidEnd:true,
    }, 'rope')

    Verlet.create({
        pos:{
            x:1280/2,
            y:720/2-96
        },
        r:16,
        solid:false
    })

    // Verlet.create({
    //     pos:{
    //         x:1280/2,
    //         y:720/2,
    //         sizeX: 4,
    //         sizeY: 4,
    //     },
    //     r:16,
    //     solid:false
    // }, 'box')
    
    // Verlet.create({
    //     pos:{
    //         x1: 1280/2-256,
    //         y1: 720/2,
    //         x2: 1280/2+256,
    //         y2: 720/2+64
    //     },
    //     r: 16,
    //     constraints: [{ x: 1280 / 2, y: 720 / 2, maxDistance: 256, visible: true }],
    //     solid: false
    // }, 'line')
}