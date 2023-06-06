/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { BellIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { useRouter } from "next/router";
import Head from "next/head";
import { api } from "@/utils/api";

export default function ProjectDetails() {
  const router = useRouter();

  const { data: team } = api.teams.getTeamDetails.useQuery({
    teamId: router.query.id as string,
  });

  if (team) {
    return (
      <>
        <Head>
          <title>Team Details</title>
        </Head>
        <div className="">
          <div className="overflow-y-auto bg-[#242E42]">
            <Navbar />
            <div className="m-5 flex flex-col gap-2">
              <div className="rounded-md bg-white p-4">
                <div className="flex flex-row items-center justify-between">
                  <p>{team.name}</p>
                  <div className="flex items-center justify-center gap-x-2">
                    {/*                     <Dropdown teamId={router.query.id} /> */}
                    <BellIcon className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-1"></div>
                <Breadcrumbs teamName={team.name} />
              </div>
              <div className="flex flex-col gap-2 lg:flex-row">
                <div className="grow-0 rounded-md bg-white p-4">
                  {/* Header */}
                  <div className="flex flex-row items-center justify-between gap-x-10">
                    <div className="flex flex-row items-center justify-center gap-x-5">
                      <span className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <p>{team.name}</p>
                    </div>
                  </div>
                  {/* Table */}
                  <div className="px-4">
                    <div className="mt-8 flow-root">
                      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                  Name
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                  Email
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                  Phone Number
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {team.members.map((teamMember) => (
                                <tr key={teamMember.id}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                    {teamMember.name}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {teamMember.email}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Bottom big card */}
              <div className="mb-5 rounded-md bg-white p-5">
                <div className="flex flex-col gap-5 md:flex-row">
                  {/* Left most side */}
                  <div className="flex w-full flex-col gap-5 md:w-1/2">
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-400">GitHub Repo Link</p>
                      <p className="w-full rounded-lg bg-[#EFF1F9] p-3">
                        {team.submission ? team.submission.projectLink : "NA"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-400">Drive Link</p>
                      <p className="w-full rounded-lg bg-[#EFF1F9] p-3">
                        {team.submission ? team.submission.otherLinks : "NA"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-400">Other Submitted Documents</p>
                      <p className="flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-[#EFF1F9] p-3">
                        {team.submission &&
                          team.submission.files.map((file) => (
                            <p className="flex flex-row gap-2">
                              <a href={file.fileUrl} key={file.id}>
                                {file.fileName}
                                <ArrowDownTrayIcon className="h-5 w-5" />
                              </a>
                            </p>
                          ))}
                      </p>
                    </div>
                  </div>
                  {/* Middle description */}
                  <div className="flex grow-0 flex-col gap-5 md:w-1/2">
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-400">Description</p>
                      <p className="w-full rounded-lg bg-[#EFF1F9] p-3">
                        {team.submission ? team.submission.description : "NA"}
                      </p>
                    </div>
                  </div>
                  {/* Right comments */}
                  {/* <div className="flex flex-col gap-5 overflow-y-auto md:w-1/3">
                    <div className="flex flex-col">
                      <p className="text-gray-400">Comments</p>
                      <textarea
                        className="h-full rounded-lg bg-[#EFF1F9] p-3 disabled:cursor-not-allowed disabled:opacity-50"
                        onChange={(e) => setCommentText(e.target.value)}
                        value={commentText}
                        disabled={project ? false : true}
                      ></textarea>
                    </div>
                    <button
                      className="rounded-md bg-[#37ABBC] p-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() =>
                        mutation.mutate({ comment: commentText, projectId })
                      }
                      disabled={project ? false : true}
                    >
                      Update Comment
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
