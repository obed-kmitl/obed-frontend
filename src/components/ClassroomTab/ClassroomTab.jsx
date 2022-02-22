import styles from "./ClassroomTab.module.scss";
import { GoogleLogin } from "react-google-login";
import config from "../../config";
import httpClient from "../../utils/httpClient";

const ClassroomTab = () => {
  const loginSuccessHandle = async (code) => {
    console.log(code);
    await httpClient.post("/auth/googleAuthToken", {
      code: code,
    });
  };

  return (
    <div className={styles.ClassroomTab}>
      Classroom
      <GoogleLogin
        clientId={config.googleClientId}
        buttonText="Login"
        onSuccess={loginSuccessHandle}
        accessType="offline"
        responseType="code"
        // onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default ClassroomTab;
