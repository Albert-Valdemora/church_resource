import { ModeToggle } from "../mode-toggle";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useNavigate } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import supabase from "../../supabase-client";

export const Navbar = () => {
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="w-screen px-10 py-2 flex justify-between items-center">
        <h2 className="text-xl font-bold hover:cursor-pointer" onClick={() => navigate('/')}>Church Resources</h2>
        <div className="flex items-center gap-4">
          {/* <ModeToggle /> */}
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="ml-2"
            >
              <IoMdExit />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
