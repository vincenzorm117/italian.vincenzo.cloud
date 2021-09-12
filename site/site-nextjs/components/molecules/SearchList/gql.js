import { gql } from "@apollo/client";

export const GQL_SEARCH_VERBS = gql`
  query SearchVerbs($infinitive: String) {
    verbs(infinitive: $infinitive) {
      id
      Infinitive
    }
  }
`;

export const GQL_ALL_VERBS = gql`
  {
    verbs {
      id
      Infinitive
    }
  }
`;
