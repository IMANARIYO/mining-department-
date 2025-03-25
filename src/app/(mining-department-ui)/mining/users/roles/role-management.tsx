"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RoleForm } from "./role-form";

import { type Role, roleColumns } from "./role-columns";

import { DataTable } from "@/components/tablesUtils/data-table";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole
} from "@/services/roleService";
import { toast } from "sonner";

export default function RoleManagement() {

  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Fetch roles from backend
  const fetchRoles = async () => {
    try {
      setIsLoading(true);
      const data = await getRoles();
      setRoles(data.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("Failed to load roles");
   
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreateRole = async (roleData: { name: string }) => {
    try {
      await createRole(roleData);
      toast.success("Role created successfully")
   
      setIsCreateDialogOpen(false);
      fetchRoles();
    } catch (error) {
      console.error("Error creating role:", error);
      toast.error("Failed to create role");
    
    }
  };

  const handleUpdateRole = async (roleData: { name: string }) => {
    if (!selectedRole) return;
    try {
      await updateRole(selectedRole.id, roleData);
      toast.success
   
      setIsEditDialogOpen(false);
      fetchRoles();
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
   
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    try {
      await deleteRole(roleId);
      toast.success("Role deleted successfully")
  
      fetchRoles();
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error("Failed to delete role");
     
    }
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsEditDialogOpen(true);
  };

  const columns = roleColumns({
    onEdit: handleEditRole,
    onDelete: handleDeleteRole,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Roles</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Role
        </Button>
      </div>

      <DataTable columns={columns} data={isLoading ? [] : roles} />

      {/* Create Role Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>Enter a name for the new role.</DialogDescription>
          </DialogHeader>
          <RoleForm onSubmit={handleCreateRole} />
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>Update the role name.</DialogDescription>
          </DialogHeader>
          <RoleForm role={selectedRole} onSubmit={handleUpdateRole} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
