import React, { useEffect, useRef } from 'react';
import './App.css';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import { Howl } from 'howler';

// import soundURL from './assets/hey_sondn.mp3';
// var sound = new Howl({
//   src: ['soundURL']
// });

// // sound.play();

const NOT_TOUCH_LABEL = 'not_touch';
const TOUCHED_LABEL = 'touched';
function App() {
  const video = useRef();
  const classifier = useRef();
  const mobilenetModule = useRef();
  const init = async () => {
    console.log('init...');
    await setupCamera();

    console.log('setup camera success');
    const classifier = knnClassifier.create();
    const mobilenetModule= await mobilenet.load();
    console.log('setup done');
    console.log('không sờ tay lên mặt và bấm Train 1');
  }
  const setupCamera = () => {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          { video: true },
          stream => {
            video.current.srcObject = stream;
            video.current.addEventListener('loadeddata', resolve);
          },
          error => reject(error)
        );

      } else {
        reject();
      }

    });
  }
  const train = label => {
    console.log(label);
  }
  useEffect(() => {
    init();
    return () => {

    }

  }, [])
  return (
    <div className="main">
      <video ref={video} className="video" autoPlay>
      </video>
      <div className="control">
        <button className="btn" onClick={() => train(NOT_TOUCH_LABEL)}>Train1</button>
        <button className="btn" onClick={() => train(TOUCHED_LABEL)}>Train2</button>
        <button className="btn" onClick={() => { }}>Run</button>
      </div>
    </div>
  );
}

export default App;
