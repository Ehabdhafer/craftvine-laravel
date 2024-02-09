import React from "react";
import Statistics from "./Statistics";
import UserTable from "./UserTable";
import ProductForm from "./ProductForm";
import OrdersTable from "./OrdersTable";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full">
      <Statistics />
      <UserTable />
      <ProductForm />
      <OrdersTable />
    </div>
  );
};

export default Dashboard;
