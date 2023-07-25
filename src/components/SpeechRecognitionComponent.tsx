import React, { useEffect, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import './SpeechRecognition.css';

const SpeechRecognitionComponent = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [output, setOutput] = useState<string>('');

  useEffect(() => {
    if (transcript) {
      const words = transcript.split(' ');
      const result = words
        .map((word) => {
          const randomNumber = Math.floor(Math.random() * 100) + 1;
          return `${word}${randomNumber}`;
        })
        .join(' ');

      setOutput(result);
    }
  }, [transcript]);

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'ru-RU' });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
    setOutput('');
  };

  return (
    <div className="speech-recognition">
      <h1>Распознование речи:</h1>
      <button onClick={handleStartListening} disabled={listening}>
        Начать слушать
      </button>
      <button onClick={handleStopListening} disabled={!listening}>
        Остановить слушание
      </button>
      <div className="speech-recognition-output">{output}</div>
    </div>
  );
};

export default SpeechRecognitionComponent;
