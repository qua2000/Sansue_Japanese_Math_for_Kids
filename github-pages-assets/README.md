# GitHub Pages image assets

These files make the GitHub Pages build self-contained. Do not rename the following required files.

| Path | Contents |
|---|---|
| `source-images-1.zip` | The originally supplied `Sansue画像-1-001.zip` file |
| `source-images-2.zip` | The originally supplied `Sansue画像-fatcs-1-001.zip` file |
| `manual/` | The 19 manually matched image files listed in `manual/README.md` |
| `brand/` | The logo and two homepage images used by the site design |

The `pnpm run build:pages` command extracts and maps these files into the final `dist/public/manus-storage/` folder. The source ZIPs and manual images are not served directly.
