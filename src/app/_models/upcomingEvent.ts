export class UpcomingEventProvince {
  id: number;
  name: string;
  provinceImg: string;
  cities: UpcomingEventCity[];

  constructor(id, name, provinceImg, cities) {
    this.id = id;
    this.name = name;
    this.provinceImg = provinceImg;
    this.cities = cities;
  }
}

export class UpcomingEventCity {
  id: number;
  name: string;
  content: string;

  constructor(id, name, content) {
    this.id = id;
    this.name = name;
    this.content = content;
  }
}
