import RestaurantIcon from "@mui/icons-material/Restaurant";
import Avatar from "@mui/material/Avatar";
import Marker from "react-map-gl";

const RestaurantMap = (props) => {
  let viewState = props.viewState;
  return (
    <Marker latitude={52.293069} longitude={4.861301}>
      {/* restaurant div to see how many drivers are inside */}
      
        <RestaurantIcon
          style={{
            fontSize: viewState.zoom * 3,
            width: "90%",
            zIndex: 30,
            color: "orange",
            backgroundColor: "white",
            borderRadius: 10,
          }}
        />
        <div
          style={{
            zIndex: 45,
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 5,
            height: 5,
            top: -7,
            right: -7,
          }}
        >
          <Avatar
            alt="bike"
            src=""
            style={{
              width: 33,
              height: 33,
              position: "relative",
              backgroundColor: "orange",
              padding: 0,
              margin: 0,
            }}
          >
            10
          </Avatar>
        </div>
    </Marker>
  );
};

export default RestaurantMap;
