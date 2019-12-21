/**
 *  keyword: 검색어
 *
 *  도서 검색 시 필요로하는 POST 요청의 BODY의 PARAMS를 형식에 맞게
 *  반환한다.
 */
export const getFormedBody = (values) => {
    let params = [];
    for(let key in values) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(values[key]);
        params.push(encodedKey + "=" + encodedValue);
    }
    let formedBody = params.join('&');

    return formedBody;
}

export const getQueryString = (values) => {
    let querys = [];
    for(let key in values) {
        querys.push(key + '=' + values[key]);
    }
    let queryString = '?' + querys.join('&');
    //console.log('Query string: ' + queryString);
    return queryString;
}