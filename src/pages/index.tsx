import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Alfa_Slab_One, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";

const manrope = Manrope({ subsets: ["latin"] });
const alfaSlabOne = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
});

const HeroContent = () => {
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <div className="h-screen bg-[#1c1c1c]">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-y-6 px-16 pt-36 max-md:pt-16">
        <div className="flex flex-col gap-y-4">
          <div
            className={`text-timelineheading text-md relative z-10 font-bold md:text-xl lg:text-2xl ${manrope.className} text-tracks max-lg:text-center`}
          >
            JUNE 4TH-6TH 2023
          </div>

          <div
            className={`relative z-10 text-[40px] font-bold md:text-[86px] lg:text-[90px] ${alfaSlabOne.className} z-9 text-title max-lg:text-center`}
          >
            HACK STORY
          </div>
        </div>
        <div
          className={`text-timelineheading text-center text-sm font-semibold md:text-lg lg:text-xl ${manrope.className} text-[#E8E8EE]`}
        >
          Judge all the projects in the
          <br className="hidden sm:block" />
          hackathon!
        </div>

        {session ? (
          <div className="mt-12 flex flex-col gap-x-8 gap-y-4 sm:flex-row">
            <div
              className={`flex cursor-pointer flex-row rounded-[30px] bg-yellow px-8 py-4 text-[12px] font-extrabold md:text-[15px] lg:text-[20px] ${manrope.className}`}
              onClick={() => void router.push("/teams")}
            >
              VIEW TEAMS
            </div>
          </div>
        ) : (
          <div
            className={`mt-12 flex cursor-pointer flex-row rounded-[30px] bg-yellow px-8 py-4 text-[12px] font-extrabold md:text-[15px] lg:text-[20px] ${manrope.className}`}
            onClick={() => void signIn("google")}
          >
            SIGN IN
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroContent;
