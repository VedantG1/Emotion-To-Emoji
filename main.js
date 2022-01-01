var prediction1 = ""
var prediction2 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
})

var camera = document.getElementById("camera")

Webcam.attach("#camera")

function takeSnap() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='capturedImg' src='" + data_uri + "'/>"
    })
}
console.log("ml5 version:", ml5.version)

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/hvPeTWn_S/model.json", modelLoaded)

function modelLoaded() {
    console.log("Model Loaded!")
}

function speak() {
    var synth = window.speechSynthesis
    var speakData1 = "The first prediction is " + prediction1
    var speakData2 = "And the second prediction is " + prediction2
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2)
    synth.speak(utterThis)
}
function check() {
    img = document.getElementById("capturedImg")
    classifier.classify(img, gotResult)
}
function gotResult(error, results) {
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        document.getElementById("result1").innerHTML = results[0].label
        document.getElementById("result2").innerHTML = results[1].label
        prediction1 = results[0].label
        prediction2 = results[1].label
        speak()
        if(prediction1 == "Happy"){
            document.getElementById("emoji1").innerHTML = "&#128522;"
        }
        else if(prediction1 == "Sad"){
            document.getElementById("emoji1").innerHTML = "&#128532;"
        }
        else{
            document.getElementById("emoji1").innerHTML = "&#128548;"
        }
        if(prediction2 == "Happy"){
            document.getElementById("emoji2").innerHTML = "&#128522;"
        }
        else if(prediction2 == "Sad"){
            document.getElementById("emoji2").innerHTML = "&#128532;"
        }
        else{
            document.getElementById("emoji2").innerHTML = "&#128548;"
        }
    }
}