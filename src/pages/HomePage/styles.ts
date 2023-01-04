export const directoriesContainer = {
  padding: "1em",
  backgroundColor: "#475063",
  color: "#fff",
  overflowX: "auto",
};

export const fileContainer = {
  padding : "0.5em",
  backgroundColor: "#23262e",
  height: "auto",
};

export const filesMobileView = (widthProp: number) => {
  return {
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      paddingTop: "1em",
      width: widthProp - 50,
      backgroundColor: "#475063",
      color: "#fff",
    },
  };
};
