"use client";
import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import Pagination from "@/components/Pagination";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${limit}`,
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setProperties(data.properties);
        setTotalItems(data.total);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, limit]);

  const handleChangePage = (page) => {
    setPage(page);
  };
  return loading ? (
    <Spinner />
  ) : (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {properties?.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties?.map((property) => {
                return <PropertyCard key={property._id} property={property} />;
              })}
            </div>
          )}
          <Pagination
            page={page}
            pageSize={limit}
            totalItems={totalItems}
            onPageChange={handleChangePage}
          />
        </div>
      </section>
    </>
  );
};

export default Properties;
