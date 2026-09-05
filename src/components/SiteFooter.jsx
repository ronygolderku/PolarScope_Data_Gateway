import React from "react";
import { Link } from "react-router";
import { FaChevronUp, FaEnvelope, FaExternalLinkAlt } from "react-icons/fa";
import aceasLogoSecondary from "../assets/ACEAS-Logo_Secondary_Inverted-1.svg";
import utasImasLogo from "../assets/UniTas_IMAS_Logo_Rev_Mono.svg";
import curtinLogo from "../assets/Curtin_idcRjNtfwi_1.svg";

// Animated sonar pulse icon matching SeaMap Antarctica style
const SonarPulseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 70 70"
    className="w-12 h-12"
    aria-hidden="true"
  >
    <style>{`
      .fp-dot { fill: #F4C542; transform-box: fill-box; transform-origin: 50% 50%; animation: fpDotPulse 2.4s cubic-bezier(.22,.61,.36,1) infinite; }
      .fp-ring { fill: none; stroke: #F4C542; stroke-width: 2; stroke-linecap: round; transform-box: fill-box; transform-origin: 50% 50%; opacity: 0; animation: fpRingExpand 2.4s cubic-bezier(.22,.61,.36,1) infinite; }
      .fp-ring-inner { animation-delay: 0.43s; }
      .fp-ring-outer { animation-delay: 0.77s; }
      @keyframes fpDotPulse { 0%,100%{transform:scale(1);opacity:1} 15%{transform:scale(1.18);opacity:1} 28%{transform:scale(1);opacity:1} }
      @keyframes fpRingExpand { 0%{transform:scale(0.92);opacity:0} 5%{transform:scale(1);opacity:1} 55%{transform:scale(1.25);opacity:.35} 100%{transform:scale(1.25);opacity:0} }
    `}</style>
    <circle className="fp-dot" cx="35" cy="35" r="10" />
    <path className="fp-ring fp-ring-inner" d="M35,14c11.6,0,21,9.4,21,21s-9.4,21-21,21S14,46.6,14,35,23.4,14,35,14Z" />
    <path className="fp-ring fp-ring-outer" d="M35,4c17.1,0,31,13.9,31,31S52.1,66,35,66,4,52.1,4,35,17.9,4,35,4Z" />
  </svg>
);

const NAV_LINKS = [
  { to: "/catalog", label: "Data catalogue" },
  { to: "/eo-missions", label: "Satellite missions" },
  { to: "/getting-started", label: "Getting started" },
  { to: "/tutorials", label: "Tutorials" },
  { to: "/documentation", label: "Documentation" },
];

const COMMUNITY_LINKS = [
  { href: "https://github.com/ronygolderku/PolarScope_Data_Gateway", label: "GitHub Repo" },
  { href: "https://github.com/ronygolderku/PolarScope_Data_Gateway/issues", label: "Report Issues" },
  { href: "https://github.com/ronygolderku/PolarScope_Data_Gateway/issues/new", label: "Suggest Dataset" },
  { href: "mailto:ACEAS.Project.Office@utas.edu.au", label: "Contact Team" },
];

const LEGAL_LINKS = [
  { href: "https://www.utas.edu.au/privacy", label: "Privacy" },
  { href: "https://www.utas.edu.au/disclaimer", label: "Disclaimer" },
  { href: "https://www.utas.edu.au/copyright-statement", label: "Copyright Statement" },
];

const SiteFooter = () => {
  const scrollToTop = () => {
    // Find the scrollable container (the main content area)
    const scrollContainer = document.querySelector('.drawer-content > div[class*="overflow-auto"]');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Fallback to window scroll
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full mt-16" aria-label="Site footer">

      {/* ── Divider row with Back to Top ── */}
      <div className="border-t border-white/15 bg-[#0b2240]/60 backdrop-blur-md px-6 sm:px-10 py-3 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D6E1F0] hover:text-[#F4C542] transition-colors"
        >
          <FaChevronUp className="text-[9px]" />
          Back to top
        </button>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* ── Main footer body ── */}
      <div className="bg-[#06192e]/90 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1.5fr_1.4fr_0.8fr] gap-8 items-start">

          {/* Column 1: Navigation menu */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#F4C542] mb-4">
              Menu
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-[#B8CDE6] hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Animated sonar pulse vertical divider (desktop only) */}
          <div className="hidden lg:flex flex-col items-center justify-center self-stretch py-2 gap-3 px-4">
            <div className="w-px flex-1 bg-white/10" />
            <SonarPulseIcon />
            <div className="w-px flex-1 bg-white/10" />
          </div>

          {/* Column 3: Logo + Address + Contact */}
          <div className="space-y-4">
            <img
              src={aceasLogoSecondary}
              alt="ACEAS — Australian Centre for Excellence in Antarctic Science"
              className="h-14 w-auto object-contain opacity-85"
            />
            <div className="text-sm text-[#B8CDE6] leading-relaxed space-y-0.5">
              <p className="font-semibold text-white mb-1">ACEAS Project Office</p>
              <p>Institute for Marine and Antarctic Studies (IMAS)</p>
              <p>20 Castray Esplanade, Battery Point</p>
              <p>Hobart TAS 7004, Australia</p>
            </div>
            <a
              href="mailto:ACEAS.Project.Office@utas.edu.au"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#F4C542] hover:text-white transition-colors break-all"
            >
              <FaEnvelope className="shrink-0 text-xs" />
              ACEAS.Project.Office@utas.edu.au
            </a>
          </div>

          {/* Column 4: Partner institutions */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#F4C542]">
              Partners
            </p>
            <div className="flex flex-col gap-5">
              <a
                href="https://www.utas.edu.au/imas"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                aria-label="University of Tasmania — Institute for Marine and Antarctic Studies"
              >
                <img
                  src={utasImasLogo}
                  alt="UTas IMAS"
                  className="h-14 w-auto object-contain opacity-75 group-hover:opacity-100 transition-opacity"
                />
              </a>

              <a
                href="https://www.curtin.edu.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                aria-label="Curtin University"
              >
                <img
                  src={curtinLogo}
                  alt="Curtin University"
                  className="h-11 w-auto object-contain opacity-75 group-hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>

          {/* Column 5: Community */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#F4C542] mb-4">
              Community
            </p>
            <ul className="space-y-2.5">
              {COMMUNITY_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#B8CDE6] hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    {label}
                    <FaExternalLinkAlt className="text-[9px] opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom copyright bar ── */}
        <div className="border-t border-white/10 bg-[#030e1d]/70">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#7A9FC0]">
            <p>
              PolarScope Data Gateway {new Date().getFullYear()} &mdash; ACEAS Project. All rights reserved.
            </p>
            <nav aria-label="Legal links" className="flex flex-wrap items-center gap-x-5 gap-y-1">
              {LEGAL_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4C542] transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
