import Verlet from './verlet.js'
import { getDistance } from './utils.js'

export default {
    rope(options){
        const res = []
        for (let i = 0; i < options.count; i++) {
            
            const modifedOptions = {...options}
            modifedOptions.pos = {
                x: options.pos.x + i * options.r * 2 - options.count*options.r,
                y: modifedOptions.pos.y
            }
            modifedOptions.pinned = options.pinnedStart && !!(!i) || options.pinnedEnd && i == options.count - 1 || options.pinned || false

            const obj = Verlet.getStructure(modifedOptions)

            if (i) {
                if (i==1 || i != options.count - 1) {
                    obj.joints.push({obj:res[i - 1], maxDistance:32})
                }
    
                else {
                    res[i - 1].joints.push({obj, maxDistance:32})
                }
            }
    
            res.push(obj)
        }
        return res
    },
    
    line(options){
        const distance = getDistance(options.pos.x1, options.pos.y1, options.pos.x2, options.pos.y2)
        const iterations = Math.max(Math.ceil(distance / options.r) / 2, 1)
    
        const res = []

        for (let t = 0; t <= 1; t += 1 / iterations) {
            let x = options.pos.x1 + t * (options.pos.x2 - options.pos.x1)
            let y = options.pos.y1 + t * (options.pos.y2 - options.pos.y1)
    
            const obj = Verlet.getStructure(options)
            obj.pos={
                x,y
            }
            obj.prevX=obj.pos.x
            obj.prevY=obj.pos.y
    
            res.push(obj)
        }
        return res
    },
    
    box(options){
        const res = []
        for (let x = 0; x < options.pos.sizeX; x++) {
            for (let y = 0; y < options.pos.sizeY; y++) {
                const modifedObject = {...options}

                modifedObject.pos = {
                    x: options.pos.x + x * options.r * 2 - options.r * (options.pos.sizeX - 1),
                    y: options.pos.y + y * options.r * 2 - options.r * (options.pos.sizeY - 1)
                }
                
                res.push(Verlet.getStructure(modifedObject))
            }
        }
        return res
    }
}