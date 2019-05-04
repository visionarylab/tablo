import axios from 'axios';
import { Picture } from 'types/picture';

export class PictureService {

    ENDPOINT = './assets/artworks_data/';
    FILES_NAME = '-artworks.json';
    FILES_LENGTH = 1269;

    constructor() {
    }

    getImage() {
      const fileName = this.getRandomInt(0, this.FILES_LENGTH) + this.FILES_NAME;
      const url = this.ENDPOINT + fileName;

      // return fetch();

      return axios.get(url).then(response => console.log(response))

      /*
      return this.http.get(url).pipe(
        map((file: Picture[]) => file[this.getRandomInt(0, file.length)]),
      );
      */
    }

    getRandomInt(min: number, max: number): number {
      return Math.floor(min + Math.random() * (max + 1 - min));
    }
  }