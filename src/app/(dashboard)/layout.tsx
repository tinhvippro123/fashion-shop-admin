import { Sidebar } from "@/shared/layouts/Sidebar";
import { Header } from "@/shared/layouts/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50/50">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden lg:block shrink-0">
          <Sidebar />
        </div>
        
        {/* Main Content Area */}
        <div className="flex flex-1 flex-col min-w-0">
          <Header />
          
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
