import { ArrowLeft, X, CheckCircle2 } from "lucide-react";

interface BookingReceiptProps {
  onClose?: () => void;
  onManageBookings?: () => void;
  onCancelBooking?: () => void;
}

export default function BookingReceipt({ 
  onClose, 
  onManageBookings, 
  onCancelBooking 
}: BookingReceiptProps) {
  return (
    <div className="min-h-screen bg-white pb-6 max-w-md mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white px-5 py-4 flex items-center justify-between z-10">
        <button onClick={onClose} className="p-1">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base font-semibold">Receipt Detail</h1>
        <button onClick={onClose} className="p-1">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="px-5 pt-6">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-3">
            <div className="relative">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path d="M16 8 L32 4 L48 8 L52 24 L48 40 L32 44 L16 40 L12 24 Z" 
                      stroke="#D4AF37" strokeWidth="2" fill="none" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-green-500" fill="currentColor" />
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-1">Amenity Successfully Booked</h2>
          <p className="text-sm text-gray-600">You're all set for your Padel match!</p>
        </div>

        {/* Booking Info */}
        <div className="mb-6">
          <p className="text-sm mb-4">
            You booked <span className="font-semibold">Padel court (inside)</span> with the following details
          </p>

          {/* Timestamp */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Booked Timestamp</p>
            <p className="text-sm">03/05/2024 10:30am</p>
          </div>

          {/* Details List */}
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Daypass Date</span>
              <span className="text-sm font-medium">19 March, 2024</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Time</span>
              <span className="text-sm font-medium">8:00 AM – 8:30 AM</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Duration</span>
              <span className="text-sm font-medium">60 Minutes</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Attendees</span>
              <span className="text-sm font-medium">2</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Price</span>
              <span className="text-sm font-medium">AED 2400</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Promo discount</span>
              <span className="text-sm font-medium">-AED 200</span>
            </div>

            <div className="flex justify-between items-center py-2 border-t pt-3">
              <span className="text-base font-semibold">Final Price</span>
              <span className="text-base font-bold">AED 2,200</span>
            </div>
          </div>
        </div>

        {/* Attendee Details */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-3">Attendee Details</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Number of attendees</span>
              <span className="text-sm font-medium">4</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Equipment requirement</span>
              <span className="text-sm font-medium">Rackets</span>
            </div>

            <div className="py-2">
              <p className="text-sm text-gray-600 mb-1">Special request</p>
              <p className="text-sm">Please ensure the court is well-lit</p>
            </div>
          </div>
        </div>

        {/* Attendees List */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-3">Attendees</h3>
          
          <div className="space-y-4">
            <div className="pb-3 border-b">
              <p className="font-medium text-sm mb-1">Kadin Press</p>
              <p className="text-xs text-gray-600">johndoe@email.com</p>
              <p className="text-xs text-gray-600">+1 30193 1924 8193</p>
            </div>

            <div className="pb-3">
              <p className="font-medium text-sm mb-1">Jordyn Torff</p>
              <p className="text-xs text-gray-600">johndoe@email.com</p>
              <p className="text-xs text-gray-600">+1 30193 1924 8193</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">Payment method</span>
          <span className="text-sm font-medium">6684 •••• •••• 6987</span>
        </div>

        {/* Loyalty Points Banner */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 text-center">
          <p className="text-sm text-green-700 font-medium">🎁 You've Earned 800 Carbon loyalty points</p>
        </div>

        {/* Download Receipt */}
        <div className="text-center mb-6">
          <button className="text-sm font-semibold underline">Download Receipt</button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-4">
          <button 
            onClick={onManageBookings}
            className="w-full bg-black text-white font-semibold py-4 rounded-lg hover:bg-gray-900 transition-colors"
          >
            Reschedule
          </button>
          <button 
            onClick={onCancelBooking}
            className="w-full bg-white text-red-500 font-semibold py-4 hover:bg-red-50 transition-colors"
          >
            Cancel Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
