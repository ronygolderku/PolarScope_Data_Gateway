import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { FaSearch } from "react-icons/fa";
import Loading from "./Loading";
import { useProductData } from "../context/ProductDataContext";
import { useDebounce } from "../hooks/useDebounce";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const { allProducts, isLoading: isDataLoading, fetchAllProducts } = useProductData();
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  
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
      return [];
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
    <div className="min-h-screen bg-base-100 p-4 md:p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Search Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Search Products</h1>
          <p className="text-gray-600">
            Find products by title, description, or keywords
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-12 text-lg h-12 rounded-lg"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
           
          </form>
        </div>

        {/* Results Section */}
        {(loading || isDataLoading) && <Loading />}

        {!loading && !isDataLoading && searched && results.length === 0 && (
          <div className=" bg-opacity-20 border border-gray-200 text-gray-500 p-6 rounded-lg text-center">
            <p className="text-lg font-semibold">No products found</p>
            <p className="text-sm mt-2">
              Try different keywords or browse the catalog
            </p>
          </div>
        )}

        {!loading && !isDataLoading && results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">Results</h2>
              <span className="badge badge-neutral text-base">{results.length}</span>
            </div>

            <div className="grid gap-4">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.productPath}`)}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-900 group-hover:text-blue-700 mb-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-2 mb-3">
                        {product.description || "No description available"}
                      </p>

                      <div className="space-y-2">
                        <div className="text-xs text-gray-600">
                          <span className="font-semibold">Theme:</span>{" "}
                          <span className="badge badge-outline capitalize">
                            {product.themeName}
                          </span>
                        </div>

                        {product.keywords && product.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {product.keywords.slice(0, 3).map((keyword, i) => (
                              <span
                                key={i}
                                className="badge badge-sm badge-neutral text-xs"
                              >
                                {keyword}
                              </span>
                            ))}
                            {product.keywords.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{product.keywords.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="md:text-right space-y-2">
                      <div className="text-xs text-gray-600">
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
                      <button className="btn btn-sm btn-outline rounded-md capitalize">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!searched && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Enter a search term to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
