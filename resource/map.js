export let maps = {
    "map1": {
        "size": [20, 10],
        "start_pos": [2, 2],

        "tiles_on_screen": 20, 
        "default_tile": "grass",
        "tiles": {
            "rock": [
                [1, 2],
                [2, 2]
            ]
        },
        
        "entities": {
            "ghosts": {
                "spawn_rate": 150,
                "health": 3,
                "damage": 1
            },
            "player": {
                "health": 10,
                "call_down": 35
            },
            "ball": {
                "damage": 1
            }
        }
    }
}