<template>
    <v-layout flex class="column">
        <canvas id="canvas" class="wheel m-a" ref="canvas"></canvas>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            colors: ['#F84', '#8F4', '#48F', '#F8F'],
        }
    },

    computed: {
        sections() {
            return this.$store.getters['items']
        },

        angle() {
            return this.$store.getters['angle']
        },

        winner() {
            return this.$store.getters['winner']
        },
    },

    mounted() {
        this.$store.commit('setCanvas', this.$refs.canvas)
        this.repaint()
    },

    methods: {
        repaint() {
            this.$store.commit('repaint', {
                angle: this.angle,
                canvas: this.$refs.canvas,
                colors: this.colors,
            })
        },
    },
}
</script>

<style lang="sass" scoped>
// .wheel
//     height: 400px
//     width: 400px
</style>
