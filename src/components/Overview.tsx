import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { GetItems } from "../api/endpoints";
import { getCookies } from "../lib/cookies";

interface TransactionFormData {
  id: number;
  transaction_type: "income" | "expense";
  description: string;
  amount: number;
  category: string;
  transaction_date: Date;
  created_at: Date;
}

function Overview() {
  const [transactions, setTransactions] = useState<TransactionFormData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { user_id } = getCookies();
      const data = await GetItems(user_id);
      setTransactions(data);
    }
    fetchData();
  }, []);

  const chartData = useMemo(() => {
    // Group transactions by month
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return {
        month: date.toLocaleString("en-US", { month: "short" }),
        year: date.getFullYear(),
        monthIndex: date.getMonth(),
        yearMonth: `${date.getFullYear()}-${date.getMonth()}`,
      };
    }).reverse();

    return last6Months.map((monthData) => {
      const monthTransactions = transactions.filter((t) => {
        const tDate = new Date(t.transaction_date);
        return (
          tDate.getMonth() === monthData.monthIndex &&
          tDate.getFullYear() === monthData.year
        );
      });

      const income = monthTransactions
        .filter((t) => t.transaction_type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = monthTransactions
        .filter((t) => t.transaction_type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        name: monthData.month,
        Income: income,
        Expenses: expenses,
      };
    });
  }, [transactions]);

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Monthly Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  border: "none",
                }}
              />
              <Legend />
              <Bar dataKey="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default Overview;
