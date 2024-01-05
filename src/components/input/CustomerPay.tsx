import { FC } from "react";

interface CustomerPayProps {
  totalTableSales: string;
  customerPay: string;
  salesBalance: string;
}

const CustomerPay: FC<CustomerPayProps> = ({
  totalTableSales,
  customerPay,
  salesBalance,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg">Customer Pay &#40;RM&#41;</h2>
        <div className="flex space-x-4 items-end">
          <h2 className="text-2xl font-semibold">RM</h2>
          <input
            name="customerPay"
            type="number"
            placeholder="Customer Pay (RM)"
            className="input input-bordered rounded-sm"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg">Balance &#40;RM&#41;</h2>
        <div className="flex space-x-4 items-end">
          <h2 className="text-2xl font-semibold">RM</h2>
          <input
            name="balance"
            type="number"
            placeholder="balance"
            className="input input-bordered rounded-sm !text-neutral-500"
            value="100.00"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerPay;
