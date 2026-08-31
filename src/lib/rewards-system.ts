export interface LevelBenefit {
  level: number;
  name: string;
  riseCoinsRequired: number;
  directBonus: number;
  indirectBonus: number;
  teamBonus: number;
}

export interface MilestoneReward {
  level: number;
  amount: number;
}

export type MilestoneStatus = "earned" | "current" | "locked";

export const levelBenefits: LevelBenefit[] = [
  { level: 1, name: "Starter", riseCoinsRequired: 300, directBonus: 30, indirectBonus: 8, teamBonus: 0 },
  { level: 2, name: "Bronze", riseCoinsRequired: 600, directBonus: 30, indirectBonus: 9, teamBonus: 0 },
  { level: 3, name: "Silver", riseCoinsRequired: 1000, directBonus: 32, indirectBonus: 9, teamBonus: 5 },
  { level: 4, name: "Gold", riseCoinsRequired: 1300, directBonus: 33, indirectBonus: 10, teamBonus: 6 },
  { level: 5, name: "Platinum", riseCoinsRequired: 1600, directBonus: 34, indirectBonus: 11, teamBonus: 7 },
  { level: 6, name: "Diamond", riseCoinsRequired: 2000, directBonus: 35, indirectBonus: 11, teamBonus: 8 },
  { level: 7, name: "Elite", riseCoinsRequired: 4000, directBonus: 36, indirectBonus: 12, teamBonus: 9 },
  { level: 8, name: "Royal", riseCoinsRequired: 8000, directBonus: 37, indirectBonus: 12, teamBonus: 10 },
  { level: 9, name: "Master", riseCoinsRequired: 15000, directBonus: 38, indirectBonus: 13, teamBonus: 10 },
  { level: 10, name: "Superior", riseCoinsRequired: 25000, directBonus: 39, indirectBonus: 13, teamBonus: 10 },
  { level: 11, name: "Champion", riseCoinsRequired: 50000, directBonus: 40, indirectBonus: 13, teamBonus: 10 },
  { level: 12, name: "Ultimate", riseCoinsRequired: 100000, directBonus: 40, indirectBonus: 14, teamBonus: 10 },
];

export const milestoneRewards: MilestoneReward[] = [
  { level: 1, amount: 1000 }, { level: 2, amount: 1500 }, { level: 3, amount: 2000 },
  { level: 4, amount: 2500 }, { level: 5, amount: 3500 }, { level: 6, amount: 5000 },
  { level: 7, amount: 7000 }, { level: 8, amount: 10000 }, { level: 9, amount: 12000 },
  { level: 10, amount: 18000 }, { level: 11, amount: 23000 }, { level: 12, amount: 30000 },
];

export const totalMilestoneRewards = milestoneRewards.reduce(
  (total, reward) => total + reward.amount,
  0,
);

export function getLevelBenefit(level: number) {
  return (
    levelBenefits.find((entry) => entry.level === level) ?? levelBenefits[levelBenefits.length - 1]
  );
}

export function getMilestoneReward(level: number) {
  return milestoneRewards.find((entry) => entry.level === level) ?? null;
}

export function getMilestoneStatus(currentLevel: number, rewardLevel: number): MilestoneStatus {
  if (currentLevel > rewardLevel) {
    return "earned";
  }

  if (currentLevel === rewardLevel) {
    return "current";
  }

  return "locked";
}
