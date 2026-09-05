import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { FaSearch } from "react-icons/fa";
import Loading from "./Loading";
import { useProductData } from "../context/ProductDataContext";
import { useDebounce } from "../hooks/useDebounce";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const { allProducts, isLoading: isDataLoading, fetchAllProducts } = useProductData();
  const { setSelection, pushSelection } = useProductData();

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const selectedId = location.state?.selectedId;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (!searched && initialQuery) {
      setSearched(true);
      setLoading(true);
      fetchAllProducts().then(() => setLoading(false));
    } else {
      fetchAllProducts();
    }
  }, []);

  const results = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return allProducts;
    }

    const searchLower = debouncedSearchTerm.toLowerCase();
    return allProducts.filter((product) => {
      // Search in title, description, keywords
      const matchesProduct =
        product.title?.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower) ||
        product.keywords?.some((k) => k.toLowerCase().includes(searchLower));

      // Search in variables (e.g., "isotopes", "13CH4", "chlorophyll")
      const matchesVariable = product['osc:variables']?.some((v) =>
        v.toLowerCase().includes(searchLower)
      );

      // Search in missions (e.g., "MODIS", "Sentinel-3", "CryoSat-2")
      const matchesMission = product['osc:missions']?.some((m) =>
        m.toLowerCase().includes(searchLower)
      );

      return matchesProduct || matchesVariable || matchesMission;
    });
  }, [debouncedSearchTerm, allProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearched(true);
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[#F8FAFC] px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <section className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F4C542]">
          Search
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          Search products
        </h1>
        <p className="text-base leading-7 text-[#D6E1F0]">
          Find products by title, description, keywords, variables, or missions.
        </p>

        <form onSubmit={handleSearch} className="relative pt-2">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F4C542] z-10" />
          <input
            type="search"
            placeholder="Try: sea ice, isotopes, MODIS, chlorophyll..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-base rounded-lg bg-[#0b2748] border border-white/20 text-[#F8FAFC] placeholder-[#D6E1F0]/60 focus:outline-none focus:border-[#F4C542]"
          />
        </form>
      </section>

      {(loading || isDataLoading) && <Loading />}

      {!loading && !isDataLoading && results.length === 0 && searched && (
        <div className="border border-white/10 rounded-lg p-8 text-center">
          <p className="text-lg font-semibold text-white mb-2">No products found</p>
          <p className="text-sm text-[#D6E1F0]">
            Try different keywords or browse the catalog.
          </p>
        </div>
      )}

      {!loading && !isDataLoading && results.length > 0 && (
        <section className="space-y-6">
          <div className="border-y border-white/10 py-4 flex items-baseline gap-2">
            <h2 className="text-xl font-semibold text-white">
              {searched ? "Results" : "All products"}
            </h2>
            <span className="text-sm text-[#D6E1F0]">
              ({results.length})
            </span>
          </div>

          <div className="space-y-4">
            {results.map((product) => {
              const isSelected = selectedId === product.id;
              const searchUrl = searchTerm.trim()
                ? `/search?q=${encodeURIComponent(searchTerm)}`
                : "/search";

              return (
                <div
                  key={product.id}
                  onClick={() => {
                    try {
                      setSelection([product.id]);
                      pushSelection(product.id);
                    } catch (e) { }
                    navigate(`/products/${product.productPath}`, {
                      state: {
                        from: searchUrl,
                        returnState: { selectedId: product.id },
                      },
                    });
                  }}
                  className={`group cursor-pointer border border-white/10 py-5 transition-colors hover:border-white/25 hover:bg-white/5 ${isSelected ? "border-[#F4C542]" : ""
                    }`}
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#F4C542] transition-colors mb-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-[#D6E1F0] leading-relaxed line-clamp-2 mb-3">
                        {product.description || "No description available"}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#D6E1F0]">
                        <div>
                          <span className="font-semibold">Theme:</span>{" "}
                          <span className="text-[#F4C542]">{product.themeName}</span>
                        </div>

                        {product.extent?.temporal?.interval?.[0] && (
                          <div>
                            <span className="font-semibold">Period:</span>{" "}
                            {new Date(product.extent.temporal.interval[0][0]).toLocaleDateString()}
                            {" - "}
                            {product.extent.temporal.interval[0][1]
                              ? new Date(product.extent.temporal.interval[0][1]).toLocaleDateString()
                              : "Present"}
                          </div>
                        )}

                        {product.keywords && product.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {product.keywords.slice(0, 3).map((keyword, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px]"
                              >
                                {keyword}
                              </span>
                            ))}
                            {product.keywords.length > 3 && (
                              <span className="text-[10px]">
                                +{product.keywords.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {!loading && !isDataLoading && allProducts.length === 0 && (
        <div className="border border-white/10 rounded-lg p-8 text-center">
          <p className="text-lg text-white">No products available</p>
        </div>
      )}
    </div>
  );
};

export default Search;
