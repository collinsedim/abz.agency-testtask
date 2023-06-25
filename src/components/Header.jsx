import logo from "./assets/Logo.svg";
import Button from "./Button";

// Header component, handling logo, users and signup buttons
const Header = () => {
  return (
    <header className="bg-white w-full sm:px-10">
      <div className="max-w-screen-2xl flex justify-between py-2 px-1 mx-auto">
        <img width={120} height="auto" src={logo} alt="Logo" />
        <div className="flex gap-2">
          <Button type="link" sectionId="usersSection">
            Users
          </Button>
          <Button type="link" sectionId="signupSection">
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
