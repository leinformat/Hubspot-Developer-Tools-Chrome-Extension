// main.js
import { handleMessage } from "./modules/background/message.js";

chrome.runtime.onStartup.addListener(() =>{
  console.log('Start Extension')
});

chrome.runtime.onMessage.addListener(handleMessage);