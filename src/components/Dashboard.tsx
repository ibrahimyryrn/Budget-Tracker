import * as Tabs from "@radix-ui/react-tabs";
import { SummaryCards } from "./SummaryCards";
import AddTransactionForm from "./AddTransactionForm";
import TransactionList from "./TransactionList";
import CategoryBreakdown from "./CategoryBreakdown";
import Overview from "./Overview";
import BudgetSummary from "./BudgetSummary";

function Dashboard() {
  return (
    <div className="space-y-6">
      <SummaryCards />

      <Tabs.Root defaultValue="overview" className="space-y-4">
        {/* Sekme Butonları */}
        <Tabs.List className="flex flex-wrap justify-center gap-2 w-full bg-gray-100 p-2 rounded-lg">
          {[
            { value: "overview", label: "Overview" },
            { value: "transactions", label: "Transactions" },
            { value: "categories", label: "Categories" },
            { value: "add", label: "Add New" },
          ].map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className="flex-1 min-w-[120px] px-4 py-1.5 text-center text-gray-500 text-sm font-semibold rounded-lg transition-all
                hover:bg-gray-300 hover:text-gray-900
                data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow"
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
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
