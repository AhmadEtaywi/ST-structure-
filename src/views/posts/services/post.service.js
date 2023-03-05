import axios from 'axios';

export const PostService = {
    list : async () => axios.get(`posts/`).then(res => res.data),
    /*  */
    create: async (post) => axios.post(`posts/`, post).then(res => res.data),

    /*  */
};