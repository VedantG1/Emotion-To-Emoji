var prediction1 = ""
var prediction2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
})

var camera = document.getElementById("camera")

Webcam.attach("#camera")

function takeSnap(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='capturedImg' src='"+data_uri+"'/>"
    })
}
console.log("ml5 version:", ml5.version)

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/hvPeTWn_S/model.json", modelLoaded)

function modelLoaded(){
    console.log("Model Loaded!")
}

function speak(){
    var synth = wundow.speechSynthesis
    var speakData1 = "The first prediction is " + prediction1
    var speakData2 = "And the second prediction is " + prediction2
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2)
    synth.speak(utterThis)
}