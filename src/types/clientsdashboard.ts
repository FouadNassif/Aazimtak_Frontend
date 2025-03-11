export interface DashboardData {
    wedding_id: number,
    attending_count : number,
    not_attending_count : number,
    pending_count : number,
    attending_percentage : number,
    pending_percentage : number,
    not_attending_percentage : number,
    people_percentage : number,
    kids_percentage : number,
    total_people : number,
    total_kids : number,
    total_guests : number,
    total_guests_count : number,
  }
  
  export interface Guest {
    id: number;
    name: string;
    numberOfPeople: number;
    numberOfKids: number;
  }
  
  export interface WeddingData {
    weddingDate: string;
    location: string;
    details: string;
  }
  
  export interface ApiResponse<T> {
    status: string;
    data: T;
    message?: string;
  }
  