import { RootNavbar } from "../../../components";
import { Outlet, redirect } from "react-router";
import { getExistingUser, storeUserData } from "~/appwrite/auth";
import { account } from "~/appwrite/client";

export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user.$id) return redirect("/sign-in");

    const existingUser = await getExistingUser(user.$id);
    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (error) {
    console.log("Error in clientLoader page-layout", error);
    return redirect("/sign-in");
  }
}
const pageLayout = () => {
  return (
    <div className="bg-light-200">
      <RootNavbar />
      <Outlet />
    </div>
  );
};

export default pageLayout;
