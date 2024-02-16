/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let curr_word;
    let next_word;
    this.chains = {};

    for (let i = 0; i < this.words.length; i++) {

      curr_word = this.words[i];

      if (i + 1 == this.words.length) {
        next_word = null
      } else {
        next_word = this.words[i+1]
      }

      if (!this.chains[curr_word]) {
        let new_arr = [];
        this.chains[curr_word] = new_arr;
      } 
      this.chains[curr_word].push(next_word)
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let curr_num = 0;
    let generated_text = "";
    let prev = null;
    let curr = null;
    let curr_choices;

    while (curr_num < numWords) {
      if (prev == null) {
        const keys = Object.keys(this.chains);
        curr_choices = this.chains[keys[Math.floor(Math.random()*keys.length)]];
      }
      else {
        curr_choices = this.chains[prev];
      }

      curr = curr_choices[Math.floor(Math.random()*curr_choices.length)];
      prev=curr;

      if (!curr) {
        break;
      }

      generated_text += curr + " ";

    }

  return generated_text;

  }
}