// UUID의 형식을 나타내는 정규 표현식
const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const isUuid = (uuid: string) => {
  // 문자열이 정규 표현식과 일치하는지 확인
  return regex.test(uuid);
};
