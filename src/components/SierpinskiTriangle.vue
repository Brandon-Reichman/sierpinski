<template>
    <div class="wrapper">
        <form @submit.prevent="" @change="handleChange">
            <input type="number" v-model="delay" />
            <label>ms / dot</label>
        </form>
        <canvas style="border:solid 1px blue;" id="triangle" width="1200" height="1200"></canvas>
    </div>
    <div>
        <button @click="buttonClick('stop')" class="button stop-button">Stop</button>
        <button @click="buttonClick('start')" class="button start-button">Start</button>
    </div>
</template>

<script>
import sierpinski from "@/service/sierpinski";

export default {
    name: "SierpinskiTriangle",
    mixins: [sierpinski],
    methods: {
        handleChange() {
            sierpinski.delay = this.delay;
        },
        async buttonClick(type) {
            let canvas = document.querySelector("#triangle");
            let ctx = canvas.getContext("2d");
            switch(type)
            {
                case 'stop':
                    sierpinski.stop = true;
                    break;
                case 'start':
                    if(sierpinski.lastPoint === null) {
                        sierpinski.drawPoint(ctx);
                    }
                    sierpinski.stop = false;
                    await sierpinski.drawMidPoint(ctx, sierpinski.lastPoint);
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
        }
    }
}
</script>

<style scoped>
    .button{
        border:none;
        width:25%;
        margin:1em;
    }
    .start-button{
        background-color: #41d541;
    }
    .stop-button{
        background-color: #e1485b;
    }
</style>