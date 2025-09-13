import { Marquee } from "@/components/ui/marquee"

const Logos = {
  react: () => (
    <div className="h-fit flex items-center justify-start font-bold text-xl gap-3">
      <svg viewBox="0 0 24 24" className="h-[30px] fill-accent-500">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2a5.5 5.5 0 0 0-5.5 5.5A5.5 5.5 0 0 0 12 13a5.5 5.5 0 0 0 5.5-5.5A5.5 5.5 0 0 0 12 2z"/>
        <path d="M12 22a5.5 5.5 0 0 1-5.5-5.5A5.5 5.5 0 0 1 12 11a5.5 5.5 0 0 1 5.5 5.5A5.5 5.5 0 0 1 12 22z"/>
      </svg>
      React
    </div>
  ),
  typescript: () => (
    <div className="h-fit flex items-center justify-start font-bold text-xl gap-3">
      <svg viewBox="0 0 24 24" className="h-[30px] fill-accent-600">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.302.229-.393.374a.888.888 0 0 0-.136.499c0 .228.062.424.185.588.123.164.296.3.517.408.221.108.48.192.776.25.296.058.622.113.977.165.612.089 1.18.201 1.703.334.522.133.969.323 1.34.571.371.149.65.408.84.775.19.367.285.849.285 1.443 0 .19-.016.424-.049.703a4.633 4.633 0 0 1-.147.762 2.68 2.68 0 0 1-.25.46 2.402 2.402 0 0 1-.346.338c-.305.227-.78.406-1.425.537-.643.132-1.496.198-2.559.198-.827 0-1.524-.049-2.09-.148a2.597 2.597 0 0 1-1.523-.537l.098-2.778c.511.578 1.24.867 2.186.867.244 0 .456-.018.635-.037.178-.018.317-.056.415-.11a.422.422 0 0 0 .148-.22.7.7 0 0 0 .037-.24c0-.196-.062-.353-.185-.47-.122-.116-.296-.215-.517-.295a5.84 5.84 0 0 0-.776-.21 27.948 27.948 0 0 0-.977-.144c-.613-.09-1.18-.227-1.703-.41a3.097 3.097 0 0 1-1.34-.595 2.466 2.466 0 0 1-.84-.86c-.19-.36-.284-.795-.284-1.302 0-.48.098-.911.293-1.302.195-.39.478-.729.848-1.016.37-.286.84-.506 1.412-.657.571-.15 1.222-.225 1.952-.225zM7.27 9.778l.818 10.017h1.725l.638-7.865.93 7.865h1.725l.982-10.017H12.96l-.467 7.046-.9-7.046z"/>
      </svg>
      TypeScript
    </div>
  ),
  solana: () => (
    <div className="h-fit flex items-center justify-start font-bold text-xl gap-3">
      <svg viewBox="0 0 24 24" className="h-[30px] fill-primary-700">
        <circle cx="12" cy="12" r="10"/>
        <path d="M16 10l4-4-4-4v3H8v2h8v3z" fill="white"/>
        <path d="M8 14l-4 4 4 4v-3h8v-2H8v-1z" fill="white"/>
      </svg>
      Solana
    </div>
  ),
  nodejs: () => (
    <div className="h-fit flex items-center justify-start font-bold text-xl gap-3">
      <svg viewBox="0 0 24 24" className="h-[30px] fill-green-600">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 17.568a.75.75 0 01-1.036.2L12 15.5l-4.532 2.268a.75.75 0 11-.668-1.336L12 13.5l5.2 2.932a.75.75 0 01.368.936z"/>
      </svg>
      Node.js
    </div>
  ),
  anchor: () => (
    <div className="h-fit flex items-center justify-start font-bold text-xl gap-3">
      <svg viewBox="0 0 24 24" className="h-[30px] fill-primary-600">
        <path d="M12 2a2 2 0 0 1 2 2v16a2 2 0 0 1-4 0V4a2 2 0 0 1 2-2z"/>
        <path d="M4 12a8 8 0 0 1 16 0"/>
      </svg>
      Anchor
    </div>
  ),
  tailwind: () => (
    <div className="h-fit flex items-center justify-start font-bold text-xl gap-3">
      <svg viewBox="0 0 24 24" className="h-[30px] fill-cyan-500">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
      Tailwind
    </div>
  ),
  vite: () => (
    <div className="h-fit flex items-center justify-start font-bold text-xl gap-3">
      <svg viewBox="0 0 24 24" className="h-[30px] fill-purple-500">
        <path d="M23.1 9.4l-11.2-8.6c-.5-.4-1.2-.4-1.8 0L.9 9.4c-.6.5-.7 1.3-.2 1.9L12 22l11.3-10.7c.5-.6.4-1.4-.2-1.9z"/>
      </svg>
      Vite
    </div>
  ),
  rust: () => (
    <div className="h-fit flex items-center justify-start font-bold text-xl gap-3">
      <svg viewBox="0 0 24 24" className="h-[30px] fill-orange-600">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2a10 10 0 110 20 10 10 0 010-20z"/>
      </svg>
      Rust
    </div>
  )
};

export function MarqueeDemo() {
  const arr = [Logos.react, Logos.typescript, Logos.solana, Logos.nodejs, Logos.anchor, Logos.tailwind, Logos.vite, Logos.rust]

  return (
    <Marquee className="mt-8">
      {arr.map((Logo, index) => (
        <div
          key={index}
          className="relative h-full w-fit mx-[4rem] flex items-center justify-start"
        >
          <Logo />
        </div>
      ))}
    </Marquee>
  )
}
