"use client";

import { AuthProvider } from "@/context/AuthContext";
import ProtectedLayout from "@/components/admin/ProtectedLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedLayout>
        {children}
      </ProtectedLayout>
    </AuthProvider>
  );
}
