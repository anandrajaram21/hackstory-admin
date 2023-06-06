// import { type User } from "@/types/common";
import { Prisma } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { DataTableColumnHeader } from "@/components/TeamsTable/data-table-column-header";

const teamWithMembers = Prisma.validator<Prisma.TeamArgs>()({
  include: {
    members: true,
  },
});

type Team = Prisma.TeamGetPayload<typeof teamWithMembers>;

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Team Name" />
    ),
  },
  {
    accessorKey: "teamMembers",
    header: "Members",
    cell: ({ row }) => (
      <>
        {row.original.members.map((member) => (
          <div key={member.id}>{member.name}</div>
        ))}
      </>
    ),
  },
  {
    accessorKey: "ProjectId",
    header: "View Project",
    cell: ({ row }) => (
      <>
        <Link
          href={`/teams/${row.original.id}`}
          className="text-blue-500 underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          View Submission
        </Link>
      </>
    ),
  },
];
