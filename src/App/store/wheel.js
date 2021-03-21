export default {
    state: {
        wheels: null,
        frame: null,
        canvas: null,
        colors: ['#F84', '#8F4', '#48F', '#F8F'],
    },

    mutations: {
        setCanvas: (state, payload) => (state.canvas = payload),

        repaint(state, payload) {
            let r = (Math.min(innerWidth / 2, innerHeight / 2) / 2.25) | 0
            const sections = this.getters.items

            if (state.wheels === null) {
                state.wheels = []
                for (let n = 0; n < sections.length; n++) {
                    let c = document.createElement('canvas')
                    c.width = c.height = 2 * r + 10
                    let ctx = c.getContext('2d'),
                        cx = 5 + r,
                        cy = 5 + r
                    let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
                    g.addColorStop(0, 'rgba(0,0,0,0)')
                    g.addColorStop(1, 'rgba(0,0,0,0.5)')
                    for (let i = 0; i < sections.length; i++) {
                        let a0 = (2 * Math.PI * i) / sections.length
                        let a1 = a0 + (2 * Math.PI) / (i == 0 ? 1 : sections.length)
                        let a = (2 * Math.PI * (i + 0.5)) / sections.length
                        ctx.beginPath()
                        ctx.moveTo(cx, cy)
                        ctx.arc(cx, cy, r, a0, a1, false)
                        ctx.fillStyle = payload.colors[i % 4]
                        ctx.fill()
                        ctx.fillStyle = g
                        ctx.fill()
                        ctx.save()
                        if (i == n) {
                            ctx.fillStyle = '#FFF'
                            ctx.shadowColor = '#FFF'
                            ctx.shadowBlur = r / 20
                        } else {
                            ctx.fillStyle = '#AAA'
                            ctx.shadowColor = '#000'
                            ctx.shadowBlur = r / 100
                        }
                        ctx.font = 'bold ' + (r / sections.length) * 1.6 + 'px serif'
                        ctx.textAlign = 'center'
                        ctx.textBaseline = 'middle'
                        ctx.translate(cx, cy)
                        ctx.rotate(a)
                        ctx.fillText(sections[i], r * 0.62, 0)
                        ctx.restore()
                    }
                    state.wheels.push(c)
                }
            }
            if (state.frame === null) {
                state.frame = document.createElement('canvas')
                state.frame.width = state.frame.height = (10 + 2 * r * 1.25) | 0
                let ctx = state.frame.getContext('2d'),
                    cx = state.frame.width / 2,
                    cy = state.frame.height / 2
                ctx.shadowOffsetX = r / 80
                ctx.shadowOffsetY = r / 80
                ctx.shadowBlur = r / 40
                ctx.shadowColor = 'rgba(0,0,0,0.5)'
                ctx.beginPath()
                ctx.arc(cx, cy, r * 1.025, 0, 2 * Math.PI, true)
                ctx.arc(cx, cy, r * 0.975, 0, 2 * Math.PI, false)
                ctx.fillStyle = '#444'
                ctx.fill()
                ctx.shadowOffsetX = r / 40
                ctx.shadowOffsetY = r / 40
                let g = ctx.createRadialGradient(cx - r / 7, cy - r / 7, 0, cx, cy, r / 3)
                g.addColorStop(0, '#FFF')
                g.addColorStop(0.2, '#F44')
                g.addColorStop(1, '#811')
                ctx.fillStyle = g
                ctx.beginPath()
                ctx.arc(cx, cy, r / 3.5, 0, 2 * Math.PI, false)
                ctx.fill()
                ctx.translate(cx, cy)
                ctx.rotate(Math.PI - 0.2)
                ctx.beginPath()
                ctx.moveTo(-r * 1.1, -r * 0.05)
                ctx.lineTo(-r * 0.9, 0)
                ctx.lineTo(-r * 1.1, r * 0.05)
                ctx.fillStyle = '#F44'
                ctx.fill()
            }
            payload.canvas.width = innerWidth / 2
            payload.canvas.height = innerHeight / 2

            let cx = innerWidth / 4,
                cy = innerHeight / 4
            let ctx = payload.canvas.getContext('2d')
            let selected =
                Math.floor(((-0.2 - payload.angle) * sections.length) / (2 * Math.PI)) %
                sections.length
            if (selected < 0) selected += sections.length
            ctx.save()
            ctx.translate(cx, cy)
            ctx.rotate(payload.angle)
            ctx.translate(-state.wheels[selected].width / 2, -state.wheels[selected].height / 2)
            ctx.drawImage(state.wheels[selected], 0, 0)
            ctx.restore()
            ctx.drawImage(state.frame, cx - state.frame.width / 2, cy - state.frame.height / 2)
        },
    },

    getters: {
        canvas: (state) => state.canvas,
        colors: (state) => state.colors,
    },
}
