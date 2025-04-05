import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CardActionArea,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { fetchProducts } from "../services/ProductService";
import "../pages/ProductList.css";

export default function ProductList({ searchQuery, cartItems }) {
  const LIMIT = 15;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [observerRef, setObserverRef] = useState(null);
  const observer = useRef();

  //Cargar productos con un useCallback
  const loadProducts = useCallback(async () => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const data = await fetchProducts({
        search: searchQuery,
        page,
        limit: LIMIT,
      });
      setProducts((prev) => [
        ...prev,
        ...data.item.props.pageProps.initialData.searchResult.itemStacks[0]
          .items,
      ]);
      setHasMore(true); // Harcoded paginacion
    } catch (err) {
      console.error(err.message);
    }
    setLoading(false);
  }, [searchQuery, page]);

  useEffect(() => {
    if (searchQuery) {
      setProducts([]);
      setPage(1);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      loadProducts();
    }
  }, [loadProducts]);

  // Observador para scroll infinito
  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (observerRef) observer.current.observe(observerRef);
  }, [loading, hasMore, observerRef]);

  const handleDragStart = (e, product) => {
    console.log(product);
    e.dataTransfer.setData("text/plain", JSON.stringify(product));
  };

  //Filtrar lista de productos para quitar el producto seleccionado
  const visibleProducts = products.filter(
    (product) => !cartItems.some((item) => item.id === product.id)
  );

  if (!searchQuery) {
    return (
      <p style={{ padding: "2rem" }}>
        🔍 Ingresa una búsqueda para mostrar resultados.
      </p>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {visibleProducts.map((product) => (
          <Grid size={{ xs: 12, sm: 6 }} md={4} key={product.id}>
            <Card
              draggable
              onDragStart={(e) => handleDragStart(e, product)}
              sx={{
                height: "400px",
                display: "flex",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <CardActionArea
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    height: 200,
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ flexGrow: 1, width: "100%" }}>
                  <Typography variant="h6" noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="body1" noWrap>
                    ${product.price ? product.price.toFixed(2) : ""}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Elemento de referencia para IntersectionObserver */}
      <div
        ref={setObserverRef}
        style={{
          height: "1px",
          marginTop: "1rem",
          backgroundColor: "transparent",
        }}
      ></div>

      {loading && (
        <div style={{ margin: "2rem", textAlign: "center" }}>
          <CircularProgress />
        </div>
      )}
    </>
  );
}
