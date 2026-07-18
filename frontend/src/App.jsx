import { useEffect, useState } from "react";
import api from "./lib/axios";

function App() {
  const [products, setProducts] = useState([]);

  const loadData = async () => {
    try {
      const response = await api.get("/products");
      console.log(response.data.data);
      setProducts(response.data.data);
    } catch (error) {
      console.log("có lỗi xảy ra khi gọi api", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddProduct = async () => {
    try {
      await api.post("/products", {
        name: "giày nike",
        price: 2000000,
        image: "http://nike.png",
        category_id: "6a56f597fe57faf7f6c71dbf",
      });

      alert("thêm thành công");
      loadData();
    } catch (error) {
      console.log("có lỗi xảy ra khi thêm", error);
    }
  };
  const handleEdit = async (id) => {
    try {
      await api.put(`/products/${id}`, {
        name: "giày thượng đình",
        price: 4000000,
        image: "http://hello.png",
      });
      alert("cập nhật thành công");
      loadData();
    } catch (error) {
      console.log("có lỗi xảy ra khi gọi api", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      alert("xóa thành công");
      loadData();
    } catch (error) {
      console.log("có lỗi xảy ra khi xóa", error);
    }
  };

  return (
    <>
      <button
        className="mx-auto block cursor-pointer bg-primary p-4 rounded-2xl mt-3"
        onClick={handleAddProduct}
      >
        thêm
      </button>
      <table className="border border-black border-collapse mx-auto mt-20">
        <thead>
          <tr>
            <th className="border border-black">id</th>
            <th className="border border-black">name</th>
            <th className="border border-black">price</th>
            <th className="border border-black">image</th>
            <th className="border border-black">category_id</th>
            <th colSpan="2" className="border border-black">
              options
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border border-black">{product._id}</td>
              <td className="border border-black">{product.name}</td>
              <td className="border border-black">{product.price}</td>
              <td className="border border-black">{product.image}</td>
              <td className="border border-black">{product.category_id._id}</td>
              <td className="border border-black">
                <button
                  onClick={() => handleEdit(product._id)}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  sửa
                </button>
              </td>
              <td className="border border-black">
                <button
                  onClick={() => handleDelete(product._id)}
                  style={{ cursor: "pointer" }}
                >
                  xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
