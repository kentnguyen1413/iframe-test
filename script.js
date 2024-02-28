(function () {
  const IFRAME_SRC = "http://localhost:3000/chat";
  let isChatbotHidden = true;

  const chatbotContainer = document.createElement("div");
  chatbotContainer.className = "chatbot-container";
  chatbotContainer.innerHTML = `
    <div class="toggle-btns">
      <button type="button" class="toggle-chatbot-btn">
        Chat Now
      </button>
      <button type="button" class="close-chatbot-icn">
        x
      </button>
    </div>

    <div class="chatbot-wrapper chatbot-hidden">
      <div class="chatbot-header">
        <p class="chatbot-title">Lucas</p>
        <div class="hide-chatbot-btn">
          <img src="./asset/minimize.svg" alt="Hide chat">
        </div>
        <div class="close-chatbot-btn">
          <img src="./asset/cross.svg" alt="Close chat">
        </div>
      </div>

      <iframe title="ai-chatbot" class="chatbot-content" width="370" height="550" frameborder="0"></iframe>

      <div class="end-chat-popup">
        <button type="button" class="end-chat-btn">
          End Chat
        </button>
        <button type="button" class="cancel-end-btn">
          Cancel
        </button> 
      </div>
    </div>
  `;

  document.body.appendChild(chatbotContainer);

  const chatbotWrapper = document.querySelector(".chatbot-wrapper");
  const chatbotContent = document.querySelector(".chatbot-content");
  const endChatPopup = document.querySelector(".end-chat-popup");
  const toggleChatbotBtn = document.querySelector(".toggle-chatbot-btn");
  const hideChatbotBtn = document.querySelector(".hide-chatbot-btn");
  const closeChatbotBtn = document.querySelector(".close-chatbot-btn");
  const closeChatbotBtn2 = document.querySelector(".close-chatbot-icn");
  const endChatBtn = document.querySelector(".end-chat-btn");
  const cancelEndChatBtn = document.querySelector(".cancel-end-btn");

  toggleChatbotBtn.addEventListener("click", toggleChatbot);
  hideChatbotBtn.addEventListener("click", toggleChatbot);
  closeChatbotBtn.addEventListener("click", closeChatbot);
  closeChatbotBtn2.addEventListener("click", endChat);
  endChatBtn.addEventListener("click", endChat);
  cancelEndChatBtn.addEventListener("click", cancelEndChat);

  function toggleChatbot() {
    chatbotWrapper.classList.toggle("chatbot-hidden");
    isChatbotHidden = !isChatbotHidden;
    toggleChatbotBtn.style.display = isChatbotHidden ? "block" : "none";
    closeChatbotBtn2.style.display = isChatbotHidden ? "block" : "none";

    // if (!chatbotContent.src) chatbotContent.src = IFRAME_SRC;
  }

  function closeChatbot() {
    endChatPopup.classList.toggle("end-chat-popup-show");
    chatbotWrapper.classList.toggle("chatbot-blurred");
  }

  function endChat() {
    chatbotWrapper.classList.toggle("chatbot-hidden");

    endChatPopup.classList.toggle("end-chat-popup-show");
    chatbotWrapper.classList.toggle("chatbot-blurred");

    // show start new chat btn
  }

  function cancelEndChat() {
    endChatPopup.classList.toggle("end-chat-popup-show");
    chatbotWrapper.classList.toggle("chatbot-blurred");
  }

  chatbotContent.onerror = function () {
    // Handle errors, such as displaying a message to the user
  };

  const css = `
    * {
      box-sizing: border-box;
    }

    .chatbot-container {
      position: fixed;
      bottom: 16px;
      right: 16px;
      z-index: 9999;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }

    .chatbot-wrapper {
      position: relative;
      border-radius: 8px;
      box-shadow: 0px 0px 12px 8px rgba(0, 0, 0, 0.2);
    }

    .chatbot-blurred {
      background: rgba(0, 0, 0, 0.3);
      pointer-events: none;
    }

    .toggle-btns {
      position: relative;
    }

    .close-chatbot-icn {
      position: absolute;
      top: -10px;
      right: -12px;
      border-radius: 50%;
      border: 1px solid #aaa;
      text-align: center;
    }

    .chatbot-header {
      display: flex;
      gap: 8px;
      padding: 12px;
      background: #2563eb;
      justify-content: end;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    .chatbot-title {
      margin: 0;
      color: white;
      margin-right: auto;
      font-size: 18px;
    }

    .chatbot-content {
      background: red;
    }

    .chatbot-hidden {
      display: none;
    }

    .close-chatbot-btn,
    .hide-chatbot-btn {
      height: 24px;
      cursor: pointer;
    }

    .end-chat-popup {
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translateY(100px);
      opacity: 0;
      transition: transform 0.2s ease, opacity 0.2s ease;

      width: 100%;
      padding: 12px;
      background: #fff;
      border-radius: 8px;

      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .end-chat-popup.end-chat-popup-show {
      transform: translateY(0);
      opacity: 1;
    }
    .end-chat-btn, .cancel-end-btn {
      cursor: pointer;
      border: none;
      width: 100%;
      height: 34px;
      font-weight: 500;
      border-radius: 6px;
      transition: background-color 0.2s ease;
    }
    .end-chat-btn {
      color: #fff;
      background-color: #D6193A;
      &:hover {
        background-color: #9d0b1c;
      }
    }
    .cancel-end-btn {
      color: #000;
      background-color: #fff;
      &:hover {
        background-color: #eee;
      }
    }
    `;

  const style = document.createElement("style");
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  document.head.appendChild(style);
})();
