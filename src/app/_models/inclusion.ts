export class IncludedOrNot {
  id: number;
  title: string;
  details: string;
  isIncluded: boolean;
  iconUrl: string;

  constructor() {
    this.id = null;
    this.title = '';
    this.details = '';
    this.isIncluded = false;
    this.iconUrl = '';
  }
}
