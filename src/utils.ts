export const normalizeStringToNumber = (str: string): number =>
  Number(str.replaceAll('.', '').replaceAll(',', '.').replaceAll('%', ''))
