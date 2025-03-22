import * as Tabs from "@radix-ui/react-tabs";
import { SummaryCards } from "./SummaryCards";
import AddTransactionForm from "./AddTransactionForm";
import TransactionList from "./TransactionList";

import CategoryBreakdown from "./CategoryBreakdown";
import Overview from "./Overview";
import BudgetSummary from "./BudgetSummary";

function Dashboard() {
  /*const totalIncome = 50000; // Replace with actual value or state
  const totalExpenses = 32000; // Replace with actual value or state
  const balance = totalIncome - totalExpenses; // Replace with actual calculation or state*/

  /*const [transactions, setTransactions] = useState<TransactionFormData[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const balance = totalIncome - totalExpenses;*/

  /*useEffect(() => {
    async function fetchData() {
      const data = await GetItems();
      setTransactions(data);
    }
    fetchData();
  }, []); //Add transaction yaptığımda dashboard yenilenmediği için anlık değişim olmuyor !!

  const totalIncome = transactions
    .filter((transaction) => transaction.transaction_type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  setTotalIncome(totalIncome);

  const totalExpenses = transactions
    .filter((transaction) => transaction.transaction_type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  setTotalExpenses(totalExpenses);
  const balance = totalIncome - totalExpenses;*/

  return (
    <div className="space-y-6">
      <SummaryCards />

      <Tabs.Root defaultValue="overview" className="space-y-4">
        {/* Sekme Butonları */}
        <Tabs.List className="flex w-full max-w-xl mx-auto bg-gray-100 p-1 rounded-lg">
          <Tabs.Trigger
            value="overview"
            className="w-80 py-1.5 text-center text-gray-500 text-sm font-semibold rounded-lg transition-all 
      hover:bg-gray-300 hover:text-gray-900 
      data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow"
          >
            Overview
          </Tabs.Trigger>
          <Tabs.Trigger
            value="transactions"
            className="w-80 py-1.5 text-center text-gray-500 text-sm font-semibold rounded-lg transition-all 
      hover:bg-gray-300 hover:text-gray-900 
      data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow"
          >
            Transactions
          </Tabs.Trigger>
          <Tabs.Trigger
            value="categories"
            className="w-80 py-1.5 text-center text-gray-500 text-sm font-semibold rounded-lg transition-all 
      hover:bg-gray-300 hover:text-gray-900 
      data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow"
          >
            Categories
          </Tabs.Trigger>
          <Tabs.Trigger
            value="add"
            className="w-80 py-1.5 text-center text-gray-500 text-sm font-semibold rounded-lg transition-all 
      hover:bg-gray-300 hover:text-gray-900 
      data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow"
          >
            Add New
          </Tabs.Trigger>
        </Tabs.List>

        {/* Sekme İçerikleri */}
        <Tabs.Content value="overview" className="space-y-4 p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <BudgetSummary />
            <Overview />
          </div>
        </Tabs.Content>
        <Tabs.Content value="transactions" className="space-y-4 p-4">
          <TransactionList />
        </Tabs.Content>
        <Tabs.Content value="categories" className="space-y-4 p-4">
          <CategoryBreakdown />
        </Tabs.Content>
        <Tabs.Content value="add" className="space-y-4 p-4">
          <div className="max-w-md mx-auto">
            <AddTransactionForm />
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

export default Dashboard;
