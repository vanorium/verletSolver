import { Application } from "pixi.js";
import main from './main.js'
import cameraSetup from './cameraSetup.js'

(async () => {
    const app = new Application()
    await app.init({
        background: 'white',
        resizeTo: window,
        eventMode: "none"
    })
    document.body.appendChild(app.canvas)

    const camera = cameraSetup(app)

    main(app, camera)
})()

