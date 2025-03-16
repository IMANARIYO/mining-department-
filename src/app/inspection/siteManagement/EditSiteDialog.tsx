import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getSiteById, updateSite } from "@/services/siteService";
import { useMediaQuery } from "@mui/material";

interface EditSiteDialogProps {
  site: {
    id: string;
    name: string;
    location: string;
    projectManager: string;
    startDate: string;
    endDate: string;
  };
  onSuccess: () => void;
}

export function EditSiteDialog({ site, onSuccess }: EditSiteDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Use initial site data immediately
  const [formData, setFormData] = React.useState({ ...site });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Fetch site data when dialog opens, but only update if different
  React.useEffect(() => {
    if (open) {
      getSiteById(site.id)
        .then((response) => {
          const { id, name, location, projectManager, startDate, endDate } =
            response.data;
          const newData = {
            id,
            name,
            location,
            projectManager,
            startDate,
            endDate
          };

          // Update state only if data is different
          if (JSON.stringify(newData) !== JSON.stringify(formData)) {
            setFormData(newData);
          }
        })
        .catch(() => toast.error("Failed to fetch site data"));
    }
  }, [open, site.id]);

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle update
  // const handleUpdate = async () => {
  //   try {
  //     setIsSubmitting(true);
  //     await updateSite(site.id, formData);
  //     toast.success("Site updated successfully");
  //     setOpen(false);
  //     onSuccess();
  //   } catch (error) {
  //     toast.error("Failed to update site");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
const handleUpdate = async () => {
  try {
    setIsSubmitting(true);

    // Destructure to exclude 'id' from formData
    const { id, ...dataWithoutId } = formData;

    // Send the updated site data excluding the 'id'
    await updateSite(site.id, dataWithoutId);

    toast.success("Site updated successfully");
    setOpen(false);
    onSuccess();
  } catch (error) {
    toast.error("Failed to update site");
  } finally {
    setIsSubmitting(false);
  }
};

  const FormContent = (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <Input
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="projectManager">Project Manager</Label>
        <Input
          name="projectManager"
          value={formData.projectManager}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="startDate">Start Date</Label>
        <Input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="endDate">End Date</Label>
        <Input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>
      <Button onClick={handleUpdate} disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save changes"}
      </Button>
    </div>
  );

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Site</DialogTitle>
          <DialogDescription>Make changes to the site here.</DialogDescription>
        </DialogHeader>
        {FormContent}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Site</DrawerTitle>
          <DrawerDescription>Make changes to the site here.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">{FormContent}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
