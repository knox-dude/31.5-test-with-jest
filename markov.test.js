const { MarkovMachine } = require("./markov");

describe("MarkovMachine makeChains", function() {

    test("makeChains with valid input", function() {
        const mm = new MarkovMachine("the cat in the hat");

        const mm_chains = {
            "the": ["cat", "hat"],
            "cat": ["in"],
            "in": ["the"],
            "hat": [null]
        }
        expect(mm.chains).toEqual(mm_chains);
    })

    test("makeChains with no input", function() {
        const mm = new MarkovMachine("");
        expect(mm.chains).toEqual({})
    });
});

describe("MarkovMachine makeText", () => {
    let mm;

    beforeEach(() => {
        mm = new MarkovMachine('the cat in the hat');
    });

    test("makeText with valid input", () => {
        const generated_text = mm.makeText();
        
        expect(generated_text.slice(-4)).toContain('hat');
        expect(generated_text.length).toBeGreaterThan(3);
    });

    test("makeText with output limit", () => {
        const generated_text = mm.makeText(1);

        expect(generated_text.length).toBeLessThanOrEqual(4);
    })
});