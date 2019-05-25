import axios from 'axios';
import { Picture } from 'store/picture';

export default class PictureApi {
  static ENDPOINT = 'assets/artworks_data/';
  static FILES_NAME = '-artworks.json';
  static FILES_LENGTH = 1269;

  static getRandomInt(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  static async getRandomPicture(): Promise<Picture> {
    const fileName = this.getRandomInt(0, this.FILES_LENGTH) + this.FILES_NAME;
    const url = this.ENDPOINT + fileName;

    return axios.get(url)
      .then((value: any) => value.data)
      .then((pictures: Picture[]) => {
        return pictures[this.getRandomInt(0, pictures.length)];
      })
    /*
    .catch(error => {
      console.log(error)
      return {};
    });
    */
  }
}




