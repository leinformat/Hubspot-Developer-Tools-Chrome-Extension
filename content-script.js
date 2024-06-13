//******************** */ Developer Options ************************* //

// End Utility functions
window.addEventListener("load", (e) =>{
  const currentUrl = window.location.href;

  if (currentUrl.includes("https://app.hubspot.com/design-manager/") || currentUrl.includes("https://app-eu1.hubspot.com/design-manager/")){
      setTimeout(() => {
        console.log("Editorrrrrrrrr");

        // Content script to inject the actual script into the page
        const script = document.createElement("script");
        script.src = chrome.runtime.getURL("monaco/inject.js");
        script.onload = function () {
          this.remove();
        };
        (document.head || document.documentElement).appendChild(script);

        // Inject CSS
        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = chrome.runtime.getURL("monaco/styles.css");
        (document.head || document.documentElement).appendChild(style);

      }, 1000);
  }
});
