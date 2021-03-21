<template>
    <div id="app" class="app">
        <main>
            <v-container>
                <v-col msd="8" class="m-a">
                    <Wheel />
                </v-col>

                <v-col xxd="6" msd="4" class="mh-a mv-3">
                    <v-btn color="primary" @click="spin" :disable="disable">Rotate</v-btn>
                </v-col>
            </v-container>
        </main>

        <v-modal :isShow="showModal">
            <div class="inner">
                <header class="mb-3">
                    <v-layout flex between acenter>
                        <h3 class="mh-a">You are win!!!</h3>

                        <div class="btn-wrap">
                            <v-btn color="danger" @click="closeModal">&times;</v-btn>
                        </div>
                    </v-layout>
                </header>
                <v-layout grid xd="1" msd="2" class="inner-content">
                    <article>
                        <div class="picture">
                            <img :src="picture" alt="result" />
                        </div>
                    </article>
                    <v-layout flex acenter jcenter class="inner-winner">
                        <span class="result">
                            {{ winner }}
                        </span>
                    </v-layout>
                </v-layout>
                <v-col xxd="6" msd="3" class="mh-a mt-3">
                    <v-btn color="primary" @click="spin" :disable="disable">Rotate</v-btn>
                </v-col>
            </div>
        </v-modal>
    </div>
</template>

<script>
import Wheel from './components/Wheel.vue'
export default {
    components: { Wheel },

    computed: {
        sections() {
            return this.$store.getters['items']
        },

        running() {
            return this.$store.getters['running']
        },

        winner() {
            return this.$store.getters['winner']
        },

        angle() {
            return this.$store.getters['angle']
        },

        colors() {
            return this.$store.getters['colors']
        },

        canvas() {
            return this.$store.getters['canvas']
        },

        showModal() {
            return this.$store.getters['showModal']
        },

        disable() {
            return this.$store.getters['btnAble']
        },

        picture() {
            return this.$store.getters['picture']
        },
    },

    methods: {
        spin() {
            if (!this.running) {
                this.$store.dispatch('getPicture')
                const winner = (Math.random() * this.sections.length) | 0
                this.$store.commit('setWinner', winner + 1)
                this.$store.commit('spinTo', {
                    winner,
                    duration: 1000,
                    repaint: {
                        angle: this.angle,
                        canvas: this.canvas,
                        colors: this.colors,
                    },
                })
            }

            if (this.showModal) {
                this.$store.commit('setShowModal', false)
            }
        },

        closeModal() {
            this.$store.commit('setShowModal', false)
        },
    },
}
</script>

<style lang="sass" scoped>
.inner
    h3
        color: #fff

    .btn-wrap
        max-width: 40px

    .picture
        overflow: hidden
        max-height: 50vh
        height: 100%

        img
            width: 100%
            height: 100%
            object-fit: cover

    &-content
        min-height: 50vh

    &-winner
        .result
            +method(font-size, $sxd: rem(24px, $dw-msd), $msd: rem(28px, $dw-mld), $ld: rem(56px, $dw-ld))
            color: #fff
            background-color: #000
            height: 100px
            width: 100px
            display: flex
            align-items: center
            justify-content: center
            border-radius: 50%
</style>
