export const LS_KEY_COVERAGE = "quiz.verbs.coverage";

class QuizService {
  #coverage = null;
  #total = null;

  constructor() {
    this.#coverage = this.#readCoverage();
    this.#total = 0;
  }

  #readCoverage() {
    try {
      const state = JSON.parse(window.localStorage.getItem(LS_KEY_COVERAGE));
      if (!Array.isArray(state)) {
        return [];
      }
      return state;
    } catch (error) {
      return [];
    }
  }

  #writeCoverage(coverage) {
    const value = JSON.stringify(coverage);
    window.localStorage.setItem(LS_KEY_COVERAGE, value);
  }

  setTotal(total) {
    this.#total = total;

    if (this.#coverage.length < this.#total) {
      this.#coverage[this.#total] = null;
    }
  }

  nextVerb() {
    return Math.ceil(Math.random() * this.#total);
  }

  updateVerbScore(id, score) {
    if (!this.#coverage?.[id]) {
      this.#coverage[id] = score;
    } else {
      const existingScore = this.#coverage[id];
      for (let i = 0; i < existingScore.length; i++) {
        existingScore[i] += score[i];
      }
    }
    this.#writeCoverage(this.#coverage);
  }
}

const Singleton = new QuizService();

export const QuizServiceFactory = () => Singleton;
