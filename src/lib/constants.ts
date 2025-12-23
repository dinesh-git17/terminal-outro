/**
 * Shell prompt displayed before command.
 */
export const SHELL_PROMPT = '\u279C ~';

/**
 * Command text that types out in the terminal.
 */
export const COMMAND_TEXT = 'sudo DinBuilds --init';

/**
 * Pre-generated ASCII art for "DinBuilds".
 * Using "Big" font for clean, reliable rendering.
 */
export const ASCII_ART = String.raw`
  _____    _           ____            _   _       _
 |  __ \  (_)         |  _ \          (_) | |     | |
 | |  | |  _   _ __   | |_) |  _   _   _  | |   __| |  ___
 | |  | | | | | '_ \  |  _ <  | | | | | | | |  / _' | / __|
 | |__| | | | | | | | | |_) | | |_| | | | | | | (_| | \__ \
 |_____/  |_| |_| |_| |____/   \__,_| |_| |_|  \__,_| |___/
`.trim();

/**
 * Footer links displayed after ASCII reveal.
 */
export const FOOTER_LINKS = [
  { label: 'Learn more:', url: 'links.dineshd.dev' },
  { label: 'GitHub:', url: 'dinesh-git17' },
] as const;

export type FooterLink = (typeof FOOTER_LINKS)[number];

/**
 * Character set for matrix rain effect.
 * Katakana + alphanumeric for authentic "hacker" aesthetic.
 */
export const MATRIX_CHARACTERS =
  '\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F2\u30F30123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' as const;
