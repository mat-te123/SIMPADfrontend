import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import login from "../../services/AuthService.js"; // Pointing straight to your auth service

export default function LoginGoogle({ onLoginError, onLoginSuccess }) {
  const navigate = useNavigate();

  const {setToken, setUser, setUserCompleteData, setIsAdmin } = useAuth();

  const handleTrue = async (tokenResponse) => {
    try {
      // 1. Fetch user data from Google using the token
      const userinfo = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        },
      );
      const email = userinfo.data.email;

      // 2. Direct checking goes to AuthService
      const mockServerResponse = await login(email);
      console.log("Full Server Response:", mockServerResponse);

      // 3. Process backend mock response
      if (mockServerResponse.success) {
        if (onLoginSuccess) onLoginSuccess();
        setToken(mockServerResponse.token); // Store token in context
        setUser(mockServerResponse.user); // Store user details in context
        setUserCompleteData(mockServerResponse.user);
        setIsAdmin(mockServerResponse.user.isAdmin);
        navigate("/");
      } else {
        const errorMsg = mockServerResponse.message || "Unknown error occurred";
        if (onLoginError) {
          onLoginError("Login Restricted", errorMsg);
        }
      }
    } catch (error) {
      console.error(error);
      if (onLoginError) {
        onLoginError(
          "System Error",
          "Something went wrong processing your request.",
        );
      }
    }
  };

  // Triggers if Google popup is closed, cancelled, or blocked
  const handleFalse = (errorResponse) => {
    console.error("Google authentication error:", errorResponse);
    if (onLoginError) {
      onLoginError(
        "Authentication Cancelled",
        "Google login window was closed.",
      );
    }
  };

  const loginInstance = useGoogleLogin({
    onSuccess: handleTrue,
    onError: handleFalse,
  });

  return loginInstance;
}
