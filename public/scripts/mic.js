function init() {
    var audioContext = new(window.AudioContext || window.webkitAudioContext)();
    var microphone;
    //console.log(document.querySelector("#bowlID").style.padding);
    var canvas = document.getElementById('canvas');
    var canvasCtx = canvas.getContext('2d');
    var bowl = document.getElementById('bowl');
    //var bowlCtx = bowl.getElementById('2d');

    var analyser = audioContext.createAnalyser();
    var gainNode = audioContext.createGain();
    gainNode.gain.value = 20;


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

    function beginRecording() {
        analyser.fftSize = 1024; // power of 2, between 32 and max unsigned integer
        var bufferLength = analyser.fftSize;
        var freqBinDataArray = new Uint8Array(bufferLength);

        var checkAudio = function() {
            analyser.getByteFrequencyData(freqBinDataArray);

            console.log('Volume: ' + getRMS(freqBinDataArray));
            console.log('Freq Bin: ' + getIndexOfMax(freqBinDataArray));
            //console.log(freqBinDataArray);
        }

        setInterval(checkAudio, 64);
    }

    var bLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bLength);
    
    //canvasCtx.clearRect(0, 0, 250, 250);

    function draw() {
        /*
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
        */
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
    draw();
    
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
