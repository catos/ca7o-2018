
export const snip = (text: string, length: number) => {
    return text.length > length
        ? text.substring(0, length)
        : text;
}

export const randomHexColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const avatarUrl = (name: string) => {
    // TODO: ${randomHexColor()} not random, but custom color plz
    return `https://ui-avatars.com/api/?background=336699&color=fff&size=32&name=${name}`;
}

export const groupBy = <T>(items: T[], key: string) => items.reduce(
    (result, item) => ({
        ...result,
        [item[key]]: [
            ...(result[item[key]] || []),
            item,
        ],
    }),
    {},
);

// export const groupBy = <T>(items: T[], prop: string) => {
//     const grouped = items.reduce(
//         (map, item) => {
//             const key = item[prop];
//             const collection = map.get(key);

//             if (!collection) {
//                 map.set(key, [item]);
//             } else {
//                 collection.push(item);
//             }

//             return map;
//         },
//         new Map()
//     );
    
//     const result = [...grouped.values()];
//     // console.log(result);

//     return result;
// }