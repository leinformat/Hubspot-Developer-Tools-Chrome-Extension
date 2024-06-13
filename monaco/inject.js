(function() {
  const language = {
    "code-pane-hubl-html":"html",
    "code-pane-hubl-css": "css",
    "code-pane-hubl-javascript": "javascript",
  };
  
  const initVsCode = (codeData) => {
    const editor = monaco.editor.create(codeData.element, {
      value: `${codeData.value}}`,
      language: codeData.language,
      theme: "vs-dark",
      autoClosingBrackets: 'always',
      bracketPairColorization: { enabled: true },
      semanticHighlighting: {
        enabled: true
    }
    });

    // Adjust the editor size when the window or container is resized
    function adjustEditorSize() {
      editor.layout({
        width: codeData.element.clientWidth,
        height: codeData.element.clientHeight,
      });
    }

    window.addEventListener("resize", adjustEditorSize);
    new ResizeObserver(adjustEditorSize).observe(codeData.element);

    // Initial adjustment
    adjustEditorSize();
  }; 

  // Create a container for the editor
  const editorContainer = document.querySelectorAll("div.code-pane-accordion");

  // Load Monaco Editor from CDN
  const loaderScript = document.createElement("script");
  // https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs/loader.js
  //https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs/loader.min.js
  // https://unpkg.com/monaco-editor@latest/min/vs/loader.js
  loaderScript.src = "https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs/loader.js";

  loaderScript.onload = function () {

    require.config({
      // https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs
      // https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs
      // https://unpkg.com/monaco-editor@latest/min/vs
      paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs" },
    });

    editorContainer.forEach((codeItem) =>{
        // EDITOR CONTAINER
        const newEditor = document.createElement("section");
        newEditor.classList.add("monaco-editor-container");

        const hubspotEditorCurrentContent = codeItem.querySelector('.react-codemirror > textarea');

        const getLanguage = codeItem.dataset.testId;

        require(["vs/editor/editor.main"], function () {
            initVsCode({element: newEditor, language:language[getLanguage], value: hubspotEditorCurrentContent.value });
        });

        codeItem.append(newEditor);
    });

  };

  document.body.appendChild(loaderScript);
})();