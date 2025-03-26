import { LayoutDashboard } from "lucide-react";
import { SidebarMenuComponent } from "./SidebarMenu";

const surveyingMenuItems = [
  { title: "Dashboard", url: "/", icon: <LayoutDashboard /> },
  { title: "new sample", url: "/datahub", icon: <LayoutDashboard /> },
  { title: "samples", url: "/samples", icon: <LayoutDashboard /> },
  { title: "Analytics", url: "/analysis", icon: <LayoutDashboard /> }
];

export function laboratoryNavigationMenu() {
  return (
    <SidebarMenuComponent
      title="laboaratory"
      basePath="/lab"
      menuItems={surveyingMenuItems}
    />
  );
}
