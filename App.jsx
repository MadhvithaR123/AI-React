import React, { useState } from "react";
import axios from "axios";
import VoiceRecognitionApp from "./VoiceRecognitionApp";

function App() {
    const [formData, setFormData] = useState({
        first_name: "",  // Update key (was firstName)
        last_name: "",   // Update key (was lastName)
        id_number: "",   // Update key (was idNumber)        
        place: ""
    });
    const [response, setResponse] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    function reset(){
        setFormData({
            first_name: "",  // Update key (was firstName)
            last_name: "",   // Update key (was lastName)
            id_number: "",   // Update key (was idNumber)        
            place: ""
        })
    }

    const validateUser = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/validate", formData);
            setResponse(res.data.status);
            
        } catch (error) {
            setResponse("Error validating user");
        }
    };

    return (
        <div>
            <h2>Voice-Enabled Form</h2>
            <input type="text" name="first_name" placeholder="Enter First Name" value={formData.first_name} onChange={handleChange} />
<input type="text" name="last_name" placeholder="Enter Last Name" value={formData.last_name} onChange={handleChange} />
<input type="text" name="id_number" placeholder="Enter ID Number" value={formData.id_number} onChange={handleChange} />
<input type="text" name="place" placeholder="Enter Place" value={formData.place} onChange={handleChange} />

            <button onClick={validateUser}>Validate</button>
            <button onClick={reset}>Clear</button>
            <p>{response}</p>
            <VoiceRecognitionApp setFormData={setFormData} />
        </div>
    );
}

export default App;
