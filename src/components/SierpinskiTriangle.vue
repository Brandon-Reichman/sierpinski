<template>
    <div class="wrapper">
        <div>
        <form class="param-form" @submit.prevent="" @change="handleChange">
            <input type="range" min="0" max="5000" v-model="delay" />
            <input type="number" v-model="delay" />
            <label> Speed (ms / dot)</label>
            <span class="form-space"></span>
            <input type="range" min="0" max="10" v-model="size" />
            <input type="number" v-model="size" />
            <label> {{ size }} Dot Size (px)</label>
        </form>
        <canvas style="border:solid 1px blue;" id="triangle" width="1200" height="1200"></canvas>
        </div>
        <div>
            <button @click="clearCanvas" class="button">Clear</button>
        </div>
        <div>
            <button @click="buttonClick('stop')" class="button stop-button">Stop</button>
            <button @click="buttonClick('start')" class="button start-button">Start</button>
        </div>
    </div>
</template>

<script>
import sierpinski from "@/service/sierpinski";

export default {
    name: "SierpinskiTriangle",
    mixins: [sierpinski],
    computed: {
        canvas() {
            return document.querySelector("#triangle");
        },
        ctx() {
            return this.canvas.getContext("2d");
        }
    },
    methods: {
        handleChange() {
            sierpinski.delay = this.delay;
            sierpinski.size = this.size;
        },
        async buttonClick(type) {
            switch(type)
            {
                case 'stop':
                    sierpinski.stop = true;
                    break;
                case 'start':
                    if(sierpinski.lastPoint === null) {
                        sierpinski.drawPoint(this.ctx);
                    }
                    sierpinski.stop = false;
                    await sierpinski.drawMidPoint(this.ctx, sierpinski.lastPoint);
            }
        },
        clearCanvas(){
            window.location.href = '/';
        },
    },
    async mounted() {
        sierpinski.drawTriangle(this.ctx, this.canvas.width/2, this.canvas.height/2);
    },
    data() {
        return {
            delay: sierpinski.delay,
            size: sierpinski.size,
        }
    }
}
</script>

<style scoped>
    .button{
        border:none;
        margin:1em;
        width:100%;
        max-width:550px;
    }
    .start-button{
        background-color: #41d541;
    }
    .stop-button{
        background-color: #e1485b;
    }
    .form-space{
        margin-inline:2em;
    }
    .param-form{
        margin-block:2em;
    }
</style>