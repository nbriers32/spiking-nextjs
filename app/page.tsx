import ProductCard from "./users/components/ProductCard";

export default function Home() {
  return (
    <main>
      <h1><b> Hello </b>, Welcome to your Dashboard </h1>
      <p> Overview</p>
      <p> KPIs</p>
      <p> Item Tiles</p>
      <p> Reports</p>
      <ProductCard/>
    </main>
  );
}
