"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const PasswordCreateForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [targetEmail, setTargetEmail] = useState("");

  const handlePasswordCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: targetEmail,
          newPassword,
        }),
      });

      if (!res.ok) throw new Error("Error creating password");

      toast.success("Password created successfully!");
      setNewPassword("");
      setTargetEmail("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handlePasswordCreate} className="mt-6">
      <div className="flex flex-col gap-4 bg-matteBlack p-4 w-full rounded-xl border border-solid border-white">
        <h3 className="text-white text-lg">Create Password for Agent</h3>
        <div className="flex flex-col gap-2">
          <label className="text-white">Email</label>
          <input
            type="email"
            value={targetEmail}
            onChange={(e) => setTargetEmail(e.target.value)}
            placeholder="Agent's email"
            className="w-full bg-lightGrey p-2 rounded-xl text-white"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full bg-lightGrey p-2 rounded-xl text-white"
            required
          />
        </div>

        <button type="submit" className="w-full bg-mainOrange p-3 rounded-xl text-white mt-4">
          Create Password
        </button>
      </div>
    </form>
  );
};

export default PasswordCreateForm;
