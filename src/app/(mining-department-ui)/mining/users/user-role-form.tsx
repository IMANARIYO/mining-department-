"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getRoles } from "@/services/roleService";
import {
  addRolesToUser,
  getRolesForUserId,
  removeRolesFromUser
} from "@/services/userService";

type Role = { id: string; name: string };

type UserRoleFormProps = {
  userId: string;
  onComplete: () => void;
};

export function UserRoleForm({ userId, onComplete }: UserRoleFormProps) {
  const [roles, setRoles] = useState<Role[]>([]); // All available roles
  const [userRoles, setUserRoles] = useState<string[]>([]); // Roles assigned to the user
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial data fetch
  const [isSaving, setIsSaving] = useState(false); // Saving state to disable the save button during submission
  const [error, setError] = useState<string | null>(null); // Error state for any API issues

useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);

      // Fetch roles and user roles in parallel
      const [rolesData, userRolesData] = await Promise.all([
        getRoles(),
        getRolesForUserId(userId)
      ]);

      if (!rolesData || rolesData.length === 0) {
        setError("No roles available");
      } else {
        setRoles(rolesData.data);
      }

      if (userRolesData && userRolesData.data.length > 0) {
        
        setUserRoles(
          userRolesData.data.map(
            (userRole: { roleId: string }) => userRole.roleId
          )
        );
      } else {
        setError("No roles assigned to this user");
      }
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast.error(error.message || "Failed to load roles");
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  if (userId) fetchData();
}, [userId]);


  const handleRoleToggle = (roleId: string) => {
    setUserRoles(
      (prev) =>
        prev.includes(roleId)
          ? prev.filter((id) => id !== roleId) // Remove the role if already assigned
          : [...prev, roleId] // Add the role if not assigned
    );
  };

const handleSubmit = async () => {
  console.log("Handling submission...");

  try {
    setIsSaving(true);

    // Get previously assigned roles
    const previouslyAssignedRoles = await getRolesForUserId(userId);
    const previouslyAssignedIds = previouslyAssignedRoles.data.map(
      (r: { roleId: string }) => r.roleId
    );

    // Roles to add: roles selected now but were NOT previously assigned
    const rolesToAdd = userRoles.filter(
      (roleId) => !previouslyAssignedIds.includes(roleId)
    );

    // Roles to remove: roles that WERE previously assigned but are NOT in userRoles anymore
 const rolesToRemove = previouslyAssignedIds.filter(
   (roleId: string) => !userRoles.includes(roleId)
 );

    console.log("Roles to add:", rolesToAdd);
    console.log("Roles to remove:", rolesToRemove);

    // Add new roles
    if (rolesToAdd.length > 0) {
      await addRolesToUser(userId, rolesToAdd);
    }

    // Remove roles that the user no longer needs
    if (rolesToRemove.length > 0) {
      await removeRolesFromUser(userId, rolesToRemove);
    }

    toast.success("User roles updated successfully");
    onComplete();
  } catch (error: any) {
    console.error("Error updating user roles:", error);
    toast.error(error.message || "Failed to update user roles");
  } finally {
    setIsSaving(false);
  }
};


  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4 py-4">
      {/* Error handling */}
      {error && (
        <div className="text-center text-red-500 py-4">
          <p>{error}</p>
        </div>
      )}

      {/* Available Roles Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Roles</h3>
        {roles.length === 0 ? (
          <p>No roles available. Please create roles first.</p>
        ) : (
          roles.map((role) => {
            const isAssigned = userRoles.includes(role.id); // Check if the user has this role

            return (
              <div key={role.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`role-${role.id}`}
                  checked={isAssigned} // Checkbox is checked if user has the role
                  onCheckedChange={() => handleRoleToggle(role.id)} // Handle toggle for adding/removing roles
                />
                <label
                  htmlFor={`role-${role.id}`}
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    isAssigned ? "text-blue-500" : "text-gray-700"
                  }`}>
                  {role.name}
                </label>
                {isAssigned && (
                  <span className="text-sm text-blue-500">(Assigned)</span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Assigned Roles Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Assigned Roles</h3>
        {userRoles.length === 0 ? (
          <p>No roles assigned to this user.</p>
        ) : (
          userRoles.map((roleId) => {
            const role = roles.find((r) => r.id === roleId);
            return role ? (
              <div key={role.id} className="flex items-center space-x-2">
                <span className="text-sm text-blue-500">{role.name}</span>
              </div>
            ) : null;
          })
        )}
      </div>

      <DialogFooter>
        <Button onClick={handleSubmit} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </DialogFooter>
    </div>
  );
}
