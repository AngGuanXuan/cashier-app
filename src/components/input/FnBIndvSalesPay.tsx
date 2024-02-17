import axios, { AxiosError } from "axios";
import React, { ChangeEvent, FC, useState } from "react";
import { FaCashRegister } from "react-icons/fa";

interface CustomerPayProps {
  FnBIndvSalesId: number;
  FnBIndvTotalSales: string;
}

const FnBIndvSalesPay: FC<CustomerPayProps> = ({
  FnBIndvSalesId,
  FnBIndvTotalSales,
}) => {
  // set data
  const [formData, setFormData] = useState({
    FnBIndvSalesId: FnBIndvSalesId,
    customerPay: "0.00",
    balance: "",
  });

  // set btn disabled
  const [btnDisabled, setBtnDisabled] = useState(true);

  // handle change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // customer pay minus price
    const getBalance = parseFloat(value) - parseFloat(FnBIndvTotalSales);
    setFormData({
      FnBIndvSalesId: FnBIndvSalesId,
      customerPay: value,
      balance: getBalance.toFixed(2).toString(),
    });

    const checkBalance = Math.sign(getBalance);
    // console.log(Math.sign(checkBalance));

    // remove btn disabled
    if (Math.sign(checkBalance) == 1) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  // quick select
  const handleBtnChange = (value: number) => {
    // console.log(value);
    const balance = value - parseFloat(FnBIndvTotalSales);
    // console.log(balance);
    setFormData({
      FnBIndvSalesId: FnBIndvSalesId,
      customerPay: value.toFixed(2).toString(),
      balance: balance.toFixed(2).toString(),
    });

    // remove btn disabled
    if (Math.sign(balance) == 0 || Math.sign(balance) == 1) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  // to paid btn
  const sendToPaid = async () => {
    // console.log(formData);

    try {
      const response = await axios.put(
        "/api/open_mode/fnbSales/individual/customerPay",
        formData
      );
      if (response.status === 200) {
        alert("customer Paid");
        location.reload();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg">Customer Pay</h2>
        <div className="flex space-x-4 items-center">
          <h2 className="text-2xl font-semibold">RM</h2>
          <input
            name="customerPay"
            type="number"
            min={0}
            placeholder="Customer Pay (RM)"
            className="input input-bordered rounded-sm text-end w-60"
            value={formData.customerPay}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-neutral-500">Quick Select</h2>
        <div className="text-end space-x-2">
          <button
            onClick={() => handleBtnChange(parseFloat(FnBIndvTotalSales))}
            className="btn btn-outline btn-info"
          >
            RM {FnBIndvTotalSales}
          </button>
          <button
            onClick={() => handleBtnChange(5)}
            className="btn btn-outline btn-info"
          >
            RM 5
          </button>
          <button
            onClick={() => handleBtnChange(10)}
            className="btn btn-outline btn-info"
          >
            RM 10
          </button>
          <button
            onClick={() => handleBtnChange(20)}
            className="btn btn-outline btn-info"
          >
            RM 20
          </button>
          <button
            onClick={() => handleBtnChange(50)}
            className="btn btn-outline btn-info"
          >
            RM 50
          </button>
          <button
            onClick={() => handleBtnChange(100)}
            className="btn btn-outline btn-info"
          >
            RM 100
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg">Balance</h2>
        <div className="flex space-x-4 items-center">
          <h2 className="text-2xl font-semibold">RM</h2>
          <input
            name="balance"
            type="number"
            placeholder="balance"
            className="input input-bordered rounded-sm text-end !text-neutral-600 text-lg w-60"
            value={formData.balance}
            onChange={handleChange}
            disabled
          />
        </div>
      </div>
      <div className="text-end">
        <button
          onClick={() => sendToPaid()}
          className="btn btn-success"
          disabled={btnDisabled}
        >
          <FaCashRegister />
          Confirm Paid
        </button>
      </div>
    </div>
  );
};

export default FnBIndvSalesPay;
