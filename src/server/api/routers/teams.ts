import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const teamsRouter = createTRPCRouter({
  getAllTeams: protectedProcedure.query(({ ctx }) => {
    const teams = ctx.prisma.team.findMany({
      include: {
        members: true,
        submission: true,
      },
    });

    return teams;
  }),

  getTeamDetails: protectedProcedure
    .input(z.object({ teamId: z.string() }))
    .query(({ ctx, input }) => {
      const team = ctx.prisma.team.findUnique({
        where: {
          id: input.teamId,
        },
        include: {
          members: true,
          submission: {
            include: {
              files: true,
            },
          },
        },
      });

      return team;
    }),
});
