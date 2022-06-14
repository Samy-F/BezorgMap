import "./koerier.css";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ElectricBikeIcon from "@mui/icons-material/ElectricBike";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { memo } from "react";

const Koerier = (props) => {
  let koerierData = props.koerierData;
  let mapData = props.mapData;
  console.log(koerierData);
  console.log(mapData);
  return (
    <div className="Koerier">
      {koerierData && koerierData.length > 0 && (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "#0e1824cc" }}
          style={{ borderRadius: 5 }}
        >
          {mapData &&
            mapData.map((koerier, index) => (
              <>
                {console.log({ request: koerier._id })}
                <div className="listItem" key={koerier._id}>
                  <Divider
                    sx={{ backgroundColor: "#737e8a" }}
                    variant="inset"
                    component="li"
                  />
                  <ListItem
                    alignItems="flex-start"
                    style={{ borderBottom: "5px white" }}
                  >
                    <ListItemAvatar>
                      <Avatar alt="bike" src="">
                        {koerier.tomtomMode === "car" && (
                          <DirectionsCarIcon style={{ color: "black" }} />
                        )}
                        {koerier.tomtomMode === "bicycle" && (
                          <ElectricBikeIcon style={{ color: "black" }} />
                        )}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        Math.round(koerierData[index].routeTime) < 1
                          ? "Aanwezig"
                          : Math.round(koerierData[index].routeTime) + " Mins"
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="#faf9f6ae"
                          >
                            {koerier.login} -{" "}
                            {koerier.currentRoute.orders.length} orders
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </div>
              </>
            ))}
        </List>
      )}
    </div>
  );
};

export default memo(Koerier);
