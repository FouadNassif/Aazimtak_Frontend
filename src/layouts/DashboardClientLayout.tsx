export const dynamic = "force-dynamic";
import React from "react";
import DashboardNavBase from "@/components/Dashboard/DashboardNav";
import AuthLayout from "@/layouts/AuthLayout";
import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { Box } from "@mui/material";

const DashboardClientLayout = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  const links = [
    { text: "Dashboard", link: "/dashboard" },
    {
      text: "guests",
      subLinks: [
        { text: "View Guests", link: "/dashboard/guests" },
        { text: "Add Guest", link: "/dashboard/guests/add" },
      ],
    },
    {
      text: "Wedding",
      subLinks: [
        { text: "Edit Wedding", link: "/dashboard/wedding/edit" },
        // { text: "Edit Wedding Images", link: "/dashboard/wedding/edit/images" },
        { text: "Show Wedding", link: "/dashboard/wedding/show" },
      ],
    },
    {
      text: "Account",
      subLinks: [{ text: "Edit Account", link: "/dashboard/account" }],
    },
  ];
  return (
    <AuthLayout requiredRole="client">
      <DashboardNavBase
        title="Clients Panel"
        username={user?.username}
        links={links}
        onLogout={async () => {
          await logout();
          router.push("/");
        }}
      >
        <Box>{children}</Box>
      </DashboardNavBase>
    </AuthLayout>
  );
};

export default DashboardClientLayout;
