<template>
    <div id="app">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <SierpinskiTriangle />
    </div>
</template>

<script>
import SierpinskiTriangle from "@/components/SierpinskiTriangle";

export default {
    name: 'App',
    components: {
        SierpinskiTriangle,
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
