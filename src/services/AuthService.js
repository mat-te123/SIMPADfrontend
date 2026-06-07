import mahasiswaList from "../Mock/users.json";

export default async function login(email) {
  try {
    // 1. Check basic domain format
    if (!email.includes("@mail.ugm.ac.id")) {
      return {
        success: false,
        message: "Login is only available for @mail.ugm.ac.id email addresses.",
      };
    }

    console.log("Email passed domain check:", email);
    console.log("Current mock user list:", mahasiswaList);

    // 2. Check if user exists in your mock file
    const foundUser = mahasiswaList.find((user) => user.email === email);

    if (foundUser) {
      return {
        success: true,
        message: "Login successful",
        user: foundUser, // Pass user details back to your AuthContext
        token: "mock-jwt-token-xyz"
      };
    } else {
      return {
        success: false,
        message: "Email domain is valid, but your account is not registered",
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Login failed",
    };
  }
}