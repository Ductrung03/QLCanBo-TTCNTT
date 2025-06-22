// import Sidebar from "@/components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <main className="flex-1 p-6 bg-white">{children}</main>
    </div>
    
  );
};

export default MainLayout;
