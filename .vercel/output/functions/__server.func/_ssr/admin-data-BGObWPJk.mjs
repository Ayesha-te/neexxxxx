import { f as getMilestoneReward } from "./rewards-system-CD7nypJq.mjs";
const CURRENT_MEMBER_ID = "MEM-1001";
const ADMIN_DATA_EVENT = "levelup-admin-data-sync";
const MEMBERS_STORAGE_KEY = "levelup-admin-members-v1";
const REWARD_TICKETS_STORAGE_KEY = "levelup-admin-reward-tickets-v1";
const REWARD_PAYOUTS_STORAGE_KEY = "levelup-admin-reward-payouts-v1";
const BANK_TRANSACTIONS_STORAGE_KEY = "levelup-admin-bank-transactions-v1";
const STORAGE_KEYS = [
  MEMBERS_STORAGE_KEY,
  REWARD_TICKETS_STORAGE_KEY,
  REWARD_PAYOUTS_STORAGE_KEY,
  BANK_TRANSACTIONS_STORAGE_KEY
];
const DEFAULT_MEMBERS = [
  {
    id: "MEM-1001",
    name: "Ali Raza",
    email: "ali.raza@levelup.app",
    phone: "+92 300 1112233",
    city: "Karachi",
    joinedAt: "2026-01-10T09:00:00.000Z",
    activePlan: "Plan 5 Gold",
    currentLevel: 5,
    points: 74,
    referrals: 18,
    totalSpent: 95e3,
    totalEarned: 41200,
    status: "active",
    notes: "High engagement and consistent reward activity."
  },
  {
    id: "MEM-1002",
    name: "Sara Khan",
    email: "sara.khan@levelup.app",
    phone: "+92 321 5567788",
    city: "Lahore",
    joinedAt: "2026-01-19T11:30:00.000Z",
    activePlan: "Plan 6 Platinum",
    currentLevel: 6,
    points: 96,
    referrals: 27,
    totalSpent: 142e3,
    totalEarned: 63500,
    status: "active",
    notes: "Frequently qualifies for milestone rewards."
  },
  {
    id: "MEM-1003",
    name: "Bilal Ahmed",
    email: "bilal.ahmed@levelup.app",
    phone: "+92 333 9091122",
    city: "Islamabad",
    joinedAt: "2026-02-04T08:15:00.000Z",
    activePlan: "Plan 4 Silver",
    currentLevel: 4,
    points: 49,
    referrals: 12,
    totalSpent: 72e3,
    totalEarned: 28100,
    status: "watch",
    notes: "Needs a follow-up on last payout confirmation."
  },
  {
    id: "MEM-1004",
    name: "Hina Malik",
    email: "hina.malik@levelup.app",
    phone: "+92 301 9097766",
    city: "Rawalpindi",
    joinedAt: "2026-02-15T13:45:00.000Z",
    activePlan: "Plan 5 Gold",
    currentLevel: 5,
    points: 68,
    referrals: 21,
    totalSpent: 104e3,
    totalEarned: 38750,
    status: "active",
    notes: "Team leader with fast-moving downline."
  },
  {
    id: "MEM-1005",
    name: "Usman Tariq",
    email: "usman.tariq@levelup.app",
    phone: "+92 345 4432109",
    city: "Faisalabad",
    joinedAt: "2026-02-28T17:20:00.000Z",
    activePlan: "Plan 3 Starter",
    currentLevel: 3,
    points: 36,
    referrals: 8,
    totalSpent: 43e3,
    totalEarned: 15900,
    status: "paused",
    notes: "Low recent activity but still within reward cycle."
  },
  {
    id: "MEM-1006",
    name: "Ayesha Noor",
    email: "ayesha.noor@levelup.app",
    phone: "+92 312 1199334",
    city: "Multan",
    joinedAt: "2026-03-07T09:40:00.000Z",
    activePlan: "Plan 7 Diamond",
    currentLevel: 7,
    points: 118,
    referrals: 39,
    totalSpent: 188e3,
    totalEarned: 85200,
    status: "active",
    notes: "Top-performing member in the current cycle."
  },
  {
    id: "MEM-1007",
    name: "Hamza Qureshi",
    email: "hamza.qureshi@levelup.app",
    phone: "+92 334 7788552",
    city: "Peshawar",
    joinedAt: "2026-03-18T15:05:00.000Z",
    activePlan: "Plan 4 Silver",
    currentLevel: 4,
    points: 53,
    referrals: 16,
    totalSpent: 81e3,
    totalEarned: 30100,
    status: "watch",
    notes: "Reward ticket volume increased this month."
  },
  {
    id: "MEM-1008",
    name: "Fatima Iqbal",
    email: "fatima.iqbal@levelup.app",
    phone: "+92 302 6688990",
    city: "Hyderabad",
    joinedAt: "2026-03-24T10:25:00.000Z",
    activePlan: "Plan 5 Gold",
    currentLevel: 5,
    points: 71,
    referrals: 19,
    totalSpent: 99e3,
    totalEarned: 36200,
    status: "active",
    notes: "Strong reward conversion from referrals."
  }
];
const DEFAULT_REWARD_TICKETS = [
  {
    id: "RWD-20260426-01",
    memberId: "MEM-1001",
    memberName: "Ali Raza",
    memberEmail: "ali.raza@levelup.app",
    rewardLevel: 5,
    requestedAmount: 35e3,
    note: "Reached the next team milestone and requesting review.",
    requestedAt: "2026-04-26T07:45:00.000Z",
    status: "pending"
  },
  {
    id: "RWD-20260426-02",
    memberId: "MEM-1004",
    memberName: "Hina Malik",
    memberEmail: "hina.malik@levelup.app",
    rewardLevel: 5,
    requestedAmount: 35e3,
    note: "Submitted payout request for team performance bonus.",
    requestedAt: "2026-04-26T10:10:00.000Z",
    status: "in_review"
  },
  {
    id: "RWD-20260425-03",
    memberId: "MEM-1003",
    memberName: "Bilal Ahmed",
    memberEmail: "bilal.ahmed@levelup.app",
    rewardLevel: 4,
    requestedAmount: 2e4,
    note: "Level 4 bonus claim after referral target completion.",
    requestedAt: "2026-04-25T12:25:00.000Z",
    status: "rewarded",
    rewardedAt: "2026-04-25T16:05:00.000Z",
    rewardedBy: "ops@levelup-admin",
    rewardedCount: 2,
    distributedAmount: 2e4
  },
  {
    id: "RWD-20260424-04",
    memberId: "MEM-1008",
    memberName: "Fatima Iqbal",
    memberEmail: "fatima.iqbal@levelup.app",
    rewardLevel: 5,
    requestedAmount: 35e3,
    note: "Monthly reward request awaiting confirmation.",
    requestedAt: "2026-04-24T09:40:00.000Z",
    status: "pending"
  }
];
const DEFAULT_REWARD_PAYOUTS = [
  {
    id: "PAY-20260425-01",
    ticketId: "RWD-20260425-03",
    memberId: "MEM-1003",
    memberName: "Bilal Ahmed",
    amount: 14e3,
    processedAt: "2026-04-25T16:05:00.000Z",
    processedBy: "ops@levelup-admin",
    requestedByName: "Bilal Ahmed"
  },
  {
    id: "PAY-20260425-02",
    ticketId: "RWD-20260425-03",
    memberId: "MEM-1007",
    memberName: "Hamza Qureshi",
    amount: 6e3,
    processedAt: "2026-04-25T16:05:00.000Z",
    processedBy: "ops@levelup-admin",
    requestedByName: "Bilal Ahmed"
  }
];
const DEFAULT_BANK_TRANSACTIONS = [];
function normalizeRewardTicket(ticket) {
  const configuredReward = getMilestoneReward(ticket.rewardLevel);
  if (!configuredReward) {
    return ticket;
  }
  const normalizedDistributedAmount = ticket.status === "rewarded" && typeof ticket.distributedAmount === "number" ? configuredReward.amount : ticket.distributedAmount;
  if (ticket.requestedAmount === configuredReward.amount && ticket.distributedAmount === normalizedDistributedAmount) {
    return ticket;
  }
  return {
    ...ticket,
    requestedAmount: configuredReward.amount,
    distributedAmount: normalizedDistributedAmount
  };
}
function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}
function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}
function seedStoredValue(key, fallback) {
  if (!canUseStorage()) {
    return;
  }
  if (!window.localStorage.getItem(key)) {
    window.localStorage.setItem(key, JSON.stringify(fallback));
  }
}
function readStoredValue(key, fallback) {
  if (!canUseStorage()) {
    return cloneData(fallback);
  }
  try {
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) {
      seedStoredValue(key, fallback);
      return cloneData(fallback);
    }
    return JSON.parse(rawValue);
  } catch {
    return cloneData(fallback);
  }
}
function writeStoredValue(key, value) {
  if (!canUseStorage()) {
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(ADMIN_DATA_EVENT));
}
function ensureAdminSeedData() {
  if (!canUseStorage()) {
    return;
  }
  seedStoredValue(MEMBERS_STORAGE_KEY, DEFAULT_MEMBERS);
  seedStoredValue(REWARD_TICKETS_STORAGE_KEY, DEFAULT_REWARD_TICKETS);
  seedStoredValue(REWARD_PAYOUTS_STORAGE_KEY, DEFAULT_REWARD_PAYOUTS);
  seedStoredValue(BANK_TRANSACTIONS_STORAGE_KEY, DEFAULT_BANK_TRANSACTIONS);
  const tickets = getRewardTickets();
  const normalizedTickets = tickets.map(normalizeRewardTicket);
  if (JSON.stringify(tickets) !== JSON.stringify(normalizedTickets)) {
    writeStoredValue(REWARD_TICKETS_STORAGE_KEY, normalizedTickets);
  }
}
function getMembers() {
  return readStoredValue(MEMBERS_STORAGE_KEY, DEFAULT_MEMBERS);
}
function getRewardTickets() {
  return readStoredValue(REWARD_TICKETS_STORAGE_KEY, DEFAULT_REWARD_TICKETS);
}
function getBankTransactions() {
  return readStoredValue(BANK_TRANSACTIONS_STORAGE_KEY, DEFAULT_BANK_TRANSACTIONS);
}
function getRewardTicketsForMember(memberId) {
  return getRewardTickets().filter((ticket) => ticket.memberId === memberId);
}
function getBankTransactionsForMember(memberId) {
  return getBankTransactions().filter((transaction) => transaction.memberId === memberId);
}
function subscribeToAdminData(listener) {
  if (!canUseStorage()) {
    return () => {
    };
  }
  const handleStorage = (event) => {
    if (!event.key || STORAGE_KEYS.includes(event.key)) {
      listener();
    }
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener(ADMIN_DATA_EVENT, listener);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(ADMIN_DATA_EVENT, listener);
  };
}
function createRewardTicket(input) {
  ensureAdminSeedData();
  const members = getMembers();
  const member = members.find((entry) => entry.id === input.memberId);
  if (!member) {
    throw new Error("Member not found.");
  }
  const configuredReward = getMilestoneReward(input.rewardLevel);
  if (!configuredReward) {
    throw new Error("This reward level is not available for claims.");
  }
  const tickets = getRewardTickets();
  const ticketId = `RWD-${Date.now()}`;
  const ticket = {
    id: ticketId,
    memberId: member.id,
    memberName: member.name,
    memberEmail: member.email,
    rewardLevel: input.rewardLevel,
    requestedAmount: configuredReward.amount,
    note: input.note.trim(),
    requestedAt: (/* @__PURE__ */ new Date()).toISOString(),
    status: "pending"
  };
  writeStoredValue(REWARD_TICKETS_STORAGE_KEY, [ticket, ...tickets]);
  return ticket;
}
function createBankTransactionRequest(input) {
  ensureAdminSeedData();
  const members = getMembers();
  const member = members.find((entry) => entry.id === input.memberId);
  if (!member) {
    throw new Error("Member not found.");
  }
  const accountName = input.accountName.trim();
  const accountNumber = input.accountNumber.trim();
  const bankName = input.bankName.trim();
  const amount = Number(input.amount);
  if (!accountName || !accountNumber || !bankName) {
    throw new Error("Fill in account name, account number, and bank name.");
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Enter a valid amount.");
  }
  const bankTransactions = getBankTransactions();
  const transaction = {
    id: `${input.type === "deposit" ? "DEP" : "WDL"}-${Date.now()}`,
    memberId: member.id,
    memberName: member.name,
    memberEmail: member.email,
    type: input.type,
    accountName,
    accountNumber,
    bankName,
    amount,
    requestedAt: (/* @__PURE__ */ new Date()).toISOString(),
    status: "pending"
  };
  writeStoredValue(BANK_TRANSACTIONS_STORAGE_KEY, [transaction, ...bankTransactions]);
  return transaction;
}
export {
  CURRENT_MEMBER_ID as C,
  getBankTransactionsForMember as a,
  getRewardTicketsForMember as b,
  createBankTransactionRequest as c,
  createRewardTicket as d,
  ensureAdminSeedData as e,
  getMembers as g,
  subscribeToAdminData as s
};
