import logSymbols from "log-symbols";

/**
 * Log settings
 */
export const settings = {
  /** enable debug logs **/
  debug: false,
  /** disable logs completely **/
  quiet: false
};

/**
 * Logs message with info symbol. Works only when SETTINGS.DEBUG is true.
 *
 * @param {String} message Message to log
 * @param {Number} indentation (Default: 0) Indentation level
 */
export function debug(message, indentation = 0) {
  if(settings.debug) info(message, indentation);
}

/**
 * Logs message with info symbol.
 *
 * @param {String} message Message to log
 * @param {Number} indentation (Default: 0) Indentation level
 */
export function info(message, indentation = 0) {
  log(message, indentation, logSymbols.info);
}

/**
 * Logs message with success symbol.
 *
 * @param {String} message Message to log
 * @param {Number} indentation (Default: 0) Indentation level
 */
export function success(message, indentation = 0) {
  log(message, indentation, logSymbols.success);
}

/**
 * Logs message with warning symbol.
 *
 * @param {String} message Message to log
 * @param {Number} indentation (Default: 0) Indentation level
 */
export function warning(message, indentation = 0) {
  log(message, indentation, logSymbols.warning);
}

/**
 * Logs message with error symbol.
 *
 * @param {String} message Message to log
 * @param {Number} indentation (Default: 0) Indentation level
 */
export function error(message, indentation = 0) {
  log(message, indentation, logSymbols.error);
}

function log(message, indentation = 0, icon = logSymbols.warning) {
  if(!settings.quiet) console.log(Array(indentation + 1).join(" "), icon, message);
}

export default { settings, debug, info, success, warning, error };
