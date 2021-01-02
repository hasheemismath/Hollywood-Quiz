import axios from 'axios';

const ApiService = () => {

    function authenticate(username, password, callBack, errorCallback) {
        return ax().post('api/admin/adminauth/', { username, password }).then((data: any) => {
            data = data.data;
            if (data.jwt) {
                localStorage.setItem("jwt", data.jwt);
                callBack(true);
            } else {
                callBack(false);
            }
        }).catch(() => {
            errorCallback();
        });
    };

    function getAnalytics(data) {
        return ax().post('api/admin/visitorRecords/analytics/', data);
    }

    function getFunnelData(data){
        return ax().post('api/admin/visitorRecords/funnelTracking/', data);
    }

    function playerCount(data) {
        return ax().post('api/admin/visitorRecords/playerCount/', data);
    }

    function totalGamePlayed(data) {
        return ax().post('api/admin/visitorRecords/totalGamePlayed/', data);
    }

    function ax() {
        const baseUlr = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? process.env.REACT_APP_BASE_URL : "/";
        const jwt = localStorage.getItem('jwt');

        return axios.create({
            baseURL: baseUlr,
            timeout: 10000,
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        });
    }

    return {
        authenticate,
        getAnalytics,
        getFunnelData,
        playerCount,
        totalGamePlayed,
    }


}

export default ApiService;