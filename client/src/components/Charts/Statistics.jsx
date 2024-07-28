/* eslint-disable react/prop-types */

const Statistics = ({ statsData }) => {
  console.log(statsData);
  return (
    <div className="text-center">
      <p className="font-bold text-xl my-4 ">Statistics</p>

      <div className="capitalize  bg-purple-100 p-4 rounded-md font-semibold flex flex-col gap-4 text-base">
        <p className="bg-purple-300 p-2 rounded-md">
          Total Not Sold Items : {statsData.totalNotSoldItems}
        </p>
        <p className="bg-purple-300 p-2 rounded-md">
          Total Sale Amount : {statsData.totalSaleAmount}
        </p>
        <p className="bg-purple-300 p-2 rounded-md">
          Total Sold Items : {statsData.totalSoldItems}
        </p>
      </div>
    </div>
  );
};

export default Statistics;
