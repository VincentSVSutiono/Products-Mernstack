import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductList = () => {
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  };

  const { data } = useSWR("products", fetcher);
  if (!data) return <h1>Loading...</h1>;

  const deleteProduct = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      await axios.delete(`http://localhost:5000/products/${id}`);
      mutate("products");
    }
  };

  return (
    <div>
      <div className="w-full mt-10">
        <Link
          to={"/add"}
          className="bg-blue-500 hover:bg-blue-700 border-2 border-red-500 text-white font-bold py-2 px-4 rounded"
        >
          Add New List
        </Link>
        <table className="w-full border-2 border-solid border-black mt-5">
          <thead className="bg-amber-200 border-2 border-solid border-black">
            <tr className="">
              <th className="border-2 border-solid border-black py-3">NO.</th>
              <th className="border-2 border-solid border-black">
                Product Name
              </th>
              <th className="border-2 border-solid border-black">Price</th>
              <th className="border-2 border-solid border-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product: Product, index: number) => (
              <tr className="text-center" key={product.id}>
                <td className="border-2 border-solid border-black py-5">
                  {index + 1}
                </td>
                <td className="border-2 border-solid border-black">
                  {product.name}
                </td>
                <td className="border-2 border-solid border-black">
                  {product.price}
                </td>
                <td className="border-2 border-solid border-black">
                  <Link
                    to={`/edit/${product.id}`}
                    className="bg-blue-500 hover:bg-blue-700 border-2 border-red-500 text-white font-bold py-2 px-4 rounded mx-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 hover:bg-red-700 border-2 border-emerald-200 text-white font-bold py-2 px-4 rounded mx-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
