import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) {
  const { isAuth, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    } else if (requiredRole && user?.role !== requiredRole) {
      router.push("/unauthorized");
    }
  }, [isAuth, user?.role, requiredRole, router]);
  if (!isAuth || (requiredRole && user?.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
}
