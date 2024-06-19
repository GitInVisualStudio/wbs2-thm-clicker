import { faker } from "@faker-js/faker";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "./Modal";

interface Product {
  id: string;
  name: string;
  selected: boolean;
}

const createProducts = () => {
  return Array(100)
    .fill(0)
    .map(() => {
      return {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        selected: false,
      };
    }) as Product[];
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const products = localStorage.getItem("products");

    if (products) {
      setProducts(JSON.parse(products));
    } else {
      const newProducts = createProducts();
      localStorage.setItem("products", JSON.stringify(newProducts));
      setProducts(newProducts);
    }
  }, []);

  const deleteProducts = () => {
    setProducts(products.filter((x) => !x.selected));
  };

  const selectedProducts = useMemo(() => {
    const result = products.find((x) => x.selected);
    if (!result) return undefined;
    return { ...result };
  }, [products]);

  const saveProduct = () => {
    if (!selectedProducts) return;
    const user = products.find((x) => x.id == selectedProducts.id)!;
    user.name = selectedProducts.name;
    setProducts([...products]);
  };

  return (
    <>
      <div className="d-flex gap-3">
        <button
          type="button"
          disabled={products.filter((x) => x.selected).length == 0}
          onClick={deleteProducts}
          className="btn btn-primary"
        >
          Löschen
        </button>
        <Modal
          title="Bearbeiten"
          disabled={products.filter((x) => x.selected).length != 1}
          save={saveProduct}
        >
          {selectedProducts && (
            <>
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder={selectedProducts.name}
                onChange={(x) => {
                  selectedProducts.name = x.target.value;
                }}
              />
            </>
          )}
        </Modal>
      </div>
      <div className="list-group">
        {products.map((x) => (
          <div key={x.id} className="d-flex gap-3 list-group-item">
            <input
              type="checkbox"
              checked={x.selected}
              onChange={() => {
                x.selected = !x.selected;
                setProducts([...products]);
              }}
            />{" "}
            <span>{x.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
