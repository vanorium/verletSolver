import { Container } from "pixi.js";

const cameraSetup = (app) => {
    const viewport = { width: 1280, height: 720}

    const camera = new Container()
    app.stage.addChild(camera)

    const getOffset = (viewportScale) => {
        return {
            x: app.screen.width/2 - camera.x*viewportScale - camera.x*(camera.scale.x - 1)*viewportScale,
            y: app.screen.height/2 - camera.y*viewportScale - camera.y*(camera.scale.y - 1)*viewportScale
        }
    }

    camera.x=1280/2
    camera.y=720/2

    app.ticker.add(() => {
        const viewportScale = Math.min(app.screen.width/viewport.width, app.screen.height/viewport.height)
        const offset = getOffset(viewportScale)
        app.stage.scale.set(viewportScale)
        app.stage.position.set(offset.x-camera.x*viewportScale, offset.y-camera.y*viewportScale)
        camera.scale.set(1)
    })

    return camera
}

export default cameraSetup 