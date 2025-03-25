
import { User } from "lucide-react";
import { SidebarMenuComponent } from "./SidebarMenu";

const miningMenuItems = [
  { title: "Performance", url: "/", icon: "⭕" },
  { title: "Production", url: "/production", icon: "🔺" },
  { title: "Users", url: "/users", icon: <User /> },
  { title: "Inspection", url: "/inspection", icon: "▣" },
  { title: "RFD", url: "/rfd", icon: "☑" },
  { title: "Reports", url: "/reports", icon: "↻" },
  { title: "Settings", url: "/settings", icon: "⚙" }
];

export function MiningDepartmentNavigationMenu() {
  return (
    <SidebarMenuComponent
      title="Minetech"
      basePath="/mining"
      menuItems={miningMenuItems}
    />
  );
}
