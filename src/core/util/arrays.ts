export function createMatrix<T>(rows: number, columns: number, value: T): T[][] {
  return Array.from({ length: rows }, () => Array.from({ length: columns }, () => value));
}

export function getMatrixCell<T>(matrix: T[][], x: number, y: number): T {
  return matrix[y][x];
}

export function setMatrixCell<T>(matrix: T[][], x: number, y: number, value: T): void {
  matrix[y][x] = value;
}

function createArray<T>(length: number, value: T): T[] {
  return Array.from({ length }, () => value);
}

function shuffleArray<T>(arr: T[]): T[] {
  return arr.sort(() => Math.random() - 0.5);
}
