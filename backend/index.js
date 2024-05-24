const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 8001;

app.use(cors());
app.use(bodyParser.raw({ type: 'application/octet-stream' }));

app.post('/check-float32', (req, res) => {
    const buffer = req.body;

    // Check if the buffer length is a multiple of 4 (size of float32)
    if (buffer.length % 4 !== 0) {
        return res.json({ valid: false });
    }

    const floatArray = new Float32Array(buffer.buffer);

    // Check if each element in the array is a float32
    const isValid = floatArray.every(num => typeof num === 'number');

    res.json({ valid: isValid });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
