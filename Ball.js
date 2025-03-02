class Ball {
    constructor (x, y, speed, direction, radius, hit_callback, death_callback) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = radius;
        this.hit_callback = hit_callback
        this.death_callback = death_callback;
        this.color = 255;
        this.direction = normalized(direction);
    }

    draw() {
        fill(this.color);
        stroke(0);
        circle(this.x, this.y, 2 * this.radius);
    }

    physics(paddle_x = width / 2, paddle_y = height - 75, paddle_width = 150) {
        let paddle_height = 26;

        this.x += this.speed * this.direction.x * deltaTime / 1000;
        this.y += this.speed * this.direction.y * deltaTime / 1000;

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
            this.direction.y *= -1;
            this.hit_callback(this);
        }

        // collision with the paddle
        if (
            (this.y - this.radius < (paddle_y + paddle_height / 2)) &&
            (this.y + this.radius > (paddle_y - paddle_height / 2)) &&
            (this.x + this.radius > (paddle_x - paddle_width / 2)) &&
            (this.x - this.radius < (paddle_x + paddle_width / 2))
        ) {
            let reflect_angle = Math.atan2(this.x - paddle_x, this.y - paddle_y) / 8 - Math.PI / 2;
            this.direction.x = Math.cos(reflect_angle);
            this.direction.y = Math.sin(reflect_angle);
            this.direction = normalized(this.direction);
            this.y = paddle_y - this.radius - paddle_height / 2;
        }
    }

    update(paddle_x, paddle_y, paddle_width) {
        this.physics(paddle_x, paddle_y, paddle_width);
        this.draw();
    }
}