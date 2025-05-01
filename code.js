//Maya Conway
//code.js
//TSP Held-Karp
//5-1-25

function tsp_hk(distance_matrix) {
    let n = distance_matrix.length;
    let minCost = Infinity;
    let cities = [];

    if (n <= 1) return 0;

    for (let i = 0; i < n; i++) cities.push(i); //create the list of cities
    for (let start = 0; start < n; start++) { //get the minimum cost out of all the start cities
        let cache = new Map(); //create a map for memoization for every call
        minCost = Math.min(minCost, heldKarp(cities, start, distance_matrix, cache));
    }
    return minCost;

}    

function heldKarp(cities, start, distance_matrix, cache) {
    let key = cities.join('|') + '|' + start; //initialize the key for the subset of cities and the current start city
    if (cache.has(key)) return cache.get(key); //returned cached result of this level if it exists

    if (cities.length == 2) {
        //return length of tour that starts at start, goes directly to other city in cities
        //either 0 -> 1 or 1 -> 0
        let other;
        if (cities.indexOf(start) == 0) other = cities[1];
        else other = cities[0];

        cache.set(key, distance_matrix[start][other]); //store the result in the cache
        return distance_matrix[start][other]; 
    }

    let minCost = Infinity;
    let cost = 0;
    for (let city of cities) {
        if (city == start) continue;
        let minusStart = cities.slice(); //copy the cities list
        let index = cities.indexOf(start);
        if (index > -1) minusStart.splice(index, 1); //remove the start city

        //reduce the set of cities that are unvisited by one  (the old start)
        cost = heldKarp(minusStart, city, distance_matrix, cache) + distance_matrix[start][city];
        if (cost < minCost) minCost = cost; //compare the results of each recursive call to find the minimum cost
    }

    cache.set(key, minCost); //store the minimum cost from this level in the map
    return minCost;
}