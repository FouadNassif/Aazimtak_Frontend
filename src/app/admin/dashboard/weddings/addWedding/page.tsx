"use client";

import DynamicForm from "@/components/Dashboard/FormLayout";
import { addWeddingAPI } from "@/actions/adminDashboard";
import { useToast } from "@/hooks/useToast";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardNavBase from "@/components/Dashboard/DashboardNav";
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

  const adminLinks = [
    { text: "Dashboard", link: "/admin/dashboard" },
    {
      text: "Manage Users",
      subLinks: [
        { text: "View Users", link: "/admin/users" },
        { text: "Add User", link: "/admin/users/add" },
      ],
    },
    {
      text: "Site Settings",
      subLinks: [
        { text: "General Settings", link: "/admin/settings/general" },
        { text: "Appearance", link: "/admin/settings/appearance" },
      ],
    },
    { text: "Reports", link: "/admin/reports" },
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

  return (
    <AuthLayout requiredRole="admin">
      <DashboardNavBase
        title="Admin Panel"
        username="admin"
        links={adminLinks}
        onLogout={async () => {
          await logout();
          router.push("/");
        }}
      />
      <DynamicForm fields={formFields} onSubmit={handleSubmit} />{" "}
    </AuthLayout>
  );
};

export default AddWedding;
