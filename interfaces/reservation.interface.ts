export interface Reservation {
    id?: number;
    userId: number;
    tableNumber: number;
    reservationTime: Date;
  }
  
  export interface PaginatedReservations {
    pagedReservations: Reservation[];
    totalPages: number;
    currentPage: number;
  }
  