const VALID_CAMPUSES = ['3', '4', '5', '6'];

function validateInput(input) {
    let { username, password, campus } = input;

    username = username.replace('@fpt.edu.vn', '+');
    if (!username.includes('+')) {
        username += '+'; 
    }

    if (!VALID_CAMPUSES.includes(campus)) {
        const validCampuses = VALID_CAMPUSES.map(c => {
            switch (c) {
                case '3':
                    return '3: Hà Nội';
                case '4':
                    return '4: Hồ Chí Minh';
                case '5':
                    return '5: Đà Nẵng';
                case '6':
                    return '6: Cần Thơ';
            }
        }).join(', ');

        throw new Error(`Invalid campus. Please choose from: ${validCampuses}.`);
    }
    return { username, password, campus };
}

module.exports = { validateInput };
