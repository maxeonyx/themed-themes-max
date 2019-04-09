import * as path from 'path';
import * as fs from 'fs';
import { generateTheme, IColorSet } from 'vscode-theme-generator'

const outputDir = path.join(__dirname, "..", "dist");
fs.mkdirSync(outputDir, { recursive: true });

const makeFilename = (name: string) => "max-" + name.toLowerCase() + ".json";

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
    name: "Blue",
    col: {
      rich: '#1166ff',
      dull: '#aaddff',
      dark: '#4466aa',
      light: '#22ddff',
      mid: '#55aaff',
      deep_accent: '#0055bb',
    }
  },
  {
    name: "Green",
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
    name: "Grey",
    col: {
      rich: '#ffffff',
      dull: '#aaaaaa',
      dark: '#aaaaaa',
      light: '#ffffff',
      mid: '#dddddd',
      deep_accent: '#111111',
    },
  }
];

let makeTheme: (t: ThemeConfig) => Theme;

makeTheme = t => ({
  name: "Themed Themes: Max " + t.name,
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
      type:  t.col.dark,
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

// Generate extension manifest file
const package_json = {
  "name": "themed-themes-max",
  "displayName": "Themed Themes Max",
  "publisher": "Maxwell Clarke",
  "description": "A colour coordinated set of themes. Now you can have different but consistent themes for different workspaces.",
  "version": "0.1.0",
  "license": "MIT",
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
  }
};

fs.writeFileSync(path.join(outputDir, "package.json"), JSON.stringify(package_json, null, 2));
