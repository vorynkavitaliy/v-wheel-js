<template>
    <div
        :class="[
            xxd && `col-${xxd}`,
            xd && `col-xd-${xd}`,
            sd && `col-sd-${sd}`,
            msd && `col-msd-${msd}`,
            md && `col-md-${md}`,
            lmd && `col-lmd-${lmd}`,
            ld && `col-ld-${ld}`,
            lmd && `col-lmd-${lmd}`,
            xld && `col-xld-${xld}`,
        ]"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        xxd: {
            type: String,
            default: '12',
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

<style></style>
