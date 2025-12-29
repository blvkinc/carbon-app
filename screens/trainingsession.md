# Training Session Booking UI - SRS Requirements

## Part 1: Provider/Admin Side - Create Training Session
**Context:** Facility/Trainer Dashboard configuration for setting up a new training offering.

### UI Layout & Form Fields
- [ ] **Field 1: Training Session / Sport Type**
    - *Format:* Select from List (e.g., Personal Training, Football, etc.)
    - *Requirement:* Mandatory
    - *Logic:* Applies to Personal Trainers.
- [ ] **Field 2: Session Type**
    - *Format:* Select from 2 Options: "Individual Session" OR "Group Session"
    - *Requirement:* Mandatory
    - *Logic:* Applies to Sports Coaches.
- [ ] **Field 3: Number of People**
    - *Format:* Select Number
    - *Requirement:* Mandatory
    - *Condition:* Only visible/editable if "Group Session" is selected.
- [ ] **Field 4: Session Name**
    - *Format:* Text Input (e.g., "Personal Training 1v1")
    - *Requirement:* Mandatory
- [ ] **Field 5: Number of Sessions**
    - *Format:* Select Number (e.g., 1)
    - *Requirement:* Mandatory
- [ ] **Field 6: Price**
    - *Format:* Number Input (Type Number)
    - *Currency:* AED
    - *Requirement:* Mandatory
- [ ] **Field 7: Validity**
    - *Format:* Number Input + Dropdown (Select Days or Months)
    - *Requirement:* Mandatory
    - *Context:* Valid from date of purchase.
- [ ] **Field 8: Location**
    - *Format:* Select from List (locations added in Profile Setup) OR Select "I am flexible with the Training Location".
    - *Requirement:* Mandatory
    - *Logic:* If user is a **Facility**, location is fixed (no flexible option).
- [ ] **Field 9: Assign Employee(s)**
    - *Format:* Multi-select list ("Select All" option available).
    - *Requirement:* Mandatory
    - *Condition:* Only applicable to Companies/Facilities with employees.
- [ ] **Field 10: Additional Notes**
    - *Format:* Text Area (e.g., "You are required to pay AED 50 to access the Gym")
    - *Requirement:* Optional

### Backend & Data Visibility
- [ ] **Client Inventory Logic:**
    > Any Training Sessions purchased by customers must appear in: `Client Management > Client Inventory` for both the Facility and the Trainer.
- [ ] **Session Status:**
    - Inventory item must contain client info.
    - Inventory item must show confirmation status: **Booked** vs **Used** vs **Unused**.

---

## Part 2: End-User Side - Single Session Booking Flow
**Context:** The flow a customer goes through to book a specific service.

### Step 1: Select Service/Activity
- [ ] Display list of available services/activities offered by the merchant.
- [ ] Enable user to select the desired service.

### Step 2: Choose Date and Time
- [ ] Display Calendar or Date Picker.
- [ ] Display available time slots for the selected date.
- [ ] Enable user to specify the applicable booking slot.

### Step 3: Enter Booking Details
- [ ] input fields for required info (Number of participants).
- [ ] Input field for Special Requests/Preferences (Additional Notes).
- [ ] Input field for Booking Name/Email (if booking for guests).

### Step 4: Review Booking Summary
- [ ] Display summary: Service, Date, Time, Additional Info.
- [ ] **Rewards Logic:** Display exactly how many stars (rewards) the user will obtain for this transaction.
    > *NOTE: This rewards logic applies to all processes in this document.*
- [ ] **Payment Method Selection:**
    - Option 1: Pay using Wallet.
    - Option 2: Top up Wallet.
    - Option 3: Pay one-off transaction.
    - Logic: Return payment if booking is not accepted.

### Step 5: Submit Booking
- [ ] "Submit" button to finalize action.
- [ ] Trigger payment method selected in Step 4.

### Step 6: Payment Authorization / Processing
- [ ] Add booking to system.
- [ ] Add funds to Merchant Wallet.
- [ ] Display confirmation to User (Booking completed).
- [ ] Display confirmation to Merchant (Payment collected).

### Step 7: Booking Confirmation
- [ ] **Confirmation Page:** Show booking details, payment receipt, and instructions.
- [ ] **Calendar Integration:** Add booking to User Profile Schedule.
- [ ] **External Calendar:** Option to "Add this booking to Phone Calendar".
- [ ] **Rewards Notification:** Inform user how many reward points were added to the wallet.

### Step 8: Post-Session Feedback & Logic
- [ ] **Trigger:** Automated notification & email sent 15 minutes *after* session finishes.
- [ ] **Happy Path (Review):**
    - User leaves review.
    - Automatically add to Trainer Reviews.
- [ ] **Unhappy Path (Complaint):**
    - User raises complaint -> Submitted to CARBON (Platform).
    - Platform receives complaint in Admin Dashboard + Email.
    - **Refund Logic:**
        - Platform reviews complaint.
        - Refund is at Trainer's discretion (Trainer selects Yes or No).
        - *Override:* Platform can decide to refund anyway (from Platform fund) to keep client happy.
    - User is informed of outcome.
    - User can leave a bad review (at their discretion).
    - If refunded, User does *not* need to leave a review.
- [ ] **No-Show Logic:**
    - If user does not turn up without notice/cancellation/reschedule:
    - Trainer is paid in full.
    - Platform takes standard fee.