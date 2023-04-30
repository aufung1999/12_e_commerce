import Head from "next/head";
import Image from "next/image";

import Layout from "@/components/Layout";
import data from "@/utils/data";
import ProductItems from "@/components/ProductItems";

export default function Home() {
  return (
    <Layout title="Hi">
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products?.map((each) => (
          <ProductItems product={each} key={each.slug} />
        ))}
      </div>
    </Layout>
  );
}
