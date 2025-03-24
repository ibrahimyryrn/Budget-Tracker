import axios from "axios";
import { getCookies } from "../lib/cookies";

export const AddItem = async (item: {
  user_id: string | undefined;
  transaction_type: "income" | "expense";
  description: string;
  amount: number;
  category: string;
  transaction_date: Date;
  created_at: Date;
}) => {
  const { access_token } = getCookies();
  await axios.post(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/transactions`,
    item,
    {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_API_KEY,
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
    }
  );
};

export const GetItems = async (user_id: string | undefined) => {
  const { access_token } = getCookies();
  const { data } = await axios.get(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/transactions?user_id=eq.${user_id}&select=*`,
    {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_API_KEY,
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return data;
};

export const GetItemsWithId = async (id: string | undefined) => {
  const { access_token } = getCookies();
  const { data } = await axios.get(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/transactions?id=eq.${id}`,
    {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_API_KEY,
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return data;
};

export const DeleteItem = async (id: number) => {
  const { access_token } = getCookies();
  await axios.delete(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/transactions?id=eq.${id}`,
    {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_API_KEY,
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const UpdateItem = async (
  updatedTransaction: Partial<{
    id: number;
    transaction_type: "income" | "expense";
    description: string;
    amount: number;
    category: string;
    transaction_date: Date;
    created_at: Date;
  }>
) => {
  const { access_token } = getCookies();
  await axios.patch(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/transactions?id=eq.${updatedTransaction.id}`,
    updatedTransaction,
    {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_API_KEY,
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
    }
  );
};
