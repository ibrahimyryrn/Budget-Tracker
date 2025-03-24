import { ArrowDownCircle, ArrowUpCircle, ChevronDown } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Select from "@radix-ui/react-select";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "../lib/categories";
import { useState, useEffect } from "react";
import { AddItem } from "../api/endpoints";
import { useTransaction } from "../context/useTransaction";
import { getCookies } from "../lib/cookies";

interface TransactionFormData {
  user_id: string | undefined;
  transactionType: "income" | "expense";
  description: string;
  amount: number;
  category: string;
  transactionDate: Date;
  createdAt: Date;
}

export default function TransactionForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<TransactionFormData>({
    defaultValues: {
      transactionType: "income",
      description: "",
      amount: "" as unknown as number,
      category: "",
      transactionDate: new Date(),
      createdAt: new Date(),
    },
  });

  const transactionType = watch("transactionType");
  const [categories, setCategories] = useState<string[]>(INCOME_CATEGORIES);
  const { refreshTransactions } = useTransaction();

  useEffect(() => {
    if (transactionType === "income") {
      setCategories(INCOME_CATEGORIES);
    } else {
      setCategories(EXPENSE_CATEGORIES);
    }
  }, [transactionType]);

  const onSubmit = async (data: TransactionFormData) => {
    const { user_id } = getCookies();
    await AddItem({
      user_id,
      transaction_type: data.transactionType,
      description: data.description,
      amount: data.amount,
      category: data.category,
      transaction_date: data.transactionDate,
      created_at: data.createdAt,
    });
    refreshTransactions();
    reset({
      transactionType: "income",
      description: "",
      amount: "" as unknown as number,
      category: "",
      transactionDate: new Date(),
      createdAt: new Date(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>
      <label className="block mb-3 font-medium">Transaction Type</label>

      <Controller
        control={control}
        name="transactionType"
        render={({ field }) => (
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => field.onChange("income")}
              className={`flex-1 py-2 px-4 rounded-md border border-gray-300 ${field.value === "income" ? "bg-green-600 text-white" : "bg-white text-gray-600"} cursor-pointer flex items-center justify-center gap-2`}
            >
              <ArrowUpCircle className="w-5 h-5" /> Income
            </button>
            <button
              type="button"
              onClick={() => field.onChange("expense")}
              className={`flex-1 py-2 px-4 rounded-md border border-gray-300 ${field.value === "expense" ? "bg-red-600 text-white" : "bg-white text-gray-600"} cursor-pointer flex items-center justify-center gap-2`}
            >
              <ArrowDownCircle className="w-5 h-5" /> Expense
            </button>
          </div>
        )}
      />

      <div className="mb-6">
        <label className="block mb-2 font-medium">Description</label>
        <input
          {...register("description", { required: "Description is required" })}
          type="text"
          placeholder="Enter description"
          className="w-full p-2 border border-transparent focus:border-gray-700 rounded-md bg-gray-100 focus:outline-none"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Amount</label>
        <input
          {...register("amount", { required: "Amount is required" })}
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          className="w-full p-2 border border-transparent focus:border-gray-700 rounded-md bg-gray-100 focus:outline-none"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}
      </div>

      <div className="mb-6 relative z-10">
        <label className="block mb-2 font-medium">Category</label>
        <Controller
          control={control}
          name="category"
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <Select.Root
              onValueChange={field.onChange}
              value={field.value || ""}
            >
              <Select.Trigger className="w-full p-2 border border-transparent focus:border-gray-700 rounded-md bg-gray-100 flex justify-between items-center focus:outline-none">
                <Select.Value placeholder="Select category" />
                <Select.Icon>
                  <ChevronDown className="w-4 h-4" />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  className="bg-white shadow-lg rounded-md z-50"
                  position="popper"
                  style={{ width: "340px" }}
                >
                  <Select.Viewport
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {categories.map((category) => (
                      <Select.Item
                        key={category}
                        value={category}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <Select.ItemText>{category}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                  <div className="flex justify-center py-2">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          )}
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Transaction Date</label>
        <Controller
          control={control}
          name="transactionDate"
          rules={{ required: "Transaction date is required" }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat="dd.MM.yyyy"
              className="w-full p-2 border border-transparent focus:border-gray-700 rounded-md bg-gray-100 focus:outline-none"
              wrapperClassName="w-full"
            />
          )}
        />
        {errors.transactionDate && (
          <p className="text-red-500 text-sm">
            {errors.transactionDate.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition cursor-pointer"
      >
        Add Transaction
      </button>
    </form>
  );
}
