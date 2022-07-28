import asyncio
import aiohttp

url_berries = 'https://pokeapi.co/api/v2/berry'
url_berry_firmnesses = 'https://pokeapi.co/api/v2/berry-firmness'
url_berry_flavors = 'https://pokeapi.co/api/v2/berry-flavor'

berry_urls = (
url_berries, url_berry_firmnesses, url_berry_flavors
)

url_contest_types = 'https://pokeapi.co/api/v2/contest-type'
url_contest_effects = 'https://pokeapi.co/api/v2/contest-effect'
url_super_contest_effects = 'https://pokeapi.co/api/v2/super-contest-effect'

contest_urls = (
url_contest_types, url_contest_effects, url_super_contest_effects
)

url_encounter_methods = 'https://pokeapi.co/api/v2/encounter-method'
url_encounter_conditions = 'https://pokeapi.co/api/v2/encounter-condition'
url_encounter_condition_values = 'https://pokeapi.co/api/v2/encounter-condition-value/'

encounter_urls = (
url_encounter_methods, url_encounter_conditions, url_encounter_condition_values
)

url_evolution_chains = 'https://pokeapi.co/api/v2/evolution-chain'
url_evolution_triggers = 'https://pokeapi.co/api/v2/evolution-trigger'

evolution_urls = (
url_evolution_chains, url_evolution_triggers
)

url_game_generations = 'https://pokeapi.co/api/v2/generation'
url_game_pokedexes = 'https://pokeapi.co/api/v2/pokedex'
url_game_versions = 'https://pokeapi.co/api/v2/version'
url_game_version_groups = 'https://pokeapi.co/api/v2/version-group'

game_urls = (
url_game_generations, url_game_pokedexes, url_game_versions, url_game_version_groups
)

url_items = 'https://pokeapi.co/api/v2/item'
url_item_attributes = 'https://pokeapi.co/api/v2/item-attribute'
url_item_categories = 'https://pokeapi.co/api/v2/item-category'
url_item_fling_effects = 'https://pokeapi.co/api/v2/item-fling-effect'
url_item_pockets = 'https://pokeapi.co/api/v2/item-pocket'

item_utls = (
url_items, url_item_attributes, url_item_categories, url_item_fling_effects, url_item_pockets
)

url_locations = 'https://pokeapi.co/api/v2/location'
url_location_areas = 'https://pokeapi.co/api/v2/location-area'
url_location_palparkareas = 'https://pokeapi.co/api/v2/pal-park-area'
url_location_regions = 'https://pokeapi.co/api/v2/region'

location_urls = (
url_locations, url_location_areas, url_location_palparkareas, url_location_regions
)

url_machines = (
'https://pokeapi.co/api/v2/machine',
)

url_moves = 'https://pokeapi.co/api/v2/move'
url_move_aliments = 'https://pokeapi.co/api/v2/move-ailment'
url_move_battle_styles = 'https://pokeapi.co/api/v2/move-battle-style'
url_move_categories = 'https://pokeapi.co/api/v2/move-category'
url_move_damage_classes = 'https://pokeapi.co/api/v2/move-damage-class'
url_move_learn_methods = 'https://pokeapi.co/api/v2/move-learn-method'
url_move_targets = 'https://pokeapi.co/api/v2/move-target'

move_urls = (
url_moves, url_move_aliments, url_move_battle_styles, url_move_categories, url_move_damage_classes, url_move_learn_methods, url_move_targets
)

url_pokemon_abilities = 'https://pokeapi.co/api/v2/ability'
url_pokemon_characteristics = 'https://pokeapi.co/api/v2/characteristic'
url_pokemon_egg_groups = 'https://pokeapi.co/api/v2/egg-group'
url_pokemon_genders = 'https://pokeapi.co/api/v2/gender'
url_pokemon_growth_rates = 'https://pokeapi.co/api/v2/growth-rate'
url_pokemon_natures = 'https://pokeapi.co/api/v2/nature'
url_pokeathlon_stats = 'https://pokeapi.co/api/v2/pokeathlon-stat'
url_pokemons = 'https://pokeapi.co/api/v2/pokemon'
url_pokemon_colors = 'https://pokeapi.co/api/v2/pokemon-color'
url_pokemon_forms = 'https://pokeapi.co/api/v2/pokemon-form'
url_pokemon_habitats = 'https://pokeapi.co/api/v2/pokemon-habitat'
url_pokemon_shapes = 'https://pokeapi.co/api/v2/pokemon-shape'
url_pokemon_species = 'https://pokeapi.co/api/v2/pokemon-species'
url_pokemon_stats = 'https://pokeapi.co/api/v2/stat'
url_pokemon_types = 'https://pokeapi.co/api/v2/type'

pokemon_urls = (
url_pokemon_abilities, url_pokemon_characteristics, url_pokemon_egg_groups,
url_pokemon_genders, url_pokemon_growth_rates, url_pokemon_natures,
url_pokeathlon_stats, url_pokemons, url_pokemon_colors, url_pokemon_forms,
url_pokemon_habitats, url_pokemon_shapes, url_pokemon_species, url_pokemon_stats,
url_pokemon_types
)

all_data_urls = berry_urls + contest_urls + encounter_urls + evolution_urls + game_urls + item_utls + location_urls + url_machines + move_urls + pokemon_urls


def get_data(session, all_data_urls):
  data = []
  for url in all_data_urls:
    data.append(asyncio.create_task(session.get(url)))
  return data

async def get_all_pokemon_data(all_data_urls):
  results = []
  async with aiohttp.ClientSession() as session:
    tasks = get_data(session, all_data_urls)
    # tasks = [session.get(URL) for url in all_data_urls]
    responses = await asyncio.gather(*tasks)
    for response in responses:
      results.append(await response.json())
    return results

def get_or_create_eventloop():
    try:
        return asyncio.get_event_loop()
    except RuntimeError as ex:
        if "There is no current event loop in thread" in str(ex):
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            return asyncio.get_event_loop()

def get_all_pokemon_data_from_urls():
  asyncio.set_event_loop(asyncio.get_event_loop().run_until_complete(get_all_pokemon_data(all_data_urls)))
