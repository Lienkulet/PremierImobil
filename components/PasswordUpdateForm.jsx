"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const PasswordUpdateForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [targetEmail, setTargetEmail] = useState("");

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/agent/changepass", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: targetEmail,
          oldPassword,
          newPassword,
        }),
      });

      if (!res.ok) throw new Error("Error updating password");

      toast.success("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setTargetEmail("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handlePasswordUpdate} className="mt-6">
      <div className="flex flex-col gap-4 bg-matteBlack p-4 w-full rounded-xl border border-solid border-white">
        <div className="flex flex-col gap-2">
          <label className="text-white">Email</label>
          <input
            type="text"
            value={targetEmail}
            onChange={(e) => setTargetEmail(e.target.value)}
            placeholder="Agent's email"
            className="w-full bg-lightGrey p-2 rounded-xl text-white"
            required
          />
        </div>

        {/* <div className="flex flex-col gap-2">
          <label className="text-white">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter old password"
            className="w-full bg-lightGrey p-2 rounded-xl text-white"
            required
          />
        </div> */}

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
          Update Password
        </button>
      </div>
    </form>
  );
};

export default PasswordUpdateForm;
