import Verlet from './verlet.js'
import scene from './scene.js'

const main = (app, camera) => {

    scene()

    Verlet.objects.forEach((obj) => {
        camera.addChild(obj.graphics)
        obj.constraints.forEach((constraint) => {
            if(constraint.visible){
                camera.addChild(constraint.graphics)
                camera.setChildIndex(constraint.graphics, 0)
            }
        })
    })

    app.ticker.add((ticker) => {
        Verlet.iterate(ticker.deltaTime)
    })
}

export default main