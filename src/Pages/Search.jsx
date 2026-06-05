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

  // Fetch all products on mount
  useEffect(() => {
    if (!searched && initialQuery) {
      setSearched(true);
      setLoading(true);
      fetchAllProducts().then(() => setLoading(false));
    } else {
      fetchAllProducts();
    }
  }, []);

  // Filter results based on debounced search term
  const results = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      // Show all products if no search term
      return allProducts;
    }

    const searchLower = debouncedSearchTerm.toLowerCase();
    return allProducts.filter((product) => {
      return (
        product.title?.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower) ||
        product.keywords?.some((k) =>
          k.toLowerCase().includes(searchLower),
        )
      );
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
    <div className="min-h-screen bg-gradient-to-b from-[#0F2D57] to-[#1B3A5F] text-[#F8FAFC] p-4 md:p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Search Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[#F8FAFC]">Search Products</h1>
          <p className="text-[#D6E1F0]">
            Find products by title, description, or keywords
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input w-full pl-12 text-lg h-12 rounded-lg bg-[#143A6A] border-[#1B457A] text-[#F8FAFC] placeholder-[#D6E1F0]"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F4C542]" />
          </form>
        </div>

        {/* Results Section */}
        {(loading || isDataLoading) && <Loading />}

        {!loading && !isDataLoading && results.length === 0 && searched && (
          <div className="bg-[#143A6A] border border-[#1B457A] text-[#D6E1F0] p-6 rounded-lg text-center">
            <p className="text-lg font-semibold">No products found</p>
            <p className="text-sm mt-2">
              Try different keywords or browse the catalog
            </p>
          </div>
        )}

        {!loading && !isDataLoading && results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-[#F8FAFC]">
                {searched ? "Search Results" : "All Products"}
              </h2>
              <span className="badge badge-neutral text-base">{results.length}</span>
            </div>

            <div className="grid gap-4">
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
                    } catch (e) {}
                    navigate(`/products/${product.productPath}`, {
                      state: {
                        from: searchUrl,
                        returnState: { selectedId: product.id },
                      },
                    });
                  }
                  }
                  className={`bg-[#143A6A] border border-[#1B457A] rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden ${
                    isSelected ? "ring-2 ring-[#F4C542]" : ""
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 min-w-0">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-[#F8FAFC] group-hover:text-[#F4C542] mb-2 break-words">
                        {product.title}
                      </h3>
                      <p className="text-[#D6E1F0] text-sm leading-relaxed line-clamp-2 mb-3 break-words">
                        {product.description || "No description available"}
                      </p>

                      <div className="space-y-2">
                        <div className="text-xs text-[#D6E1F0]">
                          <span className="font-semibold">Theme:</span>{" "}
                          <span className="badge badge-outline capitalize text-[#F8FAFC] border-[#F4C542]">
                            {product.themeName}
                          </span>
                        </div>

                        {product.keywords && product.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {product.keywords.slice(0, 3).map((keyword, i) => (
                              <span
                                key={i}
                                className="badge badge-sm bg-[#1B457A] text-[#F8FAFC] text-xs max-w-full break-all"
                              >
                                {keyword}
                              </span>
                            ))}
                            {product.keywords.length > 3 && (
                              <span className="text-xs text-[#D6E1F0]">
                                +{product.keywords.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="md:text-right space-y-2 min-w-0">
                      <div className="text-xs text-[#D6E1F0]">
                        <span className="font-semibold">Temporal:</span>
                        <br />
                        {product.extent?.temporal?.interval?.[0]
                          ? `${new Date(
                              product.extent.temporal.interval[0][0],
                            ).toLocaleDateString()} - ${
                              product.extent.temporal.interval[0][1]
                                ? new Date(
                                    product.extent.temporal.interval[0][1],
                                  ).toLocaleDateString()
                                : "Present"
                            }`
                          : "Unknown"}
                      </div>
                      <button className="btn btn-sm btn-outline rounded-md capitalize text-[#F8FAFC] border-[#1B457A]">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        )}

        {!loading && !isDataLoading && allProducts.length === 0 && (
          <div className="text-center py-12 text-[#D6E1F0]">
            <p className="text-lg">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
