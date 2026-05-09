import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const adminPanelDir = path.resolve(scriptDir, "../../admin-panel");
const adminPackageJson = path.join(adminPanelDir, "package.json");

if (!existsSync(adminPackageJson)) {
  console.log("Admin panel project not found. Skipping admin build step.");
  process.exit(0);
}

try {
  execSync(`npm --prefix "${adminPanelDir}" run build`, {
    stdio: "inherit",
  });
} catch (error) {
  process.exit(error.status ?? 1);
}
