import React from 'react';

function App() {
  const handleClick = async () => {
    // Generate array of 10 float32 numbers
    const floatArray = new Float32Array(10).map(() => Math.random());

    // Convert the Float32Array to a byte buffer
    const byteBuffer = new Uint8Array(floatArray.buffer);

    try {
      // Send the byte buffer to the backend
      const response = await fetch('http://localhost:8001/check-float32', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream'
        },
        body: byteBuffer
      });

      const result = await response.json();
      alert(`Result: ${result.valid ? 'All are float32' : 'Not all are float32'}`);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
      <div className="App">
        <button onClick={handleClick}>Check Float32 Array</button>
      </div>
  );
}

export default App;
