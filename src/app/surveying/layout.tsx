import DepartmentLayout from "@/components/layouts/DepartmentLayout";
import { SurveyingNavigationMenu } from "@/components/sideBars/surveying-department-navigationmenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DepartmentLayout SidebarComponent={SurveyingNavigationMenu}>
      {children}
    </DepartmentLayout>
  );
}
