// script tag example:
// <script src="./widget.js " data-uniqueKey="lucas"></script>

"use strict";

(function () {
  const CHAT_WIDTH = 400;
  const CHAT_HEIGHT = 700;
  const BUTTON_WIDTH = 48;
  const BUTTON_HEIGHT = 48;
  const WIDGET_HOST = "http://localhost:3000/widget-chat";

  const script = document.currentScript;
  let isWidgetOpen = true;

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
      bottom: 30px;
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

    const toggleButton = document.createElement("div");
    toggleButton.id = "toggle-widget-button";
    toggleButton.innerHTML = `<div style='position: relative; width: 100%'>
        <div id='minimize-icon'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.75em" viewBox="0 0 32 32"><path fill="#fff" d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z"/></svg>
        </div>
        <div id='open-icon'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.75em" viewBox="0 0 24 24"><path fill="#fff" d="M2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm3.15-6H20V4H4v13.125zM4 16V4z"/></svg>
        </div>
      </div>`;
    toggleButton.style = `
      position: fixed; 
      z-index: 99999999; 
      bottom: 0px; 
      right: 0px;
      width: ${BUTTON_WIDTH}px;
      height: ${BUTTON_HEIGHT}px;
      border-radius: 50%;
      background: #ff6243;
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
    toggleButton.addEventListener("click", () => {
      chatWidget.contentWindow.postMessage({ isWidgetOpen }, WIDGET_HOST);

      if (isWidgetOpen) {
        handleWidgetOpen();
      } else {
        handleWidgetClosed();
      }
      isWidgetOpen = !isWidgetOpen;
    });

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

    chatWidgetContainer.appendChild(chatWidget);
    document.body.appendChild(chatWidgetContainer);
    document.body.appendChild(toggleButton);
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
