export interface MenuRoute {
  path: string;
  name: string;
}

export interface MenuItem {
  value: string;
  label: string;
  icon: string;
  to: string | MenuRoute;
  onClick?: () => void;
}

export interface MenuSiderOption {
  theme: string;
  defaultValue: string;
  height: string;
  logo: {
    width: string;
    class: string;
  };
  items: Array<MenuItem>;
}
