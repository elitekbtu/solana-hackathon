import { AnimatedTooltip } from "@/components/ui/animated-tooltip"

const teamMembers = [
  {
    id: 1,
    name: "Alibek Anuarbek",
    designation: "Product Manager",
    image: "/alibek.jpg",
  },
  {
    id: 2,
    name: "Ualikhanuly Beknur", 
    designation: "Frontend Developer",
    image: "/beknur.jpg",
  },
  {
    id: 3,
    name: "Yermakhan Sultan",
    designation: "Backend Developer", 
    image: "/sultan.jpg",
  },
  {
    id: 4,
    name: "Satbaldiyev Turarbek",
    designation: "Full-Stack Developer",
    image: "/turarbek.png",
  },
];

export function AnimatedTooltipDemo() {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary-800 mb-2">Meet Our Team</h3>
        <p className="text-primary-600 max-w-lg">
          The passionate developers and designers behind Butaq NFT Studio
        </p>
      </div>
      <div className="flex flex-row items-center justify-center mb-10 w-full">
        <AnimatedTooltip items={teamMembers} />
      </div>
    </div>
  );
}
