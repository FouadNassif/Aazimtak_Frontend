export interface WeddingStats {
  totalWeddings: number;
  upcomingWeddings: number;
  totalGuests: number;
  monthlyWeddings: number;
}

export interface GuestResponse {
  attending: number;
  notAttending: number;
  pending: number;
}

export interface UpcomingWedding {
  id: number;
  bride_name: string;
  groom_name: string;
  wedding_date: string;
  ceremony_city: string;
  guest_count: number;
}

export interface GuestUpdate {
  id: number;
  name: string;
  attending_status: string;
  number_of_people: number;
  number_of_kids: number;
  status_changed: string;
  wedding_name: string;
}

export interface CityDistribution {
  city: string;
  count: number;
}

export interface SystemStats {
  activeSessions: number;
  totalUsers: number;
  totalImages: number;
  storageUsed: string;
}

export interface DashboardData {
  weddingStats: WeddingStats;
  guestResponses: GuestResponse;
  upcomingWeddings: UpcomingWedding[];
  recentGuestUpdates: GuestUpdate[];
  cityDistribution: CityDistribution[];
  systemStats: SystemStats;
}
