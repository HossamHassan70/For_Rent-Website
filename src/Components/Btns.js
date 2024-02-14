import React from "react";
import Button from "react-bootstrap/Button";

export default function BtnsCo(props) {
  const { btnCo, btnAct, btnText, btnLogo, btnStyle, btnType } = props;

  return (
    <>
      <Button
        type={btnType}
        className={btnStyle}
        onClick={btnAct}
        variant={btnCo}
      >
        <p className="m-0">
          <i className={btnLogo}> </i> {btnText}
        </p>
      </Button>{" "}
    </>
  );
}
