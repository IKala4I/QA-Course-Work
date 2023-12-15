export interface Errors {
  [key: string]: number | string
}

export interface SeparatedErrors {
  [key: string]: Errors
}
