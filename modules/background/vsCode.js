function injectFiles(id, files) {
  return chrome.scripting.executeScript({
    target: { tabId: id },
    files: files,
    world: "ISOLATED",
  });
}



async function vsCodeEditor(tab) {
  
  await injectFiles(tab.id, [
    "monaco-editor/min/vs/editor/editor.main.nls.js",
    "monaco-editor/min/vs/editor/editor.main.js",
  ]);
  /*
  const files = [
    "monaco-editor/min/vs/basic-languages/html/html.js",
    "monaco-editor/min/vs/basic-languages/css/css.js",
    "monaco-editor/min/vs/basic-languages/javascript/javascript.js",
  ];
  await injectFiles(tab.id, files); // everything from basic-languages folder
 */
}

export const vsCode = (pageUrl) => {
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach((tab) => {
        //console.log(tab.url);
        if (tab.url.includes(pageUrl)) {
          //console.log("Yessssss", pageUrl);
          vsCodeEditor(tab)
        }
      });
    });
  };