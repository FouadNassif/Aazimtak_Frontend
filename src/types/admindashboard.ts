// WeddingStats Interface
export interface WeddingStats {
    totalWeddings: number;
    upcomingWeddings: number;
    totalGuests: number;
    monthlyWeddings: number;
  }
  
  // GuestResponses Interface
  export interface GuestResponses {
    attending: number;
    notAttending: number;
    pending: number;
  }
  
  // UpcomingWedding Interface
  export interface UpcomingWedding {
    id: number;
    bride_name: string;
    groom_name: string;
    wedding_date: string; // You may want to use Date depending on how you handle it
    ceremony_city: string;
    guest_count: number;
  }
  
  // RecentGuestUpdate Interface
  export interface RecentGuestUpdate {
    id: number;
    name: string;
    attending_status: string;
    number_of_people: number;
    number_of_kids: number;
    status_changed: string; // Or Date if you prefer
    wedding_name: string;
  }
  
  // CityDistribution Interface
  export interface CityDistribution {
    ceremony_city: string;
    count: number;
  }
  
  // SystemStats Interface
  export interface SystemStats {
    activeSessions: number;
    totalUsers: number;
    totalImages: number;
    storageUsed: number;
  }
  
  // DashboardResponse Interface
  export interface DashboardResponse {
    status: boolean;
    weddingStats: WeddingStats;
    guestResponses: GuestResponses;
    upcomingWeddings: UpcomingWedding[];
    recentGuestUpdates: RecentGuestUpdate[];
    cityDistribution: CityDistribution[];
    systemStats: SystemStats;
    message?: string; 
  }
  
  // Request Body for adding a wedding
export interface AddWeddingRequest {
    bride_name: string;
    bride_lastname: string;
    groom_name: string;
    groom_lastname: string;
    username: string;
    password: string;
  }
  
  // Response for successfully adding a wedding
  export interface AddWeddingSuccessResponse {
    status: boolean;
    message: string;
    wedding_id: number;
  }
  
  // Response for failed wedding creation
  export interface AddWeddingFailureResponse {
    status: boolean;
    message: string;
    error: string;
  }
  
  // Combined response type for the API
  export type AddWeddingResponse = AddWeddingSuccessResponse | AddWeddingFailureResponse;

  // Type for individual Wedding
export interface Wedding {
    id: number;
    bride_name: string;
    bride_lastname: string;
    groom_name: string;
    groom_lastname: string;
    wedding_date: string;
    // Add other fields as needed based on the Wedding model
  }
  
  // Response structure for getAllWeddings API
  export interface GetAllWeddingsResponse {
    weddings: Wedding[];
  }
  