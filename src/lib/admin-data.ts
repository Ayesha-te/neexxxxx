import { getMilestoneReward } from "@/lib/rewards-system";

export type MemberStatus = "active" | "watch" | "paused";
export type RewardTicketStatus = "pending" | "in_review" | "rewarded";

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  joinedAt: string;
  activePlan: string;
  currentLevel: number;
  points: number;
  referrals: number;
  totalSpent: number;
  totalEarned: number;
  status: MemberStatus;
  notes: string;
}

export interface RewardTicket {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  rewardLevel: number;
  requestedAmount: number;
  note: string;
  requestedAt: string;
  status: RewardTicketStatus;
  rewardedAt?: string;
  rewardedBy?: string;
  rewardedCount?: number;
  distributedAmount?: number;
}

export interface RewardPayout {
  id: string;
  ticketId: string;
  memberId: string;
  memberName: string;
  amount: number;
  processedAt: string;
  processedBy: string;
  requestedByName: string;
}

export interface RewardAllocation {
  memberId: string;
  amount: number;
}

export interface AdminSnapshot {
  members: Member[];
  rewardTickets: RewardTicket[];
  rewardPayouts: RewardPayout[];
}

export const CURRENT_MEMBER_ID = "MEM-1001";
export const ADMIN_DATA_EVENT = "levelup-admin-data-sync";

const MEMBERS_STORAGE_KEY = "levelup-admin-members-v1";
const REWARD_TICKETS_STORAGE_KEY = "levelup-admin-reward-tickets-v1";
const REWARD_PAYOUTS_STORAGE_KEY = "levelup-admin-reward-payouts-v1";

const STORAGE_KEYS = [
  MEMBERS_STORAGE_KEY,
  REWARD_TICKETS_STORAGE_KEY,
  REWARD_PAYOUTS_STORAGE_KEY,
] as const;

const DEFAULT_MEMBERS: Member[] = [
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
    totalSpent: 95000,
    totalEarned: 41200,
    status: "active",
    notes: "High engagement and consistent reward activity.",
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
    totalSpent: 142000,
    totalEarned: 63500,
    status: "active",
    notes: "Frequently qualifies for milestone rewards.",
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
    totalSpent: 72000,
    totalEarned: 28100,
    status: "watch",
    notes: "Needs a follow-up on last payout confirmation.",
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
    totalSpent: 104000,
    totalEarned: 38750,
    status: "active",
    notes: "Team leader with fast-moving downline.",
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
    totalSpent: 43000,
    totalEarned: 15900,
    status: "paused",
    notes: "Low recent activity but still within reward cycle.",
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
    totalSpent: 188000,
    totalEarned: 85200,
    status: "active",
    notes: "Top-performing member in the current cycle.",
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
    totalSpent: 81000,
    totalEarned: 30100,
    status: "watch",
    notes: "Reward ticket volume increased this month.",
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
    totalSpent: 99000,
    totalEarned: 36200,
    status: "active",
    notes: "Strong reward conversion from referrals.",
  },
];

const DEFAULT_REWARD_TICKETS: RewardTicket[] = [
  {
    id: "RWD-20260426-01",
    memberId: "MEM-1001",
    memberName: "Ali Raza",
    memberEmail: "ali.raza@levelup.app",
    rewardLevel: 5,
    requestedAmount: 35000,
    note: "Reached the next team milestone and requesting review.",
    requestedAt: "2026-04-26T07:45:00.000Z",
    status: "pending",
  },
  {
    id: "RWD-20260426-02",
    memberId: "MEM-1004",
    memberName: "Hina Malik",
    memberEmail: "hina.malik@levelup.app",
    rewardLevel: 5,
    requestedAmount: 35000,
    note: "Submitted payout request for team performance bonus.",
    requestedAt: "2026-04-26T10:10:00.000Z",
    status: "in_review",
  },
  {
    id: "RWD-20260425-03",
    memberId: "MEM-1003",
    memberName: "Bilal Ahmed",
    memberEmail: "bilal.ahmed@levelup.app",
    rewardLevel: 4,
    requestedAmount: 20000,
    note: "Level 4 bonus claim after referral target completion.",
    requestedAt: "2026-04-25T12:25:00.000Z",
    status: "rewarded",
    rewardedAt: "2026-04-25T16:05:00.000Z",
    rewardedBy: "ops@levelup-admin",
    rewardedCount: 2,
    distributedAmount: 20000,
  },
  {
    id: "RWD-20260424-04",
    memberId: "MEM-1008",
    memberName: "Fatima Iqbal",
    memberEmail: "fatima.iqbal@levelup.app",
    rewardLevel: 5,
    requestedAmount: 35000,
    note: "Monthly reward request awaiting confirmation.",
    requestedAt: "2026-04-24T09:40:00.000Z",
    status: "pending",
  },
];

