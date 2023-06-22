export default function audio() {
    const keys = document.querySelectorAll('.key');
    const audioFolder = 'http://mkrukowski.pl/res/';
    const audioFiles = [
        '0.mp3',
        '1.mp3',
        '2.mp3',
        '3.mp3',
        '4.mp3',
        '5.mp3',
        '6.mp3',
        '7.mp3',
        '8.mp3',
        '9.mp3',
        '10.mp3',
        '11.mp3'
    ];

    const audioCheckbox = document.getElementById('audioCheckbox');
    let isAudioEnabled = audioCheckbox.checked;

    keys.forEach((key, index) => {
        key.addEventListener('mousedown', () => {
            if (isAudioEnabled) {
                playAudio(index);
            }
        });
        key.addEventListener('touchstart', () => {
            if (isAudioEnabled) {
                playAudio(index);
            }
        });
        key.addEventListener('mouseup', stopAudio);
        key.addEventListener('touchend', stopAudio);
    });

    audioCheckbox.addEventListener('change', () => {
        isAudioEnabled = audioCheckbox.checked;
    });

    function playAudio(index) {
        const audio = new Audio(audioFolder + audioFiles[index]);
        audio.play();
    }

    function stopAudio() {
        const audio = document.querySelector('audio');
        audio.pause();
        audio.currentTime = 0;
    }
}