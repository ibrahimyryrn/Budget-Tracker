import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Edit,
  MoreHorizontal,
  Search,
  Trash2,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { DeleteItem } from "../api/endpoints";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "./ui/button";
import EditTransactionDialog from "./EditTransactionDialog";
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

function TransactionList() {
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  /*const [currentTransaction, setCurrentTransaction] = useState<
    TransactionFormData[]
  >([]);*/
  const { transactions, refreshTransactions } = useTransaction();

  const [editingTransaction, setEditingTransaction] =
    useState<TransactionFormData | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (transaction: TransactionFormData) => {
    setEditingTransaction(transaction);
  };

  const onDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      await DeleteItem(id);
      /*fetchData(); Silme işleminden sonra verileri yeniden getir*/
      refreshTransactions();
    }
  };

  /*const fetchData = async () => {
    const data = await GetItems();
    setCurrentTransaction(data);
  };

  useEffect(() => {
    fetchData();
  }, []);*/

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) =>
      new Date(b.transaction_date).getTime() -
      new Date(a.transaction_date).getTime()
  );

  //refreshTransactions();

  return (
    <Card className="border-none shadow-md w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-semibold">
            Recent Transactions
          </CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              className="pl-10 bg-gray-50 border border-gray-200 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>

      {/* Scrollable Table Container */}
      <CardContent className="overflow-x-auto">
        <div className="min-w-[600px]">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="text-gray-500">Date</TableHead>
                <TableHead className="text-gray-500">Description</TableHead>
                <TableHead className="text-gray-500">Category</TableHead>
                <TableHead className="text-gray-500 text-right">
                  Amount
                </TableHead>
                <TableHead className="text-gray-500 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-gray-500"
                  >
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                sortedTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-gray-100">
                    <TableCell className="font-medium">
                      {formatDate(transaction.transaction_date)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div
                          className={`mr-2 p-1 rounded-full ${
                            transaction.transaction_type === "income"
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                        >
                          {transaction.transaction_type === "income" ? (
                            <ArrowUpCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDownCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <span className="truncate max-w-[150px] sm:max-w-none">
                          {transaction.description}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={`text-right font-medium ${
                        transaction.transaction_type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.transaction_type === "income" ? "+" : "-"}$
                      {transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-40 bg-white shadow-lg rounded-md"
                        >
                          <DropdownMenuItem
                            onClick={() => handleEdit(transaction)}
                            className="cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDelete(transaction.id)}
                            className="text-red-500 focus:text-red-500 cursor-pointer"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Edit Dialog */}
      {editingTransaction && (
        <EditTransactionDialog
          transaction={editingTransaction}
          open={!!editingTransaction}
          onClose={() => setEditingTransaction(null)}
          refreshTransactions={refreshTransactions}
        />
      )}
    </Card>
  );
}

export default TransactionList;
