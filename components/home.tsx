"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const applyButtonRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const socialNetworksSectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1 },
      });

      const titleChars = new SplitText(titleRef.current!, { type: "chars" });

      tl.from(titleChars.chars, {
        y: 400,
        stagger: 0.1,
        ease: "power4.out",
        duration: 1.5,
      });

      tl.from(
        [
          headerRef.current,
          socialNetworksSectionRef.current,
          footerRef.current,
        ],
        {
          opacity: 0,
          ease: "power4.out",
          delay: 0.5,
          duration: 1,
        },
        "-=2"
      );

      tl.from(
        applyButtonRef.current,
        {
          y: 300,
          ease: "power4.out",
        },
        "-=1"
      );

      return tl;
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center gap-10 h-screen p-4 bg-[#ebeae6] text-primary"
    >
      <header className="text-center text-[10px] uppercase" ref={headerRef}>
        <h2>THE FREELANCE DIRECTORY</h2>
        <p>A Thomas Aufresne and Isaac Powell creation</p>
      </header>
      <main className="flex-1 text-center flex flex-col items-center justify-center gap-20">
        <h1
          ref={titleRef}
          className="text-[20rem] font-bold uppercase font-anton overflow-hidden leading-[0.92] select-none"
        >
          LA PIGE
        </h1>

        <Link href="/apply" className="overflow-hidden">
          <div ref={applyButtonRef}>
            <Button size="sm" className="rounded-full">
              APPLY NOW
            </Button>
          </div>
        </Link>
      </main>
      <footer className="flex justify-between items-center w-full uppercase relative">
        <section className="flex gap-2" ref={socialNetworksSectionRef}>
          <Button size="sm" variant="outline" className="rounded-full">
            INSTAGRAM
          </Button>
          <Button size="sm" variant="outline" className="rounded-full">
            TWITTER
          </Button>
        </section>
        <section
          className="absolute left-1/2 transform -translate-x-1/2"
          ref={footerRef}
        >
          <p className="text-center text-[10px] uppercase">
            <span>indépendant; à la pige; ADJ ‘/a la piʒ/’</span>
            <br />
            <span>RELEASE v1.0 COMING SOON</span>
          </p>
        </section>
        <section>&nbsp;</section>
      </footer>
    </div>
  );
}

export default Home;
