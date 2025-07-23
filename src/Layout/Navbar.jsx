const Navbar = ({ className }) => {
  return (
    <nav
      className={`bg-[#2E3345] h-16 flex items-center justify-end px-4 text-white ${className}`}
    >
      <div className="flex items-center gap-4 ml-auto">

        <button className="bg-[#3B58FF] px-4 py-2 rounded">Login</button>
        <button className="bg-[#3B58FF] px-4 py-2 rounded">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
