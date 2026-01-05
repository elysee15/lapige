"use client";

import Link from "next/link";
import ApplyForm from "./apply-form";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

function ApplyPage() {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const applyRef = useRef<HTMLHeadingElement>(null);
  const formContainerRef = useRef<HTMLElement>(null);
  const getFeaturedRef = useRef<HTMLElement>(null);
  const getFeaturedDescriptionRef = useRef<HTMLParagraphElement>(null);

  const tl = gsap.timeline({
    defaults: { ease: "power4.out", duration: 1 },
  });

  useGSAP(
    () => {
      const applyChars = new SplitText(applyRef.current!, {
        type: "chars",
        autoSplit: true,
      });

      tl.from(applyChars.chars, {
        y: 400,
        stagger: 0.1,
        duration: 1,
      });

      tl.from(
        [
          formContainerRef.current,
          getFeaturedRef.current,
          getFeaturedDescriptionRef.current,
        ],
        {
          opacity: 0,
        },
        "-=2"
      );

      return tl;
    },
    {
      scope: containerRef,
    }
  );

  const handleBackClick = () => {
    tl.reverse().then(() => {
      router.push("/");
    });
  };

  return (
    <div className="bg-[#222221] text-[#e9e7e2] min-h-screen flex overflow-hidden">
      <header className="absolute left-0 right-0 top-4 px-4 z-10">
        <div className="flex justify-between font-medium">
          <Link
            href="/"
            className="uppercase text-[13px] border border-white px-1"
          >
            LA PIGE
          </Link>

          <button onClick={handleBackClick} className="uppercase text-[13px]">
            [ Back ]
          </button>
        </div>
      </header>
      <article className="p-4 grid grid-cols-[1fr_3fr] gap-28 w-full">
        <section className="flex items-end" ref={formContainerRef}>
          <ApplyForm />
        </section>
        <section className="border-l pl-2 relative pt-6 flex flex-col justify-between flex-1">
          <small
            className="text-[11px] uppercase absolute top-0 leading-none"
            ref={getFeaturedRef}
          >
            [ GET FEATURED ]
          </small>
          <p className="max-w-sm text-sm" ref={getFeaturedDescriptionRef}>
            To be considered for a listing on La Pige, please fill out your
            details opposite. Each application will be carefully reviewed and
            vetted while v1.0 release is being worked on.
          </p>
          <h2
            className="text-[18rem] block w-full whitespace-nowrap leading-[0.76] tracking-[-0.08em] font-semibold overflow-hidden select-none"
            ref={applyRef}
          >
            APPLY
          </h2>
        </section>
      </article>
    </div>
  );
}

export default ApplyPage;
