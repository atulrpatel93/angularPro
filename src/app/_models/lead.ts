export class Lead {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    message: string;
    statusId: number;
    source: string;
    fromPage: string;
    customerId: number;

  constructor() {
    this.statusId = 1;
    this.customerId = null;
  }
}
