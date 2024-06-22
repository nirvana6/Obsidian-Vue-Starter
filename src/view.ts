import { ItemView, WorkspaceLeaf } from "obsidian";
import { createApp } from "vue";
import type { App as VueApp } from "vue";

import { Quasar } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

import App from "./App.vue";

export const VIEW_TYPE = "my-view";

export class MyView extends ItemView {
  vueapp?: VueApp;
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }
  getViewType(): string {
    return VIEW_TYPE;
  }
  getDisplayText(): string {
    return "Vue Stater";
  }
  getIcon(): string {
    return "dice";
  }
  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    const content = container.createEl("div", {
      cls: "my-plugin-view",
    });

    this.vueapp = createApp(App);
    this.vueapp.use(Quasar, { plugins: {} });
    this.vueapp.mount(content);
  }

  async onClose() {
    if (this.vueapp) {
      this.vueapp.unmount();
    }
  }
}
