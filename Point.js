class Point {
    constructor(pos) {
        this.pos = pos;
    }

    show(color = [255, 255, 255], size = 10) {
        let r, g, b;
        [r, g, b] = color;
        stroke(r, g, b);
        strokeWeight(size);
        point(this.pos);
    }
}
