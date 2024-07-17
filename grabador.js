let mediaRecorder;
let audioChunks = [];

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { 'type': 'audio/ogg; codecs=opus' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();

      // Puedes descargar el archivo de audio
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = 'grabacion.ogg';
      link.click();
    };
  })
  .catch(err => {
    console.error('Error al acceder al micrófono: ', err);
  });

function startRecording() {
  audioChunks = [];
  mediaRecorder.start();
}

function stopRecording() {
  mediaRecorder.stop();
}



navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    // Aquí puedes usar el stream de audio
  })
  .catch(err => {
    console.error('Error al acceder al micrófono: ', err);
  });