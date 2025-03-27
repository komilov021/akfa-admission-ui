import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import { i18n } from "./i18n";
import AppTag from "@/components/common/AppTag.vue";
import "@/permissions";

// Styles
import "./assets/styles/main.scss";
import "./assets/styles/element/index.scss";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "aos/dist/aos.css";
import { mask } from "vue-the-mask";
import VOtpInput from "vue3-otp-input";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component("v-otp-input", VOtpInput);
app.component("app-tag", AppTag);

app.use(i18n);
app.use(createPinia());
app.use(ElementPlus);
app.use(router);

// Directives
app.directive("mask", mask as any);

app.mount("#app");
