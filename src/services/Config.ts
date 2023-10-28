export class ConfigService {
    static get baseURL() {
        return process.env.REACT_APP_BASE_URL;
    }
}