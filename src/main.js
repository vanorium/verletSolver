import Verlet from './verlet.js'

const main = (app, camera) => {
    Verlet.createObject({
        pos:{
            x: 1280/2-256,
            y: 720/2-512
        },
        r: 8,
        solid: false,
    })

    Verlet.createObjectRope({
        pos:{
            x: 1280/2-384,
            y: 720/2
        },
        r: 16,
        count:24
    })


    // Verlet.createRectangledObjects({
    //     pos:{
    //         x:1280/2+32,
    //         y:720/2-512,
    //         sizeX: 6,
    //         sizeY: 6,
    //     },
    //     r: 16,
    //     solid: false
    // })

    Verlet.createLinedObjects({
        pos:{
            x1: 1280/2-512,
            y1: 720/2+300,
            x2: 1280/2+512,
            y2: 720/2+300
        },
        r: 16,
        solid: true
    })

    Verlet.createLinedObjects({
        pos:{
            x1: 1280/2-512,
            y1: 720/2-100,
            x2: 1280/2-512,
            y2: 720/2+512
        },
        r: 4,
        solid: true
    })

    Verlet.createLinedObjects({
        pos:{
            x1: 1280/2+512,
            y1: 720/2-100,
            x2: 1280/2+512,
            y2: 720/2+512
        },
        r: 4,
        solid: true
    })
    
    Verlet.objects.forEach((obj) => camera.addChild(obj.graphics))

    let tick = 0
    app.ticker.add((ticker) => {
        tick++
        Verlet.iterate(ticker.deltaTime)
    })
}

export default main