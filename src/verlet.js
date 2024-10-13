import { Graphics } from "pixi.js";
import { getDistance } from './utils.js'

class VerletSolver {

    TIME_DIVIDER = 6
    GRAVITY_X = 0
    GRAVITY_Y = 9.81

    constructor() {
        this.objects = []
    }

    createObjectRope(options) {
        const newObjects = []
        for(let i=0; i<options.count; i++){
            let pos = { ...options.pos, y: options.pos.y + i * options.r * 2 };

            const obj = {           
                pos,
                r: options.r,
                solid: !!(!i),
                prevX: pos.x,
                prevY: pos.y,
                graphics: new Graphics().circle(0, 0, options.r).fill(!i ? "darkred" : "red")
            }

            if(i){
                obj.constraintAt = newObjects[i-1]
            }
            newObjects.push(obj)
        }
        // this.objects.push(newObjects[0])
        this.objects = [...this.objects, ...newObjects]
        console.log(newObjects)
    }

    createObject(options) {
        this.objects.push({
            pos: options.pos,
            r: options.r,
            solid: options.solid == undefined ? false : options.solid,
            prevX: options.pos.x,
            prevY: options.pos.y,
            graphics: new Graphics().circle(0, 0, options.r).fill(options.solid ? "gray" : "red")
        })
    }

    createLinedObjects(options) {
        const distance = getDistance(options.pos.x1, options.pos.y1, options.pos.x2, options.pos.y2)
        const iterations = Math.max(Math.ceil(distance / options.r) / 2, 1)

        for (let t = 0; t <= 1; t += 1 / iterations) {
            let x = options.pos.x1 + t * (options.pos.x2 - options.pos.x1)
            let y = options.pos.y1 + t * (options.pos.y2 - options.pos.y1)

            const newOptions = {
                r: options.r,
                solid: options.solid,
                pos: {
                    x, y
                }
            }
            this.createObject(newOptions)
        }
    }

    createRectangledObjects(options) {
        for (let x = 0; x < options.pos.sizeX; x++) {
            for (let y = 0; y < options.pos.sizeY; y++) {
                const newOptions = {
                    r: options.r,
                    solid: options.solid,
                    pos: {
                        x: options.pos.x + x * options.r * 2,
                        y: options.pos.y + y * options.r * 2
                    }
                }
                this.createObject(newOptions)
            }
        }
    }

    iterate(dt) {
        dt = 165 / 1000
        for (let i = 0; i < this.objects.length; i++) {
            const obj = this.objects[i]

            obj.accelerationX = 0
            obj.accelerationY = 0
            this.accelerate(obj, this.GRAVITY_X, this.GRAVITY_Y, dt)
            this.applyConstraints(obj)
            this.resolveCollisions(obj)
            this.updatePosition(obj, dt)
            this.updateGraphics(obj)
        }
    }

    applyConstraints(obj){
        if(obj.constraintAt){
            const distance = getDistance(obj.pos.x, obj.pos.y, obj.constraintAt.pos.x, obj.constraintAt.pos.y)
            if(distance > 32) {
                const axis = {
                    x: obj.pos.x - obj.constraintAt.pos.x,
                    y: obj.pos.y - obj.constraintAt.pos.y,
                }

                const delta = 32-distance
                
                const n = {
                    x: axis.x / distance,
                    y: axis.y / distance,
                }

                obj.pos.x += 1/2 * delta * 1 * n.x
                obj.pos.y += 1/2 * delta * 1 * n.y

                if(!obj.constraintAt.solid){
                    obj.constraintAt.pos.x -= 1/2 * delta * 1 * n.x
                    obj.constraintAt.pos.y -= 1/2 * delta * 1 * n.y
                }
            }
        }
    }

    resolveCollisions(obj) {
        for (let i = 0; i < this.objects.length; i++) {
            const obj2 = this.objects[i]
            if (obj != obj2) {
                const distance = getDistance(obj.pos.x, obj.pos.y, obj2.pos.x, obj2.pos.y)

                
                if (distance < (obj.r + obj2.r)) {
                    const collisionAxes = {
                        x: obj.pos.x - obj2.pos.x,
                        y: obj.pos.y - obj2.pos.y,
                    }
                    
                    const n = {
                        x: collisionAxes.x / distance,
                        y: collisionAxes.y / distance,
                    }

                    const overlap = (obj.r + obj2.r) - distance

                    const massRatio1 = obj.r / (obj.r + obj2.r)
                    const massRatio2 = obj2.r / (obj.r + obj2.r)

                    if (!obj.solid) {
                        obj.pos.x += overlap * massRatio2 * 1 * n.x
                        obj.pos.y += overlap * massRatio2 * 1 * n.y
                    }

                    if (!obj2.solid) {
                        obj2.pos.x -= overlap * massRatio1 * 1 * n.x
                        obj2.pos.y -= overlap * massRatio1 * 1 * n.y
                    }
                }
            }
        }
    }

    updatePosition(obj, dt) {
        if (!obj.solid) {
            let oldX = obj.pos.x
            let oldY = obj.pos.y

            obj.pos.x += obj.pos.x - obj.prevX + obj.accelerationX / this.TIME_DIVIDER * dt ** 2
            obj.pos.y += obj.pos.y - obj.prevY + obj.accelerationY / this.TIME_DIVIDER * dt ** 2

            obj.prevX = oldX
            obj.prevY = oldY
        }
    }

    updateGraphics(obj) {
        obj.graphics.x = obj.pos.x
        obj.graphics.y = obj.pos.y
    }

    accelerate(obj, forceX, forceY) {
        obj.accelerationX += forceX 
        obj.accelerationY += forceY 
    }
}

const Verlet = new VerletSolver()
console.log(Verlet)
export default Verlet
