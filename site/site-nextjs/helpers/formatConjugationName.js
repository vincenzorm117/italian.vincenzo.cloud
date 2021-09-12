import { capitalize } from "lodash";

const formatConjugationName = (name) => {
  return capitalize(name.replace(/-_/g, " "));
};
