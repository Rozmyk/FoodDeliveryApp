type MyObject = object[]
export const objectToArrayWithId = (obj: MyObject): object[] => {
  const arr: object[] = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push({ ...obj[key], id: key });
    }
  }
  return arr;
};