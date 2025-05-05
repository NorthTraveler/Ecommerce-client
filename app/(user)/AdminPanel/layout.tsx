import AdminPanelaside from "@/components/AdminPanel/AdminPanelaside";


export default function AdminPanelLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {  
    return (
        <div className='min-h-[calc(100vh-120px)] pt-2 md:flex'>
          <AdminPanelaside />
          {children}
        </div>


  );
}