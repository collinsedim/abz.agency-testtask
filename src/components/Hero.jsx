import Buttons from "./Button";

// Hero component, showcasing a call to action
const Hero = () => {
  return (
    <div className="bg-heroBg bg-cover bg-no-repeat bg-center h-screen max-w-screen-2xl mx-auto">
      <div className="h-full w-full flex justify-center items-center backdrop-brightness-50">
        <div className="max-w-lg text-center px-5 sm:px-0">
          <div className="text-white">
            <h1 className="text-[38px] font-bold">
              Test assignment for front-end developer
            </h1>
            <p className="text-[18px]">
              What defines a good front-end developer is one that has skilled
              knowledge of HTML, CSS, JS with a vast understanding of User
              design thinking as they'll be building web interfaces with
              accessibility in mind. They should also be exited to learn, as the
              world of Front-End Development keeps evolving.
            </p>
          </div>
          <div className="flex justify-center items-center mt-6">
            <Buttons type="link" sectionId="signupSection">
              Sign up
            </Buttons>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
