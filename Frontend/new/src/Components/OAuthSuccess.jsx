import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      
      // Optionally decode token to get user info if needed, or fetch user profile
      // const user = jwtDecode(token);
      // localStorage.setItem("user", JSON.stringify(user)); 

      // For now, redirect to dashboard as requested
      navigate("/dashboard");
      
      // Reload to ensure auth state is picked up
      window.location.reload(); 
    } else {
        navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Logging you in...</h2>
            <p className="text-gray-600">Please wait while we redirect you.</p>
        </div>
    </div>
  );
};

export default OAuthSuccess;
