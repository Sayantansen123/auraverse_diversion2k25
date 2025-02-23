import { brainwave } from "../assets/assets";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import MenuSvg from '../assets/assets/svg/MenuSvg';
import { HambugerMenu } from "./design/Header";
import { useState } from "react";
import {motion} from "framer-motion";

export const navigation = [
  {
    id: "0",
    title: "Home",
    url: "#features",
  },
  {
    id: "1",
    title: "Submit Task",
    url: "#pricing",
  },
  {
    id: "2",
    title: "Leaderboard",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Dashboard",
    url: "#roadmap",
  },

];

const Header = ({ newacc, signIn }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const togglenav = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  };
  const handleclick = () => {
    setIsMenuOpen(false)
  }
  return (
    <motion.div
    initial={{ y: "-100%", opacity: 0 }} 
        animate={{ y: "0%", opacity: 1 }}   
        transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-50 bg-n-8/90 backdrop-blur-sm border-b border-n-6
  lg:bg-n-8/90 lg:backdrop-sm 
  ${isMenuOpen ? "bg-n-8" : "bg-n-8/90"}`
      }>

      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 py-4 relative">
        {/* Logo on the Left */}
        <div className="flex gap-2 items-center">
        <a href="/">
          <img src="/aura.png"  className="w-[60px]" alt="auraverse" />
        </a>
        <h1 className="text-xl">Auraverse</h1>
        </div>

        {/* Centered Navigation (Only Selected Items) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center space-x-10 text-small">
          <a
            href="/"
            className="block font-code uppercase text-n-1 transition-colors hover:text-color-1 font-semibold"
          >
            Home
          </a>

          <a
            href="/Task"
            className="block font-code uppercase text-n-1 transition-colors hover:text-color-1 font-semibold"
          >
            Tasks
          </a>

          <a
            href="/leaderboard"
            className="block font-code uppercase text-n-1 transition-colors hover:text-color-1 font-semibold"
          >
            Leaderboard
          </a>

          <a
            href="/Dashboard"
            className="block font-code uppercase text-n-1 transition-colors hover:text-color-1 font-semibold"
          >
            Dashboard
          </a>



        </div>

        {/* Mobile-Only Links (Hidden on Desktop) */}
        <nav className={`${isMenuOpen ? "flex" : "hidden"}  lg:flex items-center space-x-6`}>

          <a
            href="/"
            className="block font-code text-xs uppercase text-n-1 transition-colors hover:text-color-1 font-semibold lg:hidden
            ${item.url === location.hash ? 'z-2 lg:text-n-1':'lg:text-n-1/50'  }
            lg:hover:text-n-1 xl:px-12"
          >
            Home
          </a>
          <HambugerMenu />
        </nav>

        <a href="/register" className="button hidden
        ml-80 text-n-1/50 transition-colors
        hover:text-n-1 lg:block">
          {newacc}
        </a>
        <Button 
        className="hidden lg:flex" href="/login">
          {signIn}
        </Button>

        
        <Button className="ml-auto lg:hidden px-3" onClick={togglenav}>
          <MenuSvg isMenuOpen={isMenuOpen} />
        </Button>

      </div>
    </motion.div>
  );
};

export default Header;
