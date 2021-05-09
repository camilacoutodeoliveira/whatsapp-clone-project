import {
    ClassEvent
} from '../util/ClassEvent';

export class MicrophoneController extends ClassEvent {

    constructor() {
        // this._audioEl = audioEl;
        super();
        this._available = false;
        this._mimeType = 'audio/webm';
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {
            this._available = true;
            this._stream = stream;

            // let audio = new Audio();
            // audio.srcObject = stream;;
            // audio.play();

            this.trigger('ready', {
                stream: this._stream,
                audio: this._audio
            });
        }).catch(err => {
            console.error(err);
        });
    }

    stop() {
        this._stream.getTracks().forEach(track => {
            track.stop();
        });
    }

    startRecorder(options = {}) {

        if (this._available) {
            this.startTimer();
            this._mediaRecorder = new MediaRecorder(this._stream, Object.assign(options, {
                mimeType: this._mimeType
            }));
            this._recordedChunks = [];
            this._mediaRecorder.addEventListener('dataavailable', e => {
                if (e.data.size > 0) this._recordedChunks.push(e.data);
            });
            this._mediaRecorder.addEventListener('stop', () => {
                let blob = new Blob(this._recordedChunks, {
                    type: this._mimeType
                });
                let cx = new AudioContext();
                var fileReader = new FileReader();
                fileReader.onload = e => {
                    cx.decodeAudioData(fileReader.result).then(decode => {
                        let file = new File([blob], 'rec' + new Date().getTime() + '.webm', {
                            type: this._mimeType,
                            lastModified: Date.now()
                        });
                        console.log('file', file);
                        //tocar o arquivo
                        // let reader = new FileReader();
                        // reader.onload = e => {
                        //     console.log('reader file', file);
                        //     let audio = new Audio(reader.result);
                        //     audio.play();
                        // }
                        // reader.readAsDataURL(file);


                        this.trigger('recorded', file, decode);
                    });
                };
                // fileReader.readAsArrayBuffer(blob);
            });
            this._mediaRecorder.start();
        }
    }

    stopRecorder() {
        if (this._available) {
            this._mediaRecorder.stop();
            this.stop();
            this.stopTimer();
        }
    }

    startTimer() {
        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(() => {
            this.trigger('recordtimer', (Date.now() - start));
        }, 100);
    }

    stopTimer() {
        clearInterval(this._recordMicrophoneInterval);
    }
}