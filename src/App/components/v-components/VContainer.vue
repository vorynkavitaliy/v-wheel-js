<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'v-container',
}
</script>

<style lang="sass" scoped>
.container
    max-width: 1440px
    margin: auto
    +method(width, $msd: 90%, $lmd: 80%, $ld: 75%)
</style>
