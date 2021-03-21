<template>
    <header>
        <v-container>
            <v-layout flex between acenter>
                <span class="logo"> Logo </span>

                <nav>
                    <ul class="flex-container space-between align-center">
                        <li v-for="item of 3" :key="item" class="ml-3">Link {{ item }}</li>
                    </ul>
                </nav>
            </v-layout>
        </v-container>
    </header>
</template>

<script>
export default {
    name: 'Header',
}
</script>

<style></style>
