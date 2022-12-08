export const countWords = (document: string) => {
    const array = document.split(' ');
    return array.filter(word => word !== '').length;
}
