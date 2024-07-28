import React, { useState,useEffect } from 'react';
import axios from 'axios'; // You'll need to install axios: npm install axios

function FormComponent() {
  const [dbUri, setDbUri] = useState('');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');


  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'paymentMessage') {
        console.log('Data received from iframe:', event.data.data);
        // Handle the data received from the iframe here
        // e.g., set state, call a function, etc.
      }
      else if (event.data.type === 'goHomeMessage'){
        console.log('Data received from iframe: for goHomeMessage', event.data.data);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the form data to the server
      const response = await axios.post('http://localhost:8000/submit-db-info', {
        dbUri,
        url,
        username,
        password,
      });

      console.log(response.data); // Server response
      setDocumentUrl(response.data.documentUrl);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <h1>Database Configuration</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Database URI:
          <input type="text" value={dbUri} onChange={(e) => setDbUri(e.target.value)} />
        </label>
        <br />
        <label>
          URL:
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        {/* <button type="submit">Submit</button> */}
      
       {/* <button onClick={() => {

    window.top.postMessage({ type: 'voiceoc_openWebbot', context:"find_doctor", uhid:"AIGG.20547525" }, '*');
}}>
    Chat with us
</button> */}
{console.log(window,"window___oio")}

<iframe
      src=""
      title="Web Bot Loader"
      style={{
        outline: 'none',
        resize: 'none',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 8px 0px',
        overflow: 'visible',
        background: 'none transparent',
        opacity: 1,
        top: 'auto',
        right: '20px',
        bottom: '20px',
        left: 'auto',
        position: 'fixed',
        border: '0px',
        minHeight: '80vh',
        minWidth: 'min(95vw, 380px)',
        maxHeight: '80vh',
        maxWidth: 'min(95vw, 380px)',
        padding: '0px',
        margin: '0px',
        transform: 'none',
        width: 'min(95vw, 380px)',
        height: '80vh',
        display: 'block',
        zIndex: 1000002,
        cursor: 'none',
        float: 'none',
        borderRadius: '10px',
        pointerEvents: 'auto',
        clip: 'auto',
        colorScheme: 'light',
        visibility: 'visible'
      }}
      frameBorder="0"
    ></iframe>
      
      </form>
      {documentUrl && (
        <div>
          <h2>Download Document</h2>
          <a href={documentUrl} download>
            Download Word Document
          </a>
        </div>
      )}
    </div>
  );
}

export default FormComponent;
