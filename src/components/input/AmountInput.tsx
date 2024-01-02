import axios, { AxiosError } from "axios";
import { ChangeEvent, FC, useState } from "react";

interface FnBSalesAmountProps {
  fnbSalesId: number;
  fnbSalesAmount: number;
  fnbPrice: string;
  tableSalesId: number;
}

type AmountValue = {
  amount: number;
  totalFnBSales: string;
  tableSalesId: number;
};

const AmountInput: FC<FnBSalesAmountProps> = ({
  fnbSalesId,
  fnbSalesAmount,
  fnbPrice,
  tableSalesId,
}) => {
  // set formdata
  const [formData, setFormData] = useState<AmountValue>({
    amount: fnbSalesAmount,
    totalFnBSales: "",
    tableSalesId: tableSalesId,
  });

  // handle change
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const price = parseFloat(fnbPrice);
    const total = parseInt(value) * price;

    formData.amount = parseInt(value);
    formData.totalFnBSales = total.toFixed(2).toString();

    // console.log(formData);

    try {
      const response = await axios.put(
        `/api/open_mode/fnbSales/${fnbSalesId}`,
        formData
      );
      if (response.status === 200) {
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
      console.error(error);
    }
  };

  return (
    <input
      type="number"
      name="amount"
      placeholder="number"
      min={1}
      className="input input-bordered w-28"
      value={formData.amount}
      onChange={handleChange}
    />
  );
};

export default AmountInput;
