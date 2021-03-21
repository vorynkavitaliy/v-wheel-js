<template>
    <span v-if="tag === 'span'" class="btn" :class="color && `btn-${primary}`" @click="handleClick">
        <slot></slot>
    </span>
    <a v-else-if="tag === 'a'" class="btn" :class="color && `btn-${primary}`" @click="handleClick">
        <slot></slot>
    </a>

    <button
        v-else
        class="btn"
        :class="[color, disable && 'info']"
        @click="handleClick"
        :disabled="disable"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        tag: {
            type: String,
            default: 'button',
        },
        color: {
            type: String,
            default: 'primary',
        },

        disable: {
            type: Boolean,
            default: false,
        },

        click: Function,
    },

    methods: {
        handleClick() {
            this.$emit('click')
        },
    },
}
</script>

<style lang="sass" scoped>
.btn
    display: block
    width: 100%
    padding: rem(6px, $dw-ld) rem(10px, $dw-ld)
    font-size: rem(20px, $dw-ld)
    border-radius: rem(6px, $dw-ld)
    text-transform: uppercase
    color: #fff

    &.primary
        background-color: $primary

    &.warning
        background-color: $warning

    &.success
        background-color: $success

    &.danger
        background-color: $danger

    &.info
        background-color: $info
</style>
