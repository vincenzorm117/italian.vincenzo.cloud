import { gql } from "@apollo/client";

export default gql`
  query SearchVerbs($infinitive: String) {
    verbs(infinitive: $infinitive) {
      id
      Infinitive
    }
  }
`;
