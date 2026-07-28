import { Sidebar } from "@/shared/layouts/Sidebar";
import { Header } from "@/shared/layouts/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      {/* Sidebar - Fixed on Desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-1 flex-col min-w-0">
        <Header />
        
        <main id="main-content" className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
