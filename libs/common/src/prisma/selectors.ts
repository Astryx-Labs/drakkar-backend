// Prisma Selector for User Authentication
export const userAuthSelector = {
  id: true,
  email: true,
  password: true,
  roles: true,
};
export type UserAuthSelector = typeof userAuthSelector;

// Prisma Selector for User Profile
export const userProfileSelector = {
  id: true,
  displayName: true,
  profile: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      dateOfBirth: true,
      sex: true,
      bio: true,
      metadata: true,
      visibility: {
        select: {
          firstName: true,
          lastName: true,
          dateOfBirth: true,
          sex: true,
          bio: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  },
};
export type UserProfileSelector = typeof userProfileSelector;
