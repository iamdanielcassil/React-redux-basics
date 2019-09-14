export const log = (type, msg) => ({
  type: "DEBUG_LOG",
  payload: {
    action: type,
    msg,
    trace: new Error().stack.split(" at ").splice(3)
  }
});
