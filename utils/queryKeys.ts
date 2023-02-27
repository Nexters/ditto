// ref: https://tkdodo.eu/blog/effective-react-query-keys
const createQueryKeys = (keyword: string) => {
  const keys = {
    all: [keyword] as const,
    lists: () => [...keys.all, 'list'] as const,
    list: (...args: any[]) => [...keys.lists(), ...args] as const,
    details: () => [...keys.all, 'detail'] as const,
    detail: (...args: any[]) => [...keys.details(), ...args] as const,
  };
  return keys;
};

export const MEMBER_KEY = createQueryKeys('members');
export const GROUP_KEY = createQueryKeys('groups');
export const INVITATION_KEY = createQueryKeys('invitations');
