<template>
    <div class="wrapper">
        <h2 v-if="!insideTriangle" style="color:red;">Please chose a point inside of the triangle</h2>
        <canvas style="border:solid 1px blue;" @click="clickTriangle" id="triangle" width="1200" height="1200"></canvas>
    </div>
</template>

<script>
import sierpinski from "@/service/sierpinski";

export default {
    name: "SierpinskiTriangle",
    mixins: [sierpinski],
    methods: {
        async clickTriangle(e) {
            if(this.insideTriangle === false ){
                this.clicked = true;
                let canvas = document.querySelector("#triangle");
                let ctx = canvas.getContext("2d");
                let rect = canvas.getBoundingClientRect();
                let position = {
                    x: e.clientX - rect.left - (canvas.width / 2),
                    y: e.clientY - rect.bottom + (canvas.height / 2),
                }
                if(sierpinski.checkPoint(position)){
                    this.insideTriangle = true;
                    ctx.fillRect(position.x, position.y,3,3);
                    await sierpinski.drawMidPoint(ctx, position);
                } else {
                    this.insideTriangle = false;
                }
            }
        },
    },
    async mounted() {
        let canvas = document.querySelector("#triangle");
        let ctx = canvas.getContext("2d");
        sierpinski.drawTriangle(ctx, canvas.width/2, canvas.height/2);
    },
    data() {
        return {
            delay: sierpinski.delay,
            insideTriangle: false,
        }
    }
}
</script>

<style scoped>

</style>