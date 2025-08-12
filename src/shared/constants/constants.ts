// Type definitions for constants
export interface EmptyStateDefaults {
  TITLE: string;
  MESSAGE: string;
  ICON: string;
}

export interface ErrorStateDefaults {
  TITLE: string;
  MESSAGE: string;
  ICON: string;
}

export interface BrowserPageDefaults {
  LOADING_MESSAGE: string;
  EMPTY_BUCKET_TITLE: string;
  EMPTY_BUCKET_MESSAGE: string;
  EMPTY_BUCKET_ICON: string;
  ERROR_MESSAGE_PREFIX: string;
}

// EmptyState Constants
export const EMPTY_STATE_DEFAULTS: EmptyStateDefaults = {
  TITLE: "No Data Available",
  MESSAGE: "Please configure your AWS credentials to get started.",
  ICON: "📁"
} as const;

// ErrorState Constants
export const ERROR_STATE_DEFAULTS: ErrorStateDefaults = {
  TITLE: "Something went wrong",
  MESSAGE: "An error occurred while loading your data.",
  ICON: "⚠️"
} as const;

// BrowserPage Constants
export const BROWSER_PAGE_DEFAULTS: BrowserPageDefaults = {
  LOADING_MESSAGE: "Loading S3 objects...",
  EMPTY_BUCKET_TITLE: "No Files or Folders Found",
  EMPTY_BUCKET_MESSAGE: "This bucket is empty. Create your first file or folder to get started.",
  EMPTY_BUCKET_ICON: "📁",
  ERROR_MESSAGE_PREFIX: "Failed to load objects: "
} as const; 