"use client";

import { MatchResult, StudentProfile, StudyGroup } from "@/types";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  KeyRound,
  Lock,
  LogOut,
  MapPin,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  Unlock,
  UserPlus,
  Users,
} from "lucide-react";
import React, { useState } from "react";

interface StudyGroupCardProps {
  group: StudyGroup;
  currentStudent: StudentProfile;
  matchResult?: MatchResult;
  onJoinPublic: (group: StudyGroup) => void;
  onJoinPrivateRequest: (group: StudyGroup) => void;
  onLeaveGroup: (groupId: string) => void;
}

export const StudyGroupCard: React.FC<StudyGroupCardProps> = ({
  group,
  currentStudent,
  matchResult,
  onJoinPublic,
  onJoinPrivateRequest,
  onLeaveGroup,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const isMember = group.members.some(
    (m) => m.email === currentStudent.email || m.jhed === currentStudent.jhed
  );
  const isCreator = group.createdBy === currentStudent.email;
  const isFull = group.members.length >= group.maxMembers;
  const spotsLeft = group.maxMembers - group.members.length;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(group.communicationLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    if (group.passcode) {
      navigator.clipboard.writeText(group.passcode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-emerald-600 to-teal-500 text-white";
    if (score >= 60) return "from-blue-600 to-sky-500 text-white";
    if (score >= 40) return "from-amber-500 to-yellow-500 text-white";
    return "from-slate-500 to-slate-600 text-white";
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 bg-white flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md ${
        isMember
          ? "ring-2 ring-emerald-500/40 border-emerald-300"
          : matchResult && matchResult.score >= 80
          ? "border-jhu-heritage/30 ring-1 ring-jhu-heritage/20"
          : "border-slate-200"
      }`}
    >
      {/* Top Banner / Match Score & Badges */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-jhu-heritage text-white shadow-xs">
              {group.courseCode}
            </span>

            {group.isPrivate ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                <Lock className="w-3 h-3 text-amber-600" />
                Private Group
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Users className="w-3 h-3 text-emerald-600" />
                Public Group
              </span>
            )}

            {isMember && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {isCreator ? "Group Leader" : "You Joined"}
              </span>
            )}
          </div>

          {/* Match Score Badge */}
          {matchResult && (
            <div
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getScoreColor(
                matchResult.score
              )} shadow-sm shrink-0`}
              title="Calculated compatibility based on course, section, schedule, and study style"
            >
              <Sparkles className="w-3 h-3" />
              <span>{matchResult.score}% Match</span>
            </div>
          )}
        </div>

        {/* Group Title & Course Name */}
        <h3 className="font-bold text-slate-900 text-lg leading-snug tracking-tight mb-1">
          {group.title}
        </h3>
        <p className="text-xs font-medium text-slate-500 mb-2.5">
          {group.courseTitle}
        </p>

        {/* Section & Instructor Badge */}
        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex items-center justify-between text-xs mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-medium">Instructor:</span>
            <span className="font-semibold text-slate-800">
              {group.instructor || "To Be Announced"}
            </span>
          </div>
          <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600 font-mono text-[11px] font-medium">
            Sec {group.section || "01"}
          </span>
        </div>

        {/* Match Reason Pills (if available) */}
        {matchResult && matchResult.matchReasons.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {matchResult.matchReasons.slice(0, 3).map((reason, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full border border-blue-100"
              >
                ✓ {reason}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3.5">
          {group.description}
        </p>

        {/* Study Goals Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {group.studyGoals.map((goal) => (
            <span
              key={goal}
              className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
            >
              {goal}
            </span>
          ))}
        </div>

        {/* Meeting Specs */}
        <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3 mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium text-slate-700">
              {group.meetingDays.join(", ")}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">{group.weeklyFrequency}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-700 font-medium">{group.meetingTime}</span>
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-700 truncate">
              {group.preferredLocation}
            </span>
          </div>
        </div>

        {/* Members Roster & Spots */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1.5 overflow-hidden">
              {group.members.slice(0, 4).map((member, i) => (
                <img
                  key={i}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  src={member.avatar}
                  alt={member.name}
                  title={`${member.name} (${member.role})`}
                />
              ))}
            </div>
            <span className="text-xs text-slate-600 font-medium">
              {group.members.length} / {group.maxMembers} members
            </span>
          </div>

          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded ${
              isFull
                ? "bg-rose-50 text-rose-700 border border-rose-200"
                : spotsLeft <= 2
                ? "bg-amber-50 text-amber-700 border border-amber-200"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
            }`}
          >
            {isFull ? "Group Full" : `${spotsLeft} spots left`}
          </span>
        </div>
      </div>

      {/* GATED COMMUNICATION LINK AREA & ACTIONS */}
      <div className="p-4 bg-slate-50 border-t border-slate-200">
        {isMember ? (
          /* ================= UNLOCKED STATE (MEMBER) ================= */
          <div className="space-y-3">
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-900">
                  <Unlock className="w-4 h-4 text-emerald-600" />
                  <span>Unlocked Study Group Channel</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                  {group.platformName}
                </span>
              </div>

              <p className="text-[11px] text-emerald-700 mb-2.5">
                You are a member! Connect with your study partners:
              </p>

              <div className="flex items-center gap-2">
                <a
                  href={group.communicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-3 rounded-lg text-xs shadow-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Launch {group.platformName}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                </a>

                <button
                  onClick={handleCopyLink}
                  className="p-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs transition-colors"
                  title="Copy Channel Invite Link"
                >
                  {copiedLink ? (
                    <span className="text-[11px] font-bold text-emerald-700">
                      Copied!
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Private Group Passcode Display for Creator/Members to Share */}
              {group.isPrivate && group.passcode && (
                <div className="mt-2.5 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-800 font-medium">
                    Private Passcode:{" "}
                    <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-300">
                      {group.passcode}
                    </span>
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="text-emerald-700 hover:text-emerald-900 font-semibold underline text-[11px]"
                  >
                    {copiedCode ? "Copied!" : "Copy Code"}
                  </button>
                </div>
              )}
            </div>

            {/* Leave Group Action */}
            <div className="flex justify-end">
              <button
                onClick={() => onLeaveGroup(group.id)}
                className="text-[11px] text-slate-400 hover:text-rose-600 inline-flex items-center space-x-1 transition-colors"
              >
                <LogOut className="w-3 h-3" />
                <span>Leave study group</span>
              </button>
            </div>
          </div>
        ) : (
          /* ================= LOCKED STATE (NON-MEMBER) ================= */
          <div className="space-y-3">
            <div className="bg-slate-100/90 border border-slate-200 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center space-x-1.5 text-xs font-semibold text-slate-700 mb-1">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Communication Link Hidden</span>
              </div>
              <p className="text-[11px] text-slate-500">
                The {group.platformName} channel invite link is revealed once
                you join this study group.
              </p>
            </div>

            {/* Join Action Buttons */}
            {group.isPrivate ? (
              <button
                onClick={() => onJoinPrivateRequest(group)}
                disabled={isFull}
                className={`w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  isFull
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-700 text-white active:scale-98"
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>
                  {isFull ? "Group is Full" : "Enter Passcode to Join"}
                </span>
              </button>
            ) : (
              <button
                onClick={() => onJoinPublic(group)}
                disabled={isFull}
                className={`w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  isFull
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-jhu-heritage hover:bg-blue-900 text-white active:scale-98"
                }`}
              >
                <UserPlus className="w-3.5 h-3.5 text-jhu-spirit" />
                <span>
                  {isFull ? "Group is Full" : "Join Study Group (Reveal Link)"}
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

