export interface ICloudService {
  getName(): string;
  logIn(): Promise<void>;
  getAccessTokenByLocation(location: Location): string;
  getAccessTokenByHash(hash: string): string;
  getData(accessToken: string): Promise<ArrayBuffer>;
  saveData(accessToken: string, data: any, passwordHash: string): Promise<void>;
}
