// script tag example:
// <script src="./widget.js " data-uniqueKey="lucas"></script>

"use strict";

(function () {
  const MAX_WIDTH_SM = 480;
  const CHAT_WIDTH = 400;
  const CHAT_HEIGHT = 700;
  const BUTTON_WIDTH = 48;
  const BUTTON_HEIGHT = 48;
  const locale = getCookie("NEXT_LOCALE");
  // const WIDGET_HOST = `https://uclone.me/${locale}/widget-chat`;
  const WIDGET_HOST = `http://localhost:3001/${locale}/widget-chat`;

  const script = document.currentScript;
  let isWidgetOpen = true;

  let isMsgBubblesShowed = localStorage.getItem("isMsgBubblesShowed");
  if (isMsgBubblesShowed === null) isMsgBubblesShowed = true;
  else if (isMsgBubblesShowed === "false") isMsgBubblesShowed = false;

  function loadWidget() {
    const uniqueKey = script.getAttribute("data-uniqueKey") ?? "";

    const chatWidget = document.createElement("iframe");
    chatWidget.title = "chatbot-widget";
    chatWidget.id = "chatbot-widget";
    chatWidget.style.borderRadius = "16px";
    chatWidget.style.border = "none";
    chatWidget.width = "100%";
    chatWidget.height = "100%";
    chatWidget.src = `${WIDGET_HOST}?uniqueKey=${uniqueKey}`;

    const chatWidgetContainer = document.createElement("div");
    chatWidgetContainer.style = `
      position: fixed;
      z-index: 999999999;
      padding: 0 !important;
      margin: 0 !important;
      border: none;
      bottom: 80px;
      right: 30px;
      width: ${CHAT_WIDTH}px;
      height: ${CHAT_HEIGHT}px;
      border-radius: 18px;
      box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.06), 0 2px 32px 0 rgba(0, 0, 0, 0.16);
      box-sizing: content-box;

      transform: scale(0);
      opacity: 0;
      pointer-events: none;
      transform-origin: right bottom;
      overflow: hidden;
      transition: width 200ms ease 0s, height 200ms ease 0s, transform 300ms cubic-bezier(0, 1.2, 1, 1) 0s, opacity 83ms ease-out 0s;
    `;

    const hideMsgBubblesBtn = document.createElement("div");
    hideMsgBubblesBtn.id = "hide-msg-bubbles-btn";
    hideMsgBubblesBtn.style =
      "position: absolute; top: -7px; right: -7px; font-weight: bold; display: none; justify-content: center; align-items: center; z-index: 2147483643; width: 22px; height: 22px; border-radius: 50%; text-align: center; font-size: 12px; cursor: pointer; background-color: rgb(224, 224, 224); color: black; box-shadow: rgba(150, 150, 150, 0.15) 0px 6px 24px 0px, rgba(150, 150, 150, 0.15) 0px 0px 0px 1px;";
    hideMsgBubblesBtn.innerHTML = "✕";
    hideMsgBubblesBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      hideMsgBubbles();
    });

    const msgBubbles = document.createElement("div");
    msgBubbles.id = "chat-message-bubbles";
    msgBubbles.style =
      "position: fixed; bottom: 75px; border-radius: 10px; font-family: sans-serif; font-size: 16px; z-index: 2147483644; cursor: pointer; flex-direction: column; gap: 50px; max-width: 70vw; display: block; right: 1rem; left: unset;";
    msgBubbles.innerHTML = ` 
      <div style="display: flex; justify-content: flex-end;">
          <div style="background-color: white; color: black; box-shadow: rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px; border-radius: 10px; padding: 20px; margin: 8px; font-size: 14px; opacity: 1; transform: scale(1); transition: opacity 0.5s ease 0s, transform 0.5s ease 0s;">👋 Hi! I am uCloneAI, ask me anything!</div>
      </div>`;
    msgBubbles.appendChild(hideMsgBubblesBtn);

    msgBubbles.addEventListener("mouseover", () => {
      hideMsgBubblesBtn.style.display = "flex";
    });
    msgBubbles.addEventListener("mouseleave", () => {
      hideMsgBubblesBtn.style.display = "none";
    });
    msgBubbles.addEventListener("click", () => {
      hideMsgBubbles();
      handleToggleWidget();
    });

    function hideMsgBubbles() {
      msgBubbles.style.display = "none";
      hideMsgBubblesBtn.style.display = "none";
      isMsgBubblesShowed = false;
      localStorage.setItem("isMsgBubblesShowed", false);
    }

    const toggleButton = document.createElement("div");
    toggleButton.id = "toggle-widget-button";
    toggleButton.innerHTML = `<div style='position: relative; width: 100%'>
        <div id='minimize-icon'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.75em" viewBox="0 0 32 32"><path fill="#fff" d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z"/></svg>
        </div>
        <div id='open-icon'>
          <svg width="55" height="55" viewBox="0 0 1120 1120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M252 434C252 372.144 302.144 322 364 322H770C831.856 322 882 372.144 882 434V614.459L804.595 585.816C802.551 585.06 800.94 583.449 800.184 581.405L763.003 480.924C760.597 474.424 751.403 474.424 748.997 480.924L711.816 581.405C711.06 583.449 709.449 585.06 707.405 585.816L606.924 622.997C600.424 625.403 600.424 634.597 606.924 637.003L707.405 674.184C709.449 674.94 711.06 676.551 711.816 678.595L740.459 756H629.927C629.648 756.476 629.337 756.945 628.993 757.404L578.197 825.082C572.597 832.543 561.403 832.543 555.803 825.082L505.007 757.404C504.663 756.945 504.352 756.476 504.073 756H364C302.144 756 252 705.856 252 644V434ZM633.501 471.462C632.299 468.212 627.701 468.212 626.499 471.462L619.252 491.046C618.874 492.068 618.068 492.874 617.046 493.252L597.462 500.499C594.212 501.701 594.212 506.299 597.462 507.501L617.046 514.748C618.068 515.126 618.874 515.932 619.252 516.954L626.499 536.538C627.701 539.788 632.299 539.788 633.501 536.538L640.748 516.954C641.126 515.932 641.932 515.126 642.954 514.748L662.538 507.501C665.788 506.299 665.788 501.701 662.538 500.499L642.954 493.252C641.932 492.874 641.126 492.068 640.748 491.046L633.501 471.462Z" fill="white"></path>
          <path d="M771.545 755.99C832.175 755.17 881.17 706.175 881.99 645.545L804.595 674.184C802.551 674.94 800.94 676.551 800.184 678.595L771.545 755.99Z" fill="white"></path>
          </svg>
        </div>
      </div>`;
    toggleButton.style = `
      position: fixed; 
      z-index: 99999999; 
      bottom: 15px; 
      right: 15px;
      width: ${BUTTON_WIDTH}px;
      height: ${BUTTON_HEIGHT}px;
      border-radius: 50%;
      background: #a85fee;
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 167ms cubic-bezier(0.33, 0, 0, 1) 0s;
      transform-origin: center center;
    `;
    const minimizeIcon = toggleButton.querySelector("#minimize-icon");
    minimizeIcon.style = `
      user-select: none;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0px;
      bottom: 0px;
      transition: transform 0.16s linear 0s, opacity 0.08s linear 0s;
      opacity: 0;
      transform: rotate(-60deg);
    `;
    const openIcon = toggleButton.querySelector("#open-icon");
    openIcon.style = `
      user-select: none;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0px;
      bottom: 0px;
      transition: transform 0.16s linear 0s, opacity 0.08s linear 0s;
      opacity: 1;
      transform: rotate(0deg) scale(1);
    `;

    toggleButton.addEventListener("mouseover", () => {
      toggleButton.style.transform = "scale(1.1)";
    });
    toggleButton.addEventListener("mouseleave", () => {
      toggleButton.style.transform = "scale(1)";
    });
    toggleButton.addEventListener("mousedown", () => {
      toggleButton.style.transform = "scale(0.85)";
    });
    toggleButton.addEventListener("mouseup", () => {
      toggleButton.style.transform = "scale(1.1)";
    });
    toggleButton.addEventListener("click", handleToggleWidget);

    function handleToggleWidget() {
      if (isMsgBubblesShowed) hideMsgBubbles();

      chatWidget.contentWindow.postMessage({ isWidgetOpen }, WIDGET_HOST);

      if (isWidgetOpen) {
        handleWidgetOpen();
      } else {
        handleWidgetClosed();
      }
      isWidgetOpen = !isWidgetOpen;
    }

    function handleWidgetOpen() {
      chatWidgetContainer.style.opacity = "1";
      chatWidgetContainer.style.transform = "scale(1)";
      chatWidgetContainer.style.pointerEvents = "all";

      openIcon.style.opacity = "0";
      openIcon.style.transform = "rotate(30deg) scale(0)";

      minimizeIcon.style.opacity = "1";
      minimizeIcon.style.transform = "rotate(0deg)";
    }

    function handleWidgetClosed() {
      chatWidgetContainer.style.opacity = "0";
      chatWidgetContainer.style.transform = "scale(0)";
      chatWidgetContainer.style.pointerEvents = "none";

      openIcon.style.opacity = "1";
      openIcon.style.transform = "rotate(0deg) scale(1)";

      minimizeIcon.style.opacity = "0";
      minimizeIcon.style.transform = "rotate(-60deg)";
    }

    onWindowResize((currentWidth) => {
      if (
        currentWidth <= MAX_WIDTH_SM &&
        chatWidgetContainer.style.width !== "calc(100% - 8px)"
      ) {
        chatWidgetContainer.style.width = "calc(100% - 8px)";
        chatWidgetContainer.style.right = "4px";
      } else if (
        currentWidth > MAX_WIDTH_SM &&
        chatWidgetContainer.style.width !== `${CHAT_WIDTH}px`
      ) {
        chatWidgetContainer.style.width = `${CHAT_WIDTH}px`;
        chatWidgetContainer.style.right = "30px";
      }
    });

    chatWidgetContainer.appendChild(chatWidget);
    document.body.appendChild(chatWidgetContainer);
    document.body.appendChild(toggleButton);
    if (isMsgBubblesShowed) document.body.appendChild(msgBubbles);
  }

  function onWindowResize(callback) {
    callback(window.innerWidth);

    window.addEventListener("resize", () => {
      callback(window.innerWidth);
    });
  }

  function getCookie(name) {
    // Construct the name of the cookie, followed by an equal sign
    const nameEQ = name + "=";
    // Split the cookie string into an array of individual cookies
    const ca = document.cookie.split(";");
    // Loop through the cookies
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      // Remove any leading whitespace
      while (c.charAt(0) == " ") {
        c = c.substring(1, c.length);
      }
      // Check if this cookie matches the name we're looking for
      if (c.indexOf(nameEQ) == 0) {
        // Return the value of the cookie (substring after the "=")
        return c.substring(nameEQ.length, c.length);
      }
    }
    // If no matching cookie is found, return default value  "en"
    return "en";
  }

  if (document.readyState === "complete") {
    loadWidget();
  } else {
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") {
        loadWidget();
      }
    });
  }
})();
