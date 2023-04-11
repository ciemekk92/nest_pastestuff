export interface SnippetMetadataConfig {
  password?: string;
  timeToLiveMs?: number;
}

export interface SnippetMetadataUpdateDto {
  newPassword: string;
}
