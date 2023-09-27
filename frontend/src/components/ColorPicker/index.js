import { Dialog } from "@material-ui/core";
import React, { useState } from "react";

import { GithubPicker } from "react-color";

const ColorPicker = ({ onChange, currentColor, handleClose, open }) => {
  const [selectedColor, setSelectedColor] = useState(currentColor);
  const colors = [
    "#B80000",
    "#DB3E00",
    "#FCCB00",
    "#008B02",
    "#006B76",
    "#1273DE",
    "#004DCF",
    "#5300EB",
    "#EB9694",
    "#FAD0C3",
    "#FEF3BD",
    "#C1E1C5",
    "#BEDADC",
    "#C4DEF6",
    "#BED3F3",
    "#D4C4FB",
    "#4D4D4D",
    "#999999",
    "#FFFFFF",
    "#F44E3B",
    "#FE9200",
    "#FCDC00",
    "#DBDF00",
    "#A4DD00",
    "#68CCCA",
    "#73D8FF",
    "#AEA1FF",
    "#FDA1FF",
    "#333333",
    "#808080",
    "#cccccc",
    "#D33115",
    "#E27300",
    "#FCC400",
    "#B0BC00",
    "#68BC00",
    "#16A5A5",
    "#009CE0",
    "#7B64FF",
    "#FA28FF",
    "#666666",
    "#B3B3B3",
    "#9F0500",
    "#C45100",
    "#FB9E00",
    "#808900",
    "#194D33",
    "#0C797D",
    "#0062B1",
    "#653294",
    "#AB149E",
    "#FFFFFF", 	
    "#FFCCCC", 	
    "#FFCC99", 	
    "#FFFFCC",
    "#CCCCCC", 	
    "#FF6666", 	
    "#FFCC33", 	
    "#FFFF99",
    "#C0C0C0",	
    "#FF0000",	
    "#FF9900", 	
    "#FFFF00",
    "#999999",	
    "#CC0000",	
    "#FF6600",	
    "#FFCC00",
    "#666666", 	
    "#990000", 	
    "#CC6600",	
    "#999900",
    "#333333", 	
    "#660000", 	
    "#993300",	
    "#666600",
    "#000000", 	
    "#330000", 	
    "#663300",
    "#333300",
    "#99FF99",	
    "#CCFFFF", 	
    "#FFCCFF", 	
    "#66FF99", 	
    "#66FFFF", 	
    "#FF99FF", 	
    "#33FF33", 	
    "#33CCFF", 	
    "#CC66CC", 	
    "#00CC00", 	
    "#3366FF", 	
    "#CC33CC", 	
    "#009900", 	
    "#3333FF", 	
    "#993366", 	
    "#006600", 	
    "#000099", 	
    "#663366", 	
    "#003300", 	
    "#000066", 	
    "#330033",
  ];

  const handleChange = (color) => {
    setSelectedColor(color.hex);
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="xs"
      paperFullWidth
    >
      <GithubPicker
        width={"100%"}
        triangle="hide"
        color={selectedColor}
        colors={colors}
        onChange={handleChange}
        onChangeComplete={(color) => onChange(color.hex)}
      />
    </Dialog>
  );
};

export default ColorPicker;
