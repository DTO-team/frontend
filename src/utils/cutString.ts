export const cutString = (input: string, character: string) => {
  if (input.indexOf(character) === -1) return input;
  let inputs = [];
  let remember = 0;
  for (var i = 0; i < input.length; i++) {
    if (input[i] === character) {
      inputs.push(input.substring(remember, i));
      remember = i + 2;
    }
    if (i === input.length - 1) {
      inputs.push(input.substring(remember, i + 1));
    }
  }
  return inputs;
};
