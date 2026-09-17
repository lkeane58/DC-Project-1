"use client";

import { StudyGroup } from "@/types";
import { KeyRound, Lock, ShieldCheck, X } from "lucide-react";
import React, { useState } from "react";

interface JoinPrivateModalProps {
  group: StudyGroup | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccessJoin: (group: StudyGroup) => void;
}

export const JoinPrivateModal: React.FC<JoinPrivateModalProps> = ({
  group,
  isOpen,
  onClose,
  onSuccessJoin,
}) => {
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");

  if (!isOpen || !group) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = inputCode.trim().toUpperCase();
    const expectedCode = (group.passcode || "").trim().toUpperCase();

    if (!cleanInput) {
      setError("Please enter the group access code.");
      return;
    }

    if (cleanInput === expectedCode) {
      setError("");
      setInputCode("");
      onSuccessJoin(group);
      onClose();
    } else {
      setError("Invalid passcode. Please verify the code with the group creator.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-amber-600 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-100 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 mb-1">
            <Lock className="w-5 h-5 text-amber-200" />
            <span className="font-semibold text-xs uppercase tracking-wider text-amber-200">
              Private Group Verification
            </span>
          </div>
          <h3 className="font-bold text-lg leading-snug">{group.title}</h3>
          <p className="text-xs text-amber-100 mt-0.5">
            {group.courseCode} • {group.instructor}
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            This study group is private. Please enter the access code provided by
            the group creator to join and unlock the{" "}
            <span className="font-bold text-slate-800">{group.platformName}</span> channel link.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Enter Passcode
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. JHU-XXXX"
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value.toUpperCase());
                  setError("");
                }}
                className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl font-mono text-sm tracking-wider uppercase focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all ${
                  error ? "border-rose-400 bg-rose-50/40" : "border-slate-300"
                }`}
                autoFocus
              />
            </div>
            {error && (
              <p className="text-[11px] text-rose-500 font-medium mt-1.5">
                {error}
              </p>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition-all active:scale-95"
            >
              Unlock & Join
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
