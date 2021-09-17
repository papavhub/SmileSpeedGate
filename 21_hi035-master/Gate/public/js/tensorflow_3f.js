var temperature;
let floor = "3";

function getData(id, prediction) {
    let idContainer = $('#label-container');
    let tem = $('.temperature');

    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "https://127.0.0.1:3000/temp/" + floor,
        contentType: "application/json",
        success: function(jd){
            let item = jd;
            tem.html(`${item.TEMPERATURE}`);
            temperature = item.TEMPERATURE;
            //console.log("1F : " + item.TEMPERATURE);
        },
        error: function(request, status, error){
            console.log("DB ajax temperature get Error: " + error);
        }
    });
    
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "https://127.0.0.1:3000/user/" + id,
        contentType: "application/json",
        success: function(jd){
            let item = jd;
            idContainer.html(`${item.EMP_NAME}<br>${prediction}%`);
            //console.log(item.EMP_NAME, prediction);
        },
        error: function(request, status, error){
            console.log("DB ajax get Error: " + error);
        }
    })
}

function postDB(id, gate_num, temperature){
    $.ajax({
        type: "POST",
        dataType: "JSON",
        url: "https://127.0.0.1:3000/post/" + id + "/" + gate_num + "/" + temperature,
        contentType: "application/json",
        success: function(jd){
            console.log("post success");
        },
        error: function(request, status, error){
            console.log("DB ajax post Error: " + error);
        }
    })
}

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
//const URL = "./my_model/";
const URL = "https://teachablemachine.withgoogle.com/models/Y_ncV5wTw/";

let model, webcam, labelContainer, maxPredictions, cnt = 0;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(432, 432, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    labelContainer.appendChild(document.createElement("div"));
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    let max = 0, maxno = 0;
    const failMessage = "FACE ID <br> 인식 실패"
    var date = new Date();
    $(".description h1").html(failMessage);

    for (let i = 0; i < maxPredictions; i++) {
        if(max < prediction[i].probability){
            max = prediction[i].probability;
            maxno = i;
        }
        const classPrediction = prediction[i].className + " : " + prediction[i].probability.toFixed(2);
        //console.log(classPrediction); // 인식 값 콘솔 출력
    }
    
    if(prediction[maxno].probability >= 0.95){
        // const classPrediction = prediction[maxno].className + "<br>" + prediction[maxno].probability.toFixed(2) * 100 + "%";
        // labelContainer.innerHTML = classPrediction;
        getData(maxno, prediction[maxno].probability.toFixed(2) * 100);
        document.body.style.backgroundColor = "#27ae60";        
        $("#label-container").show();
        $(".description").hide();
        $(".date").show();
        $(".temperature").show();
        $(".date").text(date);
        cnt++;
        console.log(temperature);
        if(cnt >= 30){
            location.reload();
            postDB(maxno, floor, temperature);
            cnt = 0;
        }
    } else{
        $(".date").hide();
        $(".temperature").hide();
        $("#label-container").hide();
        $(".description").show();
        $(".description").css("padding","8vh 0 0 0");
        document.body.style.backgroundColor = "#e74c3c";

        $(".contents").click(function () {
            console.log("clicked");
            location.reload();
        })
    }
}

$(document).ready( function () {
    init();
});