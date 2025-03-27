import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "@/layout/DashboardLayout.vue";
import LoginLayout from "@/layout/LoginLayout.vue";
import { useApplicationStore } from "@/stores";
const isDev =
  window?.location?.origin.includes("http://localhost") ||
  window?.location?.origin.includes("dev");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/dashboard" },
    {
      path: "/",
      component: DashboardLayout,
      children: [
        {
          path: "",
          redirect: "/dashboard",
        },
        // {
        //   path: "dashboard",
        //   name: "dashboard",
        //   component: () => import("@/views/dashboard/ExamsView.vue"),
        //   meta: { breadcrumb: "dashboard" },
        // },
        {
          path: "dashboard",
          name: "dashboard",
          component: isDev
            ? () => import("@/views/dashboard/ExamsView.vue")
            : () => import("@/views/dashboard/Congratulation.vue"),
          meta: { breadcrumb: "dashboard" },
        },
        {
          path: "dashboard/success",
          name: "dashboard-success",
          component: () => import("@/views/dashboard/ExamsView.vue"),
          meta: { breadcrumb: "dashboard-success" },
        },
        {
          path: "dashboard/failed",
          name: "dashboard-failed",
          component: () => import("@/views/dashboard/ExamsView.vue"),
          meta: { breadcrumb: "dashboard-failed" },
        },
        {
          path: "contract",
          name: "contract",
          component: () => import("@/views/dashboard/ContractView.vue"),
          meta: { breadcrumb: "contract" },
        },
        {
          path: "personal-information",
          name: "personal-information",
          component: () => import("@/views/dashboard/PersonalInfoView.vue"),
          meta: { breadcrumb: "personal-information" },
        },
        {
          path: "complete-information",
          name: "complete-personal-information",
          component: () => import("@/views/dashboard/CompleteInformation.vue"),
          meta: { breadcrumb: "complete-information" },
        },
      ],
    },
    {
      path: "/",
      component: LoginLayout,
      children: [
        {
          path: "",
          redirect: "/sign-up",
        },
        {
          path: "sign-up",
          name: "sign-up",
          meta: { breadcrumb: "sign-up" },
          component: () => import("@/views/auth/SignupView.vue"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/views/auth/LoginView.vue"),
          meta: { breadcrumb: "login" },
        },
        {
          path: "verify",
          name: "verify",
          meta: { breadcrumb: "verify" },
          component: () => import("@/views/auth/VerifyView.vue"),
        },
        {
          path: "contact-info",
          name: "contact-info",
          meta: { breadcrumb: "contact-info" },
          component: () => import("@/views/auth/ContactInfo.vue"),
        },
        {
          path: "forgot-password",
          name: "forgot-password",
          meta: { breadcrumb: "forgot-password" },
          component: () => import("@/views/auth/ForgotPassword.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/404/404.vue"),
    },
  ],
});

export default router;
