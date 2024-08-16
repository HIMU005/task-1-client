import axios from "axios";


const axiosCommon = axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: 'https://taskonesearching.vercel.app',
})

const useAxiosCommon = () => {
    return axiosCommon;
}
export default useAxiosCommon;