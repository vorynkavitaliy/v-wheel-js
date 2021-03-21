import Vue from 'vue'
import Vuex from 'vuex'
import wheel from './wheel'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        items: ['1', '2', '3', '4', '5', '6'],
        winner: 0,
        angle: 0,
        running: null,
        showModal: false,
        btnAble: false,
        picture: null,
    },

    mutations: {
        setWinner: (state, payload) => (state.winner = payload),
        setAngle: (state, payload) => (state.angle = payload),
        setBtn: (state, payload) => (state.btnAble = payload),
        setShowModal: (state, payload) => (state.showModal = payload),
        setPicture: (state, payload) => (state.picture = payload),

        spinTo(state, { winner, duration, repaint }) {
            let final_angle = -0.2 - ((0.5 + winner) * 2 * Math.PI) / state.items.length
            let start_angle =
                state.angle -
                Math.floor(state.angle / (2 * Math.PI)) * 2 * Math.PI -
                5 * 2 * Math.PI
            let start = performance.now()

            const frame = () => {
                let now = performance.now()
                let t = Math.min(1, (now - start) / duration)
                t = 3 * t * t - 2 * t * t * t
                const angle = start_angle + t * (final_angle - start_angle)
                this.commit('setAngle', angle)
                this.commit('repaint', {
                    ...repaint,
                    angle: state.angle,
                })
                if (t < 1) {
                    requestAnimationFrame(frame)
                    this.commit('setBtn', true)
                } else {
                    state.running = false
                    setTimeout(() => {
                        this.commit('setShowModal', true)
                        this.commit('setBtn', false)
                    }, 200)
                }
            }
            requestAnimationFrame(frame)
            state.running = true
        },
    },

    actions: {
        async getPicture({ commit }) {
            try {
                const { url } = await fetch('https://source.unsplash.com/random')
                commit('setPicture', url)
            } catch (error) {
                console.log(error)
                throw error
            }
        },
    },

    getters: {
        items: (state) => state.items,
        winner: (state) => state.winner,
        running: (state) => state.running,
        angle: (state) => state.angle,
        showModal: (state) => state.showModal,
        btnAble: (state) => state.btnAble,
        picture: (state) => state.picture,
    },
    modules: { wheel },
})
