import "./payment.scss";
import KhaltiCheckout from "khalti-checkout-web";
import { makeRequest } from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Payment() {
  const { currentUser } = useContext(AuthContext);
  const eventId = parseInt(useLocation().pathname.split("/")[2]);
  const [openAddExpense, setOpenAddExpense] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    amount: "",
    remarks: "",
  });

  const {
    isLoading: expenseLoading,
    error: expenseError,
    data: expenseData,
  } = useQuery(["expenses", eventId], async () => {
    const res = await makeRequest.get("/events/expenses?eventId=" + eventId);
    return res.data;
  });

  const queryClient = useQueryClient();

  const addMutation = useMutation(
    async (newExpense) => {
      return await makeRequest.post(
        "/events/expenses?eventId=" + eventId,
        newExpense
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["expenses"]);
      },
    }
  );

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addMutation.mutate(inputs);
    setInputs({
      title: "",
      amount: "",
      remarks: "",
    });
  };

  //khalti
  let config = {
    publicKey: "test_public_key_59762546569c450fac1f0bdf7ca33d8d",
    productIdentity: "1234567890",
    productName: "Dragon",
    productUrl: "http://gameofthrones.wikia.com/wiki/Dragons",
    eventHandler: {
      onSuccess: async (payload) => {
        const res = await makeRequest.post(
          "/events/payments?eventId=" + eventId,
          {
            token: payload.token,
            amount: payload.amount,
          }
        );
        if (res) toast.success("Payment Successful!");
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  let checkout = new KhaltiCheckout(config);

  //event data fetching
  const { isLoading, error, data } = useQuery(["events"], async () => {
    const res = await makeRequest.get("/events/" + eventId);
    return res.data;
  });

  const sum =
    Array.isArray(expenseData) &&
    expenseData.reduce((total, item) => total + item.amount, 0);

  const share =
    Array.isArray(expenseData) &&
    expenseData.reduce((total, item) => total + item.amount, 0) /
      data?.members?.length;

  const handlePayment = (e) => {
    checkout.show({ amount: 2000 });
  };

  const {
    isLoading: paymentLoding,
    error: paymentError,
    data: paymentData,
  } = useQuery(["payments", eventId], async () => {
    const res = await makeRequest.get("/events/payments?eventId=" + eventId);
    return res.data;
  });

  const hasPaid = paymentData?.some((obj) => obj.user_id === currentUser.id);

  return (
    <div className="payment">
      <div className="expenses">
        <div className="expense-details">
          <h4>
            Number of Expenses: <span>{expenseData && expenseData.length}</span>
          </h4>
          <h4>
            Total Amount: <span>{sum * data?.members?.length}</span>
          </h4>
          <h4>
            Your Share: <span>{share * data?.members?.length}</span>
          </h4>
          {hasPaid ? (
            <button disabled className="khalti-pay">
              Paid
            </button>
          ) : (
            <button onClick={handlePayment} className="khalti-pay">
              Pay Your Share
            </button>
          )}
        </div>
        <div className="table-headers">
          <h3>Expense Table</h3>
          {data && data.host === currentUser.id ? (
            openAddExpense ? (
              <button
                onClick={(e) => setOpenAddExpense(false)}
                className="close-button"
              >
                Close
              </button>
            ) : (
              <button
                onClick={(e) => setOpenAddExpense(true)}
                className="add-button"
              >
                Add
              </button>
            )
          ) : (
            <></>
          )}
        </div>
        {openAddExpense ? (
          <div className="expense-form">
            <div className="form">
              <label htmlFor="title">Expense Title: </label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={inputs.title}
              />
              <label htmlFor="amount">Amount: </label>
              <input
                type="number"
                name="amount"
                placeholder="Amount per head"
                onChange={handleChange}
                value={inputs.amount}
              />
              <label htmlFor="remarks">Remarks: </label>
              <input
                type="text"
                name="remarks"
                onChange={handleChange}
                value={inputs.remarks}
              />
            </div>
            <button onClick={handleAdd} className="add-button">
              Add
            </button>
          </div>
        ) : (
          <></>
        )}
        <table>
          <tr>
            <th>Expense Title</th>
            <th>Amount Per Head</th>
            <th>Remarks</th>
          </tr>
          {expenseData &&
            expenseData.map((expense) => {
              return (
                <tr key={expense.id}>
                  <td>{expense.expense_title}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.remarks}</td>
                </tr>
              );
            })}
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}
