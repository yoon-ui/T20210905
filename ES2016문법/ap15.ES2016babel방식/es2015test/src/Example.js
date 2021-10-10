const a =1;
const b = 2;
//export 안한놈은 못씀. 아래 d는 그래서 못씀
const d = 4;

export {  a };
export const c = 3;

export default b; //default는 파일당 1번만 사용 가능
