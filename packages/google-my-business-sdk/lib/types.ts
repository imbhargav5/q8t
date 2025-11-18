// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from api/openapi.yaml

export interface ListAccountsResponse {
  accounts?: Account[];
  nextPageToken?: string;
}

export interface Account {
  name?: string;
  accountName?: string;
  type?: "ACCOUNT_TYPE_UNSPECIFIED" | "PERSONAL" | "LOCATION_GROUP" | "USER_GROUP" | "ORGANIZATION";
  role?: "ACCOUNT_ROLE_UNSPECIFIED" | "PRIMARY_OWNER" | "OWNER" | "MANAGER" | "SITE_MANAGER";
  state?: AccountState;
  profilePhotoUrl?: string;
}

export interface AccountState {
  status?: "ACCOUNT_STATUS_UNSPECIFIED" | "VERIFIED" | "UNVERIFIED" | "VERIFICATION_REQUESTED";
}

export interface ListLocationsResponse {
  locations?: Location[];
  nextPageToken?: string;
  totalSize?: number;
}

export interface Location {
  name?: string;
  title?: string;
  phoneNumbers?: PhoneNumbers;
  categories?: Categories;
  storefrontAddress?: PostalAddress;
  websiteUri?: string;
  regularHours?: BusinessHours;
  specialHours?: SpecialHours;
  languageCode?: string;
  profile?: Profile;
  metadata?: Metadata;
  latlng?: LatLng;
}

export interface PhoneNumbers {
  primaryPhone?: string;
  additionalPhones?: string[];
}

export interface Categories {
  primaryCategory?: Category;
  additionalCategories?: Category[];
}

export interface Category {
  name?: string;
  displayName?: string;
}

export interface PostalAddress {
  regionCode?: string;
  languageCode?: string;
  postalCode?: string;
  administrativeArea?: string;
  locality?: string;
  addressLines?: string[];
}

export interface BusinessHours {
  periods?: TimePeriod[];
}

export interface TimePeriod {
  openDay?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  openTime?: TimeOfDay;
  closeDay?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  closeTime?: TimeOfDay;
}

export interface TimeOfDay {
  hours?: number;
  minutes?: number;
  seconds?: number;
  nanos?: number;
}

export interface SpecialHours {
  specialHourPeriods?: SpecialHourPeriod[];
}

export interface SpecialHourPeriod {
  startDate?: Date;
  openTime?: TimeOfDay;
  endDate?: Date;
  closeTime?: TimeOfDay;
  closed?: boolean;
}

export interface Date {
  year?: number;
  month?: number;
  day?: number;
}

export interface Profile {
  description?: string;
}

export interface Metadata {
  mapsUri?: string;
  newReviewUri?: string;
}

export interface LatLng {
  latitude?: number;
  longitude?: number;
}

export interface ListReviewsResponse {
  reviews?: Review[];
  averageRating?: number;
  totalReviewCount?: number;
  nextPageToken?: string;
}

export interface Review {
  name?: string;
  reviewId?: string;
  reviewer?: Reviewer;
  starRating?: "STAR_RATING_UNSPECIFIED" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  comment?: string;
  createTime?: string;
  updateTime?: string;
  reviewReply?: ReviewReply;
}

export interface Reviewer {
  profilePhotoUrl?: string;
  displayName?: string;
  isAnonymous?: boolean;
}

export interface ReviewReply {
  comment?: string;
  updateTime?: string;
}

export interface LocalPost {
  name?: string;
  languageCode?: string;
  summary: string;
  callToAction?: CallToAction;
  createTime?: string;
  updateTime?: string;
  state?: "LOCAL_POST_STATE_UNSPECIFIED" | "REJECTED" | "LIVE" | "PROCESSING";
  topicType: "LOCAL_POST_TOPIC_TYPE_UNSPECIFIED" | "STANDARD" | "EVENT" | "OFFER" | "ALERT";
  searchUrl?: string;
}

export interface CallToAction {
  actionType?: "ACTION_TYPE_UNSPECIFIED" | "BOOK" | "ORDER" | "SHOP" | "LEARN_MORE" | "SIGN_UP" | "CALL";
  url?: string;
}
