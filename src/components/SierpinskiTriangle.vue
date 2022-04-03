<template>
    <div class="wrapper">
        <canvas id="triangle" width="1200" height="1200"></canvas>
    </div>
</template>

<script>
export default {
    name: "SierpinskiTriangle",
    computed: {
        coordinates() {
            let side = 1000;

            let h = side * (Math.sqrt(3)/2);

            return {
                a: { x: 0, y: - h / 2 },
                b: { x: -side / 2, y: h / 2 },
                c: { x: side / 2, y: h / 2 },
            }
        },
    },
    methods: {
        drawTriangle(ctx, cx, cy) {

            ctx.strokeStyle = "#ff0000";

            ctx.save();
            ctx.translate(cx, cy);

            ctx.moveTo(this.coordinates.a.x, this.coordinates.a.y);
            ctx.lineTo( this.coordinates.b.x, this.coordinates.b.y);
            ctx.lineTo(this.coordinates.c.x, this.coordinates.c.y);
            ctx.lineTo(this.coordinates.a.x, this.coordinates.a.y);

            ctx.stroke();

            ctx.closePath();
            ctx.save();
        },
        getNewPoint() {
            let r1 = Math.random();
            let r2 = Math.random();
            let point = {
                x: (1 - Math.sqrt(r1)) * this.coordinates.a.x + (Math.sqrt(r1) * (1 - r2)) * this.coordinates.b.x + (Math.sqrt(r1) * r2) * this.coordinates.c.x,
                y: (1 - Math.sqrt(r1)) * this.coordinates.a.y + (Math.sqrt(r1) * (1 - r2)) * this.coordinates.b.y + (Math.sqrt(r1) * r2) * this.coordinates.c.y,
            }
            if(this.checkPoint(point)){
                return point;
            } else {
                return this.getNewPoint();
            }
        },
        checkPoint(checkPoint) {
            let A = this.triangleArea(this.coordinates.a, this.coordinates.b, this.coordinates.c);
            let A1 = this.triangleArea(checkPoint, this.coordinates.b, this.coordinates.c);
            let A2 = this.triangleArea(this.coordinates.a, checkPoint, this.coordinates.c);
            let A3 = this.triangleArea(this.coordinates.a, this.coordinates.b, checkPoint);

            return (A === A1 + A2 + A3);
        },
        triangleArea(a, b, c) {
            return Math.abs(
                (a.x * (b.y - c.y) +
                    b.x * (c.y - a.y) +
                    c.x * (a.y - b.y)) / 2
            );
        },
        drawPoint (ctx) {
            let newPoint = this.getNewPoint();
            ctx.fillRect(newPoint.x, newPoint.y,3,3);
            return newPoint;

        },
        async drawMidPoint(ctx, point) {
            let randC = this.getRandomCoordinate();
            let newPoint = {
                x: (randC.x + point.x) / 2,
                y: (randC.y + point.y) / 2,
            }
            ctx.fillRect(newPoint.x, newPoint.y, 3, 3);
            await this.sleep(25);
            await this.drawMidPoint(ctx, newPoint);
        },
        getRandomCoordinate() {
            let rand = Math.floor(Math.random() * 3);
            switch(rand)
            {
                case 0:
                    return this.coordinates.a;
                case 1:
                    return this.coordinates.b;
                case 2:
                    return this.coordinates.c;
            }
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    },
    async mounted() {
        let canvas = document.querySelector("#triangle");
        let ctx = canvas.getContext("2d");
        this.drawTriangle(ctx, canvas.width/2, canvas.height/2);
        let firstPoint = this.drawPoint(ctx);
        await this.sleep(25);
        await this.drawMidPoint(ctx, firstPoint);

    }
}
</script>

<style scoped>

</style>