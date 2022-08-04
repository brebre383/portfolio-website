let pokemonRepository = (function() {
let pokemonList = [
        {       name: 'Ivysaur',
                height: 1,
                weight: 13,
                types: ['grass', 'poison']
        },

        {       name: 'Blastoise',
                height: 1.6,
                weight: 85.5,
                types: ['water']
        },

        {       name: 'Girafarig',
                height: 1.5,
                weight: 41.5,
                types: ['psychic', 'normal']
        },
];

return {
  add: function(pokemon) {
    pokemonList.push(pokemon);
  },
  getAll: function() {
    return pokemonList;
  }
 };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: '' });
console.log(pokemonRepository.getAll());

document.write('<div class="pokemonList">');
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.5) {
        document.write('<div class="pokemon--big">');
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
        document.write(' - Wow, that\'s big!');
    } else {
      document.write('<div class="pokemon">');
      document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
    }
    document.write('</div>');
}
document.write('</div>');

// Task 1.5
pokemonlist.forEach(function (pokemon) {
  if (pokemon.height < 1.4 && pokemon.height > 1.1) {
    document.write(pokemon.name + " is small/ ");
  }
  else if (pokemon.height < 1.5) {
    document.write(pokemon.name + " is normal/ ");
  } else { document.write(pokemon.name + " is big, wow!/"); }
});

let pokemon1 = 'Ivysaur(Height:1)';
document.write(pokemon1);
let pokemon2 = 'Blastoise(height:1.6)';
document.write(pokemon2);
let pokemon3 = 'Girafarig(height:1.5)';
document.write(pokemon3);






function divide(dividend, divisor){
  if(divisor === 0){
    return "you're trying to divide by zero."
  }else{
    let result = dividend / divisor;
    return result;
  }
}

divide();
console.log(divide(4, 2));
