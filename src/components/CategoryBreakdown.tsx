import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Badge } from "../components/ui/badge";
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

// Generate colors for the pie chart
const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
  "#f97316",
  "#6366f1",
];

function CategoryBreakdown() {
  const [transactions, setTransactions] = useState<TransactionFormData[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { user_id } = getCookies();
      const data = await GetItems(user_id);
      setTransactions(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const totalExpenses = transactions
      .filter((transaction) => transaction.transaction_type === "expense")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotalExpenses(totalExpenses);
  }, [transactions]);

  const expensesByCategory = transactions
    .filter((transaction) => transaction.transaction_type === "expense")
    .reduce(
      (categories, transaction) => {
        const { category, amount } = transaction;
        return {
          ...categories,
          [category]: (categories[category] || 0) + amount,
        };
      },
      {} as Record<string, number>
    );

  const chartData = useMemo(() => {
    return Object.entries(expensesByCategory).map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length],
    }));
  }, [expensesByCategory]);

  // Sort data by value in descending order
  const sortedData = [...chartData].sort((a, b) => b.value - a.value);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          Expense Breakdown by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-[300px] flex items-center justify-center">
            {totalExpenses > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sortedData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sortedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toFixed(2)}`,
                      "Amount",
                    ]}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      border: "none",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 ">
                No expense data to display
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 ">
              Top Spending Categories
            </h4>
            <div className="space-y-3">
              {sortedData.slice(0, 5).map((category, index) => (
                <div key={index} className="bg-gray-100  p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium text-gray-900 ">
                        {category.name}
                      </span>
                    </div>
                    <Badge variant="outline" className="font-normal">
                      {((category.value / totalExpenses) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200  rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${(category.value / totalExpenses) * 100}%`,
                        backgroundColor: category.color,
                      }}
                    ></div>
                  </div>
                  <div className="text-right mt-1">
                    <span className="font-medium text-gray-900 ">
                      ${category.value.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {sortedData.length > 5 && (
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-500 ">
                  + {sortedData.length - 5} more categories
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CategoryBreakdown;
