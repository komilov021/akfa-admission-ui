import type { ISidebarItem } from "@/models/frontend";
import {
  ActiveBookIcon,
  BookIcon,
  DocumentIcon,
  ActiveDocumentIcon,
} from "@/components/icons";

export const allRoutes: any[] = [
  {
    route: "/dashboard",
    title: "Exams",
    icon: BookIcon,
    isActiveIcon: ActiveBookIcon,
  },
  {
    route: "/contract",
    title: "Contract",
    icon: DocumentIcon,
    isActiveIcon: ActiveDocumentIcon,
  },
];
export const initalRoutes: any[] = [
  {
    route: "/dashboard",
    title: "Exams",
    icon: BookIcon,
    isActiveIcon: ActiveBookIcon,
  },
];
export const subJectListForNull: any[] = [
  {
    route: "/personal-information",
    title: "Complete Information",
    icon: BookIcon,
    isActiveIcon: ActiveBookIcon,
  },
];
export const onlyNumber = ($event: any) => {
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    $event.preventDefault();
  }
};
