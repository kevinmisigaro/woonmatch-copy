import useUser from "../../lib/useUser";
import ProfileBanner from "./ProfileBanner";
import RegisterBanner from "./RegisterBanner";

const RegisterOrProfileBanner: React.FC<any> = () => {
  const user = useUser();
  return user == null ? <RegisterBanner /> : <ProfileBanner />;
};

export default RegisterOrProfileBanner;
