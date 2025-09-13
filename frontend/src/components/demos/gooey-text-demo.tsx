import { GooeyText } from "@/components/ui/gooey-text-morphing";

export function GooeyTextDemo() {
  return (
    <div className="h-[200px] flex items-center justify-center">
      <GooeyText
        texts={["Create", "Epic", "Gaming", "NFTs"]}
        morphTime={1}
        cooldownTime={0.25}
        className="font-bold"
        textClassName="gradient-text"
      />
    </div>
  );
}
