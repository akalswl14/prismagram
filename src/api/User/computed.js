import { prisma } from "../../../generated/prisma-client";

export default {
  // 원래의 datamodel(prisma)에는 fullName이 없는데 model.graphql에는 정의되어있는 경우에, prisma를 확인한뒤 없으면 computed/custom Field를 확인한다.
  // 따라서 custom resolver를 만들어 처리한다.
  // 굳이 어떤 type에서 fullName을 찾지 않더라도, fullName을 쓸 수 있는데, 이는 schema.js에서 resolver를 전부 한곳에 모으므로
  // 다른 곳에서도 이 resolver를 쓸 수 있는 것이다.
  User: {
    fullName: (parent) => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return await prisma.$exists.user({
          AND: [{ id: parentId }, { followers_some: { id: user.id } }],
        });
      } catch {
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
  },
};
