import Sidebar from "./_components/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-6">
      <Sidebar />
      <div className="flex-1 bg-blue-500">{children}</div>
    </div>
  );
};

export default layout;
