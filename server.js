const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/ask', async (req, res) => {
    const { question } = req.body;
    console.log('Question received:', question);

    // Placeholder for Gemini API call
    const answer = `This is a placeholder answer to: "${question}"`;

    // Placeholder for Firebase logging
    console.log('Logging to Firebase...');

    res.json({ answer });
});

app.post('/upload-resume', (req, res) => {
    console.log('Resume upload endpoint hit');
    // Placeholder for resume processing and Gemini API call
    const suggestions = 'These are placeholder suggestions for your resume.';
    res.json({ suggestions });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});