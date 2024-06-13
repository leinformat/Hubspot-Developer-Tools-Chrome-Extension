// VSCODE
import { vsCode } from "./vsCode.js";

// Function to handle incoming messages
export function handleMessage(request, sender, sendResponse) {
  if(request.designManager){
    vsCode(request.designManager);
  }
}