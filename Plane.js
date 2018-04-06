class Plane extends p5.Vector {
    constructor(color) {
        super(width * random(0.3, 0.7), 0)
        this.color = color
        this.vel = new p5.Vector(0, 0)
        this.acc = new p5.Vector(0, 0)
        this.width = 10
        this.height = 15
        this.maxSpeed = 3
        this.nDotsForLine = 60
        this.target = new PlaneTarget()
        this.prevLocations = []
        this.vertices = [
            [0, this.width * -0.5],
            [this.height, 0],
            [0, this.width * 0.5],
        ]

        for (let i = 0; i < this.nDotsForLine; i++) {
            this.prevLocations.push(0)
        }
    }

    addForce(f) {
        this.acc.add(f)
    }

    update() {
        this.target.update()

        let steer = new p5.Vector(0, this.target.y - this.y)
        steer.mult(0.01)
        this.addForce(steer)

        this.vel.add(this.acc)
        this.vel.limit(6)
        this.add(this.vel)
        this.acc.mult(0)

        this.prevLocations.push(this.y)
        if (this.prevLocations.length > this.nDotsForLine) {
            this.prevLocations.shift()
        }
    }

    draw() {
        strokeWeight(2)
        stroke(this.color, 100, 100)
        noFill()

        // offset to fix the last segment visually
        let lineOffset = this.prevLocations[this.nDotsForLine - 2] - this.y

        for (let i = 1; i < this.nDotsForLine; i++) {
            let x1 = (i - 1) * (this.x / this.nDotsForLine)
            let y1 = this.prevLocations[i - 1] + lineOffset
            let x2 = i * (this.x / this.nDotsForLine)
            let y2 = this.prevLocations[i] + lineOffset


            line(x1, y1, x2, y2)

            if (i == this.nDotsForLine - 1) {
                line(x2, y2, this.x, this.y)
            }
        }

        push()
        noStroke()
        fill(this.color, 100, 100)
        translate(this.x, this.y)
        rotate(PI + Math.atan2(this.prevLocations[this.nDotsForLine - 2] - this.y, -5))
        triangle(this.vertices[0][0], this.vertices[0][1], this.vertices[1][0], this.vertices[1][1], this.vertices[2][0], this.vertices[2][1])
        pop()

        strokeWeight(2)
        ellipse(this.x, this.y, 5)
    }
}
