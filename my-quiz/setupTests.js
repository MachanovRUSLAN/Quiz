if (typeof structuredClone === "undefined") {
    global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
  }
  