import { copyFileSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";

const adminDist = "./admin-panel/dist";
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

try {
  console.log("Copying admin panel to public directory...");
  copyDir(adminDist, publicAdmin);
  console.log("✓ Admin panel copied successfully");
} catch (error) {
  console.error("✗ Failed to copy admin panel:", error.message);
  process.exit(1);
}
