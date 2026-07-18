import React from "react";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const ResourceCard = ({ to, title, description, icon: Icon }) => {
    return (
        <Link
            to={to}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#143A6A] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#1B457A] hover:shadow-lg"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/8 text-[#F4C542] ring-1 ring-white/10">
                    <Icon className="text-xl" />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[#F8FAFC] transition-colors group-hover:text-[#F4C542]">
                            {title}
                        </h3>
                        <FaArrowRight className="mt-1 shrink-0 text-[#D6E1F0] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
                    </div>
                    <p className="mt-2 text-sm sm:text-[0.95rem] leading-6 text-[#D6E1F0]">{description}</p>
                </div>
            </div>
        </Link>
    );
};

export default ResourceCard;
