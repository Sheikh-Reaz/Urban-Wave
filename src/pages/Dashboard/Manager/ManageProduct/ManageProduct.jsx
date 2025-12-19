import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";

const ManageProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
useDocumentTitle("Manage Products");
  const { data: myProducts = [], refetch } = useQuery({
    queryKey: ["myProducts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-products?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // 🔥 DELETE API CALL
        const res = await axiosSecure.delete(`/product/${id}`);

        if (
          res.data.deletedCount > 0 ||
          res.data.message === "Product deleted successfully"
        ) {
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
          refetch(); // refresh product list
        }
      }
    });
  };



  return (
    <div>
      <h1>Manage Products</h1>

      <div className="overflow-x-auto min-h-[350px]">
        <table className="table">
          {/* head */}
          <thead className="text-color">
            <tr>
              <th>Product SL</th>
              <th>Product Image</th>
              <th>Product Title</th>
              <th>Price</th>
              <th>Payment Mode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myProducts.map((product, i) => (
              <tr key={product.productId}>
                <td>{i + 1}.</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask h-20 w-full">
                        <img src={product.productImg} alt="Product" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span>{product.title}</span>
                </td>
                <td>{product.price}</td>
                <td>
                  <p>{product.paymentOption}</p>
                </td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`../update-product/${product.productId}`)
                    }
                    className="btn mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product.productId)}
                    className="btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Payment Mode</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  );
};

export default ManageProduct;
