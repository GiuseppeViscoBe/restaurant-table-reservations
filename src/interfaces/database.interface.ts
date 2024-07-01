export interface Database {
    users: {
      id?: number;
      userName: string;
      userEmail: string;
    };
    reservations: {
      id?: number;
      userEmail: string;
      tableNumber: number;
      reservationTime: Date;
    };
  }