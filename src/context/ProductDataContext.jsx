import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const ProductDataContext = createContext();

export const useProductData = () => {
  const context = useContext(ProductDataContext);
  if (!context) {
    throw new Error("useProductData must be used within ProductDataProvider");
  }
  return context;
};

export const ProductDataProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchAllProducts = useCallback(async () => {
    // If already loaded, don't fetch again
    if (hasLoaded) {
      return allProducts;
    }

    if (isLoading) {
      return null;
    }

    setIsLoading(true);

    try {
      const themesRes = await fetch("/data/themes/catalog.json");
      const themesData = await themesRes.json();
      const themeLinks = themesData.links.filter((link) => link.rel === "child");

      // Fetch all theme catalogs in parallel
      const themeCatalogsPromises = themeLinks.map(async (themeLink) => {
        const themePath = themeLink.href.replace("./", "/data/themes/");
        const themeRes = await fetch(themePath);
        return await themeRes.json();
      });

      const themeCatalogs = await Promise.all(themeCatalogsPromises);

      // Fetch all products in parallel
      const allProductPromises = [];
      themeCatalogs.forEach((themeCatalog) => {
        const themeId = themeCatalog.id;
        const productLinks = themeCatalog.links.filter(
          (link) => link.rel === "child"
        );

        productLinks.forEach((prodLink) => {
          const prodPathRelative = prodLink.href;
          const prodPath = prodPathRelative
            .replace("../../", "/data/")
            .replace("../", "/data/");

          allProductPromises.push(
            fetch(prodPath)
              .then((res) => res.json())
              .then((prodData) => ({
                ...prodData,
                productPath: prodData.id,
                themeId: themeId,
                themeName: themeCatalog.title,
              }))
              .catch((err) => {
                console.error("Error fetching product:", err);
                return null;
              })
          );
        });
      });

      const products = await Promise.all(allProductPromises);
      const filtered = products.filter((p) => p !== null);

      // Remove duplicates
      const unique = Array.from(
        new Map(filtered.map((item) => [item.id, item])).values()
      );

      setAllProducts(unique);
      setHasLoaded(true);
      return unique;
    } catch (err) {
      console.error("Failed to load products", err);
      setAllProducts([]);
      setHasLoaded(false);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [hasLoaded, isLoading, allProducts]);

  return (
    <ProductDataContext.Provider
      value={{
        allProducts,
        isLoading,
        hasLoaded,
        fetchAllProducts,
      }}
    >
      {children}
    </ProductDataContext.Provider>
  );
};

export default ProductDataContext;
