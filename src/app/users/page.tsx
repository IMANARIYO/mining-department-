import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


import UserManagement from "./user-management";
import RoleManagement from "./roles/role-management";

export default function Home() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User & Roles Management</h1>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="mt-6">
          <UserManagement />
        </TabsContent>
        <TabsContent value="roles" className="mt-6">
          <RoleManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
