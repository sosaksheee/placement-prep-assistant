document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const uploadBtn = document.getElementById('upload-btn');
    const resumeUpload = document.getElementById('resume-upload');

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    uploadBtn.addEventListener('click', () => {
        resumeUpload.click();
    });

    resumeUpload.addEventListener('change', uploadResume);

    function sendMessage() {
        const messageText = userInput.value.trim();
        if (messageText === '') return;

        appendMessage('user', messageText);
        userInput.value = '';

        getGeminiResponse(messageText);
    }

    function uploadResume() {
        const file = resumeUpload.files[0];
        if (!file) return;

        appendMessage('user', `Uploading resume: ${file.name}`);
        getResumeSuggestions(file);
    }

    // --- Placeholder Functions for API Calls ---

    /**
     * TODO: Replace this with your actual Gemini API call.
     * This function simulates a call to the Gemini API to get a response to a user's question.
     * @param {string} question The user's question.
     */
    function getGeminiResponse(question) {
        // 1. Set up your Gemini API endpoint and API key.
        const GEMINI_API_KEY = 'AIzaSyAVrjlKfB0PJcL9R5C1amMEbYtluVMUhdk';
        const GEMINI_API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

        // 2. Make a fetch request to the Gemini API.
        fetch(GEMINI_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: question }] }],
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Check for errors in the response
            if (data.error) {
                console.error('Gemini API Error:', data.error.message);
                appendMessage('assistant', `Error: ${data.error.message}`);
                return;
            }
            const responseText = data.candidates[0].content.parts[0].text;
            appendMessage('assistant', responseText);
        })
        .catch(error => {
            console.error('Error calling Gemini API:', error);
            appendMessage('assistant', 'Sorry, I encountered an error. Please check the console for details.');
        });
    }

    /**
     * TODO: Replace this with your actual Gemini API call for resume analysis.
     * This function simulates uploading a resume and getting suggestions from the Gemini API.
     * @param {File} file The resume file.
     */
    function getResumeSuggestions(file) {
        // This feature is currently disabled to prevent conflicts.
        // To enable it, you would read the file content and make a separate API call.
    }

    function appendMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});