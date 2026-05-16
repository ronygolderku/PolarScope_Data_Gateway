import React from "react";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const ResourceCard = ({ to, title, description, icon: Icon }) => {
    return (
        <Link
            to={to}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#F4C542]/50 hover:bg-white/10 hover:shadow-lg"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#F4C542]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F4C542]/15 text-[#F4C542] ring-1 ring-[#F4C542]/30">
                    <Icon className="text-xl" />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[#F8FAFC] transition-colors group-hover:text-[#F4C542]">
                            {title}
                        </h3>
                        <FaArrowRight className="mt-1 shrink-0 text-[#D6E1F0] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#F4C542]" />
                    </div>
                    <p className="mt-2 text-sm sm:text-[0.95rem] leading-6 text-[#D6E1F0]">{description}</p>
                </div>
            </div>
        </Link>
    );
};

export default ResourceCard;
