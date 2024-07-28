import AllCharts from "./components/Charts/AllCharts";
import DataTable from "./components/Tabel";

const App = () => {
  return (
    <div className="mx-2 md:mx-24">
      <div className="bg-purple-600 text-white w-auto  p-2 my-4 rounded-md">
        <h1 className="text-3xl font-bold  text-center">
          Transactions Dashboard
        </h1>
      </div>
      <DataTable />
      <div>
        <AllCharts />
      </div>
    </div>
  );
};

export default App;
