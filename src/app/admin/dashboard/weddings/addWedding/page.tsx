"use client";

import DynamicForm from "@/components/Dashboard/FormLayout";
import { addWeddingAPI } from "@/actions/adminDashboard";
import { useToast } from "@/hooks/useToast";
const AddWedding: React.FC = () => {
  const formFields = [
    {
      name: "groom_name",
      label: "Groom's First Name",
      type: "text",
      required: true,
    },
    {
      name: "groom_lastname",
      label: "Groom's Last Name",
      type: "text",
      required: true,
    },
    {
      name: "bride_name",
      label: "Bride's First Name",
      type: "text",
      required: true,
    },
    {
      name: "bride_lastname",
      label: "Bride's Last Name",
      type: "text",
      required: true,
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
    },
    {
      name: "confirm_password",
      label: "Confirm Password",
      type: "password",
      required: true,
    },
  ];

  const { showError, showSuccess } = useToast();

  const handleSubmit = async (data: Record<string, any>) => {
    console.log(data);
    try {
      const result = await addWeddingAPI(data);
      if (result.status) {
        showSuccess("Wedding and User created Sucessfully!");
      }
    } catch (err) {
      showError("Failed to add guest. Check if the name already exists.");
    }
    console.log("Login Data:", data);
  };

  return <DynamicForm fields={formFields} onSubmit={handleSubmit} />;
};

export default AddWedding;
