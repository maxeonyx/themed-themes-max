import * as path from 'path';
import * as fs from 'fs';
import { generateTheme, IColorSet } from 'vscode-theme-generator'


/*

This package generates a VS Code extension into `dist/` which provides 5 different but
consistent themes.

A VS Code extension consists of a package.json, an icon.png and any resources
(such as theme json files) that the extension requires.

*/


const outputDir = path.join(__dirname, "..", "dist");
fs.mkdirSync(outputDir, { recursive: true });

const makeFilename = (name: string) => name.toLowerCase() + ".json";

const col = {
  black: {
    light: '#333333',
    mid: '#222222',
    dark: '#111111',
  },
  white: {
    light: '#ffffff',
    mid: '#dddddd',
    dark: '#bbbbbb',
  },
};

interface ThemeColors {
  rich: string;
  dull: string;
  dark: string;
  light: string;
  mid: string;
  deep_accent: string;
}

interface ThemeConfig {
  name: string;
  col: ThemeColors;
}

interface Theme {
  name: string;
  file: string;
  colorSet: IColorSet;
}

const theme_configs: ThemeConfig[] = [
  {
    name: "Marine",
    col: {
      rich: '#1166ff',
      dull: '#aaddff',
      dark: '#4499bb',
      light: '#88eedd',
      mid: '#55aaff',
      deep_accent: '#0066aa',
    }
  },
  {
    name: "Meadow",
    col: {
      rich: '#33cc11',
      dull: '#aacc99',
      dark: '#228800',
      light: '#ddee88',
      mid: '#88dd55',
      deep_accent: '#009900',
    },
  },
  {
    name: "Molten",
    col: {
      rich: '#dd4411',
      dull: '#eecc88',
      dark: '#aa5500',
      light: '#ffccaa',
      mid: '#ff9955',
      deep_accent: '#882200',
    },
  },
  {
    name: "Magic",
    col: {
      rich: '#cc55aa',
      dull: '#ddaadd',
      dark: '#9955ff',
      light: '#ffaaff',
      mid: '#bb55ff',
      deep_accent: '#8800aa',
    },
  },
  {
    name: "Moonlight",
    col: {
      rich: '#ffffff',
      dull: '#aaaaaa',
      dark: '#aaaaaa',
      light: '#ffffff',
      mid: '#dddddd',
      deep_accent: '#111111',
    },
  },
];

let makeTheme: (t: ThemeConfig) => Theme;

makeTheme = t => ({
  name: "TT Max " + t.name,
  file: path.join(outputDir, makeFilename(t.name)),
  colorSet: {
    base: {
      background: col.black.mid,
      foreground: col.white.mid,
      color1: t.col.rich,
      color2: t.col.dull,
      color3: t.col.light,
      color4: t.col.mid,
    },
    syntax: {
      cssClass: t.col.mid,
      cssId: t.col.mid,
      cssTag: t.col.mid,
      number: t.col.rich,
      comment: t.col.dark,
      keyword: t.col.mid,
      string: t.col.light,
      type: t.col.dark,
      storage: t.col.rich,
      function: t.col.mid,
      functionCall: t.col.mid,
      modifier: t.col.mid,
      identifier: t.col.dull,
    },
    overrides: {
      "titleBar.activeBackground": t.col.deep_accent,
      "titleBar.activeForeground": col.white.light,
      "statusBar.background": t.col.deep_accent,
      "statusBar.foreground": col.white.light,
    },
  }
});

// Generate theme files
theme_configs.forEach(t => {
  let theme = makeTheme(t);
  generateTheme(theme.name, theme.colorSet, theme.file);
});

// Copy icon.png
fs.copyFileSync(path.join(__dirname, "icon.png"), path.join(outputDir, "icon.png"));
fs.copyFileSync(path.join(__dirname, "magic.png"), path.join(outputDir, "magic.png"));
fs.copyFileSync(path.join(__dirname, "marine.png"), path.join(outputDir, "marine.png"));
fs.copyFileSync(path.join(__dirname, "meadow.png"), path.join(outputDir, "meadow.png"));
fs.copyFileSync(path.join(__dirname, "molten.png"), path.join(outputDir, "molten.png"));
fs.copyFileSync(path.join(__dirname, "moonlight.png"), path.join(outputDir, "moonlight.png"));
fs.copyFileSync(path.join(__dirname, "../readme.md"), path.join(outputDir, "readme.md"));

// Generate extension manifest file
const package_json = {
  "name": "themed-themes-max",
  "displayName": "Themed Themes Max",
  "author": "Maxwell Clarke",
  "publisher": "maxeonyx",
  "description": "A colour coordinated set of themes. Now you can have different but consistent themes for different workspaces.",
  "version": "0.1.5",
  "license": "MIT",
  "repository": "https://github.com/maxeonyx/themed-themes-max",
  "engines": {
    "vscode": "^1.11.0"
  },
  "categories": [
    "Themes"
  ],
  "contributes": {
    "themes": theme_configs.map(t => ({
      "label": "TT Max " + t.name,
      "uiTheme": "vs-dark",
      "path": makeFilename(t.name),
    })),
  },
  "icon": "icon.png",
};

fs.writeFileSync(path.join(outputDir, "package.json"), JSON.stringify(package_json, null, 2));
