let buttons = {}


let lastTick = performance.now()

let selectedPosition = {x: 0, y: 0, w: 0, h: 0}
let selectionPosition = {x: 0, y: 0, w: 0, h: 0}



function tick(nowish) {
    let delta = nowish - this.lastTick
    this.lastTick = nowish
    this.update(delta * 0.0001)
    window.requestAnimationFrame(this.lastTick)
}


function update(dt) {

}
