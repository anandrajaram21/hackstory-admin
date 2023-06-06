import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "@/api/index";
import getToken from "@/utils/getAccessToken";
import { toast } from "react-toastify";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({
  teamId,
}: {
  teamId: string | undefined | string[];
}) {
  const updateRound = async (
    round: number,
    teamId: string | string[] | undefined
  ) => {
    toast("Updating round...", { delay: 100 });
    const token = localStorage.getItem("refreshToken");
    const accessToken = await getToken();

    if (!token || !accessToken) return;

    const payload = {
      round,
    };

    // Check if teamId is an array

    if (!teamId || Array.isArray(teamId)) {
      toast("Error updating round!", { delay: 100 });
      return;
    }

    try {
      await axios.post(`/admin/promote/${teamId}`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Round updated!", { delay: 100 });
    } catch (err) {
      toast.error("Error updating round!", { delay: 100 });
    }
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#FEF5EA] px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm">
          Modify Round
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#FEF5EA] shadow-lg">
          <div className="py-1">
            {[0, 1, 2, 3].map((round) => (
              <Menu.Item key={round}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => void updateRound(round, teamId)}
                  >
                    Round {round}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
