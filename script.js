/**
 * example arena code here: https://github.com/SFPC/code-societies/blob/master/index.html
 * and here: https://github.com/DigitalLoveLanguages/digitallovelanguages.github.io/blob/master/script.js
 */



$(document).ready(function() {
    console.log("ready!");
    const axiosArena = axios.create({
        baseURL: "https://api.are.na/v2/",
    });

    axiosArena.defaults.headers.Authorization = 'Bearer ---';
    axiosArena.get("channels/looks-cybernetics-of-sex-plt4fxfg0o8?per=100").then(response => {
        console.log(response);

    });


});




// -------------------------------
class Circle {
    constructor() {
        this.x = randomRange(50, 950);
        this.y = randomRange(50, 450);
        this.r = randomRange(10, 30);
        this.lines = [];
        this.animatedpaths = [];
        this.text = "content";
    }

    drawCircle() {
        let circle = draw.circle(this.r * 2).move(this.x - this.r, this.y - this.r).fill('#394DF1');
        circle.on("click", function() {
            if (!displaying) {
                displaying = true;
                let n = randomRange(0, allCircles.length - 1)
                document.querySelector("#info").innerHTML = "<h2>title</h2> <p> " + allCircles[n].text + "</p>";
                unfade(document.querySelector("#info"));
            } else {
                displaying = false;
                fade(document.querySelector("#info"));
            }
        });
    }

    createLines() {
        if (allCircles.length > 0) {

            for (let c in allCircles) {
                let circle = allCircles[c];

                let dist = distance(this.x, this.y, circle.x, circle.y);
                if (dist > 50 && dist < 150) {
                    let pathvals = createPath(this.x, this.y, circle.x, circle.y);
                    let pathstring = makePathString(pathvals);
                    let path = draw.path(pathstring);
                    path.fill("none");
                    path.stroke({ color: '#394DF1', width: 2, linecap: 'round', linejoin: 'round' });

                    let animatedpathvals = createPath(this.x, this.y, circle.x, circle.y);

                    this.lines.push(path);
                    circle.lines.push(path);
                    this.animatedpaths.push(animatedpathvals);
                    circle.animatedpaths.push(animatedpathvals);
                }
            }

        }
    }

}

let draw = SVG().addTo('#drawing').viewbox(0, 0, 1000, 500)

let drawing = document.getElementById('drawing');

let allCircles = [];
let displaying = false;

for (let i = 0; i < randomRange(20, 30); i++) {
    c = new Circle();
    c.drawCircle();
    c.createLines();
    allCircles.push(c);
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function distance(aX, aY, bX, bY) {
    return Math.sqrt(Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2));
}

function createPath(c1x, c1y, c2x, c2y) {
    let path = [
        [c1x, c1y],
        [c1x + ((c2x - c1x) * (1 / 5)) + randomRange(-10, 10), c1y + ((c2y - c1y) * (1 / 5)) + randomRange(-10, 10)],
        [c1x + ((c2x - c1x) * (2 / 5)) + randomRange(-10, 10), c1y + ((c2y - c1y) * (2 / 5)) + randomRange(-10, 10)],
        [c1x + ((c2x - c1x) * (3 / 5)) + randomRange(-10, 10), c1y + ((c2y - c1y) * (3 / 5)) + randomRange(-10, 10)],
        [c1x + ((c2x - c1x) * (4 / 5)) + randomRange(-10, 10), c1y + ((c2y - c1y) * (4 / 5)) + randomRange(-10, 10)],
        [c2x, c2y]
    ];

    return path;
}

function makePathString(vals) {
    str = "M " + vals[0][0] + " " + vals[0][1] + " C " + vals[1][0] + " " + vals[1][1] + ", " + vals[2][0] + " " + vals[2][1] + ", " + vals[3][0] + " " + vals[3][1] +
        " S " + vals[4][0] + " " + vals[4][1] + ", " + vals[5][0] + " " + vals[5][1];
    return str;
}

function animateLines(event) {
    //track mousePos
    let mouseX = event.pageX;
    let mouseY = event.pageY;

    for (let circle of allCircles) {

        let dist = distance(mouseX, mouseY, circle.x, circle.y)

        if (dist < circle.r + 10) {
            console.log(circle.animatedpaths);
            for (let p in circle.lines) {
                circle.lines[p].animate(randomRange(1000, 2000))
                    .ease("<>")
                    .plot(makePathString(circle.animatedpaths[p]))
                    .loop(true, true);
            }
        } else {
            for (let p in circle.lines) {
                circle.lines[p].timeline().pause()
            }
        }

    }

}

drawing.addEventListener('mousemove', animateLines, false);

function fade(element) {
    var op = 1; // initial opacity
    var timer = setInterval(function() {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function unfade(element) {
    var op = 0.1; // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function() {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}