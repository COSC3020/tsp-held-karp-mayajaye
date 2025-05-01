# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

The steps of this algorithm are:
1. Create the list of cities. $\Theta(|V|)$
2. Call held karp for each city to check which starting city's cost is the smallest. $\Theta(|V|)$
    1. Recursively find the shortest path from a start city. With memoization, this is $\Theta(|V|\cdot2^{|V|})$ since there are $2^{|V|}$ subsets to go through and on the worst case we will loop over $|V|$ cities for each level of recursion


The runtime equation is:

$T(n) = |V| + |V| \cdot |V|\cdot2^{|V|}$

Ignoring the asymptotically insignificant terms, we can conclude that

$T(n) \in \Theta(|V|^{2}2^{|V|})$

The memory complexity consist of 
1. The number of cities $(|V|)$
2. The number of subsets stored in the cache $(2^{|V|})$
    1. The city stored with the subset $(|V|)$

The cache storage has the asymptotically significant term, so the memory complexity is $\Theta(|V|\cdot 2^{|V|})$

#### Sources

[This](https://javascript.plainenglish.io/efficient-js-memoization-using-map-86f1f4735cc) article for javascript memoization

[This](https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript) forum for removing a specific index from an array


"I certify that I have listed all sources used to complete this exercise,
including the use of any Large Language Models. All of the work is my own, except
where stated otherwise. I am aware that plagiarism carries severe penalties and
that if plagiarism is suspected, charges may be filed against me without prior
notice."