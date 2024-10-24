import { useState } from 'react';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  
  const insertReply = () => {
    const messageInputField = document.querySelector('.msg-form__contenteditable') as HTMLElement;
    if (messageInputField) {
      messageInputField.innerText = response;
    }
  };

  // Function to handle opening the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Function to handle "Generate" button click
  const generateReply = () => {
    // Set a dummy response as required
    const dummyResponse = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
    setResponse(dummyResponse);
  };

  // // Function to handle "Insert" button click (inserting the response)
  // const insertReply = () => {
  //   const messageInputField = document.querySelector('.msg-form__contenteditable'); // LinkedIn input field selector
  //   if (messageInputField) {
  //     messageInputField.innerText = response;
  //   }
  // };

  return (
    <div>
      <button onClick={openModal} className="open-modal-button">
        Open AI Reply
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h2>Generate Reply</h2>

            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your command"
              className="input-field"
            />

            <button onClick={generateReply} className="generate-button">
              Generate
            </button>

            {response && (
              <>
                <p className="response">{response}</p>
                <button onClick={insertReply} className="insert-button">
                  Insert
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
