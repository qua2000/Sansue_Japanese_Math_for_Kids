import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const projectRoot = process.cwd();
const dataFile = path.join(projectRoot, "client/src/data/migratedPages.ts");
const assetRoot = path.join(projectRoot, "github-pages-assets");
const outputDir = path.join(projectRoot, "dist/public/manus-storage");
const raw = fs.readFileSync(dataFile, "utf8");
const pages = JSON.parse(raw.split("export const migratedPages = ", 2)[1].split(";\n\nexport const pageByPath", 2)[0]);

function normalize(value) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[\s\-_－—―・、。,，.()（）\[\]【】#＃]/g, "");
}

function collectFiles(directory, entries = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectFiles(fullPath, entries);
    else entries.push(fullPath);
  }
  return entries;
}

function prepareZipImages(tempDirectory) {
  const zipFiles = [
    path.join(assetRoot, "source-images-1.zip"),
    path.join(assetRoot, "source-images-2.zip"),
  ];
  for (const zipFile of zipFiles) {
    if (!fs.existsSync(zipFile)) throw new Error(`Missing required image archive: ${path.relative(projectRoot, zipFile)}`);
    execFileSync("unzip", ["-qq", zipFile, "-d", tempDirectory]);
  }
  return collectFiles(tempDirectory);
}

const manualAliases = {
  "JJ23Twopersonsmoveonarectangle_947c25d6.png": "JJ23Twopersonsmoveonarectangle.png",
  "JJ4Boardontheroller_91e53834.png": "JJ4Boardontheroller.png",
  "DD23Bringballstomovingdray_2d319998.png": "DD23Bringballstomovingdray.png",
  "HH5Dividehexagon_d7843fb8.png": "HH5Dividehexagon.png",
  "JJ9Divisionofsquare_92b3e072.png": "JJ9Divisionofsquare.png",
  "DD46Fouranimalsonarectangle_fb478d7f.png": "DD46Fouranimalsonarectangle.png",
  "CC11summer_homework_06fdc01d.JPG": "CC11夏休みの宿題.JPG",
  "HH8Insectmovingalongthesideofsolid_89295501.png": "HH8Insectmovingalongthesideofsolid.png",
  "EE7Lengthofacandle_1409113f.png": "EE7Lengthofacandle.png",
  "DD20Replacementoflongandhourhand_343ceb3b.png": "DD20Replacementoflongandhourhand.png",
  "LL17Seatsofsixpersons_1_ca61c277.png": "LL17Seatsofsixpersons_1.png",
  "LL17Seatsofsixpersons_Answer_7bdd5c39.png": "LL17Seatsofsixpersons_Answer.png",
  "LL17Seatsofsixpersons_Reference_1d995f5a.png": "LL17Seatsofsixpersons_Reference.png",
  "JJ22Straightlineswithcertainangles-(2)_0d28a826.png": "JJ22Straightlineswithcertainangles-(2).png",
  "JJ22Straightlineswithcertainangles-(3)_31d5502b.png": "JJ22Straightlineswithcertainangles-(3).png",
  "JJ22Straightlineswithcertainangles-Problem_4954a43c.png": "JJ22Straightlineswithcertainangles-Problem.png",
  "KK1Suitablelidforvessel-Problem_46ba9d3f.png": "KK1Suitablelidforvessel-Problem.png",
  "KK1Suitablelidforvessel-Solution_Fig1_8be42ce8.png": "KK1Suitablelidforvessel-Solution_Fig1.png",
  "KK1Suitablelidforvessel-Solution_Fig2_f7b1a398.png": "KK1Suitablelidforvessel-Solution_Fig2.png",
  "KK1Suitablelidforvessel-Solution_Fig3_9e87bf4c.png": "KK1Suitablelidforvessel-Solution_Fig3.png",
};

const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "sansue-pages-images-"));
try {
  const allImageFiles = [
    ...prepareZipImages(temporaryDirectory),
    ...collectFiles(path.join(assetRoot, "manual")),
    ...collectFiles(path.join(assetRoot, "brand")),
  ];
  const imageByNormalizedName = new Map(allImageFiles.map((file) => [normalize(path.basename(file)), file]));
  const imageByName = new Map(allImageFiles.map((file) => [path.basename(file), file]));
  const referencedImages = new Map();
  for (const page of pages) {
    for (const image of page.uploadedImages ?? []) {
      if (image.src?.startsWith("/manus-storage/")) referencedImages.set(path.basename(image.src), image.name);
    }
  }
  const brandFiles = ["math-kids-logo_da704f37.png", "math-kids-hero_0ef61b67.jpg", "math-kids-category_b17bf1ac.jpg"];
  for (const brandFile of brandFiles) referencedImages.set(brandFile, brandFile);

  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });
  const missing = [];
  for (const [outputName, originalName] of referencedImages) {
    const aliasedName = manualAliases[outputName] ?? originalName;
    const source = imageByName.get(aliasedName) ?? imageByNormalizedName.get(normalize(aliasedName));
    if (!source) {
      missing.push({ outputName, originalName });
      continue;
    }
    fs.copyFileSync(source, path.join(outputDir, outputName));
  }
  if (missing.length) throw new Error(`Missing ${missing.length} required image(s): ${JSON.stringify(missing.slice(0, 10))}`);
  console.log(`Prepared ${referencedImages.size} GitHub Pages images in ${path.relative(projectRoot, outputDir)}.`);
} finally {
  fs.rmSync(temporaryDirectory, { recursive: true, force: true });
}
