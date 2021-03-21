<template>
    <div
        v-if="flex === true"
        class="flex-container"
        :class="[
            between && 'space-between',
            around && 'space-around',
            jcenter && 'space-center',
            acenter && 'align-center',
        ]"
    >
        <slot></slot>
    </div>

    <div
        v-else-if="grid === true"
        class="grid-container"
        :class="[
            xd && `cols-xd-${xd}`,
            sd && `cols-sd-${sd}`,
            msd && `cols-msd-${msd}`,
            md && `cols-md-${md}`,
            lmd && `cols-lmd-${lmd}`,
            ld && `cols-ld-${ld}`,
            lmd && `cols-lmd-${lmd}`,
            xld && `cols-xld-${xld}`,
        ]"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VLayout',
    props: {
        flex: {
            type: Boolean,
            default: false,
        },

        between: {
            type: Boolean,
            default: false,
        },

        around: {
            type: Boolean,
            default: false,
        },

        jcenter: {
            type: Boolean,
            default: false,
        },

        acenter: {
            type: Boolean,
            default: false,
        },

        grid: {
            type: Boolean,
            default: false,
        },

        xd: {
            type: String,
            default: '',
        },
        sd: {
            type: String,
            default: '',
        },
        msd: {
            type: String,
            default: '',
        },
        md: {
            type: String,
            default: '',
        },
        lmd: {
            type: String,
            default: '',
        },
        ld: {
            type: String,
            default: '',
        },
        mld: {
            type: String,
            default: '',
        },
        xld: {
            type: String,
            default: '',
        },
    },
}
</script>
