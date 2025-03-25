import DepartmentLayout from "@/components/layouts/DepartmentLayout";
import { laboratoryNavigationMenu } from "@/components/sideBars/lab-department-navigationmenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DepartmentLayout SidebarComponent={laboratoryNavigationMenu}>
      {children}
    </DepartmentLayout>
  );
}
