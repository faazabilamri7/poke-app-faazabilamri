export interface PokemonList {
  id: number;
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{slot: number; type: {name: string}}>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {name: string};
  }>;
  abilities: Array<{
    name: string;
    effect_entries: any;
    ability: {name: string};
    is_hidden: boolean;
    slot: number;
  }>;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
}

export interface PokemonAbility {
  id: number;
  name: string;
  effect_entries: Array<{
    effect: string;
    language: {name: string};
    short_effect: string;
  }>;
}
