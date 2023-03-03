import axios from 'axios';
import { EXERCISE_API_URL } from '../helper/config';
import { NINJA_API_KEY } from '../helper/config';

async function exerciseApi(activity) {
  const options = {
    headers: { 'X-Api-Key': NINJA_API_KEY },
  };

  const res = await axios.get(
    `${EXERCISE_API_URL}${activity}
`,
    options
  );

  console.log(res);
}
exerciseApi("skiing")
export default exerciseApi;
