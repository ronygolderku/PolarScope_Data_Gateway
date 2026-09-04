import React from "react";
import {
    FaSearch,
} from "react-icons/fa";
import { Link } from "react-router";

const steps = [
    {
        title: "Define what you need",
        text: "Write down the place, time period, and measurement you need. For example: sea-ice concentration in the Weddell Sea from 2015 to 2020.",
    },
    {
        title: "Find candidate datasets",
        text: "Search by keyword, or browse by research theme, variable, or satellite mission. Open a product record to see its coverage and provider.",
    },
    {
        title: "Check the metadata",
        text: "Compare the spatial and temporal coverage, resolution, format, licence, and known limitations before choosing a product.",
    },
    {
        title: "Open the provider link",
        text: "PolarScope is a discovery portal. The product page links to the organisation that hosts the data and explains its access requirements.",
    },
];

const GettingStarted = () => {
    return (
        <main className="min-h-screen bg-transparent text-[#F8FAFC]">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-8 sm:px-6 md:py-12 lg:px-8">
                <header className="max-w-3xl space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F4C542]">
                        Using the catalogue
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        Find and use polar data
                    </h1>
                    <p className="text-lg leading-8 text-[#D6E1F0]">
                        A practical starting point for finding Antarctic and Southern Ocean datasets. You can be searching in under a minute.
                    </p>
                    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                        <Link
                            to="/search"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F4C542] px-5 py-3 font-semibold text-[#0F2D57] transition-colors hover:bg-[#e8ba30]"
                        >
                            <FaSearch />
                            Search datasets
                        </Link>
                        <Link
                            to="/catalog"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                        >
                            Browse the catalogue
                        </Link>
                    </div>
                </header>

                <section aria-labelledby="workflow-heading" className="space-y-5">
                    <div>
                        <h2 id="workflow-heading" className="text-2xl font-bold text-white sm:text-3xl">
                            How to find what you need
                        </h2>
                        <p className="mt-2 text-[#D6E1F0]">A few practical things to keep in mind while you search.</p>
                    </div>
                    <div className="max-w-4xl space-y-5 border-l-2 border-[#3dd6d0]/50 pl-5 sm:pl-7">
                        {steps.map((step) => (
                            <article key={step.title}>
                                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                                <p className="mt-1 max-w-3xl text-sm leading-6 text-[#D6E1F0]">{step.text}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="max-w-4xl border-t border-white/10 pt-8">
                    <h2 className="text-2xl font-bold text-white">Before you choose</h2>
                    <p className="mt-3 text-sm leading-7 text-[#D6E1F0]">
                        Product titles can look similar, so check the region, time range, variables, resolution, format, licence, and access requirements on each product page before you download anything.
                    </p>
                </section>

                <section className="border-t border-white/10 pt-8">
                    <h2 className="text-2xl font-bold text-white">Where to go from here</h2>
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                        <Link to="/tutorials" className="text-[#F4C542] transition-colors hover:text-white">Tutorials <span aria-hidden="true">→</span></Link>
                        <Link to="/documentation" className="text-[#F4C542] transition-colors hover:text-white">Documentation <span aria-hidden="true">→</span></Link>
                        <Link to="/bgc-argo" className="text-[#F4C542] transition-colors hover:text-white">BGC-Argo observations <span aria-hidden="true">→</span></Link>
                    </div>
                </section>

                <footer className="border-t border-[#3dd6d0]/25 bg-[#123f71] px-5 py-5 text-sm text-[#D6E1F0] sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <p>Questions about the catalogue?</p>
                    <a href="mailto:ACEAS.Project.Office@utas.edu.au" className="mt-2 inline-block font-semibold text-[#F4C542] hover:text-white sm:mt-0">
                        Contact the ACEAS Project Office
                    </a>
                </footer>
            </div>
        </main>
    );
};

export default GettingStarted;
