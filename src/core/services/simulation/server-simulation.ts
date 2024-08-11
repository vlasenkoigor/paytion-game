type SlotMathConfig = {
  lines: number[][];
  symbols: number;
  columns: number;
  rows: number;
};

function createServerSimulator(cnf: SlotMathConfig) {
  return {
    getResult: () => getResult(cnf),
  };
}

function getResult(cnf: SlotMathConfig) {}
