(function () {
  const CHAT_WIDTH = 380;
  const CHAT_HEIGHT = 650;
  const BUTTON_WIDTH = 104;
  const BUTTON_HEIGHT = 40;
  const TRANSITION_DURATION = 300;

  const chatWidgetContainer = document.createElement("div");
  chatWidgetContainer.style = `
    position: fixed;
    background: transparent;
    z-index: 999999999;
    opacity: 1;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 40px;
    border-radius: 8px 8px 0px 0px;
    cursor: pointer;
    bottom: 8px;
    overflow: hidden;
    width: 104px;
    height: 40px;
    right: 8px;
    border-radius: 8px;
  `;
  const chatWidget = document.getElementById("chatbot-widget");
  chatWidgetContainer.appendChild(chatWidget);
  document.body.appendChild(chatWidgetContainer);

  window.onmessage = (event) => {
    if (event.data.type === "UPDATE_POPUP_STATE") {
      if (event.data.isOpen) {
        chatWidgetContainer.style.width = `${CHAT_WIDTH}px`;
        chatWidgetContainer.style.height = `${CHAT_HEIGHT}px`;
        chatWidgetContainer.style.bottom = "-72px";

        // Animate for transform-translate and opacity props
        chatWidgetContainer.style.opacity = "0";
        setTimeout(() => {
          chatWidgetContainer.style.transition = `transform ${TRANSITION_DURATION}ms, opacity ${TRANSITION_DURATION}ms`;
        }, 10);
        setTimeout(() => {
          chatWidgetContainer.style.transform = `translateY(-80px)`;
          chatWidgetContainer.style.opacity = "1";
        }, 20);

        // Animate for transform-translate prop
        // chatWidgetContainer.style.transition = `transform ${TRANSITION_DURATION}ms`;
        // chatWidgetContainer.style.transform = `translateY(-80px)`;
      } else {
        // Animate for transform-translate and opacity props
        chatWidgetContainer.style.transform = `translateY(0px)`;
        chatWidgetContainer.style.opacity = "0";
        setTimeout(() => {
          chatWidgetContainer.style.bottom = "8px";
          chatWidgetContainer.style.width = `${BUTTON_WIDTH}px`;
          chatWidgetContainer.style.height = `${BUTTON_HEIGHT}px`;

          chatWidgetContainer.style.opacity = "1";
          chatWidgetContainer.style.transition = "none";
        }, TRANSITION_DURATION);

        // Animate for transform-translate prop
        // chatWidgetContainer.style.transform = `translateY(0px)`;
        // setTimeout(() => {
        //   chatWidgetContainer.style.bottom = "8px";
        //   chatWidgetContainer.style.width = `${BUTTON_WIDTH}px`;
        //   chatWidgetContainer.style.height = `${BUTTON_HEIGHT}px`;
        // }, TRANSITION_DURATION - 50);
      }
    }
  };
})();
