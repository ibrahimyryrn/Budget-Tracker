import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import {
  ArrowUpIcon as ArrowTrendingUpIcon,
  ArrowDownIcon as ArrowTrendingDownIcon,
  TriangleIcon as ExclamationTriangleIcon,
} from "lucide-react";
import { useTransaction } from "../context/useTransaction";

function BudgetSummary() {
  const { transactions } = useTransaction();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const balance = totalIncome - totalExpenses;

  useEffect(() => {
    const totalIncome = transactions
      .filter((transaction) => transaction.transaction_type === "income")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotalIncome(totalIncome);

    const totalExpenses = transactions
      .filter((transaction) => transaction.transaction_type === "expense")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotalExpenses(totalExpenses);
  }, [transactions]);

  // Calculate the percentage of income spent
  const spentPercentage =
    totalIncome > 0 ? Math.min((totalExpenses / totalIncome) * 100, 100) : 0;

  // Determine status based on spending
  let status = "On Track";
  let statusColor = "text-green-500";
  let statusIcon = <ArrowTrendingUpIcon className="h-5 w-5 text-green-500" />;
  let progressColor = "bg-green-500";

  if (spentPercentage > 90) {
    status = "Critical";
    statusColor = "text-red-500";
    statusIcon = <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
    progressColor = "bg-red-500";
  } else if (spentPercentage > 75) {
    status = "Warning";
    statusColor = "text-amber-500";
    statusIcon = <ArrowTrendingDownIcon className="h-5 w-5 text-amber-500 " />;
    progressColor = "bg-amber-500";
  }
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Budget Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500 ">
              Budget Status
            </span>
            <div className="flex items-center">
              {statusIcon}
              <span className={`ml-1.5 text-sm font-medium ${statusColor}`}>
                {status}
              </span>
            </div>
          </div>
          <Progress
            value={spentPercentage}
            className="h-2"
            indicatorClassName={progressColor}
          />
          <div className="flex justify-between text-xs text-gray-500 ">
            <span>0%</span>
            <span>Spent: {spentPercentage.toFixed(0)}%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1 bg-gray-100  p-3 rounded-lg">
            <p className="text-xs font-medium text-gray-500 ">Total Income</p>
            <p className="text-lg font-bold text-green-500 ">
              ${totalIncome.toFixed(2)}
            </p>
          </div>
          <div className="space-y-1 bg-gray-100  p-3 rounded-lg">
            <p className="text-xs font-medium text-gray-500 ">Total Expenses</p>
            <p className="text-lg font-bold text-red-500 ">
              ${totalExpenses.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-200 ">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700 ">
              Remaining Balance
            </span>
            <span
              className={`font-bold text-lg ${balance >= 0 ? "text-blue-500 " : "text-orange-500 "}`}
            >
              ${balance.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BudgetSummary;
