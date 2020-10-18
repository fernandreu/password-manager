export interface ICloudService {
  getAuthenticationUrl(): string;
  getAccessTokenByLocation(location: Location): string;
  getAccessTokenByHash(hash: string): string;
  getData(accessToken: string): Promise<ArrayBuffer>;
  saveData(accessToken: string, data: any, passwordHash: string): Promise<void>;
}

