import React from "react";
import Button from "react-bootstrap/Button";

export default function BtnsCo(props) {
  const { nameM, btnCs, btnCo, btnAct, btnText, btnLogo, btnStyle, btnType } =
    props;
  const mergedBtnCs = { ...btnCs, border: "none" };

  return (
    <>
      <Button
        type={btnType}
        className={btnStyle}
        onClick={btnAct}
        variant={btnCo}
        style={mergedBtnCs}
        data-bs-dismiss={nameM}
      >
        <p className="m-0">
          <i className={btnLogo}> </i> {btnText}
        </p>
      </Button>
    </>
  );
}
