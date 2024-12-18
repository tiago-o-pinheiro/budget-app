import { useLocation, useNavigate } from "react-router-dom";

export const AddAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNewAccount = () => {
    navigate("/accounts/new", { state: { from: location } });
  };
  return (
    <div>
      <button onClick={handleNewAccount}>Add account</button>
    </div>
  );
};
