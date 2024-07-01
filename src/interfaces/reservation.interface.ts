export interface Reservation {
    id?: number;
    userEmail: string;
    tableNumber: number;
    reservationTime: Date;
  }
  
  export interface PaginatedReservations {
    pagedReservations: Reservation[];
    totalPages: number;
    currentPage: number;
  }
  