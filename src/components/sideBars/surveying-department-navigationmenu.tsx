
import { LayoutDashboard } from "lucide-react";
import { SidebarMenuComponent } from "./SidebarMenu";

const surveyingMenuItems = [
  { title: "Dashboard", url: "/", icon: <LayoutDashboard /> },
  { title: "Data Upload", url: "/dataUpload", icon: <LayoutDashboard /> },
  { title: "Work Force", url: "/workForce", icon: <LayoutDashboard /> },
  { title: "Analytics", url: "/analytics", icon: <LayoutDashboard /> }
];

export function SurveyingNavigationMenu() {
  return (
    <SidebarMenuComponent
      title="Surveying"
      basePath="/surveying"
      menuItems={surveyingMenuItems}
    />
  );
}
