import _ from 'lodash';

const numToThousand = (num = 0) => {
    return _.chunk(_.reverse(_.split(_.toString(num), '')), 3).reverse()
        .map(item => item.reverse().join('')).join(',')
}

export { numToThousand }