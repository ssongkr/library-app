import cheerio from 'react-native-cheerio';
import defaultImage from '../assets/images/cover_not_available.png'

export function parseMyBookNotice(html) {
    const $ = cheerio.load(html);
    let tags = $('.subject');
    let [subject, date, state, path] = [[], [], [], []];

    tags.each(function () {
        subject.push($(this).text().trim());
        date.push($(this).next().text().split(' ').shift());
        state.push($(this).next().next().text());
    });
    tags = $('a', $('.subject'));
    tags.each(function () {
        path.push($(this).attr('href'))
    });

    let result = [];
    for (let i = 0; i < subject.length; i++) {
        result.push({
            subject: subject[i],
            date: date[i],
            state: state[i],
            path: path[i],
        })
    }
    console.log(result);
    return result;
}
/**
 * 나의 도서 요약 정보(연체료, 연체 횟수) 파싱 
 */
export function parseLateFeeInfo(html) {
    let $ = cheerio.load(html)
    const sub_html = $('.squareInbox').text();
    $ = cheerio.load(sub_html);
    const summary = $('.leftList');

    let temp = [];
    summary.each(function () {
        temp.push($(this).text().split(':').pop().trim());
    });

    let lateFeeInfo = {
        amount: temp[0], // 연체 횟수
        lateFee: temp[1], // 연체료 
    };
    return lateFeeInfo;
}
/**
 * 나의 도서 정보 파싱
 */
export function parseMyBookInfo(html) {
    let $ = cheerio.load(html);
    const table = $('.tb01.width-01', $('.squareInbox'));

    // 대출 도서 내역
    let rentalDate = [];
    let returnDate = [];
    let extensionTime = [];
    let delayedDate = [];
    let rentalBook = [];
    let temp;

    const myBookTag = table[0];
    $ = cheerio.load(myBookTag);
    let regiNum = $('.tleft');
    regiNum.each(function(index) {
        if(index !== 0) {
            rentalDate.push($(this).next().next().text().trim()); // 대여 날짜
            returnDate.push(($(this).next().next().next().text().trim())); // 반납 예정일
            temp = $(this).next().next().next().next().text().trim().split('/'); // 연장/연체
            delayedDate.push(temp.pop()); // 연체일수
            extensionTime.push(temp.pop()); //연장횟수
        }
    })
    let title = $('a', $('.tleft'));
    title.each(function () {
        rentalBook.push($(this).attr('title')); // 대여 도서
    });

    let rentalInfo = [];
    for(let i=0; i<rentalBook.length; i++) {
        rentalInfo.push({
            rentalBook: rentalBook[i],
            rentalDate: rentalDate[i],
            returnDate: returnDate[i],
            extensionTime: extensionTime[i],
            delayedDate: delayedDate[i],
        });
    }
    
    // 예약 도서 내역    
    const reservedBookTag = table[2];
    $ = cheerio.load(reservedBookTag);
    regiNum = $('.tleft');
    let reservedBook = [];
    let callNum = [];
    let reservedDate = [];
    let reservedRank = [];

    regiNum.each(function() {
        callNum.push($(this).text().split(']').pop().trim()); // 청구 기호
        reservedDate.push($(this).next().text().trim()); // 예약 날짜
        reservedRank.push($(this).next().next().next().text().trim()); // 예약 순위
    })
    title = $('a', $('.tleft'));
    title.each(function () {
        reservedBook.push($(this).attr('title')); // 예약 도서
    });

    let reservedInfo = [];
    for(let i=0; i<reservedBook.length; i++) {
        reservedInfo.push({
            reservedBook: reservedBook[i], 
            callNum: callNum[i], 
            reservedDate: reservedDate[i], 
            reservedRank: reservedRank[i],
        });
    }

    const myBookInfo = {
        rentalInfo: rentalInfo,
        reservedInfo: reservedInfo,
    }
    return myBookInfo;
}
/** 
 * 검색된 책의 기본적인 데이터를 크롤링하여 파싱한다.
 */
export function parseBookDatas(html, curID) {
    const host = 'http://mlib.sejong.ac.kr'
    const $ = cheerio.load(html)
    let types=[], titles=[], authors=[], states=[],
        urls=[], publishers=[], dates=[];
    
    
    let tag = $('span', $('.search_brief_title'));
    tag.each(function() {
        let splitted = $(this).text().trim().split('/');
        authors.push(splitted.pop().trim());
        titles.push(splitted.join('/'));
    })

    tag = $('div', $('.f_left'));
    tag.each(function() {
        types.push($(this).text());
    })

    tag = $('span', $('.black'));
    tag.each(function() {
        states.push($(this).text());
    })
    
    tag = $('.search_brief_title');
    tag.each(function() {
        urls.push(host + $(this).attr('href').slice(2));
    });
    
    tag = $('.black');				
    tag.each(function() {
        let data = $(this).prev().text();
        dates.push(data.slice(25).trim().slice(2).split(': ').pop());
        publishers.push(data.slice(0, 25).trim().split(': ').pop());
    });

    let bookData = [];
    for(let i=0; i<titles.length; i++) {
        bookData.push({
            'id': bookData.length + curID,
            'type': types[i],
            'title': titles[i],
            'author': authors[i],
            'state': states[i],
            'detailUrl': urls[i],
            'publisher': publishers[i],
            'date': dates[i],
        });
    }
    return bookData;
}

export function parseBookImage(html) {

    const $ = cheerio.load(html);
    var uri = '';
    $('img', $('.book')).each(function() {
        uri = $(this).attr('src');
    });

    return (uri.search('noimage') !== -1) 
        ? defaultImage 
        : { uri: uri }
}

/** 
 * 검색된 책의 리스트와 대여 정보를 크롤링하여 파싱한다.
 */
export function parseBookCollections(html) {
    const $ = cheerio.load(html);
    let registerNumbers=[], locations=[], 
        callNumbers=[], states=[], dueDates=[];

    let tag = $('h2', $('.borrow'));
    tag.each(function() {
        let splitted = $(this).text().split('/');
        let location = splitted.pop().trim();
        let from = location.indexOf('(') + 1;
        let to = location.length - 1;
        locations.push(location.slice(from, to));
        registerNumbers.push(splitted.pop().trim());
    });

    tag = $('h3', $('.borrow'));
    tag.each(function() {
        let splitted = $(this).text().split('/');
        splitted.pop();
        states.push(splitted.pop().trim());
        callNumbers.push(splitted.pop().trim());

        let date = $(this).next().text().trim();
        if(date === '') {
            dueDates.push('');
        } else {
            let splitted2 = date.split(':');
            let dueDate = splitted2.pop().trim().replace(/\//gi, '.').substring(2);
            if(date.search('예약') == -1) {
                dueDates.push(dueDate);
            } else {
                dueDates.push('');
            }
        }
    });

    let bookList = [];
    let len = registerNumbers.length;
    for(let i=0; i<len; i++) {
        bookList.push([
            parseInt(registerNumbers[i]), 
            locations[i] + '\n' + callNumbers[i], 
            states[i] + '\n' + dueDates[i],
        ]);
    }
    return bookList;
}

