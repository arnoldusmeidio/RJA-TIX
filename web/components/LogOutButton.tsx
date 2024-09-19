import { useUserStore } from "@/stores/user-store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogOutButton() {
  const { update } = useUserStore();
  const router = useRouter();

  const logOut = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        if (data.message) {
          toast.error(data.message);
        } else {
          toast.error(data.errors[0].message);
        }
      } else {
        update(null);
        toast.success(data.message);
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      onClick={logOut}
      className="text-left p-1 text-sm ps-4 hover:bg-gray-700 rounded-lg"
    >
      Logout
    </button>
  );
}
