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

const GoogleLoginBtn = ({ text = "Sign up with Google" }) => {
  const dispatch = useDispatch();

  // ✅ Google Login Hook
  const login = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (credentialResponse) => {
      try {
        const accessToken = credentialResponse.access_token;

        // Fetch user info from Google
        const resGoogle = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const userData = await resGoogle.json();
        console.log("Google user:", userData);

        // Send token to backend
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
          // navigate('/dashboard');
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

  // ✅ Inline Styles
  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    marginRight: "10px",
    backgroundColor: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "50px",
    color: "#374151",
    fontWeight: "500",
    fontSize: "14px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  };

  const hoverStyle = {
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    transform: "scale(0.98)",
  };

  // ✅ Hover effect using React state
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      onClick={() => login()}
      style={{
        ...buttonStyle,
        ...(isHovered ? hoverStyle : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FcGoogle size={20} />
      {text}
    </button>
  );
};

export default GoogleLoginBtn;
