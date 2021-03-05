function init() {
    var audioContext;
    var microphone;
    
    var canvas = document.getElementById('canvas');
    var canvasCtx = canvas.getContext('2d');
    
    var rmsList = [];
    var freqList = [];
    var analyser;
    


    document.getElementById("displayText").innerHTML = "You may start humming now! ";
    document.querySelector(".sing").style.display = "none";
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
    
    function beginRecording() {
        analyser.fftSize = 1024; // power of 2, between 32 and max unsigned integer
        var bufferLength = analyser.fftSize;
        var freqBinDataArray = new Uint8Array(bufferLength);
        var time = 30;
        
        var meanValue = 0;
        var freqValue = 0;
        var count = 0;
        var checkAudio = function() {
            try {
                analyser.getByteFrequencyData(freqBinDataArray);
            


                //document.getElementById("vol").innerHTML = 'Volume: ' + getRMS(freqBinDataArray);
                //document.getElementById("freq").innerHTML = 'Freq Bin: ' + getIndexOfMax(freqBinDataArray);
                //console.log(freqBinDataArray);
                meanValue = getRMS(freqBinDataArray);
                freqValue = getIndexOfMax(freqBinDataArray);
                rmsList.push(meanValue);
                freqList.push(freqValue);
                
            }
            catch(e) {
                console.log("Recipe generated!")
                
                
                
            }    
                 
        }

        setInterval(checkAudio, 64);
        
        

        var timer = setInterval(function(){
            if(time <= 0) {
                clearInterval(timer);
                clearInterval(checkAudio);
                
                document.getElementById("time").style.display = "none";
                document.getElementById("displayText").style.display = "none";
                selectGreen(modeRMS(rmsList));
                selectProtein(median(rmsList));
                selectTopping(rmsList[randomNumberGenerator(rmsList.length)-1])
                selectTopping(rmsList[randomNumberGenerator(rmsList.length)-1])
                selectTopping(rmsList[randomNumberGenerator(rmsList.length)-1])
                selectDressing(median(freqList));
                
                analyser = null;
                audioContext = null;
                microphone = null;

            }
            
            if(time  == 30) {
                document.getElementById("displayText").innerText = "Please hum for atleast 30 seconds for your salad!"
                
                
            }
            else if(time == 20) {
                // check amplitude
                //console.log("At 10s, ")
                
            }
            else if(time == 15) {
               // console.log("At 15s, " + meanValue)
                
            }
            else if(time == 10) {
                //console.log("At 15s, " + meanValue)
                
            }
            else if(time == 5) {
                //console.log("At 15s, " + meanValue)
               
            }
            
            else if(time == 1) {
                //console.log("At 30s, " + meanValue)
               
                
            }
        
            document.getElementById("time").innerHTML = time;
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

function avgRMS(nums) {
    var average = 0;
    for(var i = 0; i < nums.length; i++) {
        average += nums[i];
    }
    return (average/nums.length);
}

function modeRMS(nums) {
    var largest = nums[0];
    for(var i = 1; i < nums.length; i++) {
        if(i > largest) {
            largest = i;
        }
    }
    return largest;
}

function lowest(nums) {
    var lowest = nums[0];
    for(var i = 1; i < nums.length; i++) {
        if(i < lowest) {
            lowest = i;
        }
    }
    return lowest;
}


function getIndexOfMax(array) {
    return array.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
}


function median(array) {
    array.sort(function(a, b){return a - b});
    if(array.length % 2) {
        return( array[array.length/2] + array[1 + (array.length/2)] )
    }
    else {
        return( array[array.length/2] )
    }
    

}
