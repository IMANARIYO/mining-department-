// SiteTable.tsx
import { useState } from "react";
import { deleteSite } from "@/services/siteService";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { EditSiteDialog } from "./EditSiteDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

// Inline type definitions
interface Site {
  id: string;
  name: string;
  location: string;
  projectManager: string;
  startDate: string;
  endDate: string;
}

interface SiteTableProps {
  sites: Site[];
  loading: boolean;
  onEdit?: (site: Site) => void; // Make this optional since we'll handle it internally
  onDeleteSuccess: () => void;
}

interface DeleteSiteButtonProps {
  siteId: string;
  onDeleteClick: (id: string) => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}

const SiteTable = ({
  sites,
  loading,
  onEdit,
  onDeleteSuccess
}: SiteTableProps) => {
  const [siteToDelete, setSiteToDelete] = useState<string | null>(null);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  // Handle delete confirmation
  const handleDeleteSite = async () => {
    if (!siteToDelete) return;
    try {
      await deleteSite(siteToDelete);
      toast.success("Site deleted successfully");
      onDeleteSuccess();
      setSiteToDelete(null); // Reset siteToDelete after successful deletion
    } catch (error) {
      toast.error("Failed to delete site");
    }
  };

  // Handle edit click
  const handleEditClick = (site: Site) => {
    if (onEdit) {
      // If parent component wants to handle editing
      onEdit(site);
    } else {
      // Handle internally
      setSelectedSite(site);
    }
  };

  // Handle success of edit operation
  const handleEditSuccess = () => {
    setSelectedSite(null); // Close the dialog
    onDeleteSuccess(); // Refresh the data (reusing the onDeleteSuccess callback)
  };

  return (
    <div className="mt-8">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <DataTable
            columns={[
              "name",
              "location",
              "projectManager",
              "startDate",
              "endDate"
            ]}
            rows={sites}
            actions={(site) => [
              <Button key="view" variant="outline">
                View
              </Button>,
              <Button
                key="edit"
                variant="outline"
                onClick={() => handleEditClick(site as Site)} asChild>
                <EditSiteDialog
                  site={site as Site}
                  onSuccess={handleEditSuccess}
                />
              </Button>,
              <DeleteSiteButton
                key="delete"
                siteId={(site as Site).id}
                onDeleteClick={setSiteToDelete}
                onConfirmDelete={handleDeleteSite}
                onCancelDelete={() => setSiteToDelete(null)}
              />
            ]}
            loading={loading}
            title="All Sites"
          />

        </>
      )}
    </div>
  );
};

// Further component extraction for the delete button with alert dialog
const DeleteSiteButton = ({
  siteId,
  onDeleteClick,
  onConfirmDelete,
  onCancelDelete
}: DeleteSiteButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" onClick={() => onDeleteClick(siteId)}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this site?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Please confirm if you want to delete
            the site.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancelDelete}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SiteTable;
