import DepartmentLayout from "@/components/layouts/DepartmentLayout";
import { MiningDepartmentNavigationMenu } from "@/components/sideBars/mining-department-navigationmenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DepartmentLayout SidebarComponent={MiningDepartmentNavigationMenu}>
      {children}
    </DepartmentLayout>
  );
}
