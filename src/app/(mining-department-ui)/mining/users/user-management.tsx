"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { UserForm } from "./user-form";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} from "@/services/userService";
import { type User, userColumns } from "./user-columns";
import { toast } from "sonner";
import { UserRoleForm } from "./user-role-form";
import { DataTable } from "@/components/tablesUtils/data-table";

export default function UserManagement() {

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Define fetchUsers function first
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
        const data = await getUsers();

      setUsers(data.data);
      
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users")

    } finally {
      setIsLoading(false);
    }
  };

  // Then use it in useEffect
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (userData: any) => {
    try {
    await createUser(userData); // ✅ Using API service
    toast.success("User created successfully");
    setIsCreateDialogOpen(false);
    fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user")
 
    }
  };

  const handleUpdateUser = async (userData: any) => {
    if (!selectedUser) return;

    try {
        await updateUser(selectedUser.id, userData); // ✅ Using API service
        toast.success("User updated successfully");
        setIsEditDialogOpen(false);
        fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user")

    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
    await deleteUser(userId); // ✅ Using API service
    toast.success("User deleted successfully");
    fetchUsers();
    return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user")
 
      return false;
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleManageRoles = (user: User) => {
    setSelectedUser(user);
    setIsRoleDialogOpen(true);
  };

  // Mock data for demonstration
  const mockUsers = [
    {
      id: "1",
      name: "Janice Monahan",
      email: "janice.monah@example.com",
      project: "MINESITE A",
      department: "Incineration",
      role: "Inventory Lead",
      status: "active",
      lastLogin: "Today, 11pm",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15"
    },
    {
      id: "2",
      name: "Rollin Fadel",
      email: "rollig@gmal.com",
      project: "MINISITE B",
      department: "Recycling",
      role: "Inventory Lead",
      status: "active",
      lastLogin: "Today, 11pm",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15"
    },
    {
      id: "3",
      name: "2025-03-03 10:30 AM",
      email: "rollig@gmal.com",
      project: "Biohazard",
      department: "rollinfadel@gmail.com",
      role: "Inventory Lead",
      status: "suspended",
      lastLogin: "Today, 11pm",
      createdAt: "2023-01-15",
      updatedAt: "2023-01-15"
    }
  ];

  const columns = userColumns({
    onEdit: handleEditUser,
    onManageRoles: handleManageRoles,
    onDelete: handleDeleteUser
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Users</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New User
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={isLoading ? [] :users}
      
       
      />

      {/* Create User Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new user.
            </DialogDescription>
          </DialogHeader>
          <UserForm onSubmit={handleCreateUser} />
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user details.</DialogDescription>
          </DialogHeader>
          <UserForm user={selectedUser as any} onSubmit={handleUpdateUser} />
        </DialogContent>
      </Dialog>

      {/* Manage User Roles Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manage User Roles</DialogTitle>
            <DialogDescription>
              Assign or remove roles for this user.
            </DialogDescription>
          </DialogHeader>
          <UserRoleForm
            userId={selectedUser?.id || ""}
            onComplete={() => {
              setIsRoleDialogOpen(false);
              fetchUsers();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
