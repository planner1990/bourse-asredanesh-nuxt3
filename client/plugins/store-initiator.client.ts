import { User, WealthSearchModel } from "@/types";
import { refreshKey, tokenKey, userKey } from "@/types/stores";
import { useUser, useWealth } from "~/composables";
import { needLogin } from "@/plugins/auth";
import { Pinia } from "pinia";

export default defineNuxtPlugin(async ({ $pinia }) => {
  const pinia = $pinia as Pinia;
  const route = useRoute();
  const router = useRouter();
  const userManager = useUser(pinia);
  const wealthManager = useWealth(pinia);
  let refresh = localStorage.getItem(refreshKey);
  let jwt = sessionStorage.getItem(tokenKey);
  let user = localStorage.getItem(userKey);
  if (refresh && user) {
    userManager.setRefresh(refresh);
    if (!jwt) {
      await userManager.refreshToken();
      user = userManager.state.userName;
    } else {
      userManager.setToken(jwt);
    }
    let u: User = userManager.me;
    if (u.userName == "anonymous") {
      if (typeof user === "string") {
        u = await userManager.getUser(user);
      }
      await wealthManager.getWealth(new WealthSearchModel());
    }
    if (route.fullPath == "/login") router.push(userManager.me.settings.home);
  } else if (needLogin(route.fullPath)) {
    userManager.logout();
    if (needLogin(route.fullPath)) {
      router.push("/login");
    }
  }
});
