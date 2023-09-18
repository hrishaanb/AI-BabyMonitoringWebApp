img = "";
status = "";
objects = [];
objectDetected = "";
alarm = "";
function preload() {
    //img = loadImage("Bg.webp");
    alarm = loadSound("Alarm.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    //video = createCapture(VIDEO);
    //video.size(380, 380);
    //video.hide();
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = "True";
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    //image(img, 0, 0, 380, 380);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetected.detect(img, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + ", " + percent + "%", objects[i].x + 10, objects[i].y + 20);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            fill(r, g, b);
            if (objects[i].label == "Person") {
                document.getElementById("baby_found").innerHTML = "Baby is detected";
                alarm.stop();
            }
            else if (objects[i].label != "Person") {
                document.getElementById("baby_found").innerHTML = "Baby is not detected";
                alarm.play();
            }
            else if (objects.length<0) {
                document.getElementById("baby_found").innerHTML = "Baby is not detected";
                alarm.play();
            }
        }
    }
}