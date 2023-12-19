const findPet = require("../challenges/1-find-pet");

describe("findPet()", () => {
  test("returns a promise", () => {
    expect(typeof findPet("garfield").then).toBe("function");
  });
  test("resolves with the pet from the appropriate file", () => {
    return Promise.all([
      findPet("garfield"),
      findPet("opal"),
      findPet("peanut"),
    ]).then((promises) => {
      const [garfield, opal, peanut] = promises;
      expect(garfield).toEqual({
        name: "garfield",
        favFood: "lasagne",
        dislikes: "nermal",
      });
      expect(opal).toEqual({
        name: "opal",
        favFood: "whiskers",
        dislikes: "strangers cuddles",
      });
      expect(peanut).toEqual({
        name: "peanut",
        favFood: "chicken",
        dislikes: "deep puddles",
      });
    });
  });
  test("resolves with 'soz couldnt find <petname> :(' when invoked with a non-existent pet name", () => {
    return findPet("snoopy").then((message) => {
      expect(message).toBe("soz couldnt find snoopy :(");
    });
  });
});
