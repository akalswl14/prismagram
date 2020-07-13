// api 폴더 안의 많은 graphql파일, resolvers파일을 이 schema.js로 넣는다.(이 파일이 모든 typeDefs와 resolvers를 가짐.)
// 서버에는 schema.js만 입력하면 됨.
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));
//이렇기 때문에 api폴더 안에는 Type이나 Resolver를 위한 graphql,js 파일이 아닌것은 절대로 존재해서는 안된다.

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers),
});
export default schema;
