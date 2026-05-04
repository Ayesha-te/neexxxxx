import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
const Table = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props }));
TableBody.displayName = "TableBody";
const TableFooter = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "tfoot",
  {
    ref,
    className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      ref,
      className: cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props }));
TableCaption.displayName = "TableCaption";
const levelBenefits = [
  { level: 1, directBonus: 28, indirectBonus: 16, teamBonus: 0 },
  { level: 2, directBonus: 30, indirectBonus: 16, teamBonus: 0 },
  { level: 3, directBonus: 33, indirectBonus: 16, teamBonus: 3 },
  { level: 4, directBonus: 35, indirectBonus: 16, teamBonus: 4 },
  { level: 5, directBonus: 37, indirectBonus: 17, teamBonus: 5 },
  { level: 6, directBonus: 39, indirectBonus: 17, teamBonus: 6 },
  { level: 7, directBonus: 41, indirectBonus: 18, teamBonus: 7 },
  { level: 8, directBonus: 43, indirectBonus: 18, teamBonus: 8 },
  { level: 9, directBonus: 46, indirectBonus: 18, teamBonus: 9 },
  { level: 10, directBonus: 48, indirectBonus: 18, teamBonus: 10 }
];
const milestoneRewards = [
  { level: 2, amount: 5e3 },
  { level: 3, amount: 12e3 },
  { level: 4, amount: 2e4 },
  { level: 5, amount: 35e3 }
];
const totalMilestoneRewards = milestoneRewards.reduce(
  (total, reward) => total + reward.amount,
  0
);
function getLevelBenefit(level) {
  return levelBenefits.find((entry) => entry.level === level) ?? levelBenefits[levelBenefits.length - 1];
}
function getMilestoneReward(level) {
  return milestoneRewards.find((entry) => entry.level === level) ?? null;
}
function getMilestoneStatus(currentLevel, rewardLevel) {
  if (currentLevel > rewardLevel) {
    return "earned";
  }
  if (currentLevel === rewardLevel) {
    return "current";
  }
  return "locked";
}
export {
  Table as T,
  TableHeader as a,
  TableRow as b,
  TableHead as c,
  TableBody as d,
  TableCell as e,
  getMilestoneReward as f,
  getLevelBenefit as g,
  getMilestoneStatus as h,
  levelBenefits as l,
  milestoneRewards as m,
  totalMilestoneRewards as t
};
