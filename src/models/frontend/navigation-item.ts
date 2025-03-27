export interface INavigationItem {
  route: string;
  title: string;
  icon: any;
  description: string;
  shortName: string;
  childrens?: INavigationItem[];
}

export interface ISidebarItem {
  route: string;
  title: string;
  icon: any;
  children?: any;
  isActiveIcon: any;
}