const DEFAULT_REWARD_PAYOUTS: RewardPayout[] = [
  {
    id: "PAY-20260425-01",
    ticketId: "RWD-20260425-03",
    memberId: "MEM-1003",
    memberName: "Bilal Ahmed",
    amount: 14000,
    processedAt: "2026-04-25T16:05:00.000Z",
    processedBy: "ops@levelup-admin",
    requestedByName: "Bilal Ahmed",
  },
  {
    id: "PAY-20260425-02",
    ticketId: "RWD-20260425-03",
    memberId: "MEM-1007",
    memberName: "Hamza Qureshi",
    amount: 6000,
    processedAt: "2026-04-25T16:05:00.000Z",
    processedBy: "ops@levelup-admin",
    requestedByName: "Bilal Ahmed",
  },
];

function normalizeRewardTicket(ticket: RewardTicket) {
  const configuredReward = getMilestoneReward(ticket.rewardLevel);

  if (!configuredReward) {
    return ticket;
  }

  const normalizedDistributedAmount =
    ticket.status === "rewarded" && typeof ticket.distributedAmount === "number"
      ? configuredReward.amount
      : ticket.distributedAmount;

  if (
    ticket.requestedAmount === configuredReward.amount &&
    ticket.distributedAmount === normalizedDistributedAmount
  ) {
    return ticket;
  }

  return {
    ...ticket,
    requestedAmount: configuredReward.amount,
    distributedAmount: normalizedDistributedAmount,
  };
}

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function cloneData<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function seedStoredValue<T>(key: string, fallback: T) {
  if (!canUseStorage()) {
    return;
  }

  if (!window.localStorage.getItem(key)) {
    window.localStorage.setItem(key, JSON.stringify(fallback));
  }
}

function readStoredValue<T>(key: string, fallback: T): T {
  if (!canUseStorage()) {
    return cloneData(fallback);
  }

  try {
    const rawValue = window.localStorage.getItem(key);

    if (!rawValue) {
      seedStoredValue(key, fallback);
      return cloneData(fallback);
    }

    return JSON.parse(rawValue) as T;
  } catch {
    return cloneData(fallback);
  }
}

function writeStoredValue<T>(key: string, value: T) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(ADMIN_DATA_EVENT));
}

export function ensureAdminSeedData() {
  if (!canUseStorage()) {
    return;
  }

  seedStoredValue(MEMBERS_STORAGE_KEY, DEFAULT_MEMBERS);
  seedStoredValue(REWARD_TICKETS_STORAGE_KEY, DEFAULT_REWARD_TICKETS);
  seedStoredValue(REWARD_PAYOUTS_STORAGE_KEY, DEFAULT_REWARD_PAYOUTS);

  const tickets = getRewardTickets();
  const normalizedTickets = tickets.map(normalizeRewardTicket);

  if (JSON.stringify(tickets) !== JSON.stringify(normalizedTickets)) {
    writeStoredValue(REWARD_TICKETS_STORAGE_KEY, normalizedTickets);
  }
}

export function getMembers() {
  return readStoredValue(MEMBERS_STORAGE_KEY, DEFAULT_MEMBERS);
}

export function getRewardTickets() {
  return readStoredValue(REWARD_TICKETS_STORAGE_KEY, DEFAULT_REWARD_TICKETS);
}

