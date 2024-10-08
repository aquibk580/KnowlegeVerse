import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden hover:oopacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-64">
        <SheetTrigger>
          <Sidebar />
        </SheetTrigger>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
