function init() {
    var audioContext;
    var microphone;
    //console.log(document.querySelector("#bowlID").style.padding);
    var canvas = document.getElementById('canvas');
    var canvasCtx = canvas.getContext('2d');
    //var bowl = document.getElementById('bowl');
    //var bowlCtx = bowl.getElementById('2d');

    var analyser;
    //var gainNode = audioContext.createGain();
    //gainNode.gain.value = 20;
    


    document.getElementById("displayText").innerHTML = "Analyzing background noise...";

    try
    {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
    }
    catch (e)
    {
        return;
    }

    //

    const opts = { audio: true, video: false };
    var bLength, dataArray;
    navigator.mediaDevices
    .getUserMedia(opts)
    .then(function(_stream) {
        stream = _stream;
    
        microphone = audioContext.createMediaStreamSource(stream);
        
        analyser = audioContext.createAnalyser();
        microphone.connect(analyser);
        bLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bLength);
        beginRecording();

    });
    
/*
    if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        var constraints = { audio: true }
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyser);
                analyser.connect(gainNode);
                //analyser.connect(audioContext.destination);
                //gainNode.connect(audioContext.destination);
                beginRecording();
            })
            .catch(function(err) {
                console.error('error: ' + err);
            })
    } else {
        console.error('getUserMedia unsupported by browser');
    }
*/
    function beginRecording() {
        analyser.fftSize = 1024; // power of 2, between 32 and max unsigned integer
        var bufferLength = analyser.fftSize;
        var freqBinDataArray = new Uint8Array(bufferLength);
        var time = 30;
        
        var meanValue = 0;
        var freqValue = 0;
        var checkAudio = function() {
            try {
                analyser.getByteFrequencyData(freqBinDataArray);
            


                //document.getElementById("vol").innerHTML = 'Volume: ' + getRMS(freqBinDataArray);
                //document.getElementById("freq").innerHTML = 'Freq Bin: ' + getIndexOfMax(freqBinDataArray);
                //console.log(freqBinDataArray);
                meanValue = getRMS(freqBinDataArray);
                freqValue = getIndexOfMax(freqBinDataArray);
            }
            catch(e) {
                console.log("Recipe generated!")
                
            }            
        }

        setInterval(checkAudio, 64);
        
        

        var timer = setInterval(function(){
            if(time <= 0) {
                clearInterval(timer);
                analyser = null;
                audioContext = null;
                microphone = null;
            }

            if(time  == 25) {
                //console.log("At 5s, " + meanValue)
                document.getElementById("displayText").innerText = "You may start humming! ^_^"
                selectGreen(meanValue);
            }
            else if(time == 20) {
                // check amplitude
                //console.log("At 10s, " + meanValue)
                selectProtein(meanValue);
            }
            else if(time == 15) {
               // console.log("At 15s, " + meanValue)
                selectTopping(meanValue);
            }
            else if(time == 10) {
                //console.log("At 15s, " + meanValue)
                selectTopping(meanValue);
            }
            else if(time == 5) {
                //console.log("At 15s, " + meanValue)
                selectTopping(meanValue);
            }
            
            else if(time == 1) {
                //console.log("At 30s, " + meanValue)
                selectDressing(freq);
            }
        
            document.getElementById("time").innerHTML = (30 - time);
            time -= 1; 
        }, 1000);

    }

    
    
    canvasCtx.clearRect(0, 0, 250, 250);
    
   
    function draw() {
        
        var drawVisual = requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);
        
        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, 250, 250);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
        canvasCtx.beginPath();

        var sliceWidth = 250 * 1.0 / bLength;
        var x = 0;

        

        for(var i = 0; i < bLength; i++) {
            var v = dataArray[i] / 128.0;
            var y = v * 250/2;

            if (i == 0) {
                canvasCtx.moveTo(x, y);
            }
            else {
                canvasCtx.lineTo(x, y);
            }

            x+= sliceWidth;
            
        }
        canvasCtx.lineTo(canvas.width, canvas.height/2);
        canvasCtx.stroke();
        
       if (bowl.getContext) {
        var ctx = bowl.getContext('2d');
        bowl.width = window.innerWidth-30;
        bowl.height = window.innerHeight;
       
        
        ctx.fillStyle = '#A8CCD7';
        ctx.lineWidth = 10;
        ctx.strokeStyle = 'black';
        //ctx.fillStyle = "#F6FEFF";
        ctx.beginPath();
        ctx.ellipse(bowl.width/2, 2*bowl.height/3, 100, 90, Math.PI * 2, 0, Math.PI);
        ctx.closePath();
        ctx.fill();
        
      }
    };
   
    
}

function getRMS(spectrum) {
    var rms = 0;
    for (var i = 0; i < spectrum.length; i++) {
        rms += spectrum[i] * spectrum[i];
    }
    rms /= spectrum.length;
    rms = Math.sqrt(rms);
    return rms;
}

function getIndexOfMax(array) {
    return array.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
}

function mean(array) {
    var avg = 0;
    for(var i = 0; i < array.length; i++) {
        avg += array[i];
    }
    return(avg/array.legnth);
}

function mode(array) {

}

function median(array) {
    
    return( array[array.length/2] + array[1 + (array.length/2)] )

}
