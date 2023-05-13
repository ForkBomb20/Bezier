let t;
let slider;
let toggleEdit, toggleRays, playButton;
let rays,
    play = false;
let edit = true;
let points = [];
let vertices = [];
let bezierVertices;
let play_t = 0;

function setup() {
    createCanvas(1500, 800);
    background(80);

    slider = createSlider(0, 1, 0, 0.001);
    slider.style("width", "1475px");
    slider.position(10, 10);
    slider.mousePressed(() => (edit = false));

    toggleEdit = createButton("Edit Mode");
    toggleRays = createButton("Toggle Rays");
    playButton = createButton("Play");

    toggleEdit.mousePressed(editPressed);
    toggleRays.mousePressed(raysPressed);
    playButton.mousePressed(playPressed);

    toggleEdit.position(10, 35);
    toggleRays.position(10, 60);
    playButton.position(10, 85);
}

const lerp = (p0, p1, t) => {
    let x = p0.pos.x + t * (p1.pos.x - p0.pos.x);
    let y = p0.pos.y + t * (p1.pos.y - p0.pos.y);
    let pos = new Point(createVector(x, y));
    return pos;
};

const bezierConnect = (verts, t) => {
    if (verts.length == 0 || verts.length == 1) {
        return verts;
    }
    let points = [];
    for (let i = 0; i < verts.length - 1; i++) {
        points.push(lerp(verts[i], verts[i + 1], t));
    }
    return [...verts, 0, ...bezierConnect(points, t)];
};

const editPressed = () => {
    edit = !edit;
};

const raysPressed = () => {
    rays = !rays;
    edit = false;
};

const playPressed = () => {
    play = !play;
    edit = false;
    play_t = 0;
    slider_t = 0;
    play ? playButton.html("Reset") : playButton.html("Play");
};

function mouseClicked() {
    if (edit) vertices.push(new Point(createVector(mouseX, mouseY)));
    edit = true;
}

function draw() {
    background(80);
    slider_t = slider.value();
    for (let v of vertices) {
        v.show();
    }
    if (!play) {
        if (vertices.length > 1) {
            let path = [];
            for (let t = 0; t <= slider_t; t += 0.001) {
                bezierVertices = bezierConnect(vertices, t);
                path.push(bezierVertices[bezierVertices.length - 1]);
            }

            beginShape();
            noFill();
            stroke(255, 255, 255);
            strokeWeight(2);
            for (let point of path) {
                vertex(point.pos.x, point.pos.y);
            }
            endShape();

            if (rays) {
                bezierVertices = bezierConnect(vertices, slider_t);
                for (let i = 0; i < bezierVertices.length - 1; i++) {
                    if (bezierVertices[i + 1] == 0) {
                        i += 1;
                    } else {
                        push();
                        stroke(130, 130, 130);
                        strokeWeight(1);
                        line(
                            bezierVertices[i].pos.x,
                            bezierVertices[i].pos.y,
                            bezierVertices[i + 1].pos.x,
                            bezierVertices[i + 1].pos.y
                        );
                        strokeWeight(5);
                        point(bezierVertices[i].pos);
                        point(bezierVertices[i + 1].pos);
                        pop();
                    }
                }
            }

            bezierVertices[bezierVertices.length - 1].show();
        }
    } else {
        if (vertices.length > 1) {
            let path = [];
            for (let t = 0; t <= play_t; t += 0.001) {
                bezierVertices = bezierConnect(vertices, t);
                path.push(bezierVertices[bezierVertices.length - 1]);
            }

            beginShape();
            noFill();
            stroke(255, 255, 255);
            strokeWeight(2);
            for (let point of path) {
                vertex(point.pos.x, point.pos.y);
            }
            endShape();

            if (rays) {
                bezierVertices = bezierConnect(vertices, play_t);
                for (let i = 0; i < bezierVertices.length - 1; i++) {
                    if (bezierVertices[i + 1] == 0) {
                        i += 1;
                    } else {
                        push();
                        stroke(130, 130, 130);
                        strokeWeight(1);
                        line(
                            bezierVertices[i].pos.x,
                            bezierVertices[i].pos.y,
                            bezierVertices[i + 1].pos.x,
                            bezierVertices[i + 1].pos.y
                        );
                        strokeWeight(5);
                        point(bezierVertices[i].pos);
                        point(bezierVertices[i + 1].pos);
                        pop();
                    }
                }
            }

            bezierVertices[bezierVertices.length - 1].show();
            if (play_t < 1) {
                play_t += 0.005;
            }
        }
    }
}
