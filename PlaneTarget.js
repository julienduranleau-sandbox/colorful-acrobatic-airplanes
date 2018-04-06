class PlaneTarget extends p5.Vector {
    constructor() {
        super(width * 0.9, 0)

        this.vel = new p5.Vector(0, 0)
        this.acc = new p5.Vector(0, 0)
        this.targetPos = new p5.Vector(this.x, 0)

        setInterval(() => this.changeLocation(), 1000)
        this.changeLocation()
    }

    addForce(f) {
        this.acc.add(f)
    }

    changeLocation() {
        this.targetPos.y = height * -0.1 + Math.random() * (height * 0.2)
    }

    update() {
        let force = new p5.Vector(0, this.targetPos.y - this.y)
        force.normalize()
        force.mult(0.1)
        this.addForce(force)

        this.vel.add(this.acc)
        this.vel.limit(3)
        this.add(this.vel)
        this.acc.mult(0)
    }

    draw() {
        push()
        translate(this.x, this.y)
        ellipse(0,0,5)
        pop()

        fill(255, 0, 0)
        push()
        translate(this.targetPos.x, this.targetPos.y)
        ellipse(0,0,5)
        pop()
    }
}
