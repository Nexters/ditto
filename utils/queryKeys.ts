// ref: https://tkdodo.eu/blog/effective-react-query-keys
const createQueryKeys = <Filters = unknown, Detail = unknown>(keyword: string) => {
  const keys = {
    all: [keyword] as const,
    lists: () => [...keys.all, 'list'] as const,
    list: (filters: Filters) => [...keys.lists(), { filters }] as const,
    details: () => [...keys.all, 'detail'] as const,
    detail: (id: Detail) => [...keys.details(), id] as const,
  };
  return keys;
};

export const MEMBER_KEY = createQueryKeys('members');
export const GROUP_KEY = createQueryKeys('groups');
export const INVITATION_KEY = createQueryKeys('invitations');
