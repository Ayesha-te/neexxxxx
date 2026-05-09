import { copyFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";

const adminDistCandidates = [
  "../admin-panel/.output/public",
  "../admin-panel/dist/client",
];
const publicAdmin = "./public/admin";

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  const files = readdirSync(src, { withFileTypes: true });

  for (const file of files) {
    const srcPath = join(src, file.name);
    const destPath = join(dest, file.name);

    if (file.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

const adminDist = adminDistCandidates.find((candidate) => existsSync(candidate));

try {
  if (!adminDist) {
    console.warn("Admin panel build output not found. Skipping admin asset copy.");
    process.exit(0);
  }

  console.log(`Copying admin panel assets from ${adminDist} to public/admin...`);
  copyDir(adminDist, publicAdmin);
  console.log("Admin panel assets copied successfully.");
} catch (error) {
  console.error("Failed to copy admin panel assets:", error.message);
  process.exit(1);
}
