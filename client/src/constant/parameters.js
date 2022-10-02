export const color = {
  // main: "#8a1719",
  //main: color.main,
  main: "#94774d",
  background: "black",
  background2: "#94774d20",
  border: " #94774d50",
};

export const colorStyles = {
  control: (styles, { isFocused }) => {
    console.log("focus", isFocused);
    return {
      ...styles,
      backgroundColor: "#000",
      borderColor: isFocused ? color.main : color.border,
      boxShadow: color.main,
      color: "white",
    };
  },
  menu: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? color.border : "black",
    color: "white",
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? color.main
        : isFocused
        ? color.border
        : "black",
      color: isDisabled ? "#ccc" : isSelected ? "white" : "white",

      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? color.main
            : color.border
          : undefined,
      },
    };
  },
};
