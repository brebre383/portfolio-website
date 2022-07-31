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
