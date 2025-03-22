import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const VoiceRecognitionApp = ({ setFormData }) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      const words = transcript.split(" ");
      const extractedData = {
        first_name: words[0] || "",  // Assume first word is First Name
        last_name: words[1] || "",   // Assume second word is Last Name
        id_number: words[2] || "",   // Assume third word is ID Number
                 // Placeholder (Can be improved with NLP)
        place: words[3] || ""       // Assume fourth word is Place
      };

      setFormData(prevData => ({ ...prevData, ...extractedData }));
    }
  }, [transcript, setFormData]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <div>
      <h2>Voice Input</h2>
      <p>{listening ? "🎤 Listening..." : "Click to Start Speaking"}</p>
      <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>
        Start Listening
      </button>
      <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
      <button onClick={resetTranscript}>Clear</button>
      <p><strong>Transcript:</strong> {transcript}</p>
    </div>
  );
};

export default VoiceRecognitionApp;
