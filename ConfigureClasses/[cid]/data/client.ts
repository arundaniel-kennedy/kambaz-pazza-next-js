import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const PAZZA_SERVER = `${HTTP_SERVER}/api/pazza`

export const createNewFolder = async (cid: string, folders: string[]) => {
    try {
        const response = await axiosWithCredentials.post(`${PAZZA_SERVER}/${cid}/folders`, folders);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return error.response.data;
            }
        }
    }
}

export const fetchFoldersForCourse = async (cid: string) => {
    try {
        const response = await axiosWithCredentials.get(`${PAZZA_SERVER}/${cid}/folders`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return error.response.data;
            }
        }
    }
}

export const updateFolder = async (cid: string, fid: string, folderName: string) => {
    try {
        const response = await axiosWithCredentials.put(`${PAZZA_SERVER}/${cid}/folders/${fid}`, { name: folderName });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return error.response.data;
            }
        }
    }
}

export const deleteFoldersFromCourse = async (cid: string, folderNames: string[]) => {
    try {
        const response = await axiosWithCredentials.delete(`${PAZZA_SERVER}/${cid}/folders/delete`, { data: folderNames });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return error.response.data;
            }
        }
    }
}