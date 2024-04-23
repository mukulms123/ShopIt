import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import CustomPagination from "./layout/CustomPagination";
import Filters from "./layout/Filters";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category");
  const min = searchParams.get("min");
  const max = searchParams.get("max");

  const params = { page, keyword };

  if (min != null) {
    params.min = min;
  }

  if (max != null) {
    params.max = max;
  }

  if (category != null) {
    params.category = category;
  }

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);
  console.log(data);

  const columnsize = keyword ? "4" : "3";

  if (isLoading) return <Loader />;
  return (
    <>
      <MetaData title={"Buy Best Products Online"} />
      <div className="row">
        {keyword && (
          <div className="col-6 col-md-3 mt-5">
            <Filters />
          </div>
        )}
        <div className={keyword ? "col-6 col-md-9" : "col-sm-6 col-md-12"}>
          <h1 id="products_heading" className="text-secondary">
            {keyword
              ? `${data.products.length} Products Found with Keyword ${keyword}`
              : "Latest Products"}
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => {
                return (
                  <ProductItem product={product} columnsize={columnsize} />
                );
              })}
            </div>
          </section>
          <CustomPagination
            resPerPage={data?.resPerPage}
            filteredProductsCount={data?.filteredProductsCounts}
          />
        </div>
      </div>
    </>
  );
};
export default Home;
