function clamp(value, v_min, v_max) {
    return Math.min(v_max, Math.max(v_min, value));
}

function normalized(vec) {
    let veclen = Math.sqrt(vec.x ** 2 + vec.y ** 2);
    return {x: vec.x / veclen, y: vec.y / veclen};
}