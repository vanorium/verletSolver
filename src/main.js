import Verlet from './verlet.js'

const main = (app, camera) => {
    // Verlet.createObject({
    //     pos:{
    //         x: 1280/2-64,
    //         y: 720/2
    //     },
    //     r: 16,
    //     constraints: [{x:1280/2, y:720/2, maxDistance:256, visible:true}],
    //     solid: false,
    // })

    // Verlet.createObject({
    //     pos:{
    //         x: 1280/2+64,
    //         y: 720/2
    //     },
    //     r: 32,
    //     constraints: [{x:1280/2, y:720/2, maxDistance:256}],
    //     solid: false,
    // })

    Verlet.createObjectLinked({
        pos:{
            x: 1280/2,
            y: 720/2
        },
        r: 16,
        count: 20,
        solidStart:true,
        // solidEnd:true,
    })

    // Verlet.createBoxOfObjects({
    //     pos: {
    //         x: 1280 / 2,
    //         y: 720 / 2,
    //         sizeX: 4,
    //         sizeY: 4,
    //     },
    //     constraints: [{ x: 1280 / 2, y: 720 / 2, maxDistance: 256, visible: true }],
    //     r: 32,
    //     solid: false
    // })

    // Verlet.createBoxOfObjects({
    //     pos: {
    //         x: 1280 / 2+256,
    //         y: 720 / 2,
    //         sizeX: 4,
    //         sizeY: 4,
    //     },
    //     r: 32,
    //     solid: false
    // })

    // Verlet.createLineOfObjects({
    //     pos:{
    //         x1: 1280/2-256,
    //         y1: 720/2+300,
    //         x2: 1280/2+256,
    //         y2: 720/2+300
    //     },
    //     r: 16,
    //     solid: true
    // })

    // Verlet.createLinedObjects({
    //     pos:{
    //         x1: 1280/2-512,
    //         y1: 720/2+300,
    //         x2: 1280/2+512,
    //         y2: 720/2+300
    //     },
    //     r: 16,
    //     solid: true
    // })

    // Verlet.createLinedObjects({
    //     pos:{
    //         x1: 1280/2-512,
    //         y1: 720/2-100,
    //         x2: 1280/2-512,
    //         y2: 720/2+512
    //     },
    //     r: 4,
    //     solid: true
    // })

    // Verlet.createLinedObjects({
    //     pos:{
    //         x1: 1280/2+512,
    //         y1: 720/2-100,
    //         x2: 1280/2+512,
    //         y2: 720/2+512
    //     },
    //     r: 4,
    //     solid: true
    // })

    Verlet.objects.forEach((obj) => {
        camera.addChild(obj.graphics)
        // obj.constraints.forEach((constraint) => {
        //     camera.addChild(constraint.graphics)
        // })
    })

    let tick = 0
    app.ticker.add((ticker) => {
        tick++
        Verlet.iterate(ticker.deltaTime)
    })
}

export default main