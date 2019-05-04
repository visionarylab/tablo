import axios from 'axios';
import { Picture } from 'types/picture';

const ENDPOINT = 'assets/artworks_data/';
const FILES_NAME = '-artworks.json';
const FILES_LENGTH = 1269;

function getRandomInt(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

export default async function getRandomPicture(): Promise<Picture | null> {
  const fileName = getRandomInt(0, FILES_LENGTH) + FILES_NAME;
  const url = ENDPOINT + fileName;

  return axios.get(url)
    .then((value: any) => value.data)
    .then((pictures: Picture[]) => {
      return pictures[getRandomInt(0, pictures.length)];
    })
    .catch(error => {
      console.log(error)
      return null;
    });
}

