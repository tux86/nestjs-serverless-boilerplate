/**
 * delay between actions.
 * FOR DEBUGGING PURPOSE ONLY. DOT NOT USE IN PRODUCTION!
 * @param ms milliseconds
 */
export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
