import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MapsService {

  async calculateDistance(start, destination) {
    const data = (await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?' + `origins=${encodeURIComponent(start)}&destinations=${encodeURIComponent(destination)}&key=${process.env.GOOGLE_MAPS_API_KEY}`)).data.rows;

    if (data[0].elements[0].status === 'NOT_FOUND') {
      return false
    }

    return data[0].elements.reduce((a, b) => a + b.distance.value, 0) / 1000;
  }
}
