(function () {
  const IFRAME_SRC = "http://localhost:3000/ai/lucas";
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
        <button type="button" class="hide-chatbot-btn">
          Hide
        </button>
        <button type="button" class="close-chatbot-btn">
          Close
        </button>
      </div>
      <iframe title="ai-chatbot" class="chatbot-content" width="400" height="450" frameborder="0"></iframe>
    </div>
  `;

  document.body.appendChild(chatbotContainer);

  const chatbotWrapper = document.querySelector(".chatbot-wrapper");
  const chatbotContent = document.querySelector(".chatbot-content");
  const toggleChatbotBtn = document.querySelector(".toggle-chatbot-btn");
  const hideChatbotBtn = document.querySelector(".hide-chatbot-btn");
  const closeChatbotBtn = document.querySelector(".close-chatbot-btn");
  const closeChatbotBtn2 = document.querySelector(".close-chatbot-icn");

  toggleChatbotBtn.addEventListener("click", toggleChatbot);
  hideChatbotBtn.addEventListener("click", toggleChatbot);
  closeChatbotBtn.addEventListener("click", closeChatbot);
  closeChatbotBtn2.addEventListener("click", closeChatbot);

  function toggleChatbot() {
    chatbotWrapper.classList.toggle("chatbot-hidden");
    isChatbotHidden = !isChatbotHidden;
    toggleChatbotBtn.style.display = isChatbotHidden ? "block" : "none";
    closeChatbotBtn2.style.display = isChatbotHidden ? "block" : "none";

    if (!chatbotContent.src) chatbotContent.src = IFRAME_SRC;
  }

  function closeChatbot() {
    chatbotContainer.style.display = "none";
  }

  chatbotContent.onerror = function () {
    // Handle errors, such as displaying a message to the user
  };

  const css = `
    .chatbot-container {
      position: fixed;
      bottom: 16px;
      right: 16px;
    }

    .chatbot-wrapper {
      box-shadow: 0px 0px 15px 8px rgba(0, 0, 0, 0.2);
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
      background: black;
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
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      background-color: black;
    }

    .chatbot-hidden {
      display: none;
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
