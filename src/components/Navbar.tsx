import ConnectWallet from "./ConnectWallet";

const Navbar = () => {
  return (
    <nav className="px-20">
      <div className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono">
        <div className="pl-8">Logo</div>
        <ConnectWallet />
      </div>{" "}
    </nav>
  );
};

export default Navbar;
