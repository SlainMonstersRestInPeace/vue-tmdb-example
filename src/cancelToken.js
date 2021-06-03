import axios from 'axios'

export default {
  source() {
    let source = axios.CancelToken.source();
    let isCancelled = false;

    return {
      ...source,
      cancel() {
        source.cancel();
        isCancelled = true;
      },
      isCancelled() {
        return isCancelled;
      }
    }
  },
}