// Create the Element function
const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  element.className = className;
  if (text) {
    element.innerHTML = text;
  }
  return element;
};

class ChatApp {
  constructor() {
    this.CLASS_MESSAGE = 'chat-right';
    this.CLASS_TEXT = 'chat-text';
    this.getElements();
  }
  init() {
    this.eventsHandlers();
  }

  // catch the elements
  getElements() {
    this.formOptions = document.forms['options'];
    this.radioOptions = Array.from(this.formOptions.elements);
    this.formMessage = document.forms['message'];
    this.inputMessage = this.formMessage.elements[0];
    this.chat = document.querySelector('.app__chat');
  }

  //  Apply events listeners
  eventsHandlers() {
    // For radio buttons
    this.radioOptions.forEach((option) => {
      option.addEventListener('change', (event) => {
        event.preventDefault();
        this.handleRadio(event);
      });
    });
    //  For inpunt message
    this.formMessage.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmit();
    });
  }

  // Handle the radio buttons
  handleRadio(event) {
    const radioButton = event.currentTarget;
    const label = radioButton.parentNode;
    this.messageToSend(label.innerText);
    // When an option is selected, the buttons will be disabled
    this.radioOptions.forEach((option) => (option.disabled = true));
  }

  // Handle the submit form
  handleSubmit() {
    const message = this.inputMessage.value;
    if (message !== '') {
      this.messageToSend(message);
      this.inputMessage.value = '';
    }
  }

  // Append the message to send
  messageToSend(messageText) {
    const message = this.createMessage(messageText);
    message.style.animationDelay = '0s';
    message.style.animationDuration = '0.5s';
    this.chat.append(message);
  }

  //  Create the message
  createMessage(messageText) {
    // Create the message container
    const message = createElement('div', this.CLASS_MESSAGE);
    const text = createElement('p', this.CLASS_TEXT, messageText);
    // message.classList.add(`${this.CLASS_MESSAGE}_sent`)
    message.append(text);
    return message;
  }
}

// Initialize chatApp when the content was loaded
document.addEventListener('DOMContentLoaded', (event) => {
  const chatApp = new ChatApp();
  chatApp.init();
});
