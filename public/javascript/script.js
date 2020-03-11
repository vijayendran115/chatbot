var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

if ('SpeechRecognition' in window) {
    // speech recognition API supported
    $('#messages').html(`
        <div class="mx-auto">
            <div class="alert alert-primary" role="alert">
                Speech recognition API supported and click start listing button
            </div>
            <img class="mx-auto d-block" src="images/mic.png" />
        </div>
    `);

    const recognition = new window.SpeechRecognition();
    recognition.continuous = true;
    recognition.onresult = (event) => {
        const speechToText = event.results[event.resultIndex][0].transcript;
        $('#messages').append(`
            <div class="col-12 text-right">
                <span class="alert alert-primary">` + speechToText + `</span>
            </div>
            <hr class="clearfix p-1" />
        `);

        getReply(speechToText);
    }

    recognition.onend = function() {
        $('#start-button').html("Start listening");
    }

    function startListending() {
        recognition.start();
        $('#start-button').html("listening");
        $('#messages .mx-auto').html(""); 
    }

    function getReply(text) {
        var settings = {
            "url": $(location).attr("href"),
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            "data": JSON.stringify({"text": text}),
          };
          
          $.ajax(settings).done(function (response) {
            $('#messages').append(`
                <div class="col-12 text-left">
                    <span class="alert alert-info">` + response.reply + `</span>
                </div>
                <hr class="clearfix p-1" />
            `);
          });
    }

} else {
    // speech recognition API not supported
    $('#messages').text("speech recognition API not supported");
}