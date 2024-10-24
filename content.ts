import img from './icon.png'
export default defineContentScript({
  matches: ['https://www.linkedin.com/feed/?trk=guest_homepage-basic_nav-header-signin'], // Update this to target LinkedIn's URL
  main() {
    console.log('LinkedIn AI Reply Extension is active.');

    // Add event listener for focus on LinkedIn message input field
    document.addEventListener('focusin', (event) => {
      const target = event.target as HTMLElement;

      // Check if the focused element is LinkedIn's message input field
      if (target && target.matches('.msg-form__contenteditable')) {
        console.log('Input field focused.');
        showAIIcon(target);
      }
    });

    document.addEventListener('focusout', (event) => {
      const target = event.target as HTMLElement;

      // Check if the unfocused element is LinkedIn's message input field
      if (target && target.matches('.msg-form__contenteditable')) {
        console.log('Input field unfocused.');
        hideAIIcon();
      }
    });

    function showAIIcon(inputField: HTMLElement) {
      // Check if the AI icon is already present
      if (document.getElementById('ai-reply-icon')) return;

      // Create AI icon element
      const aiIcon = document.createElement('div');
      aiIcon.id = 'ai-reply-icon';
      aiIcon.style.position = 'absolute';
      aiIcon.style.bottom = '10px';
      aiIcon.style.right = '10px';
      aiIcon.style.cursor = 'pointer';  // Make the icon clickable
      aiIcon.innerHTML = `<img src="{chrome.runtime.getURL('icon.png')}" alt="AI Icon" style="width: 24px; height: 24px;" />`;

      // Append AI icon to the message input field
      inputField.appendChild(aiIcon);

      // Add event listener to open the modal when the AI icon is clicked
      aiIcon.addEventListener('click', openModal);
    }

    function hideAIIcon() {
      const aiIcon = document.getElementById('ai-reply-icon');
      if (aiIcon) {
        aiIcon.remove();
      }
    }

    function openModal() {
      // Remove any existing modals before opening a new one
      const existingModal = document.querySelector('.ai-reply-modal');
      if (existingModal) existingModal.remove();

      // Logic to display the modal goes here
      const modal = document.createElement('div');
      modal.classList.add('ai-reply-modal');
      modal.style.position = 'fixed';
      modal.style.top = '70%';
      modal.style.left = '50%';
      modal.style.borderBlock = '10px';
      // modal.style.right = '50%';
      modal.style.transform = 'translate(-50%, -50%)';
      modal.style.zIndex = '1000';

      modal.innerHTML = `
        <div class="modal-content bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <input type="text" placeholder="Enter your Prompt" class="w-full mb-4 p-2 border border-gray-300 rounded" />
          <button id="generate-btn" class="bg-blue-500 text-white px-4 py-2 rounded">Generate</button></br>
          <button id="insert-btn" class="bg-green-500 text-white px-4 py-2 rounded ml-2">Insert Reply</button>
        </div>
      `;
      document.body.appendChild(modal);

      // Attach event listeners for the buttons inside the modal
      document.getElementById('generate-btn')?.addEventListener('click', generateReply);
      document.getElementById('insert-btn')?.addEventListener('click', insertReply);
    }

    function generateReply() {
      const reply = 'Thank you for the opportunity! If you have any more questions or if there\'s anything else I can help you with, feel free to ask.';
      console.log(reply); // Here you would show the reply in the modal
      alert(reply); // Show the generated reply in a basic alert (you can replace with modal interaction)
    }

    function insertReply() {
      const messageInput = document.querySelector('.msg-form__contenteditable') as HTMLElement;
      if (messageInput) {
        messageInput.innerText = 'Thank you for the opportunity! If you have any more questions or if there\'s anything else I can help you with, feel free to ask.';
      }
    }
  },
});