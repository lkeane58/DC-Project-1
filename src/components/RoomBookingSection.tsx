"use client";

import { CAMPUS_ROOMS } from "@/lib/storage";
import { CampusRoom, RoomBooking, StudentProfile, StudyGroup } from "@/types";
import {
  AlertCircle,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import React, { useState } from "react";

interface RoomBookingSectionProps {
  currentStudent: StudentProfile;
  myGroups: StudyGroup[];
  bookings: RoomBooking[];
  onAddBooking: (booking: RoomBooking) => void;
  onCancelBooking: (bookingId: string) => void;
}

export const RoomBookingSection: React.FC<RoomBookingSectionProps> = ({
  currentStudent,
  myGroups,
  bookings,
  onAddBooking,
  onCancelBooking,
}) => {
  const [selectedBuilding, setSelectedBuilding] = useState("All");
  const [selectedRoom, setSelectedRoom] = useState<CampusRoom | null>(null);

  // Form fields
  const [bookingDate, setBookingDate] = useState("2026-09-22");
  const [startTime, setStartTime] = useState("18:00");
  const [endTime, setEndTime] = useState("20:00");
  const [linkedGroupId, setLinkedGroupId] = useState<string>("");
  const [purpose, setPurpose] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const buildings = [
    "All",
    "Brody Learning Commons",
    "Milton S. Eisenhower Library",
    "Malone Hall",
    "Hackerman Hall",
  ];

  const filteredRooms = CAMPUS_ROOMS.filter(
    (room) => selectedBuilding === "All" || room.building === selectedBuilding
  );

  const handleBookRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) {
      setBookingError("Please select a room to reserve.");
      return;
    }

    if (startTime >= endTime) {
      setBookingError("End time must be later than start time.");
      return;
    }

    // Double-booking check:
    // Conflict exists if: (Start_new < End_existing) AND (End_new > Start_existing) on the same date
    const hasConflict = bookings.some((b) => {
      if (b.roomId !== selectedRoom.id || b.date !== bookingDate) return false;
      return startTime < b.endTime && endTime > b.startTime;
    });

    if (hasConflict) {
      setBookingError(
        `Conflict detected: ${selectedRoom.name} already has a confirmed reservation overlapping with this time slot on ${bookingDate}. Please choose a different room or time.`
      );
      return;
    }

    const linkedGroup = myGroups.find((g) => g.id === linkedGroupId);

    const newBooking: RoomBooking = {
      id: `book-${Date.now()}`,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      building: selectedRoom.building,
      bookedBy: currentStudent.email,
      groupId: linkedGroup ? linkedGroup.id : undefined,
      groupTitle: linkedGroup ? linkedGroup.title : undefined,
      date: bookingDate,
      startTime,
      endTime,
      purpose: purpose.trim() || "Course Study Group Session",
      createdAt: new Date().toISOString(),
    };

    onAddBooking(newBooking);
    setBookingError("");
    setSuccessMsg(
      `Room confirmed! ${selectedRoom.name} has been booked for ${bookingDate} (${startTime} - ${endTime}).`
    );
    setSelectedRoom(null);
    setPurpose("");
    setTimeout(() => setSuccessMsg(""), 5000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-jhu-heritage via-blue-900 to-jhu-dark p-6 rounded-2xl text-white shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 bg-jhu-spirit/20 border border-jhu-spirit/40 px-2.5 py-0.5 rounded-full text-xs font-semibold text-jhu-spirit mb-2">
            <Building className="w-3.5 h-3.5" />
            <span>Homewood Campus Study Spaces</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Reserve Campus Study Rooms
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Book group collaboration rooms at Brody Learning Commons (BLC),
            Milton S. Eisenhower Library (MSE), Malone Hall, and Hackerman Hall.
            Link your reservations directly with your Fall 2026 study groups.
          </p>
        </div>
      </div>

      {/* Alert Messages */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Building Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 mr-1">
          Filter by Location:
        </span>
        {buildings.map((b) => (
          <button
            key={b}
            onClick={() => setSelectedBuilding(b)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedBuilding === b
                ? "bg-jhu-heritage text-white shadow-xs"
                : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Grid of Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => {
          const isSelected = selectedRoom?.id === room.id;
          const roomBookings = bookings.filter((b) => b.roomId === room.id);

          return (
            <div
              key={room.id}
              className={`bg-white rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                isSelected
                  ? "border-jhu-heritage ring-2 ring-jhu-heritage/20 shadow-md"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {room.floor}
                  </span>
                  <span className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-700 bg-blue-50 text-blue-900 border border-blue-100 px-2 py-0.5 rounded-full">
                    <Users className="w-3 h-3 text-blue-700" />
                    <span>Up to {room.capacity} Students</span>
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug mb-1">
                  {room.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{room.building}</span>
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {room.amenities.map((am) => (
                    <span
                      key={am}
                      className="text-[10px] font-medium bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded"
                    >
                      {am}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {roomBookings.length === 0
                    ? "Available Today"
                    : `${roomBookings.length} booking(s) scheduled`}
                </span>

                <button
                  onClick={() => {
                    setSelectedRoom(room);
                    setBookingError("");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-jhu-heritage text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {isSelected ? "Selected" : "Select Room"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reservation Drawer / Form (Appears when room selected) */}
      {selectedRoom && (
        <div className="bg-white rounded-2xl border border-jhu-heritage/40 shadow-lg p-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-jhu-heritage">
                Confirm Reservation
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Booking: {selectedRoom.name}
              </h3>
              <p className="text-xs text-slate-500">
                {selectedRoom.building} • Max Capacity: {selectedRoom.capacity} students
              </p>
            </div>
            <button
              onClick={() => setSelectedRoom(null)}
              className="text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              Cancel
            </button>
          </div>

          {bookingError && (
            <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{bookingError}</span>
            </div>
          )}

          <form onSubmit={handleBookRoom} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Link to Study Group (Optional)
                </label>
                <select
                  value={linkedGroupId}
                  onChange={(e) => setLinkedGroupId(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage"
                >
                  <option value="">-- No specific group (General study) --</option>
                  {myGroups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.title} ({g.courseCode})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Session Purpose
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gateway Python Midterm Review"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-jhu-heritage/20 focus:border-jhu-heritage"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedRoom(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-jhu-heritage hover:bg-blue-900 text-white text-xs font-bold shadow-md transition-all active:scale-95"
              >
                Confirm Room Reservation
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Confirmed Campus Bookings List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
          <span>Active Campus Room Reservations</span>
          <span className="text-xs font-semibold text-slate-500">
            {bookings.length} Confirmed
          </span>
        </h3>

        {bookings.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            No rooms currently reserved. Select a room above to reserve a spot.
          </div>
        ) : (
          <div className="space-y-2.5">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold text-slate-900 text-sm">
                      {booking.roomName}
                    </span>
                    <span className="text-[11px] font-medium bg-blue-100 text-blue-800 px-2 py-0.2 rounded-md">
                      {booking.building}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-medium text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {booking.startTime} - {booking.endTime}
                    </span>
                    {booking.groupTitle && (
                      <span className="text-emerald-700 font-medium">
                        • Linked: {booking.groupTitle}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-auto">
                  <button
                    onClick={() => onCancelBooking(booking.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors"
                    title="Cancel reservation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
