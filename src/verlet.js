import { Graphics } from "pixi.js";
import { getDistance } from './utils.js'
import * as ObjectFactory from './objectFactory.js';

class VerletSolver {

    TIME_DIVIDER = 6
    GRAVITY_X = 0
    GRAVITY_Y = 9.81

    constructor() {
        this.objects = []
    }

    getStructure(options) {
        if(options.hasOwnProperty('constraints')){
            options.constraints.forEach((constraint) => {
                if(constraint.visible){
                    constraint.graphics = new Graphics().circle(0, 0, constraint.maxDistance).fill('green')
                    constraint.graphics.alpha = 0.1
                }
            })
        }   

        return (
            {
                pos: options.pos,
                r: options.r,
                pinned: options.pinned == undefined ? false : options.pinned,
                prevX: options.pos.x,
                prevY: options.pos.y,
                constraints: options.constraints || [],
                joints: [],
                graphics: new Graphics().circle(0, 0, options.r).fill(options.pinned ? "gray" : `hsl(${(this.objects.length*5)%48}, 100%, 50%)`)
            }
        )
    }

    create(options, type) {
        if(typeof ObjectFactory.default[type] == 'function') {
            this.objects = [...this.objects, ...ObjectFactory.default[type](options)]
        }
        else if (type==undefined || type==''){
            this.objects.push(this.getStructure(options))
        }
        else {
            console.error(`Unknown object type: ${type}`)
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
            this.applyJoints(obj)
            this.resolveCollisions(obj)
            this.updatePosition(obj, dt)
            this.updateGraphics(obj)
        }
    }

    applyJoints(obj) {
        obj.joints.forEach((joint) => {
                const distance = getDistance(obj.pos.x, obj.pos.y, joint.obj.pos.x, joint.obj.pos.y)
                
                const maxDistance = joint?.maxDistance || joint.obj.r+obj.r

                if(distance>maxDistance){
                    const axis = {
                        x: obj.pos.x - joint.obj.pos.x,
                        y: obj.pos.y - joint.obj.pos.y,
                    }
        
                    const delta = maxDistance - distance
        
                    const n = {
                        x: axis.x / distance,
                        y: axis.y / distance,
                    }
        
                    obj.pos.x += 0.5 * delta * n.x
                    obj.pos.y += 0.5 * delta * n.y
        
                    if (!joint.obj.pinned) {
                        joint.obj.pos.x -= 0.5 * delta * n.x
                        joint.obj.pos.y -= 0.5 * delta * n.y
                    }
                }

            })
    }

    applyConstraints(obj) {
        if (obj.constraints.length) {
            obj.constraints.forEach((constraint) => {

                if (!constraint.hasOwnProperty('graphics')) {
                    constraint.graphics = new Graphics().circle(0, 0, constraint.maxDistance).fill('green')
                }

                else {
                    constraint.graphics.x = constraint.x
                    constraint.graphics.y = constraint.y
                }

                const distance = getDistance(obj.pos.x, obj.pos.y, constraint.x, constraint.y)
                
                if (distance > constraint.maxDistance) {
                    const axis = {
                        x: obj.pos.x - constraint.x,
                        y: obj.pos.y - constraint.y,
                    }

                    const delta = constraint.maxDistance - distance

                    const n = {
                        x: axis.x / distance,
                        y: axis.y / distance,
                    }

                    obj.pos.x += 0.5 * delta * n.x
                    obj.pos.y += 0.5 * delta * n.y

                }
            })
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

                    if (!obj.pinned) {
                        obj.pos.x += overlap * massRatio2 * 1 * n.x
                        obj.pos.y += overlap * massRatio2 * 1 * n.y
                    }

                    if (!obj2.pinned) {
                        obj2.pos.x -= overlap * massRatio1 * 1 * n.x
                        obj2.pos.y -= overlap * massRatio1 * 1 * n.y
                    }
                }
            }
        }
    }

    updatePosition(obj, dt) {
        if (!obj.pinned) {
            let oldX = obj.pos.x
            let oldY = obj.pos.y

            // new pos = pos + velocity + acceleration
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
