package algo_prac.unit_01;

import java.util.*;

/**
 * TesterAlgo
 */
public class TesterAlgo {
    /*
    * Breath first search the provided grid. You may traverse 1's not 0's and move in the four cardinal directions
    */
    static int shortestCellPath(int[][] grid, int sr, int sc, int tr, int tc) {
        // bfs necessary ds
        HashMap<String, String> parents = new HashMap<>();
        HashSet<String> visited = new HashSet<>();
        Queue<Coords> frontier = new LinkedList<>();

        // Init Problem
        Coords starting_point = new Coords(sr, sc); 
        frontier.add(starting_point);
        parents.put(starting_point.toString(), null);
        // domain specific
        int[][] possibleCoords = {{0, 1},{1, 0},{-1, 0},{0, -1}};
        int flag = 0;
        
        // bfs
        while(frontier.peek() != null) {
            Coords curr = frontier.poll();
            if (curr.row == tr && curr.col == tc) {
                flag = 1;
            }
            for (int[] pc : possibleCoords) {
                if (valid(grid, curr.row + pc[0], curr.col + pc[1])) {
                    Coords temp = new Coords(curr.row + pc[0], curr.col + pc[1]);
                    if (!visited.contains(temp.toString())) {
                        parents.put(temp.toString(), curr.toString());
                        frontier.add(temp);
                    }
                }
            }
            visited.add(curr.toString());
        }

        // no path found 
        if (flag == 0) {
            return -1;
        } else {
            int counter = 0;
            String next = parents.get(String.format("%d,%d", tr, tc));
            while(next != null) {
                counter++;
                next = parents.get(next);
            }
            return counter;
        }
    }

    static boolean valid(int[][] grid, int row, int col) {
        if (row < 0 || row > grid.length - 1 || col < 0 || col > grid[0].length - 1) {
            return false;
        } 
        if (grid[row][col] == 0) {
            return false;
        }
        return true;
    }

    public static void main(String[] args) {
        int[][] grid = { { 1, 1, 1 }, 
                         { 0, 0, 1 }, 
                         { 1, 1, 1 } };
        int[][] grid2 = { { 1, 1, 1, 0 }, 
                          { 0, 0, 0, 0 }, 
                          { 1, 1, 1, 0 } };
        
        int result = shortestCellPath(grid, 0, 0, 2, 0);
        int result2 = shortestCellPath(grid2, 0, 1, 0, 0);
        System.out.println("Result 1 is: " + Integer.toString(result));
        System.out.println("Result 2 is: " + Integer.toString(result2));

    }
}

final class Coords {
    
    public final int row;
    public final int col;

    public Coords(int row, int col) {
        this.row = row;
        this.col = col;
    }

    public String toString() {
        return String.format("%d,%d", this.row, this.col);
    }
}