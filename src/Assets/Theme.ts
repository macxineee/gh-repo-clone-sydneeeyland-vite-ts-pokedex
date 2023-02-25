import { makeStyles } from "@mui/styles";

export const useBoxStyles = makeStyles({
  default: {
    borderRadius: 20,
    boxShadow: "#EDEDED 0 10px 10px",
    padding: 15,
    backgroundColor: "white",
  },
  var1: {
    borderRadius: 20,
    boxShadow: "#EDEDED 0 10px 10px",
    backgroundColor: "white",
  },
});

export const useCardStyles = makeStyles({
  default: {
    flex: "0.5",
    minWidth: "20%",
    margin: 10,
    marginTop: 60,
    paddingTop: 40,
    position: "relative",
    cursor: "pointer",
    border: "2px solid white",
    transitionDuration: "1000ms",
  },
});

export const useFlex = makeStyles({
  column: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const useMargin = makeStyles({
  margin5: {
    margin: "5px",
  },
  margin6: {
    margin: "6px 0",
  },
  margin40: {
    margin: "30px 10px",
  },
  mt40: {
    marginTop: 40,
  },
  mt15: {
    marginTop: 15,
  },
});

export const useWidth = makeStyles({
  w100: {
    width: "100%",
  },
});
