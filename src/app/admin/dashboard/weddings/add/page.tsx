"use client";

import DynamicForm from "@/components/Dashboard/FormLayout";
import { addWeddingAPI } from "@/actions/adminDashboard";
import { useToast } from "@/hooks/useToast";
import AdminLayout from "@/layouts/AdminLayout";
import { addWeddingFormFields } from "@/types/AdminFormFields";

const AddWedding: React.FC = () => {
  const { showError, showSuccess } = useToast();

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      const result = await addWeddingAPI(data);
      if (result.status) {
        showSuccess("Wedding and User created Sucessfully!");
      }
    } catch (err) {
      showError("Failed to add guest. Check if the name already exists.");
    }
  };

  return (
    <AdminLayout>
      <DynamicForm fields={addWeddingFormFields} onSubmit={handleSubmit} />{" "}
    </AdminLayout>
  );
};

export default AddWedding;
