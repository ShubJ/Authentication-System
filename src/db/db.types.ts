export interface DBClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
