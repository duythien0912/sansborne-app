import React from "react";

// components


// layout for page

import Admin from "layouts/Admin.js";
import CustomersCardTable from "components/Cards/CardTableCustomers";
import CardTableCustomers2 from "components/Cards/CardTableCustomers2";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-12">
        {/* <div className="w-full mb-12 px-4">
          <CardTable />
        </div> */}
        <div className="w-full">
          {/* <CustomersCardTable color="dark" /> */}
          <CardTableCustomers2 />
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;
