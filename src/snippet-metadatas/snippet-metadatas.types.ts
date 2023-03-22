export interface SnippetMetadataConfig {
  password?: string;
  deleteAfterHours?: number;
}

export interface SnippetMetadataUpdateDto {
  newPassword: string;
}
