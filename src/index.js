import './style.css';

const LENGTH = 8;
const maxVertices = LENGTH  * LENGTH
let moves = []
let shortestPath = Array(maxVertices)
let newPath

function getPossibleMoves(vertice){

    let possibleSteps = []
    let i = 0;
    let j = 1;

    possibleSteps.push([vertice[i] + 2, vertice[j] + 1])
    possibleSteps.push([vertice[i] + 2, vertice[j] - 1])
    possibleSteps.push([vertice[i] - 2, vertice[j] + 1])
    possibleSteps.push([vertice[i] - 2, vertice[j] - 1])
    possibleSteps.push([vertice[i] + 1, vertice[j] + 2])
    possibleSteps.push([vertice[i] - 1, vertice[j] + 2])
    possibleSteps.push([vertice[i] + 1, vertice[j] - 2])
    possibleSteps.push([vertice[i] - 1, vertice[j] - 2])

    possibleSteps = possibleSteps.filter((step) => {
        // Check upper and lower bounds
        const withinBounds = step[i] < LENGTH && step[j] < LENGTH && step[i] > 0 && step[j] > 0;
        // Ensure the step is not already in moves
        const notInMoves = !moves.some(move => move[i] === step[i] && move[j] === step[j]);
        
        return withinBounds && notInMoves;
      });

    return possibleSteps
}

function shortestPathAlgorithm(curr, moves, goal){

    let possibleSteps = getPossibleMoves(curr)

    if(curr[0] === goal[0] && curr[1] === goal[1]) {
        if(shortestPath.length > moves.length){
            shortestPath = moves
        }
        return shortestPath
    }

    if(possibleSteps == []) return Array(maxVertices)

    if(moves.length > 6) return Array(maxVertices)

    return possibleSteps.reduce((shortestPath, move) => {

        moves.push(move);

        newPath = shortestPathAlgorithm(move, moves, goal);
        
        if(shortestPath.length > newPath.length) {
            shortestPath = [...newPath]
        }

        moves.pop()

        return shortestPath;
    }, Array(maxVertices)
)

}

const start = [0,0]
const goal = [7, 7]

moves.push(start)
console.log(shortestPathAlgorithm(start, moves, goal))

console.log("It works!")