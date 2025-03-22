import { Card, CardContent } from "../ui/Card";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";
import { useTransaction } from "../context/useTransaction";

/*interface SummaryCardsProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}*/

export function SummaryCards() {
  const { totalIncome, totalExpenses, balance } = useTransaction();
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="overflow-hidden border-none shadow-md">
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-1" />
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Income</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                ${totalIncome.toFixed(2)}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <ArrowUpCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md">
        <div className="bg-gradient-to-r from-red-400 to-rose-500 p-1" />
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Expenses
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                ${totalExpenses.toFixed(2)}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <ArrowDownCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md">
        <div
          className={`bg-gradient-to-r ${
            balance >= 0
              ? "from-blue-400 to-indigo-500"
              : "from-amber-400 to-orange-500"
          } p-1`}
        />
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Current Balance
              </p>
              <h3
                className={`text-2xl font-bold mt-1 ${
                  balance >= 0 ? "text-gray-900" : "text-orange-600"
                }`}
              >
                ${balance.toFixed(2)}
              </h3>
            </div>
            <div
              className={`h-12 w-12 rounded-full ${
                balance >= 0 ? "bg-blue-100" : "bg-amber-100"
              } flex items-center justify-center`}
            >
              <Wallet
                className={`h-6 w-6 ${
                  balance >= 0 ? "text-blue-600" : "text-amber-600"
                }`}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
