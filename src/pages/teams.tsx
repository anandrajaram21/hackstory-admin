import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Teams = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      void router.push("/");
    }
  }, [session, router]);

  return (
    <>
      <Navbar />
      <h1>Teams</h1>
      <p>Teams page</p>
      <p>{session?.user?.email}</p>
    </>
  );
};

export default Teams;
