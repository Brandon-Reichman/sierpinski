let side = 1000;
let h = side * (Math.sqrt(3)/2);

let delay = 25;
let stop = true;
let lastPoint = null;

const coordinates = {
	a: { x: 0, y: - h / 2 },
	b: { x: -side / 2, y: h / 2 },
	c: { x: side / 2, y: h / 2 },
};

const sierpinski = {
	drawTriangle(ctx, cx, cy) {
		ctx.strokeStyle = "#ff0000";

		ctx.save();
		ctx.translate(cx, cy);

		ctx.moveTo(coordinates.a.x, coordinates.a.y);
		ctx.lineTo(coordinates.b.x, coordinates.b.y);
		ctx.lineTo(coordinates.c.x, coordinates.c.y);
		ctx.lineTo(coordinates.a.x, coordinates.a.y);

		ctx.stroke();

		ctx.closePath();
		ctx.save();
	},
	drawPoint (ctx) {
		let newPoint = this.getNewPoint();
		ctx.fillRect(newPoint.x, newPoint.y,3,3);
		this.lastPoint = newPoint;
	},
	async drawMidPoint(ctx, point) {
		let randC = this.getRandomCoordinate();
		let newPoint = {
			x: (randC.x + point.x) / 2,
			y: (randC.y + point.y) / 2,
		}
		if(!this.stop){
			ctx.fillRect(newPoint.x, newPoint.y, 3, 3);
			this.lastPoint = newPoint;
			await this.sleep();
			await this.drawMidPoint(ctx, newPoint);
		} else {
			return newPoint;
		}
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
	sleep(ms = this.delay) {
		return new Promise(resolve => setTimeout(resolve, ms));
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
	coordinates,
	delay,
	stop,
	lastPoint,
}

export default sierpinski;