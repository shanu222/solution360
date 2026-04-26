import { useNavigate } from "react-router-dom";
import ProductsSection from "../components/ProductsSection";

function Products() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <ProductsSection onNavigate={(path) => navigate(path)} />
    </div>
  );
}

export default Products;
