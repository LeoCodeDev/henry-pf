import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { ModalCart } from "./ModalCart/ModalCart";
import { ModalFav } from "./ModalFav/ModalFav";


export const Modal = ({ modalOpen, setModalOpen, products }) => {
  let { anchor, open } = modalOpen;

  const [state, setState] = React.useState({
    left: false,
    right: false,
  });

  React.useEffect(() => {
    if (anchor.length) {
      setState({ ...state, [anchor]: open });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchor]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    setModalOpen({ anchor: "", open: false });
  };

  return (
    <div>
      {["left", "right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
          sx={{width: '30%'}}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
          {anchor === 'right' ? <ModalCart products={products} /> : <ModalFav products={products} />}
            
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};
