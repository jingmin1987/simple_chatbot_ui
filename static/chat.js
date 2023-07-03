/*
    Helper functions to get things done
*/
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();
  const d = date.toDateString()
  return `${h.slice(-2)}:${m.slice(-2)} | ${d.slice(4,10)}`;
}

function appendUserMessage(text, lastMessage) {
    const appChatBox = get(".msg-page");
    if (lastMessage["user"]) {
        const userMessageHTML = `
          <p class="multi-msg">
            ${text}
          </p>
        `;

        const timeBox = get(".time")
        timeBox.insertAdjacentHTML("beforebegin", userMessageHTML)
        timeBox.innerHTML = formatDate(new Date())
    } else {
        const appChatBox = get(".msg-page");
        const userMessageHTML = `
            <div class="received-chats">
              <div class="received-chats-img">
                <img src="static/user.png" />
              </div>
              <div class="received-msg">
                <div class="received-msg-inbox">
                  <p class="multi-msg">
                    ${text}
                  </p>
                  <span class="time">${formatDate(new Date())}</span>
                </div>
              </div>
            </div>
        `;

        appChatBox.insertAdjacentHTML("beforeend", userMessageHTML)
    }
    appChatBox.scrollTop += 500;
    lastMessage["user"] = true
}

function appendBotMessage(text, lastMessage) {
    const appChatBox = get(".msg-page");
    if (!lastMessage["user"]) {
        const botMessageHTML = `
          <p class="multi-msg">
            ${text}
          </p>
        `;

        const timeBox = get(".time")
        timeBox.insertAdjacentHTML("beforebegin", botMessageHTML)
        timeBox.innerHTML = formatDate(new Date())
    } else {
        const appChatBox = get(".msg-page");
        const botMessageHTML = `
            <div class="outgoing-chats">
              <div class="outgoing-chats-img">
                <img src="static/bot.png" />
              </div>
              <div class="outgoing-msg">
                <div class="outgoing-chats-msg">
                  <p class="multi-msg">
                    ${text}
                  </p>
                  <span class="time">${formatDate(new Date())}</span>
                </div>
              </div>
            </div>
        `;

        appChatBox.insertAdjacentHTML("beforeend", botMessageHTML)
    }
    appChatBox.scrollTop += 500;
    lastMessage["user"] = false

}

function getLLMResponse(userText, lastMessage) {
    $.get("/get", { user_input: userText }).done(function (data) {
    appendBotMessage(data, lastMessage)
    });

}