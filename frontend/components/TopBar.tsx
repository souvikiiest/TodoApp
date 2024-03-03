import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    navigate("/signin");
  };
  const firstName: string | null = localStorage.getItem("firstName");
  const lastName: string | null = localStorage.getItem("lastName");

  return (
    <div className="bg-blue-500 text-white shadow-md p-4 flex justify-between items-center">
      <div className="font-extrabold text-lg">TODO APP</div>
      <div className="flex items-center">
        {firstName && lastName && (
          <>
            <div className="mr-2">
              <span className="font-semibold">Hello</span>{" "}
              <span className="text-white font-semibold pl-2 pr-2">
                {firstName.toUpperCase()} {lastName.toUpperCase()}
              </span>
            </div>
            <div className="rounded-full text-center  p-2 h-10 w-10 bg-white text-blue-500">
              {firstName[0].toUpperCase()}
              {lastName[0].toUpperCase()}
            </div>
            <div
              onClick={handleLogout}
              className="cursor-pointer ml-2 hover:underline"
            >
              Logout
            </div>
          </>
        )}
      </div>
    </div>
  );
}
