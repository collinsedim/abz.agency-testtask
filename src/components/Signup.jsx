import { useEffect, useState } from "react";

import Button from "./Button";

import successImage from "./assets/success-image.svg";

const Signup = () => {
  // Define error state
  const [hasError, setHasError] = useState(false);

  // Define token state
  const [token, setToken] = useState("");

  // Define user registration status state
  const [userRegistered, setUserRegistered] = useState(false);
  // Define positions data state
  const [positionsData, setPositionsData] = useState([]);

  // Define user state
  const [state, setState] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    position_id: null,
    photo: null,
    signingUp: false,
  });

  // Define error message state
  const [error, setError] = useState({
    nameError: "",
    emailError: "",
    phoneNumberError: "",
    photoTypeError: "",
    position_id_error: "",
  });

  // Function to validate photo size and type
  const checkPhotoSizePixel = (e) => {
    const selectedPhoto = e.target.files[0];
    // check if the file is a jpeg and its size is less than 5 Mb
    if (
      selectedPhoto &&
      selectedPhoto.size <= 5000000 &&
      selectedPhoto.type === "image/jpeg"
    ) {
      const image = new Image();
      image.src = URL.createObjectURL(selectedPhoto);
      image.onload = () => {
        if (image.width >= 70 && image.height >= 70) {
          setError({
            ...error,
            photoTypeError: "",
          });
          setState({ ...state, photo: selectedPhoto });
        } else {
          setError({
            ...error,
            photoTypeError:
              "Photo resolution must be greater than 70x70 pixels.",
          });
        }
      };
    } else {
      setError({
        ...error,
        photoTypeError:
          "Photo must be jpeg/jpg type, and not greater than 5 Mb.",
      });
    }
  };

  // Fetch token on component mount
  useEffect(() => {
    const getToken = async () => {
      // Try to fetch the token
      try {
        const res = await fetch(
          "https://frontend-test-assignment-api.abz.agency/api/v1/token"
        );
        const data = await res.json();
        if (data.success) {
          setToken(data.token);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
  }, []);

  // Fetch positions data on component mount
  useEffect(() => {
    const getPositions = async () => {
      // Try to fetch positions
      try {
        const res = await fetch(
          "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
        );
        const data = await res.json();
        if (data.success) {
          setPositionsData(data.positions);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPositions();
  }, []);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Set signingUp state to true
    setState({ ...state, signingUp: true });

    // Extract state vairables
    const { name, email, phoneNumber, photo, position_id } = state;

    // Initialize error variables
    let nameError = "";
    let emailError = "";
    let phoneNumberError = "";
    let position_id_error = "";
    let photoTypeError = "";

    // Define phone number and email validation regex
    const phoneRegex = new RegExp("^[+]{0,1}380([0-9]{9})$");
    if (!phoneRegex.test(phoneNumber)) {
      phoneNumberError = `Phone number must start with "+380" followed by 9 digits.`;
    }

    // Validate input fields
    const emailRegex = new RegExp(
      "^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)])$"
    );
    if (!emailRegex.test(email)) {
      emailError = `Invalid email format.`;
    }
    if (name.length < 2 || name.length > 60) {
      nameError = "Name should contain 2-60 characters.";
    }
    if (!position_id) {
      position_id_error = "Position is required.";
    }
    if (!photo) {
      photoTypeError = "Photo is required.";
    }

    // if there are any errors, set the error state and return
    if (
      nameError ||
      emailError ||
      phoneNumberError ||
      position_id_error ||
      photoTypeError
    ) {
      setError({
        nameError,
        emailError,
        phoneNumberError,
        photoTypeError,
        position_id_error,
      });
      setHasError(true);
      setState({ ...state, signingUp: false });
      return;
    }

    // No errors, clear the previous errors
    setError({
      nameError: "",
      emailError: "",
      phoneNumberError: "",
      position_id_error,
      photoTypeError: "",
    });
    setHasError(false);

    // Prepare form data for submission
    var formData = new FormData();
    formData.append("position_id", position_id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phoneNumber);
    formData.append("photo", photo);

    // POST request to the server
    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
      method: "POST",
      body: formData,
      headers: {
        Token: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          // process success response
          setUserRegistered(true);

          // reset state
          setState({
            name: "",
            email: "",
            phoneNumber: "",
            position_id: null,
            photo: null,
            signingUp: false,
          });
        } else {
          if (data.message === "User with this phone or email already exist") {
            setError({
              ...error,
              emailError: "Email or phone number already exists",
              phoneNumberError: "Phone number or email already exists",
            });
            setHasError(true);
          } else {
            console.log("registration error");
          }
          setState({ ...state, signingUp: false });
        }
      })
      .catch((error) => {
        setState({ ...state, signingUp: false });
        console.log(error);
      });

    // End of form submission

    // console.log("Form submitted", { ...state });
  };

  // Return function that displays the Signup form
  return (
    <div id="signupSection" className="mt-20">
      {userRegistered ? (
        <div className="flex flex-col justify-center items-center gap-5">
          <h2 className="text-[28px] font-bold">
            User successfully registered!
          </h2>
          <img src={successImage} alt="" />
          <div onClick={() => setUserRegistered(false)}>
            <Button>Go back</Button>
          </div>
        </div>
      ) : (
        <div className="mt20">
          <div className="py-5">
            <h1 className="text-center text-4xl font-bold">
              Working with Post requests
            </h1>
            <div className="flex justify-center mt-16">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {hasError && (
                  <div className="text-red-900 w-[300px]">
                    Form cannot be submitted. Please fix all errors!
                  </div>
                )}
                <fieldset className="mb-10">
                  <input
                    className="w-[310px] sm:w-[500px] h-14 p-5 border-slate-400 border-solid border-[1px] rounded-md outline-none bg-[#f8f8f8]"
                    type="text"
                    placeholder="Your name"
                    name="name"
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    required
                  />
                  {error.nameError && (
                    <div style={{ color: "red" }}>{error.nameError}</div>
                  )}
                </fieldset>
                <fieldset className="mb-10">
                  <input
                    style={error.emailError ? { borderColor: "red" } : {}}
                    className="w-[310px] sm:w-[500px] h-14 p-5 border-slate-400 border-solid border-[1px] rounded-md outline-none bg-[#f8f8f8]"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={state.email}
                    required
                    minLength={2}
                    maxLength={100}
                    onChange={(e) =>
                      setState({ ...state, email: e.target.value })
                    }
                  />
                  {error.emailError && (
                    <div style={{ color: "red" }}>{error.emailError}</div>
                  )}
                </fieldset>
                <fieldset className="mb-10">
                  <input
                    style={error.phoneNumberError ? { borderColor: "red" } : {}}
                    className="w-[310px] sm:w-[500px] h-14 p-5 border-slate-400 border-solid border-[1px] rounded-md outline-none bg-[#f8f8f8]"
                    type="tel"
                    placeholder="Phone"
                    name="phone"
                    required
                    value={state.phoneNumber}
                    onChange={(e) =>
                      setState({ ...state, phoneNumber: e.target.value })
                    }
                    minLength={2}
                    maxLength={60}
                  />
                  {error.phoneNumberError && (
                    <div className="w-[300px]" style={{ color: "red" }}>
                      {error.phoneNumberError}
                    </div>
                  )}
                </fieldset>
                <fieldset className="mb-10  text-[18px]">
                  <label className="">Select your position</label>
                  {error.position_id_error && (
                    <div style={{ color: "red" }}>
                      {error.position_id_error}
                    </div>
                  )}
                  {positionsData.map((position, i) => {
                    return (
                      <div key={`position-${i}`} className="mt-2">
                        <input
                          id={position.id}
                          className="scale-150"
                          type="radio"
                          name="position"
                          value={position.id}
                          onChange={(e) =>
                            setState({ ...state, position_id: e.target.value })
                          }
                        />
                        <label className="ml-5" htmlFor={position.id}>
                          {position.name}
                        </label>
                      </div>
                    );
                  })}
                </fieldset>
                <fieldset className="mb-10">
                  <input
                    style={error.photoTypeError ? { borderColor: "red" } : {}}
                    className="w-[310px] sm:w-[500px] h-12 border-slate-400 border-solid border-[1px] rounded-md outline-none file:bg-[#f8f8f8] file:py-[16px] custom-upload file:text-[10px]"
                    type="file"
                    name="photo"
                    accept="image/jpeg"
                    onChange={checkPhotoSizePixel}
                  />
                  {error.photoTypeError && (
                    <div
                      className="w-[300px] text-center"
                      style={{ color: "red" }}
                    >
                      {error.photoTypeError}
                    </div>
                  )}
                </fieldset>
                <div className="flex items-center justify-center flex-col">
                  {state.signingUp ? (
                    <div className="loading"></div>
                  ) : (
                    <button
                      className={`bg-gray-400 px-5 py-1 rounded-full hover:bg-slate-300`}
                    >
                      Sign up
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
