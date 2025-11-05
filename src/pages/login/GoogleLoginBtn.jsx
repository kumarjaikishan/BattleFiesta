import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setadmin, setloader, setlogin } from "../../store/login";
import { alltourna } from "../../store/api";
import { profilefetch } from "../../store/profile";
import {
  contactusform,
  membership,
  memshipentry,
  Users,
  voucher,
} from "../../store/admin";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginBtn = ({ text = "Sign in with Google" }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = React.useState(false);

  const login = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (credentialResponse) => {
      try {
        const accessToken = credentialResponse.access_token;

        const resGoogle = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const userData = await resGoogle.json();

        const res = await fetch(
          `${import.meta.env.VITE_API_ADDRESS}auth/google`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: accessToken }),
          }
        );

        const data = await res.json();

        if (res.ok && res.status === 200) {
          dispatch(setlogin(true));
          toast.success(data.message, { autoClose: 1000 });
          dispatch(setloader(true));
          dispatch(setadmin(data.isadmin));
          localStorage.setItem("token", data.token);
          dispatch(alltourna());
          dispatch(profilefetch());

          if (data.isadmin) {
            dispatch(memshipentry());
            dispatch(contactusform());
            dispatch(voucher());
            dispatch(membership());
            dispatch(Users());
          }
        } else {
          toast.warn(data.message || "Error occurred", { autoClose: 1500 });
          dispatch(setloader(false));
        }
      } catch (error) {
        console.error(error);
        toast.error("Google Login Failed", { autoClose: 2000 });
      }
    },
    onError: () => toast.error("Google Login Failed", { autoClose: 2000 }),
  });

  const buttonStyle1 = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    width: "100%",
    padding: "12px 16px",
    marginTop: "12px",
    background: isHovered
      ? "linear-gradient(145deg, #ffffff, #f3f4f6)"
      : "linear-gradient(145deg, #f9fafb, #ffffff)",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    color: "#374151",
    // fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    boxShadow: isHovered
      ? "0 6px 14px rgba(0, 0, 0, 0.12)"
      : "0 2px 8px rgba(0, 0, 0, 0.06)",
    transform: isHovered ? "translateY(-2px)" : "translateY(0px)",
  };
  const buttonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  width: "100%",
  padding: "12px 18px",
  marginTop: "10px",
  background: isHovered
    ? "linear-gradient(90deg, #f5f5f5 0%, #fff 100%)"
    : "#fff",
  border: "1px solid #d1d5db",
  borderRadius: "50px",
  color: "#111827",
  // fontWeight: "600",
  fontSize: "15px",
  cursor: "pointer",
  boxShadow: isHovered
    ? "0 0 12px rgba(66, 133, 244, 0.4)"
    : "0 1px 4px rgba(0, 0, 0, 0.1)",
  transition: "all 0.25s ease-in-out",
};


  return (
    <button
      type="button"
      onClick={() => login()}
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FcGoogle size={22} />
      {text}
    </button>
  );
};

export default GoogleLoginBtn;