export function getRewardPayouts() {
  return readStoredValue(REWARD_PAYOUTS_STORAGE_KEY, DEFAULT_REWARD_PAYOUTS);
}

export function getRewardTicketsForMember(memberId: string) {
  return getRewardTickets().filter((ticket) => ticket.memberId === memberId);
}

export function getAdminSnapshot(): AdminSnapshot {
  return {
    members: getMembers(),
    rewardTickets: getRewardTickets(),
    rewardPayouts: getRewardPayouts(),
  };
}

export function subscribeToAdminData(listener: () => void) {
  if (!canUseStorage()) {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (!event.key || STORAGE_KEYS.includes(event.key as (typeof STORAGE_KEYS)[number])) {
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

export function createRewardTicket(input: {
  memberId: string;
  rewardLevel: number;
  requestedAmount: number;
  note: string;
}) {
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

  const ticket: RewardTicket = {
    id: ticketId,
    memberId: member.id,
    memberName: member.name,
    memberEmail: member.email,
    rewardLevel: input.rewardLevel,
    requestedAmount: configuredReward.amount,
    note: input.note.trim(),
    requestedAt: new Date().toISOString(),
    status: "pending",
  };

  writeStoredValue(REWARD_TICKETS_STORAGE_KEY, [ticket, ...tickets]);

  return ticket;
}

export function processRewardTicket(input: {
  ticketId: string;
  allocations: RewardAllocation[];
  processedBy: string;
}) {
  ensureAdminSeedData();

  const sanitizedAllocations = input.allocations.filter(
    (allocation) => Number.isFinite(allocation.amount) && allocation.amount > 0,
  );

  if (!sanitizedAllocations.length) {
    throw new Error("Add at least one valid reward amount.");
  }

  const tickets = getRewardTickets();
  const ticket = tickets.find((entry) => entry.id === input.ticketId);

  if (!ticket) {
    throw new Error("Reward ticket not found.");
  }

  if (ticket.status === "rewarded") {
    throw new Error("This ticket has already been rewarded.");
  }

  const members = getMembers();
  const payouts = getRewardPayouts();
  const processedAt = new Date().toISOString();
  const memberAmountMap = new Map<string, number>();

  for (const allocation of sanitizedAllocations) {
    memberAmountMap.set(
      allocation.memberId,
      (memberAmountMap.get(allocation.memberId) ?? 0) + allocation.amount,
    );
  }

  const createdPayouts: RewardPayout[] = Array.from(memberAmountMap.entries()).map(
    ([memberId, amount], index) => {
      const member = members.find((entry) => entry.id === memberId);

      if (!member) {
        throw new Error("One of the selected users could not be found.");
      }

      return {
        id: `PAY-${Date.now()}-${index + 1}`,
        ticketId: ticket.id,
        memberId: member.id,
        memberName: member.name,
        amount,
        processedAt,
        processedBy: input.processedBy,
        requestedByName: ticket.memberName,
      };
    },
  );

  const totalDistributedAmount = createdPayouts.reduce((total, payout) => total + payout.amount, 0);

  const updatedMembers = members.map((member) => {
    const rewardAmount = memberAmountMap.get(member.id);

    if (!rewardAmount) {
      return member;
    }

    return {
      ...member,
      totalEarned: member.totalEarned + rewardAmount,
    };
  });

  const updatedTickets = tickets.map((entry) =>
    entry.id === ticket.id
      ? {
          ...entry,
          status: "rewarded" as const,
          rewardedAt: processedAt,
          rewardedBy: input.processedBy,
          rewardedCount: createdPayouts.length,
          distributedAmount: totalDistributedAmount,
        }
      : entry,
  );

  writeStoredValue(MEMBERS_STORAGE_KEY, updatedMembers);
  writeStoredValue(REWARD_TICKETS_STORAGE_KEY, updatedTickets);
  writeStoredValue(REWARD_PAYOUTS_STORAGE_KEY, [...createdPayouts, ...payouts]);

  return {
    createdPayouts,
    updatedTicket: updatedTickets.find((entry) => entry.id === ticket.id) ?? ticket,
  };
}
