export interface LevelBenefit {
  level: number;
  name: string;
  pointsRequired: number;
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
  { level: 1, name: "Starter Queen", pointsRequired: 6, directBonus: 28, indirectBonus: 16, teamBonus: 0 },
  { level: 2, name: "Vision Queen", pointsRequired: 12, directBonus: 30, indirectBonus: 16, teamBonus: 0 },
  { level: 3, name: "Elevate Queen", pointsRequired: 30, directBonus: 33, indirectBonus: 16, teamBonus: 3 },
  { level: 4, name: "Sapphire Queen", pointsRequired: 44, directBonus: 35, indirectBonus: 16, teamBonus: 4 },
  { level: 5, name: "Ruby Queen", pointsRequired: 63, directBonus: 37, indirectBonus: 17, teamBonus: 5 },
  { level: 6, name: "Diamond Queen", pointsRequired: 80, directBonus: 39, indirectBonus: 17, teamBonus: 6 },
  { level: 7, name: "Platinum Queen", pointsRequired: 100, directBonus: 41, indirectBonus: 18, teamBonus: 7 },
  { level: 8, name: "Elite Queen", pointsRequired: 120, directBonus: 43, indirectBonus: 18, teamBonus: 8 },
  { level: 9, name: "Royal Queen", pointsRequired: 140, directBonus: 46, indirectBonus: 18, teamBonus: 9 },
  { level: 10, name: "Imperial Queen", pointsRequired: 165, directBonus: 48, indirectBonus: 18, teamBonus: 10 },
];

export const milestoneRewards: MilestoneReward[] = [
  { level: 2, amount: 5000 },
  { level: 3, amount: 12000 },
  { level: 4, amount: 20000 },
  { level: 5, amount: 35000 },
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
