import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ElMessage } from "element-plus";
import type { RouteLocationNormalized } from "vue-router";
import { useApplicationStore, usesubjectsStore, useUsersStore } from "./stores";
import { i18n } from "@/i18n";
const title = "Admission";

NProgress.configure({ showSpinner: false });
const whiteList = ["/sign-up", "/login", "/verify", "/forgot-password"];
const getPageTitle = (key: string) => {
  const { t, te } = i18n.global as any;
  const hasKey = te(`app.${key}`) as any;
  if (hasKey) {
    const pageName = t(`app.${key}`);

    return `${pageName} - ${title}`;
  }
  return title;
};
const isUserLoggedIn = (store: ReturnType<typeof useUsersStore>): boolean => {
  return !!store.token;
};
const redirectToLogin = (next: Function, redirectPath: string): void => {
  next(`/sign-up?redirect=${redirectPath}`);
  NProgress.done();
};
const redirectTo = (next: Function, path: string, replace = true): void => {
  next({ path, replace });
  NProgress.done();
};

router.beforeEach(async (to: RouteLocationNormalized, _, next) => {
  const store = useUsersStore();
  NProgress.start();

  if (isUserLoggedIn(store)) {
    if (["/login", "/sign-up", "/verify"].includes(to.path)) {
      return redirectTo(next, "/");
    }
    if (!store.getUser) {
      try {
        await store.getUserInfo();
        if (!store.user) {
          store.resetToken();
          return redirectToLogin(next, to.path);
        }
        if (store.user?.register_status && to.path === "/contact-info") {
          return redirectTo(next, "/");
        }
        if (!store.user?.register_status) {
          return redirectTo(next, "/contact-info");
        }
        if (_.name == "complete-personal-information") {
          const currentUser = useApplicationStore();
          if (currentUser.taskByUser?.updated_at) {
            next({ name: "personal-information" });
          }
        }
        next();
      } catch (err: any) {
        store.resetToken();
        ElMessage({
          message: err?.message || "Xatolik yuz berdi",
          type: "error",
          duration: 5000,
        });
        redirectToLogin(next, to.path);
      }
    } else {
      next();
    }
  } else {
    const isPublicRoute = whiteList.includes(to.path);
    isPublicRoute ? next() : redirectToLogin(next, to.path);
  }
});

router.afterEach((to: RouteLocationNormalized) => {
  NProgress.done();
  document.title = getPageTitle((to.name || "") as string);
});
