const Buttons = ({ children, sectionId, type }) => {
  // Check if the button type is link
  if (type === "link") {
    return (
      <a href={`#${sectionId}`}>
        <button
          className={`bg-[#f4e041] px-4 py-[2px] flex justify-center items-center rounded-3xl hover:bg-amber-300 `}
        >
          {children}
        </button>
      </a>
    );
  }

  // Return a regular button if type is not link
  return (
    <button
      className={`bg-[#f4e041] px-4 py-[2px] flex justify-center items-center rounded-3xl hover:bg-amber-300 `}
    >
      {children}
    </button>
  );
};

export default Buttons;
