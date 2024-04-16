export const randomNum = Math.floor(Math.random() * 10);
export const randomAvartars = (n: number) => {
  return `https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-${n % 11}.png`;
};
