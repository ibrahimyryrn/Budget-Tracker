import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../components/ui/dialog";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../lib/categories";
import { useState } from "react";
import { UpdateItem } from "../api/endpoints";
import { useTransaction } from "../context/useTransaction";

interface TransactionFormData {
  id: number;
  transaction_type: "income" | "expense";
  description: string;
  amount: number;
  category: string;
  transaction_date: Date;
  created_at: Date;
}

interface EditTransactionDialogProps {
  transaction: TransactionFormData;
  open: boolean;
  onClose: () => void;
  refreshTransactions: () => void;
}

function EditTransactionDialog({
  transaction,
  open,
  onClose,
}: EditTransactionDialogProps) {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(
    transaction.transaction_date instanceof Date
      ? transaction.transaction_date.toISOString().split("T")[0]
      : new Date(transaction.transaction_date).toISOString().split("T")[0]
  );
  const [type, setType] = useState(transaction.transaction_type);
  const { refreshTransactions } = useTransaction();

  const handleSave = async () => {
    await UpdateItem({
      id: transaction.id,
      description,
      amount: parseFloat(amount),
      category,
      transaction_date: new Date(date),
      transaction_type: type,
    });
    refreshTransactions();
    onClose();
  };

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white border-none shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Transaction
          </DialogTitle>
          <DialogDescription>
            Update the details of your transaction below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right text-gray-500">
              Type
            </Label>
            <Select
              value={type}
              onValueChange={(value: "income" | "expense") => {
                setType(value);
                setCategory("");
              }}
            >
              <SelectTrigger
                id="type"
                className="col-span-3 bg-gray-50 border-none"
              >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="w-40 bg-white shadow-lg rounded-md">
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right text-gray-500">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // onChange handler eklendi
              className="col-span-3 bg-gray-50 border-none"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right text-gray-500">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)} // onChange handler eklendi
              className="col-span-3 bg-gray-50 border-none"
              min="0"
              step="0.01"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right text-gray-500">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                id="category"
                className="col-span-3 bg-gray-50 border-none"
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="w-40 bg-white shadow-lg rounded-md">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right text-gray-500">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)} // onChange handler eklendi
              className="col-span-3 bg-gray-50 border-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditTransactionDialog;
