import Verlet from './verlet.js'

export default function scene(){
    Verlet.create({
        pos:{
            x:1280/2,
            y:720/2+128
        },
        r: 8,
        count: 30,
        pinnedStart:true,
        pinnedEnd:true
    }, 'rope')


    Verlet.create({
        pos:{
            x:1280/2,
            y:720/2
        },
        r:16,
    })

    Verlet.create({
        pos:{
            x:1280/2,
            y:720/2-256,
            sizeX: 4,
            sizeY: 4,
        },
        r:16,
    }, 'box')
}