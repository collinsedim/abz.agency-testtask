const Footer = () => {
  return (
    <div className="mt-10">
      <div className="px-4 py-2">
        <hr className="border-slate-400 mb-2" />
        <footer
          className="cursor-pointer"
          onClick={() => window.open("https://collinsedim.com", "_blank")}
        >
          &copy; abz.agency specifically for the test task{" "}
        </footer>
      </div>
    </div>
  );
};

export default Footer;
