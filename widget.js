// script tag example:
// <script src="./widget.js " data-uniqueKey="lucas"></script>

"use strict";

(function () {
  const MAX_WIDTH_SM = 480;
  const CHAT_WIDTH = 400;
  const CHAT_HEIGHT = 700;
  const BUTTON_WIDTH = 48;
  const BUTTON_HEIGHT = 48;
  // const WIDGET_HOST = "https://uclone.me/widget-chat";
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

    const toggleButton = document.createElement("div");
    toggleButton.id = "toggle-widget-button";
    toggleButton.innerHTML = `<div style='position: relative; width: 100%'>
        <div id='minimize-icon'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.75em" viewBox="0 0 32 32"><path fill="#fff" d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z"/></svg>
        </div>
        <div id='open-icon'>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="250" height="250" viewBox="0 0 250 250" fill="none">
        <g clip-path="url(#clip0_1014_1112)">
        <rect width="250" height="250" rx="125" fill="black"/>
        <g opacity="0.2">
        <g filter="url(#filter0_f_1014_1112)">
        <rect width="996.992" height="849.547" rx="424.774" transform="matrix(1 0 0 -1 -201.13 862.607)" fill="url(#paint0_radial_1014_1112)" fill-opacity="0.8"/>
        </g>
        <g style="mix-blend-mode:soft-light" filter="url(#filter1_f_1014_1112)">
        <rect width="792.237" height="675.073" rx="337.537" transform="matrix(1 0 0 -1 -144.228 537.977)" fill="url(#paint1_radial_1014_1112)" fill-opacity="0.5"/>
        </g>
        <g style="mix-blend-mode:lighten" filter="url(#filter2_f_1014_1112)">
        <rect width="885.392" height="893.425" rx="442.696" transform="matrix(-0.81293 -0.582361 -0.702326 0.711855 709.238 226.618)" fill="url(#paint2_radial_1014_1112)" fill-opacity="0.8"/>
        <rect x="-21.5043" y="1.83777" width="857.008" height="865.042" rx="428.504" transform="matrix(-0.81293 -0.582361 -0.702326 0.711855 671.543 214.624)" stroke="#A85FEE" stroke-width="28.3838"/>
        </g>
        <g style="mix-blend-mode:screen" filter="url(#filter3_f_1014_1112)">
        <rect width="945.466" height="944.095" rx="472.047" transform="matrix(0.718401 -0.695629 -0.800053 -0.599929 210.776 1124)" fill="url(#paint3_radial_1014_1112)" fill-opacity="0.8"/>
        <rect x="-6.17937" y="-98.0468" width="794.108" height="792.736" rx="396.368" transform="matrix(0.718401 -0.695629 -0.800053 -0.599929 130.593 962.834)" stroke="#A85FEE" stroke-width="151.358"/>
        </g>
        </g>
        <rect x="5" y="5" width="240" height="240" fill="url(#pattern0)"/>
        </g>
        <defs>
        <filter id="filter0_f_1014_1112" x="-515.954" y="-301.764" width="1626.64" height="1479.19" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="157.412" result="effect1_foregroundBlur_1014_1112"/>
        </filter>
        <filter id="filter1_f_1014_1112" x="-467.512" y="-460.381" width="1438.81" height="1321.64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="161.642" result="effect1_foregroundBlur_1014_1112"/>
        </filter>
        <filter id="filter2_f_1014_1112" x="-829.485" y="-510.373" width="1730.21" height="1594.35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="194.145" result="effect1_foregroundBlur_1014_1112"/>
        </filter>
        <filter id="filter3_f_1014_1112" x="-719.212" y="-306.079" width="1783.87" height="1636.08" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="192.069" result="effect1_foregroundBlur_1014_1112"/>
        </filter>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_1014_1112" transform="scale(0.00195312)"/>
        </pattern>
        <radialGradient id="paint0_radial_1014_1112" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(498.496 424.774) rotate(90) scale(424.774 498.496)">
        <stop offset="0.489483" stop-color="#A85FEE"/>
        <stop offset="0.489583" stop-color="#A85FEE"/>
        <stop offset="1" stop-color="#A85FEE" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="paint1_radial_1014_1112" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(396.119 337.537) rotate(90) scale(337.537 396.119)">
        <stop offset="0.489583" stop-color="#3B82F6"/>
        <stop offset="1" stop-color="#00A3FF" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="paint2_radial_1014_1112" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(442.696 446.713) rotate(90) scale(446.713 442.696)">
        <stop offset="0.463542" stop-color="#A85FEE" stop-opacity="0.231373"/>
        <stop offset="1" stop-color="#A85FEE" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="paint3_radial_1014_1112" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(472.733 472.047) rotate(90) scale(472.047 472.733)">
        <stop stop-color="#A85FEE"/>
        <stop offset="1" stop-color="#A85FEE" stop-opacity="0"/>
        </radialGradient>
        <clipPath id="clip0_1014_1112">
        <rect width="250" height="250" rx="125" fill="white"/>
        </clipPath>
        <image id="image0_1014_1112" width="512" height="512" xlink:href="data:image/png;base64,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"/>
        </defs>
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
  }

  function onWindowResize(callback) {
    callback(window.innerWidth);

    window.addEventListener("resize", () => {
      callback(window.innerWidth);
    });
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
