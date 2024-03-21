import React from "react";
import { CSSTransition } from "react-transition-group";

const FadeIn = ({ children, in: isIn }) => { // Rename 'in' prop to 'isIn' to avoid conflict
  return (
    <CSSTransition
      in={isIn} // Pass the 'isIn' prop to CSSTransition
      timeout={2000}
      classNames="fade-in"
    >
      {children}
    </CSSTransition>
  );
};

export default FadeIn;
