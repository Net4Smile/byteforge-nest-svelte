export class QueryErrorHandler extends Error {
  options = {};
  constructor(message: string, options?: any) {
    super(`Error: ${message}`);
    this.name = "Query Error Handler";
    this.options = options;
  }

  public toString() {
    return `${this.name}: ${this.message}, ${this.options}`;
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class GraphQLValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GraphQLValidationError';
  }
}