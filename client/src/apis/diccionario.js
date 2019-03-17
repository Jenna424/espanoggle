// I create an instance of axios and then export it.
// I can then reference this instance of axios as diccionario, which is the name of this file.
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3001'
});