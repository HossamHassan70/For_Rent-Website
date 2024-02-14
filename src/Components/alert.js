import Alert from "react-bootstrap/Alert";

export default function AlertCom(props) {
  const { errorType, errorHead, errorMsg } = props;

  return (
    <>
      <Alert variant={errorType}>
        <Alert.Heading>{errorHead}</Alert.Heading>
        <p>{errorMsg}</p>
      </Alert>
    </>
  );
}
