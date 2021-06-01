import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "firebase/auth";
import { FirebaseAuth } from "@/lib/Firebase";

import "./assets/styles/main.css";

FirebaseAuth.onAuthStateChanged(async (user) => {
  if (!user) {
    createApp(App)
      .use(router)
      .mount("#app");
  }
});
