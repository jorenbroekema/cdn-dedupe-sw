import { LionButton as LionButton1 } from "https://cdn.jsdelivr.net/npm/@lion/ui@0.1.5/button.js/+esm";
import { LionButton as LionButton2 } from "https://cdn.jsdelivr.net/npm/@lion/ui@0.1.4/button.js/+esm";
import { LionButton as LionButton3 } from "https://cdn.jsdelivr.net/npm/@lion/ui@0.1.3/button.js/+esm";
import { html, LitElement } from "lit";

async function registerAndLoadSw() {
  if ("serviceWorker" in navigator) {
    const reg = await navigator.serviceWorker.register("/cdn-dedupe-sw.js", {
      type: "module",
    });
    if (reg.active) {
      return;
    }
    reg.addEventListener("updatefound", () => {
      const newWorker = reg.installing;
      newWorker.addEventListener("statechange", () => {
        if (newWorker.state === "activated") {
          // force reload now that SW is activated and ready to intercept
          // network requests and load from our (manually filled) cache
          location.reload();
        }
      });
    });
  }
}

registerAndLoadSw();

customElements.define("lion-button-1", LionButton1);
customElements.define("lion-button-2", LionButton2);
customElements.define("lion-button-3", LionButton3);

class Experiment extends LitElement {
  firstUpdated() {
    const elem = document.createElement("p");
    elem.innerText = `buttons are instance of first button: ${[
      ...this.shadowRoot.children,
    ].map((child) => child instanceof LionButton1)}`;
    document.body.appendChild(elem);
    console.log(123, LionButton1 === LionButton2);
  }

  render() {
    return html`
      <lion-button-1 data-button>Click me 1</lion-button-1>
      <lion-button-2 data-button>Click me 2</lion-button-2>
      <lion-button-3 data-button>Click me 3</lion-button-3>
    `;
  }
}

customElements.define("experiment-thing", Experiment);
