import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setName(response.data.name);
      setPrice(response.data.price);
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e: any) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/products/${id}`, {
      name: name,
      price: price,
    });
    navigate("/");
  };

  return (
    <div className="max-w-4xl bg-emerald-200 mx-auto my-10 p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-center text-3xl font-bold">Edit Product</h1>
      <form onSubmit={updateProduct} className="my-10 p-7">
        <div className="mb-5">
          <label className="block text-lg font-bold">Product Name</label>
          <input
            type="text"
            className="w-full border-2 p-2 rounded-lg"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-lg font-bold">Price</label>
          <input
            type="number"
            className="w-full border-2 p-2 rounded-lg"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <center>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 border-2 border-red-500 text-white font-bold py-2 px-4 mt-6 rounded-lg"
          >
            Save
          </button>
        </center>
      </form>
    </div>
  );
};

export default EditProduct;
