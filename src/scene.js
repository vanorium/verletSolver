import Verlet from './verlet.js'

export default function scene(){
    // Verlet.createObjectLinked({
    //     pos:{
    //         x: 1280/2,
    //         y: 720/2+128
    //     },
    //     r: 16,
    //     count: 8,
    //     solidStart:true,
    //     solidEnd:true,
    //     constraints: [{ x: 1280 / 2, y: 720 / 2, maxDistance: 256, visible: true }],
    // })

    // Verlet.createBoxOfObjects({
    //     pos: {
    //         x: 1280 / 2,
    //         y: 720 / 2 - 256,
    //         sizeX: 32,
    //         sizeY: 4,
    //     },
    //     r: 32,
    //     solid: false
    // })
    
    Verlet.createLineOfObjects({
        pos:{
            x1: 1280/2-256,
            y1: 720/2,
            x2: 1280/2+256,
            y2: 720/2+64
        },
        r: 16,
        constraints: [{ x: 1280 / 2, y: 720 / 2, maxDistance: 256, visible: true }],
        solid: false
    })
}