// 6. Authentication: Add ROLE_MEMBER and ROLE_ADMIN
export type UserRole = 'ROLE_MEMBER' | 'ROLE_ADMIN';

export interface User {
  id: string;
  username: string;
  role: UserRole;
}