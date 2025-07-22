export const dynamic = "force-dynamic";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardNavBase from "@/components/Dashboard/DashboardNav";
import { useAuth } from "@/context/AuthProvider";
import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import { ThemeContextProvider } from "@/context/theme-context";

const adminLinks = [
  { text: "Dashboard", link: "/admin/dashboard" },
  {
    text: "Manage Weddings",
    subLinks: [
      { text: "View Weddings / Users", link: "/admin/dashboard/weddings" },
      { text: "Add Wedding", link: "/admin/dashboard/weddings/add" },
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

export default function AdminLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <ThemeContextProvider>
      <AuthLayout requiredRole="admin" >
        <DashboardNavBase
          title="Admin Panel"
          username={user?.username}
          links={adminLinks}
          onLogout={async () => {
            await logout();
            router.push("/");
          }}
        >
          <Box sx={{ p: 3 }}>{children}</Box>
        </DashboardNavBase>
      </AuthLayout>
    </ThemeContextProvider>
  );
}
