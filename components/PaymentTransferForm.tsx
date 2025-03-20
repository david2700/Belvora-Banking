"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createTransfer } from "@/lib/actions/dwolla.actions";
import { createTransaction } from "@/lib/actions/transaction.actions";
import { getBank, getBankByAccountId } from "@/lib/actions/user.actions";
import { decryptId } from "@/lib/utils";

import { BankDropdown } from "./BankDropdown";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import FormInput from "./FormInput";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(4, "Transfer note is too short"),
  amount: z.string().min(4, "Amount is too short, please enter amount in decimals e.g 5.00"),
  senderBank: z.string().min(4, "Please select a valid bank account"),
  sharableId: z.string().min(8, "Please select a valid sharable Id"),
});

const PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      senderBank: "",
      sharableId: "",
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setSubmitError(null); // Reset any previous errors

    try {
      const receiverAccountId = decryptId(data.sharableId);
      if (!receiverAccountId) {
        throw new Error("Invalid sharable ID format");
      }

      const receiverBank = await getBankByAccountId({
        accountId: receiverAccountId,
      });
      if (!receiverBank) {
        throw new Error("Receiver's bank account not found");
      }

      const senderBank = await getBank({ documentId: data.senderBank });
      if (!senderBank) {
        throw new Error("Sender's bank account not found");
      }

      const transferParams = {
        sourceFundingSourceUrl: senderBank.fundingSourceUrl,
        destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
        amount: data.amount,
      };

      // create transfer
      const transfer = await createTransfer(transferParams);
      if (!transfer) {
        throw new Error("Failed to create transfer");
      }

      // create transfer transaction
      const transaction = {
        name: data.name,
        amount: data.amount,
        senderId: senderBank.userId.$id,
        senderBankId: senderBank.$id,
        receiverId: receiverBank.userId.$id,
        receiverBankId: receiverBank.$id,
        email: data.email,
      };

      const newTransaction = await createTransaction(transaction);
      if (!newTransaction) {
        throw new Error("Failed to create transaction record");
      }

      form.reset();
      router.push("/");
      
    } catch (error) {
      console.error("Submitting create transfer request failed: ", error);
      
      // Handle specific error cases
      if (error instanceof Error) {
        switch (error.message) {
          case "Invalid sharable ID format":
            form.setError("sharableId", {
              type: "manual",
              message: "The sharable ID format is invalid. Please check and try again."
            });
            break;
          case "Receiver's bank account not found":
            form.setError("sharableId", {
              type: "manual",
              message: "Could not find the receiver's bank account. Please verify the sharable ID."
            });
            break;
          case "Sender's bank account not found":
            form.setError("senderBank", {
              type: "manual",
              message: "Could not find your bank account. Please select a valid account."
            });
            break;
          default:
            setSubmitError("An error occurred while processing your transfer. Please try again.");
        }
      } else {
        setSubmitError("An unexpected error occurred. Please try again later.");
      }
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">
      {submitError && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{submitError}</p>
              </div>
          </div>
        )}
        <FormInput
          control={form.control}
          name="senderBank"
          label="Select Source Bank"
          description="Select the bank account you want to transfer funds from"
          variant="withDescription"
          formId="payment-transfer-form-senderBank"
        >
          <BankDropdown
            accounts={accounts}
            setValue={form.setValue}
            otherStyles="!w-full"
          />
        </FormInput>

        <FormInput
          control={form.control}
          name="name"
          label="Transfer Note"
          description="Please provide any additional information or instructions related to the transfer"
          variant="withDescription"
          formId="payment-transfer-form-name"
        >
          <Textarea
            placeholder="Write a short note here"
            className="input-class"
            id="payment-transfer-form-name"
          />
        </FormInput>

        <div className="payment-transfer_form-details">
          <h2 className="text-18 font-semibold text-gray-900">
            Bank account details
          </h2>
          <p className="text-16 font-normal text-gray-600">
            Enter the bank account details of the recipient
          </p>
        </div>

        <FormInput
          control={form.control}
          name="email"
          label="Recipient's Email Address"
          formId="payment-transfer-form-email"
        >
          <Input
            placeholder="ex: johndoe@gmail.com"
            className="input-class"
            id="payment-transfer-form-email"
          />
        </FormInput>

        <FormInput
          control={form.control}
          name="sharableId"
          label="Receiver's Plaid Sharable Id"
          formId="payment-transfer-form-sharableId"
        >
          <Input
            placeholder="Enter the public account number"
            className="input-class"
            id="payment-transfer-form-sharableId"
          />
        </FormInput>

        <FormInput
          control={form.control}
          name="amount"
          label="Amount"
          formId="payment-transfer-form-amount"
        >
          <Input
            placeholder="ex: 5.00"
            className="input-class"
            id="payment-transfer-form-amount"
          />
        </FormInput>

        <div className="payment-transfer_btn-box">
          <Button type="submit" className="payment-transfer_btn">
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
              </>
            ) : (
              "Transfer Funds"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentTransferForm;