class Game {
    constructor() {
        createCanvas(window.innerWidth, window.innerHeight)
        colorMode(HSB)

        this.stats = new Stats()
        this.nPlanes = 3
        this.planes = []

        for (let i = 0; i < this.nPlanes; i++) {
            let plane = new Plane(i * (360 / this.nPlanes))
            this.planes.push(plane)
        }

        this.initGui()
    }

    initGui() {
        document.body.appendChild(this.stats.dom)

        this.nPlaneSlider = createSlider(1, 15, this.nPlanes, 1)
        this.nPlaneSlider.position(width - 150, 20)
        this.nPlaneSlider.changed(() => {
            this.setPlaneQuantity(this.nPlaneSlider.value())
        })
    }

    setPlaneQuantity(n) {
        if (n > this.nPlanes) {
            for (let i = 0; i < n - this.nPlanes; i++) {
                let plane = new Plane(1)
                this.planes.push(plane)
            }
        } else {
            for (let i = 0; i < this.nPlanes - n; i++) {
                this.planes.pop()
            }
        }

        this.nPlanes = n

        for (let i = 0; i < this.nPlanes; i++) {
            this.planes[i].color = i * (255 / this.nPlanes)
        }
    }

    draw() {
        background(10)

        translate(0, height * 0.5)
        for (let i = 0; i < this.nPlanes; i++) {
            this.planes[i].update()
            this.planes[i].draw()
        }

        this.stats.update()
    }
}
