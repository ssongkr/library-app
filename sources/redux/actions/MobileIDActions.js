import axios from 'react-native-axios';
import querystring from 'query-string';
import {
    makeEncryptedRealID,
    deCrypted,
    parseXml
} from '../../modules/DataCrypter';
import * as keychain from 'react-native-keychain';

// action type
export const FETCH_MOBILEID_REQUEST = 'FETCH_MOBILEID_REQUEST';
export const FETCH_MOBILEID_SUCCESS = 'FETCH_MOBILEID_SUCCESS';
export const FETCH_MOBILEID_FAILURE = 'FETCH_MOBILEID_FAILURE';

export const getMobileID = () => {
    return {
        type: FETCH_MOBILEID_REQUEST,
    }
}

export const getMobileIDSucess = (data) => {
    return {
        type: FETCH_MOBILEID_SUCCESS,
        data
    }
}

export const getMobileIDFailure = () => {
    return {
        type: FETCH_MOBILEID_FAILURE
    }
}

export const fetchMobileID = () => {
    return (dispatch) => {
        dispatch(getMobileID());

        //loadform keychain
        keychain
            .getGenericPassword()
            .then(function (credentials) {
                //set keychain
                let id = credentials.username;
                //encrypted ID
                let realId = makeEncryptedRealID(id);

                //post Action
                axios.post('http://210.107.226.14/mobile/MA/Xml_UserInfo.php',
                    querystring.stringify({
                        "real_id": realId
                    }), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            "User-Agent": "Dalvik/1.6.0 (Linux; U; Android 4.4.4; Nexus 5 Build/KTU84P)"
                        }
                    })
                    .then(res => {
                        if (res.data && res.data) {
                            parseXml(res.data.toString(), function (result) {
                                var userObject = {
                                    user_code: result.root.item[0].user_code,
                                    user_patName: result.root.item[0].user_patName,
                                    user_deptName: result.root.item[0].user_deptName,
                                    user_name: result.root.item[0].user_name[0],
                                    user_photoUrl: deCrypted(result.root.item[0].user_photoUrl[0], result.root.item[0].user_code),
                                    qr_code: result.root.item[0].qr_code,
                                    sysdate: result.root.item[0].sysdate,
                                }
                                //console.log(userObject);
                                dispatch(getMobileIDSucess(userObject));
                            })
                        }
                    })
                    .catch(err => dispatch(getMobileIDFailure(err)))
            })
            .catch(err => dispatch(getMobileIDFailure(err)))
    }
}
