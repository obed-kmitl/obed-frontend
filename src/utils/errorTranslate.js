export default function errorTranslate(error, setMessage) {
  let resMessage = "";
  if (error.response && error.response.data) {
    switch (error.response.data.error?.code) {
      case "INTERNAL_SERVER_ERROR":
        resMessage = "Internal server error, Please contact system admin.";
        break;
      case "UNAUTHORIZED":
        resMessage = "Authorization error, Please re-login and try again.";
        break;
      case "BAD_REQUEST":
        resMessage = "Bad request, Please check and try again.";
        break;
      default:
        resMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Something went wrong, Please try again.";
        break;
    }
    setMessage(resMessage);
  } else
    setMessage(
      "Cannot connect to server, Please check connection and try again."
    );

  return resMessage;
}
