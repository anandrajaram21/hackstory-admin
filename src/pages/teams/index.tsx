import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "@/utils/api";
import { columns } from "@/components/TeamsTable/columns";
import { DataTable } from "@/components/TeamsTable/data-table";
import Head from "next/head";

const Teams = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data, isLoading } = api.teams.getAllTeams.useQuery();

  useEffect(() => {
    if (status !== "loading" && !session) {
      void router.push("/");
    }
  }, [session, router, status]);

  return (
    <>
      <Head>
        <title>Teams</title>
      </Head>
      <div className="flex w-full flex-1 flex-col space-y-8 bg-[#1c1c1c] pb-8">
        <Navbar />
        <div className="mx-auto w-full rounded-md bg-[#1c1c1c] px-8">
          {isLoading ? (
            <div className="h-screen">
              <div className="rounded-md bg-white p-5 text-center">
                Loading...
              </div>
            </div>
          ) : data === undefined ? (
            <div className="h-screen">
              <div className="rounded-md bg-white p-5 text-center">
                Something went wrong..
              </div>
            </div>
          ) : (
            <div className="h-full min-h-screen">
              <DataTable columns={columns} data={data} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Teams;
