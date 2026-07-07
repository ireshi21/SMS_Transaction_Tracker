import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function HomeScreen() {
  const [amount, setAmount] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  const { amount: deepLinkAmount } = useLocalSearchParams<{
    amount?: string;
  }>();

  useEffect(() => {
    const loadTransactions = async () => {
      const stored = await AsyncStorage.getItem("transactions");

      if (stored) {
        setTransactions(JSON.parse(stored));
      }
    };

    loadTransactions();
  }, []);

  useEffect(() => {
    if (deepLinkAmount) {
      console.log("Deep Link Amount:", deepLinkAmount);
      setAmount(String(deepLinkAmount));
    }
  }, [deepLinkAmount]);

  const saveCategory = async (category: string) => {
    if (!amount) return;

    const transaction = {
      amount,
      category,
      date: new Date().toISOString(),
    };

    try {
      const existing = await AsyncStorage.getItem("transactions");

      const storedTransactions = existing
        ? JSON.parse(existing)
        : [];

      storedTransactions.push(transaction);

      await AsyncStorage.setItem(
        "transactions",
        JSON.stringify(storedTransactions)
      );

      setTransactions(storedTransactions);
      setAmount(null);

      console.log("SAVED:", transaction);
    } catch (error) {
      console.log(error);
    }
  };

  const totalSpent = transactions.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 80,
        alignItems: "center",
        backgroundColor: "#111",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          color: "white",
          fontWeight: "bold",
        }}
      >
        Transaction Tracker 💸
      </Text>

      <Text
        style={{
          color: "#00ff88",
          fontSize: 22,
          marginTop: 20,
        }}
      >
        Total Spent: ₹{totalSpent}
      </Text>

      {amount && (
        <View
          style={{
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#00ff88",
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            ₹{amount}
          </Text>

          <Text
            style={{
              color: "white",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            Select Category
          </Text>

          {[
            "Food",
            "Shopping",
            "Travel",
            "Bills",
            "Other",
          ].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => saveCategory(item)}
              style={{
                backgroundColor: "#333",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                marginVertical: 5,
                width: 150,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text
        style={{
          color: "white",
          fontSize: 22,
          marginTop: 40,
          marginBottom: 15,
        }}
      >
        Transactions
      </Text>

      {transactions.map((item, index) => (
        <View
          key={index}
          style={{
            width: "85%",
            backgroundColor: "#222",
            padding: 12,
            borderRadius: 8,
            marginVertical: 4,
          }}
        >
          <Text style={{ color: "white" }}>
            {item.category} - ₹{item.amount}
          </Text>

          <Text
            style={{
              color: "#aaa",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            {new Date(item.date).toLocaleString()}
          </Text>
        </View>
      ))}
    </View>
  );
}