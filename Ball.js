class Ball {
    constructor (x, y, speed, direction, radius, hit_callback, death_callback) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = radius;
        this.hit_callback = hit_callback
        this.death_callback = death_callback;
        this.color = 255;

        let dirlen = Math.sqrt(direction[0] * direction[0] + direction[1] * direction[1]);
        this.direction = [direction[0] / dirlen, direction[1] / dirlen];
    }

    draw() {
        fill(this.color);
        stroke(0);
        circle(this.x, this.y, 2 * this.radius);
    }

    physics() {
        this.x += this.speed * this.direction[0] * deltaTime / 1000;
        this.y += this.speed * this.direction[1] * deltaTime / 1000;

        // collision with the left wall
        if (this.x + this.radius > width) {
            this.death_callback();
        }

        // collision with the right wall
        if (this.x - this.radius < 0) {
            this.death_callback();
        }

        // collision with the floor
        if (this.y + this.radius > height) {
            this.death_callback;
        }

        // collision with the ceiling
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.direction[1] *= -1;
            this.hit_callback();
        }
    }

    update() {
        this.physics();
        this.draw();
    }
}